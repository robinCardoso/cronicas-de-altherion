'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/contexts/LanguageContext'
import { 
  validateAllTranslations, 
  generateFullCoverageReport,
  ValidationResult,
  CoverageReport 
} from '@/lib/utils/translationValidator'

interface UseTranslationValidationReturn {
  isValid: boolean
  coverage: number
  reports: CoverageReport[]
  missingKeys: string[]
  isLoading: boolean
  error: string | null
  validate: () => Promise<void>
  getLanguageStatus: (lang: Language) => CoverageReport | null
}

export function useTranslationValidation(): UseTranslationValidationReturn {
  const [isValid, setIsValid] = useState(false)
  const [coverage, setCoverage] = useState(0)
  const [reports, setReports] = useState<CoverageReport[]>([])
  const [missingKeys, setMissingKeys] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Valida traduções
      const validationResult: ValidationResult = await validateAllTranslations()
      
      // Gera relatórios de cobertura
      const coverageReports: CoverageReport[] = await generateFullCoverageReport()

      setIsValid(validationResult.isValid)
      setCoverage(validationResult.coverage)
      setReports(coverageReports)
      setMissingKeys(validationResult.missingKeys)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const getLanguageStatus = (lang: Language): CoverageReport | null => {
    return reports.find(report => report.language === lang) || null
  }

  // Valida automaticamente quando o hook é montado
  useEffect(() => {
    validate()
  }, [])

  return {
    isValid,
    coverage,
    reports,
    missingKeys,
    isLoading,
    error,
    validate,
    getLanguageStatus
  }
}
