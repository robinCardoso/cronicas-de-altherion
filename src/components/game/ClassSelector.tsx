'use client'

import { useState } from 'react'
import { CharacterClass } from '@/types/game'
import { CLASSES } from '@/lib/game/character'
import { ClassDetailModal } from './ClassDetailModal'
import { cn } from '@/lib/utils/cn'
import { useTranslation } from '@/contexts/LanguageContext'

interface ClassSelectorProps {
  onSelectClass: (classe: CharacterClass) => void
  selectedClass?: CharacterClass
  className?: string
}

export function ClassSelector({ onSelectClass, selectedClass, className }: ClassSelectorProps) {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalClass, setModalClass] = useState<CharacterClass | null>(null)

  const classes = Object.entries(CLASSES) as [CharacterClass, typeof CLASSES[CharacterClass]][]

  const handleClassClick = (classe: CharacterClass) => {
    setModalClass(classe)
    setModalOpen(true)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-bold text-white mb-6">{t('game.selectClass')}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {classes.map(([classeKey, classeInfo]) => (
          <div
            key={classeKey}
            className={cn(
              'bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border-2 cursor-pointer',
              'transition-all duration-300 hover:scale-105 hover:shadow-lg',
              selectedClass === classeKey 
                ? 'border-blue-500 bg-blue-900/20' 
                : 'border-gray-700 hover:border-gray-600',
              className
            )}
            onClick={() => handleClassClick(classeKey)}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">
                {getClassIcon(classeKey)}
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">
                {t(`classes.${classeKey}.name`)}
              </h3>
              <p className="text-xs text-gray-400 mb-2">
                {classeInfo.atributosPrincipais.map(attr => t(`character.attributes.${attr}`)).join(' + ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Classe selecionada */}
      {selectedClass && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {t(`classes.${selectedClass}.name`)} Selecionado
              </h3>
              <p className="text-gray-300 mb-3">
                {t(`classes.${selectedClass}.description`)}
              </p>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Atributos principais:</p>
                <div className="flex gap-2">
                  {CLASSES[selectedClass].atributosPrincipais.map(attr => (
                    <span 
                      key={attr}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                    >
                      {t(`character.attributes.${attr}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleClassClick(selectedClass)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
{t('modal.selectClass')}
            </button>
          </div>
        </div>
      )}

      {/* Modal de detalhes */}
      <ClassDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedClass={modalClass}
        onSelectClass={onSelectClass}
      />
    </div>
  )
}

function getClassIcon(classe: CharacterClass): string {
  const icons: Record<CharacterClass, string> = {
    guerreiro: '⚔️',
    mago: '🧙‍♂️',
    ladino: '🗡️',
    arqueiro: '🏹',
    clerigo: '⛪',
    paladino: '🛡️',
    necromante: '💀',
    barbaro: '🪓',
    druida: '🌿',
    inventor: '⚙️'
  }
  return icons[classe]
}
