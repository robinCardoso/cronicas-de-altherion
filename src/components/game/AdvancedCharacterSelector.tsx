'use client'

import { useState } from 'react'
import { CharacterClass } from '@/types/game'
import { CLASSES } from '@/lib/game/character'
import { getClassDetails } from '@/lib/game/classDetails'
import { getRecommendedEquipments } from '@/lib/game/equipment'
import { getRecommendedSkills } from '@/lib/game/skills'
import { cn } from '@/lib/utils/cn'
import { useCharacterImage } from '@/hooks/useCharacterImage'

interface AdvancedCharacterSelectorProps {
  onSelectClass: (classe: CharacterClass) => void
  selectedClass?: CharacterClass
  className?: string
}

export function AdvancedCharacterSelector({ 
  onSelectClass, 
  selectedClass, 
  className 
}: AdvancedCharacterSelectorProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'equipment' | 'abilities'>('overview')
  
  // Hook para gerar imagem do personagem
  const { imageUrl, isLoading: isImageLoading, error: imageError } = useCharacterImage({
    characterClass: selectedClass || 'guerreiro',
    characterName: undefined // Pode ser passado como prop se necessário
  })
  
  const classes = Object.entries(CLASSES) as [CharacterClass, typeof CLASSES[CharacterClass]][]
  const currentClass = selectedClass || 'guerreiro'
  const classDetails = getClassDetails(currentClass)
  const recommendedEquipments = getRecommendedEquipments(currentClass)
  const recommendedSkills = getRecommendedSkills(currentClass)

  const getClassIcon = (classe: CharacterClass): string => {
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

  return (
    <div className={cn('w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 shadow-2xl overflow-hidden', 
      getColorClasses(classDetails.cor), className)}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Selecione sua Classe</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              📋 Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                activeTab === 'stats'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              📊 Stats
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                activeTab === 'equipment'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              ⚔️ Equipamento
            </button>
            <button
              onClick={() => setActiveTab('abilities')}
              className={cn(
                'px-3 py-1 text-xs font-medium rounded transition-colors',
                activeTab === 'abilities'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              ⚡ Habilidades
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex flex-1 min-h-0">
        
        {/* Left Column - Class Selection */}
        <div className="w-1/4 border-r border-gray-700 bg-gray-800/30 flex flex-col">
          <div className="p-2 flex-shrink-0">
            <h3 className="text-sm font-semibold text-white mb-2">Classes Disponíveis</h3>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-2">
            <div className="space-y-1">
              {classes.map(([classeKey, classeInfo]) => (
                <button
                  key={classeKey}
                  onClick={() => onSelectClass(classeKey)}
                  className={cn(
                    'w-full p-2 rounded border transition-all duration-300 text-left',
                    'hover:scale-105 hover:shadow-lg',
                    selectedClass === classeKey
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">{getClassIcon(classeKey)}</div>
                    <div>
                      <h4 className="font-semibold text-white text-xs">
                        {CLASSES[classeKey as CharacterClass].nome}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {classeInfo.atributosPrincipais.map(attr => {
                          const attrNames: Record<string, string> = {
                            forca: 'Força',
                            vitalidade: 'Vitalidade',
                            inteligencia: 'Inteligência',
                            sabedoria: 'Sabedoria',
                            agilidade: 'Agilidade'
                          }
                          return attrNames[attr] || attr
                        }).join(' + ')}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - Character Preview */}
        <div className="w-1/2 border-r border-gray-700 bg-gray-800/20 flex flex-col">
          {/* Character Image/Model */}
          <div className="flex-1 p-3 flex items-center justify-center min-h-0">
            <div className="relative w-full h-full max-w-sm">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 flex items-center justify-center shadow-2xl overflow-hidden">
                {isImageLoading ? (
                  <div className="text-center text-gray-300">
                    <div className="animate-spin text-4xl mb-4">⚔️</div>
                    <div className="text-sm text-blue-400">Gerando imagem...</div>
                  </div>
                ) : imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={`${classDetails.nome} - Imagem gerada por IA`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-gray-300">
                    <div className="text-6xl mb-2">{classDetails.icone}</div>
                    <h3 className="text-lg font-bold text-white mb-1">{classDetails.nome}</h3>
                    <p className="text-xs text-gray-400 mb-2">{classDetails.descricao}</p>
                    <div className="text-xs text-gray-500">
                      {imageError ? 'Erro ao gerar imagem' : 'Imagem será gerada por IA'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Character Stats Preview */}
          <div className="p-2 border-t border-gray-700 bg-gray-800/30">
            <h4 className="text-sm font-semibold text-white mb-2">Atributos Principais</h4>
            <div className="grid grid-cols-2 gap-2">
              {classDetails.atributosPrincipais.map((attr) => (
                <div key={attr} className="bg-gray-700 rounded p-2">
                  <p className="text-xs text-gray-400 capitalize">{attr}</p>
                  <p className="text-sm font-semibold text-white">
                    +{classDetails.bonusInicial[attr] || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Class Details */}
        <div className="w-1/4 bg-gray-800/30 flex flex-col">
          <div className="flex-1 overflow-y-auto p-2">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Descrição</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {classDetails.descricaoLonga}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Especialidades</h4>
                  <div className="space-y-1">
                    {classDetails.especialidades.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-xs text-gray-300">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Fraquezas</h4>
                  <div className="space-y-1">
                    {classDetails.fraquezas.map((weakness, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-red-400">✗</span>
                        <span className="text-xs text-gray-300">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">Estilo de Jogo</h4>
                  <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-2">
                    <p className="text-xs text-blue-200">{classDetails.estiloJogo}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Atributos Detalhados</h4>
                <div className="space-y-2">
                  {Object.entries(classDetails.bonusInicial).map(([attr, bonus]) => (
                    <div key={attr} className="flex justify-between items-center bg-gray-700 rounded p-2">
                      <span className="text-sm text-gray-300 capitalize">{attr}</span>
                      <span className="text-sm font-semibold text-white">+{bonus}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'equipment' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Equipamentos Iniciais</h4>
                <div className="space-y-2">
                  {recommendedEquipments.map((equipmentId) => (
                    <div key={equipmentId} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                          <span className="text-white text-sm">⚔️</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white text-sm capitalize">
                            {equipmentId.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <p className="text-xs text-gray-400">Equipamento inicial</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'abilities' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Habilidades Iniciais</h4>
                <div className="space-y-2">
                  {recommendedSkills.map((skillId) => (
                    <div key={skillId} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-sm">⚡</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white text-sm capitalize">
                            {skillId.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <p className="text-xs text-gray-400">Habilidade inicial</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-center">
          <div className="text-xs text-gray-400">
            {selectedClass ? `${CLASSES[selectedClass].nome} selecionado` : 'Selecione uma classe'}
          </div>
        </div>
      </div>
    </div>
  )
}
