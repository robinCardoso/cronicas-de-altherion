'use client'

import { useState } from 'react'
import { Character, NarrativeResponse } from '@/types/game'
import { generateNarrative, getAIProviderInfo } from '@/lib/api/ai-provider'

interface UseStoryReturn {
  generateStory: (character: Character, action: string) => Promise<NarrativeResponse | null>
  isLoading: boolean
  error: string | null
  aiProvider: ReturnType<typeof getAIProviderInfo>
}

export function useStory(): UseStoryReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const aiProvider = getAIProviderInfo()

  const generateStory = async (
    character: Character,
    action: string
  ): Promise<NarrativeResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      // Usar o provedor unificado
      const result = await generateNarrative(character, action)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateStory,
    isLoading,
    error,
    aiProvider,
  }
}
