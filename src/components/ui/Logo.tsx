'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useTranslation } from '@/contexts/LanguageContext'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function Logo({ size = 'lg', className, animated = true }: LogoProps) {
  const { t } = useTranslation()
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  }

  const iconSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  return (
    <motion.div
      className={cn('flex items-center justify-center space-x-3', className)}
      initial={animated ? { opacity: 0, y: -20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={animated ? { duration: 0.8, ease: "easeOut" } : {}}
    >
      {/* Ícone animado */}
      <motion.div
        className={cn('text-blue-400', iconSizes[size])}
        animate={animated ? {
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={animated ? {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        } : {}}
      >
        ⚔️
      </motion.div>

      {/* Texto do logo */}
      <div className="text-center">
        <motion.h1
          className={cn(
            'font-bold text-white leading-tight',
            sizeClasses[size]
          )}
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={animated ? { duration: 0.8, delay: 0.2 } : {}}
        >
{t('game.title')}
        </motion.h1>
        
        <motion.p
          className={cn(
            'text-gray-300 font-medium',
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          )}
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={animated ? { duration: 0.8, delay: 0.4 } : {}}
        >
{t('game.subtitle')}
        </motion.p>
      </div>

      {/* Ícone animado */}
      <motion.div
        className={cn('text-purple-400', iconSizes[size])}
        animate={animated ? {
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={animated ? {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 1
        } : {}}
      >
        🏰
      </motion.div>
    </motion.div>
  )
}
