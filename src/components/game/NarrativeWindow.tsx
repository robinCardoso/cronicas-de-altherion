'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Character, NarrativeResponse } from '@/types/game'
import { useStory } from '@/lib/hooks/useStory'
import { adicionarExperiencia } from '@/lib/game/character'
import { cn } from '@/lib/utils/cn'

interface NarrativeWindowProps {
  character: Character
  onCharacterUpdate: (character: Character) => void
  className?: string
}

export function NarrativeWindow({ character, onCharacterUpdate, className }: NarrativeWindowProps) {
  const [action, setAction] = useState('')
  const [narrative, setNarrative] = useState<NarrativeResponse | null>(null)
  const [history, setHistory] = useState<NarrativeResponse[]>([])
  const { generateStory, isLoading, error } = useStory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!action.trim() || isLoading) return

    const response = await generateStory(character, action.trim())
    if (response) {
      setNarrative(response)
      setHistory(prev => [...prev, response])
      
      // Atualiza o personagem com XP ganho
      if (response.xp) {
        const updatedCharacter = adicionarExperiencia(character, response.xp)
        onCharacterUpdate(updatedCharacter)
      }
    }

    setAction('')
  }

  const getMoodStyles = (mood: string) => {
    const styles = {
      nevoa: 'bg-gray-800/50 backdrop-blur-sm border-gray-600',
      fogo: 'bg-red-900/30 backdrop-blur-sm border-red-600',
      tranquilo: 'bg-green-900/30 backdrop-blur-sm border-green-600',
      tenso: 'bg-yellow-900/30 backdrop-blur-sm border-yellow-600',
      mistico: 'bg-purple-900/30 backdrop-blur-sm border-purple-600'
    }
    return styles[mood as keyof typeof styles] || styles.tranquilo
  }

  const getTimeStyles = (time: string) => {
    const styles = {
      dia: 'text-yellow-100',
      noite: 'text-blue-100',
      alvorecer: 'text-orange-100',
      entardecer: 'text-red-100'
    }
    return styles[time as keyof typeof styles] || styles.dia
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Janela de Narrativa */}
      <div className={cn(
        'relative min-h-[400px] rounded-lg border-2 p-6 transition-all duration-500',
        narrative ? getMoodStyles(narrative.sceneMood) : 'bg-gray-800/50 backdrop-blur-sm border-gray-600'
      )}>
        <AnimatePresence mode="wait">
          {narrative ? (
            <motion.div
              key={narrative.narrative}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Imagem da cena */}
              {narrative.imageUrl && (
                <div className="mb-4">
                  <img
                    src={narrative.imageUrl}
                    alt="Cena da narrativa"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Texto da narrativa */}
              <div className={cn('text-lg leading-relaxed', getTimeStyles(narrative.timeOfDay))}>
                {narrative.narrative.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Informações do evento */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="px-2 py-1 bg-blue-600 text-white rounded">
                    {narrative.event}
                  </span>
                  <span className="px-2 py-1 bg-green-600 text-white rounded">
                    +{narrative.xp} XP
                  </span>
                </div>
                <div className="text-gray-400">
                  {narrative.sceneMood} • {narrative.timeOfDay}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-gray-400"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">⚔️</div>
                <p className="text-xl">Digite sua ação para começar a aventura!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Campo de ação */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="O que você faz? (ex: 'Exploro a floresta', 'Ataco o goblin', 'Conversar com o mercador')"
            className="flex-1 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!action.trim() || isLoading}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading ? 'Gerando...' : 'Agir'}
          </button>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-200">
            Erro: {error}
          </div>
        )}
      </form>

      {/* Histórico de ações */}
      {history.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Histórico</h3>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {history.slice(-5).map((item, index) => (
              <div
                key={index}
                className="p-3 bg-gray-700 rounded text-sm text-gray-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-blue-400">+{item.xp} XP</span>
                  <span className="text-gray-500">{item.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
