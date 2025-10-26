'use client'

import { useStory } from '@/lib/hooks/useStory'
import { motion } from 'framer-motion'

export function AIProviderStatus() {
  const { aiProvider } = useStory()

  const getStatusColor = () => {
    switch (aiProvider.status) {
      case 'active':
        return 'text-green-400'
      case 'fallback':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = () => {
    switch (aiProvider.name) {
      case 'OpenAI GPT-4':
        return '🤖'
      case 'Google Gemini 2.0':
        return '🧠'
      case 'Modo Demo':
        return '🎮'
      default:
        return '❓'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg z-50"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getStatusIcon()}</span>
        <div>
          <div className={`text-sm font-medium ${getStatusColor()}`}>
            {aiProvider.name}
          </div>
          <div className="text-xs text-gray-400">
            {aiProvider.cost} • {aiProvider.features.join(', ')}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
