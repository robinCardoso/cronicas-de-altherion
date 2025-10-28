'use client'

import { useState, useEffect } from 'react'
import { GameSettings } from '@/components/ui/GameSettings'

const DEFAULT_SETTINGS: GameSettings = {
  narrativeLength: 'medium',
  aiCreativity: 'medium',
  showSuggestions: true,
  autoScroll: true
}

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS)

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('game-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
      }
    }
  }, [])

  // Salvar configurações no localStorage
  const updateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings)
    localStorage.setItem('game-settings', JSON.stringify(newSettings))
  }

  // Obter configurações para a API
  const getApiSettings = () => {
    const lengthMap = {
      short: 200,    // Aumentado de 100 para 200
      medium: 400,   // Aumentado de 200 para 400
      long: 800      // Aumentado de 400 para 800
    }

    const creativityMap = {
      low: 0.5,
      medium: 0.8,
      high: 1.2
    }

    return {
      maxTokens: lengthMap[settings.narrativeLength],
      temperature: creativityMap[settings.aiCreativity]
    }
  }

  return {
    settings,
    updateSettings,
    getApiSettings
  }
}
