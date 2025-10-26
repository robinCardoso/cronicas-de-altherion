import { Language } from '@/contexts/LanguageContext'

// Interface para estrutura de tradução
interface TranslationStructure {
  [key: string]: string | TranslationStructure
}

// Interface para resultado da validação
export interface ValidationResult {
  isValid: boolean
  missingKeys: string[]
  extraKeys: string[]
  coverage: number
  errors: string[]
}

// Interface para relatório de cobertura
export interface CoverageReport {
  language: Language
  totalKeys: number
  translatedKeys: number
  missingKeys: string[]
  coverage: number
  status: 'complete' | 'partial' | 'incomplete'
}

/**
 * Extrai todas as chaves de uma estrutura de tradução
 */
function extractKeys(obj: TranslationStructure, prefix = ''): string[] {
  const keys: string[] = []
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'string') {
      keys.push(fullKey)
    } else if (typeof value === 'object' && value !== null) {
      keys.push(...extractKeys(value, fullKey))
    }
  }
  
  return keys.sort()
}

/**
 * Valida se todas as linguagens têm as mesmas chaves
 */
export function validateTranslations(
  translations: Record<Language, TranslationStructure>
): ValidationResult {
  const languages = Object.keys(translations) as Language[]
  const allKeys = new Set<string>()
  const missingKeys: string[] = []
  const extraKeys: string[] = []
  const errors: string[] = []

  // Coleta todas as chaves de todas as linguagens
  languages.forEach(lang => {
    const keys = extractKeys(translations[lang])
    keys.forEach(key => allKeys.add(key))
  })

  // Verifica chaves faltantes e extras para cada linguagem
  languages.forEach(lang => {
    const langKeys = extractKeys(translations[lang])
    const langKeySet = new Set(langKeys)

    // Chaves que existem em outras linguagens mas não nesta
    allKeys.forEach(key => {
      if (!langKeySet.has(key)) {
        missingKeys.push(`${lang}:${key}`)
      }
    })

    // Chaves que existem nesta linguagem mas não em outras
    langKeys.forEach(key => {
      const existsInOtherLangs = languages.some(otherLang => {
        if (otherLang === lang) return true
        const otherKeys = extractKeys(translations[otherLang])
        return otherKeys.includes(key)
      })
      
      if (!existsInOtherLangs) {
        extraKeys.push(`${lang}:${key}`)
      }
    })
  })

  // Calcula cobertura
  const totalKeys = allKeys.size
  const translatedKeys = totalKeys - missingKeys.length
  const coverage = totalKeys > 0 ? (translatedKeys / totalKeys) * 100 : 100

  // Gera erros
  if (missingKeys.length > 0) {
    errors.push(`Chaves faltantes: ${missingKeys.length}`)
  }
  if (extraKeys.length > 0) {
    errors.push(`Chaves extras: ${extraKeys.length}`)
  }

  return {
    isValid: missingKeys.length === 0 && extraKeys.length === 0,
    missingKeys,
    extraKeys,
    coverage,
    errors
  }
}

/**
 * Gera relatório de cobertura para cada linguagem
 */
export function generateCoverageReport(
  translations: Record<Language, TranslationStructure>
): CoverageReport[] {
  const languages = Object.keys(translations) as Language[]
  const allKeys = new Set<string>()

  // Coleta todas as chaves possíveis
  languages.forEach(lang => {
    const keys = extractKeys(translations[lang])
    keys.forEach(key => allKeys.add(key))
  })

  return languages.map(lang => {
    const langKeys = extractKeys(translations[lang])
    const missingKeys = Array.from(allKeys).filter(key => !langKeys.includes(key))
    const coverage = allKeys.size > 0 ? (langKeys.length / allKeys.size) * 100 : 100

    let status: 'complete' | 'partial' | 'incomplete'
    if (coverage === 100) status = 'complete'
    else if (coverage >= 80) status = 'partial'
    else status = 'incomplete'

    return {
      language: lang,
      totalKeys: allKeys.size,
      translatedKeys: langKeys.length,
      missingKeys,
      coverage,
      status
    }
  })
}

/**
 * Carrega traduções de todas as linguagens
 */
export async function loadAllTranslations(): Promise<Record<Language, TranslationStructure>> {
  const languages: Language[] = ['pt', 'en', 'es']
  const translations: Record<Language, TranslationStructure> = {} as any

  for (const lang of languages) {
    try {
      const response = await fetch(`/locales/${lang}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load ${lang} translations`)
      }
      translations[lang] = await response.json()
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error)
      translations[lang] = {}
    }
  }

  return translations
}

/**
 * Valida traduções e retorna resultado
 */
export async function validateAllTranslations(): Promise<ValidationResult> {
  const translations = await loadAllTranslations()
  return validateTranslations(translations)
}

/**
 * Gera relatório completo de cobertura
 */
export async function generateFullCoverageReport(): Promise<CoverageReport[]> {
  const translations = await loadAllTranslations()
  return generateCoverageReport(translations)
}

/**
 * Verifica se uma chave específica existe em todas as linguagens
 */
export function checkKeyExists(
  translations: Record<Language, TranslationStructure>,
  key: string
): Record<Language, boolean> {
  const result: Record<Language, boolean> = {} as any

  Object.keys(translations).forEach(lang => {
    const keys = extractKeys(translations[lang as Language])
    result[lang as Language] = keys.includes(key)
  })

  return result
}

/**
 * Encontra chaves que estão sendo usadas no código mas não existem nas traduções
 */
export function findUnusedKeys(
  translations: Record<Language, TranslationStructure>,
  usedKeys: string[]
): string[] {
  const allTranslationKeys = new Set<string>()
  
  Object.values(translations).forEach(translation => {
    const keys = extractKeys(translation)
    keys.forEach(key => allTranslationKeys.add(key))
  })

  return usedKeys.filter(key => !allTranslationKeys.has(key))
}
