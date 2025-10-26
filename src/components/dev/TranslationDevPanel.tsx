'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslationValidation } from '@/hooks/useTranslationValidation'
import { Language } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils/cn'

interface TranslationDevPanelProps {
  className?: string
}

export function TranslationDevPanel({ className }: TranslationDevPanelProps) {
  const { isValid, coverage, reports, missingKeys, isLoading, validate } = useTranslationValidation()
  const [isOpen, setIsOpen] = useState(false)

  // Só mostra em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const getStatusColor = (coverage: number) => {
    if (coverage === 100) return 'bg-green-500'
    if (coverage >= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getLanguageFlag = (lang: Language) => {
    const flags = {
      pt: '🇧🇷',
      en: '🇺🇸',
      es: '🇪🇸'
    }
    return flags[lang]
  }

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white font-bold transition-colors',
          getStatusColor(coverage),
          className
        )}
        title={`Traduções: ${coverage.toFixed(1)}%`}
      >
        {isLoading ? (
          <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <span className="text-lg">
            {coverage === 100 ? '✅' : coverage >= 80 ? '⚠️' : '❌'}
          </span>
        )}
      </motion.button>

      {/* Painel de desenvolvimento */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Painel */}
            <motion.div
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-4 right-4 bottom-4 w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    🌍 Dev: Traduções
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-4 space-y-4 overflow-y-auto h-full">
                {/* Status geral */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Status Geral</h3>
                    <button
                      onClick={validate}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      Atualizar
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Cobertura:</span>
                      <span className={cn(
                        'font-semibold',
                        coverage === 100 ? 'text-green-400' :
                        coverage >= 80 ? 'text-yellow-400' : 'text-red-400'
                      )}>
                        {coverage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={cn(
                        'font-semibold',
                        isValid ? 'text-green-400' : 'text-red-400'
                      )}>
                        {isValid ? '✅ Válido' : '❌ Inválido'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Chaves faltantes:</span>
                      <span className="text-red-400 font-semibold">
                        {missingKeys.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status por idioma */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Por Idioma</h3>
                  <div className="space-y-2">
                    {reports.map((report) => (
                      <div key={report.language} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getLanguageFlag(report.language)}</span>
                          <span className="text-white font-medium capitalize">
                            {report.language}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            'text-sm font-semibold',
                            report.coverage === 100 ? 'text-green-400' :
                            report.coverage >= 80 ? 'text-yellow-400' : 'text-red-400'
                          )}>
                            {report.coverage.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-400">
                            {report.translatedKeys}/{report.totalKeys}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chaves faltantes */}
                {missingKeys.length > 0 && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-3">Chaves Faltantes</h3>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {missingKeys.map((key, index) => (
                        <div key={index} className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
                          {key}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ações rápidas */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Ações Rápidas</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(missingKeys.join('\n'))
                        alert('Chaves faltantes copiadas para a área de transferência!')
                      }}
                      className="w-full px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors"
                    >
                      📋 Copiar Chaves Faltantes
                    </button>
                    <button
                      onClick={() => {
                        const report = reports.map(r => 
                          `${r.language}: ${r.coverage.toFixed(1)}% (${r.translatedKeys}/${r.totalKeys})`
                        ).join('\n')
                        navigator.clipboard.writeText(report)
                        alert('Relatório copiado para a área de transferência!')
                      }}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      📊 Copiar Relatório
                    </button>
                  </div>
                </div>

                {/* Comandos úteis */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Comandos Úteis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-gray-700 p-2 rounded font-mono text-gray-300">
                      npm run validate-translations
                    </div>
                    <div className="bg-gray-700 p-2 rounded font-mono text-gray-300">
                      npm run check-i18n
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
