'use client'

import React, { useState, useEffect } from 'react'
import { Character } from '@/types/game'
import { generateInitialStory, generateActionConsequence } from '@/lib/game/storyInitializer'
import { generateIntelligentResponse, IntelligentOption } from '@/lib/game/intelligentNarrative'

interface TutorialStep {
  id: number
  title: string
  content: string
  playerAction?: string
  aiResponse?: string
  xpGained?: number
  environment?: string
  timeOfDay?: string
  options?: IntelligentOption[]
  consequences?: string[]
}

interface TutorialInterfaceProps {
  character: Character
  onTutorialComplete: (updatedCharacter: Character) => void
}

export default function TutorialInterface({ character, onTutorialComplete }: TutorialInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<TutorialStep[]>([])
  const [playerAction, setPlayerAction] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [currentOptions, setCurrentOptions] = useState<IntelligentOption[]>([])
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    initializeTutorial()
  }, [])

  const initializeTutorial = async () => {
    try {
      const story = await generateInitialStory(character)
      const initialStep: TutorialStep = {
        id: 1,
        title: '🌟 Sua História em Altherion',
        content: story,
        environment: 'tranquilo',
        timeOfDay: 'dia'
      }
      setSteps([initialStep])
      setShowStory(true)
    } catch (error) {
      console.error('Erro ao gerar história inicial:', error)
    }
  }

  const handleAction = async () => {
    if (!playerAction.trim() || isProcessing) return

    setIsProcessing(true)
    
    try {
      // Usar sistema inteligente
      const intelligentResponse = generateIntelligentResponse(
        playerAction,
        character,
        'bandidos bloqueando o caminho na floresta'
      )
      
      const newStep: TutorialStep = {
        id: currentStep + 2,
        title: `Passo ${currentStep + 2} de 3 - Tutorial Narrativo`,
        content: intelligentResponse.narrative,
        playerAction: playerAction,
        aiResponse: intelligentResponse.narrative,
        xpGained: intelligentResponse.xp,
        environment: 'tenso',
        timeOfDay: 'dia',
        options: intelligentResponse.options,
        consequences: intelligentResponse.consequences
      }

      setSteps(prev => [...prev, newStep])
      setCurrentStep(prev => prev + 1)
      setPlayerAction('')
      setCurrentOptions(intelligentResponse.options)
      setShowOptions(true)

      // Atualizar personagem com XP
      if (intelligentResponse.xp) {
        character.xp = (character.xp || 0) + intelligentResponse.xp
      }

      // Completar tutorial após 3 passos
      if (currentStep >= 2) {
        setTimeout(() => {
          onTutorialComplete(character)
        }, 2000)
      }

    } catch (error) {
      console.error('Erro ao processar ação:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleOptionSelect = (option: IntelligentOption) => {
    setPlayerAction(option.text)
    setShowOptions(false)
    handleAction()
  }

  const getStepIcon = (stepId: number) => {
    if (stepId === 1) return '🌟'
    if (stepId === 2) return '⚔️'
    if (stepId === 3) return '🏆'
    return '📖'
  }

  const getStepColor = (stepId: number) => {
    if (stepId === 1) return 'from-blue-500 to-purple-600'
    if (stepId === 2) return 'from-green-500 to-blue-600'
    if (stepId === 3) return 'from-yellow-500 to-orange-600'
    return 'from-gray-500 to-gray-600'
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border-b border-purple-500/30 flex-shrink-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎮</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Tutorial Narrativo
                </h1>
                <p className="text-gray-300 text-sm">Aprenda a jogar Crônicas de Altherion</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Personagem</div>
              <div className="text-lg font-semibold text-white">{character.nome}</div>
              <div className="text-sm text-gray-300">{character.classe} • Nível {character.level}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="flex-1 flex overflow-hidden">
        {/* Story Area - Left Side */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {steps.slice().reverse().map((step, index) => (
              <div
                key={step.id}
                className={`bg-gradient-to-r ${getStepColor(step.id)}/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${
                  index === 0 ? 'ring-2 ring-purple-500/50' : ''
                }`}
              >
                {/* Step Header */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 p-3 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{getStepIcon(step.id)}</div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{step.title}</h3>
                      {step.environment && step.timeOfDay && (
                        <div className="flex items-center space-x-2 text-xs text-gray-300">
                          <span className="px-2 py-1 bg-white/10 rounded-full">{step.environment}</span>
                          <span className="px-2 py-1 bg-white/10 rounded-full">{step.timeOfDay}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-4">
                  {step.playerAction && (
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">👤</span>
                        </div>
                        <span className="text-xs font-medium text-gray-300">Sua ação:</span>
                      </div>
                      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-2">
                        <p className="text-blue-100 font-medium text-sm">"{step.playerAction}"</p>
                      </div>
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-100 leading-relaxed whitespace-pre-wrap text-sm">
                      {step.content}
                    </div>
                  </div>

                  {step.xpGained && (
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+</span>
                      </div>
                      <span className="text-green-400 font-semibold text-sm">+{step.xpGained} XP</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                  <span className="text-purple-300 font-medium">Processando sua ação...</span>
                </div>
              </div>
            )}

            {/* Intelligent Options */}
            {showOptions && currentOptions.length > 0 && (
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-green-500/30 p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🎯</span> Escolha sua próxima ação:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-3 rounded-lg text-left transition-all duration-200 ${
                        option.risk === 'high' 
                          ? 'bg-red-600/20 border border-red-500/30 hover:bg-red-600/30' 
                          : option.risk === 'medium'
                          ? 'bg-yellow-600/20 border border-yellow-500/30 hover:bg-yellow-600/30'
                          : 'bg-green-600/20 border border-green-500/30 hover:bg-green-600/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{option.text}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            option.risk === 'high' ? 'bg-red-500 text-white' :
                            option.risk === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-green-500 text-white'
                          }`}>
                            {option.risk === 'high' ? 'Alto Risco' : 
                             option.risk === 'medium' ? 'Médio Risco' : 'Baixo Risco'}
                          </span>
                          <span className="text-xs text-gray-300">
                            {option.successChance}% sucesso
                          </span>
                        </div>
                      </div>
                      {option.consequences && (
                        <div className="text-xs text-gray-300">
                          <strong>Consequências:</strong> {option.consequences.join(', ')}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setShowOptions(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Ou digite sua própria ação abaixo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Panel - Right Side */}
        <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700/50 p-4 flex flex-col space-y-4">
          {/* Character Card */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-4">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">👤</span> Seu Personagem
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Nome:</span>
                <span className="text-white font-medium text-sm">{character.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Classe:</span>
                <span className="text-white font-medium text-sm">{character.classe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Nível:</span>
                <span className="text-white font-medium text-sm">{character.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">XP:</span>
                <span className="text-white font-medium text-sm">{character.xp || 0}</span>
              </div>
            </div>
          </div>

          {/* Action Input - Fixed Position */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-4 sticky top-4">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">⚡</span> Sua Ação
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  O que você faz?
                </label>
                <textarea
                  value={playerAction}
                  onChange={(e) => setPlayerAction(e.target.value)}
                  placeholder="Ex: Exploro a floresta, Converso com o aldeão, Ataco o lobo..."
                  className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none text-sm"
                  rows={2}
                  disabled={isProcessing}
                />
              </div>

              <button
                onClick={handleAction}
                disabled={!playerAction.trim() || isProcessing}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <span>⚔️</span>
                    <span>Agir</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-4">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">📊</span> Progresso
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Passos completados:</span>
                <span className="text-white font-medium">{currentStep}/3</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 text-center">
                {currentStep < 3 ? 'Continue sua aventura!' : 'Tutorial completo!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
