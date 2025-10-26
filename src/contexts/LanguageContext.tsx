'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Tipos para as linguagens suportadas
export type Language = 'pt' | 'en' | 'es'

// Interface para as traduções
export interface Translations {
  [key: string]: any
}

// Contexto de linguagem
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Hook para usar o contexto
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Hook para tradução
export function useTranslation() {
  return useLanguage()
}

// Props do provider
interface LanguageProviderProps {
  children: ReactNode
}

// Provider do contexto
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('pt')
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)

  // Carrega as traduções
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true)
        console.log(`Loading translations for language: ${language}`)
        const response = await fetch(`/locales/${language}.json`)
        if (!response.ok) {
          throw new Error(`Failed to load ${language} translations`)
        }
        const data = await response.json()
        console.log('Loaded translations:', data)
        setTranslations(data)
      } catch (error) {
        console.error('Error loading translations:', error)
        // Fallback para português
        if (language !== 'pt') {
          console.log('Falling back to Portuguese translations')
          const fallbackResponse = await fetch('/locales/pt.json')
          const fallbackData = await fallbackResponse.json()
          setTranslations(fallbackData)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language])

  // Função para obter tradução
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Debug: verificar se as traduções estão carregadas
    if (Object.keys(translations).length === 0) {
      console.warn('Translations not loaded yet for key:', key)
      return key
    }

    const keys = key.split('.')
    let value: any = translations

    // Navega pela estrutura aninhada
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Debug: mostrar qual chave não foi encontrada
        console.warn(`Translation key not found: ${key} (missing: ${k})`)
        return key
      }
    }

    // Se encontrou uma string, aplica os parâmetros
    if (typeof value === 'string') {
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match
        })
      }
      return value
    }

    // Se não encontrou, retorna a chave
    console.warn(`Translation value is not a string for key: ${key}`)
    return key
  }

  // Função para alterar idioma
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Salva no localStorage
    localStorage.setItem('altherion-language', lang)
  }

  // Carrega idioma salvo no localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('altherion-language') as Language
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Se não há idioma salvo, carrega português imediatamente
      setLanguageState('pt')
    }
  }, [])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isLoading
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
