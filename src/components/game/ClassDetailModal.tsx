'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CharacterClass } from '@/types/game'
import { getClassDetails } from '@/lib/game/classDetails'
import { getRecommendedEquipments } from '@/lib/game/equipment'
import { getRecommendedSkills } from '@/lib/game/skills'
import { cn } from '@/lib/utils/cn'

interface ClassDetailModalProps {
  isOpen: boolean
  onClose: () => void
  selectedClass: CharacterClass | null
  onSelectClass: (classe: CharacterClass) => void
}

export function ClassDetailModal({ 
  isOpen, 
  onClose, 
  selectedClass, 
  onSelectClass 
}: ClassDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'abilities' | 'equipment' | 'lore'>('overview')

  if (!selectedClass) return null

  const classDetails = getClassDetails(selectedClass)
  const recommendedEquipments = getRecommendedEquipments(selectedClass)
  const recommendedSkills = getRecommendedSkills(selectedClass)

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'border-red-500 bg-red-900/20',
      blue: 'border-blue-500 bg-blue-900/20',
      green: 'border-green-500 bg-green-900/20',
      yellow: 'border-yellow-500 bg-yellow-900/20',
      purple: 'border-purple-500 bg-purple-900/20'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📋' },
    { id: 'abilities', label: 'Habilidades', icon: '⚡' },
    { id: 'equipment', label: 'Equipamentos', icon: '⚔️' },
    { id: 'lore', label: 'História', icon: '📖' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={cn(
              'fixed inset-4 z-50 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]',
              getColorClasses(classDetails.cor)
            )}
          >
            {/* Header */}
            <div className="relative p-4 border-b border-gray-700 flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{classDetails.icone}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{classDetails.nome}</h2>
                  <p className="text-gray-400 text-sm">{classDetails.descricao}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 flex-shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex-1 px-3 py-2 text-xs font-medium transition-colors',
                    activeTab === tab.id
                      ? 'text-white bg-gray-700 border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Imagem do personagem (placeholder) */}
                    <div className="relative">
                      <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="text-3xl mb-1">{classDetails.icone}</div>
                          <p className="text-sm">Imagem do {classDetails.nome}</p>
                          <p className="text-xs">(Será gerada por IA)</p>
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Descrição</h3>
                      <p className="text-gray-300 leading-relaxed">{classDetails.descricaoLonga}</p>
                    </div>

                    {/* Atributos */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Atributos Principais</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {classDetails.atributosPrincipais.map((attr) => (
                          <div key={attr} className="bg-gray-700 rounded-lg p-3">
                            <p className="text-sm text-gray-400 capitalize">{attr}</p>
                            <p className="text-lg font-semibold text-white">
                              +{classDetails.bonusInicial[attr] || 0}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Especialidades e Fraquezas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Especialidades</h3>
                        <div className="space-y-2">
                          {classDetails.especialidades.map((specialty, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="text-green-400">✓</span>
                              <span className="text-gray-300">{specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Fraquezas</h3>
                        <div className="space-y-2">
                          {classDetails.fraquezas.map((weakness, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="text-red-400">✗</span>
                              <span className="text-gray-300">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Estilo de Jogo */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Estilo de Jogo</h3>
                      <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4">
                        <p className="text-blue-200">{classDetails.estiloJogo}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'abilities' && (
                  <motion.div
                    key="abilities"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Habilidades Iniciais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedSkills.map((skillId) => (
                        <div key={skillId} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">⚡</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white capitalize">
                                {skillId.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-sm text-gray-400">Habilidade inicial</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'equipment' && (
                  <motion.div
                    key="equipment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Equipamentos Recomendados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recommendedEquipments.map((equipmentId) => (
                        <div key={equipmentId} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">⚔️</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white capitalize">
                                {equipmentId.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-sm text-gray-400">Equipamento inicial</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'lore' && (
                  <motion.div
                    key="lore"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">História e Origem</h3>
                    <div className="bg-gray-700 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {classDetails.historia}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Curiosidades</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Esta classe é ideal para jogadores que gostam de {classDetails.estiloJogo.toLowerCase()}</li>
                        <li>• Os {classDetails.nome.toLowerCase()}s são conhecidos por sua {classDetails.especialidades[0].toLowerCase()}</li>
                        <li>• Cuidado com {classDetails.fraquezas[0].toLowerCase()} - é sua maior vulnerabilidade</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  Clique em "Selecionar Classe" para confirmar sua escolha
                </div>
                <button
                  onClick={() => {
                    onSelectClass(selectedClass)
                    onClose()
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  Selecionar Classe
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
