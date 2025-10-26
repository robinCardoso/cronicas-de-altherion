'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslationValidation } from '@/hooks/useTranslationValidation'
import { Language } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils/cn'

interface TranslationStatusProps {
  className?: string
  showDetails?: boolean
}

export function TranslationStatus({ className, showDetails = false }: TranslationStatusProps) {
  const { isValid, coverage, reports, missingKeys, isLoading, validate } = useTranslationValidation()
  const [isExpanded, setIsExpanded] = useState(showDetails)

  const getStatusColor = (coverage: number) => {
    if (coverage === 100) return 'text-green-400'
    if (coverage >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusIcon = (coverage: number) => {
    if (coverage === 100) return '✅'
    if (coverage >= 80) return '⚠️'
    return '❌'
  }

  const getLanguageFlag = (lang: Language) => {
    const flags = {
      pt: '🇧🇷',
      en: '🇺🇸',
      es: '🇪🇸'
    }
    return flags[lang]
  }

  if (isLoading) {
    return (
      <div className={cn('p-3 bg-gray-800 rounded-lg border border-gray-700', className)}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-gray-400">Validando traduções...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('bg-gray-800 rounded-lg border border-gray-700', className)}>
      {/* Header */}
      <div 
        className="p-3 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{getStatusIcon(coverage)}</span>
            <div>
              <h3 className="font-semibold text-white">
                Status das Traduções
              </h3>
              <p className={cn('text-sm', getStatusColor(coverage))}>
                {coverage.toFixed(1)}% completo
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                validate()
              }}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
            >
              Atualizar
            </button>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400"
            >
              ▼
            </motion.span>
          </div>
        </div>
      </div>

      {/* Detalhes */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-700 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Resumo Geral */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{coverage.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Cobertura Geral</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{reports.length}</div>
                  <div className="text-sm text-gray-400">Idiomas</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">{missingKeys.length}</div>
                  <div className="text-sm text-gray-400">Chaves Faltantes</div>
                </div>
              </div>

              {/* Status por Idioma */}
              <div>
                <h4 className="font-semibold text-white mb-3">Status por Idioma</h4>
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div key={report.language} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getLanguageFlag(report.language)}</span>
                        <div>
                          <div className="font-medium text-white capitalize">
                            {report.language}
                          </div>
                          <div className="text-sm text-gray-400">
                            {report.translatedKeys}/{report.totalKeys} chaves
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className={cn('font-semibold', getStatusColor(report.coverage))}>
                            {report.coverage.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-400 capitalize">
                            {report.status}
                          </div>
                        </div>
                        <span className="text-lg">{getStatusIcon(report.coverage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chaves Faltantes */}
              {missingKeys.length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-3">Chaves Faltantes</h4>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {missingKeys.map((key, index) => (
                      <div key={index} className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ações */}
              <div className="flex space-x-2">
                <button
                  onClick={validate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Validar Novamente
                </button>
                {!isValid && (
                  <button
                    onClick={() => {
                      // Aqui poderia abrir um modal para editar traduções
                      console.log('Abrir editor de traduções')
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Corrigir Traduções
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
