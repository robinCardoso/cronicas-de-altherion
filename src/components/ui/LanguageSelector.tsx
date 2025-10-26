'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, Language } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils/cn'

interface LanguageSelectorProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LanguageSelector({ className, size = 'md' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3'
  }

  return (
    <div className={cn('relative', className)}>
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors',
          sizeClasses[size]
        )}
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-white font-medium">{currentLanguage?.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          ▼
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-20 min-w-[150px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg',
                    language === lang.code ? 'bg-gray-700 text-blue-400' : 'text-white'
                  )}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-blue-400">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
