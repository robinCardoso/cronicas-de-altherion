'use client'

import { useState } from 'react'
import { Character } from '@/types/game'
import { generateInitialStory, generateActionConsequence } from '@/lib/game/storyInitializer'
import { adicionarExperiencia } from '@/lib/game/character'
import { createAIContext } from '@/lib/game/aiContextBuilder'

interface StoryInitializerProps {
  character: Character
  onStoryComplete: (character: Character) => void
}

export function StoryInitializer({ character, onStoryComplete }: StoryInitializerProps) {
  const [currentStory, setCurrentStory] = useState(generateInitialStory(character))
  const [playerAction, setPlayerAction] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [storyStep, setStoryStep] = useState(0)
  const [aiContext] = useState(() => createAIContext(character))

  const handleAction = async () => {
    if (!playerAction.trim()) return

    setIsProcessing(true)
    
    try {
      // Adicionar ação ao contexto da IA
      aiContext.addAction(playerAction)
      
      // Gerar consequência com IA real
      const consequence = await generateActionConsequence(playerAction, character, aiContext)
      
      // Aplicar consequências
      let updatedCharacter = { ...character }
      
      if (consequence.xpGain) {
        updatedCharacter = adicionarExperiencia(updatedCharacter, consequence.xpGain)
      }
      
      // Atualizar história com resposta da IA
      let newStoryContent = `\n\n**Sua ação:** ${playerAction}\n\n**Resultado:** ${consequence.narrative}`
      
      if (consequence.xpGain) {
        newStoryContent += `\n\n**Você ganhou ${consequence.xpGain} XP!**`
      }
      
      if (consequence.sceneMood) {
        newStoryContent += `\n\n**Ambiente:** ${consequence.sceneMood}`
      }
      
      if (consequence.timeOfDay) {
        newStoryContent += `\n\n**Horário:** ${consequence.timeOfDay}`
      }
      
      setCurrentStory(prev => prev + newStoryContent)
      
      // Atualizar contexto da IA
      aiContext.addAIResponse({
        narrative: consequence.narrative,
        sceneMood: consequence.sceneMood || 'tranquilo',
        timeOfDay: consequence.timeOfDay || 'dia',
        event: consequence.event,
        xp: consequence.xpGain,
        imageUrl: consequence.imageUrl
      })
      
      setPlayerAction('')
      setStoryStep(prev => prev + 1)
      
      // Após 3 ações, completar o tutorial
      if (storyStep >= 2) {
        setTimeout(() => {
          onStoryComplete(updatedCharacter)
        }, 3000)
      }
    } catch (error) {
      console.error('Erro ao processar ação:', error)
      
      // Fallback para resposta básica
      const consequence = {
        narrative: `Você ${playerAction.toLowerCase()}. A ação foi executada com sucesso.`,
        xpGain: Math.floor(Math.random() * 10) + 5
      }
      
      let updatedCharacter = { ...character }
      if (consequence.xpGain) {
        updatedCharacter = adicionarExperiencia(updatedCharacter, consequence.xpGain)
      }
      
      setCurrentStory(prev => prev + `\n\n**Sua ação:** ${playerAction}\n\n**Resultado:** ${consequence.narrative}\n\n**Você ganhou ${consequence.xpGain} XP!**`)
      setPlayerAction('')
      setStoryStep(prev => prev + 1)
      
      if (storyStep >= 2) {
        setTimeout(() => {
          onStoryComplete(updatedCharacter)
        }, 3000)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          🌟 Sua História em Altherion
        </h2>
        
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
            {currentStory}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            O que você faz?
          </label>
          <input
            type="text"
            value={playerAction}
            onChange={(e) => setPlayerAction(e.target.value)}
            placeholder="Ex: Exploro a floresta, Converso com o aldeão, Ataco o lobo..."
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            disabled={isProcessing}
          />
        </div>
        
        <button
          onClick={handleAction}
          disabled={!playerAction.trim() || isProcessing}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processando...</span>
            </div>
          ) : (
            'Agir'
          )}
        </button>
        
        <div className="text-center text-sm text-gray-400">
          Passo {storyStep + 1} de 3 - Tutorial Narrativo
        </div>
      </div>
    </div>
  )
}
