'use client'

import { useState } from 'react'
import { AdvancedCharacterSelector } from '@/components/game/AdvancedCharacterSelector'
import { CharacterClass } from '@/types/game'
import { Character } from '@/types/game'
import { CLASSES } from '@/lib/game/character'
import { getClassDetails } from '@/lib/game/classDetails'
import { getRecommendedEquipments, getEquipment } from '@/lib/game/equipment'
import { getRecommendedSkills, getSkill } from '@/lib/game/skills'
import { useCharacterImage } from '@/hooks/useCharacterImage'
import { cn } from '@/lib/utils/cn'

export default function CreateCharacterPage() {
  const [characterName, setCharacterName] = useState('')
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null)
  const [character, setCharacter] = useState<Character | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'equipment' | 'abilities'>('overview')

  // Hook para gerar imagem do personagem
  const { imageUrl, isLoading: isImageLoading, error: imageError } = useCharacterImage({
    characterClass: selectedClass || 'guerreiro',
    characterName: undefined
  })

  const classes = Object.entries(CLASSES) as [CharacterClass, typeof CLASSES[CharacterClass]][]
  const currentClass = selectedClass || 'guerreiro'
  const classDetails = getClassDetails(currentClass)

  const getClassIcon = (classeKey: string) => {
    const icons: Record<string, string> = {
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
    return icons[classeKey] || '⚔️'
  }

  const handleCreateCharacter = () => {
    if (!selectedClass || !characterName.trim()) return

    const newCharacter: Character = {
      id: Date.now().toString(),
      nome: characterName.trim(),
      classe: selectedClass,
      level: 1,
      experiencia: 0,
      idade: 20,
      nascimento: Date.now(),
      atributos: {
        forca: 10,
        vitalidade: 10,
        inteligencia: 10,
        sabedoria: 10,
        agilidade: 10
      },
      equipamentos: [],
      habilidades: [],
      inventario: []
    }

    setCharacter(newCharacter)
    
    // Redirecionar para o jogo
    window.location.href = '/game'
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col px-2">
      {/* Header Compacto */}
      <header className="flex-shrink-0 p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-xl">⚔️</div>
            <div>
              <h1 className="text-lg font-bold text-white">Criação de Personagem</h1>
              <p className="text-gray-400 text-xs">Crônicas de Altherion</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </header>

      <main className="flex-1 w-full min-h-0 flex">
        {/* Layout Horizontal - 3 Colunas */}
        <div className="flex-1 flex">
          
          {/* Coluna 1 - Nome + Classes */}
          <div className="w-1/3 border-r border-gray-700 bg-gray-800/30 flex flex-col">
            
            {/* Input Nome */}
            <div className="p-3 border-b border-gray-700">
              <h2 className="text-sm font-semibold text-white mb-2">Nome do Herói</h2>
              <input
                type="text"
                placeholder="Digite o nome..."
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Lista de Classes - 2 Colunas */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white mb-2">Classes Disponíveis</h3>
                <div className="grid grid-cols-2 gap-1">
                  {classes.map(([classeKey, classeInfo]) => (
                    <button
                      key={classeKey}
                      onClick={() => setSelectedClass(classeKey)}
                      className={cn(
                        'p-2 rounded border transition-all duration-300 text-left',
                        'hover:scale-105 hover:shadow-lg',
                        selectedClass === classeKey
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      )}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div className="text-xl">{getClassIcon(classeKey)}</div>
                        <div className="text-center">
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
          </div>


          {/* Coluna 2 - Preview da Imagem */}
          <div className="w-1/3 border-r border-gray-700 bg-gray-800/20 flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative w-full h-full max-w-sm">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 flex items-center justify-center shadow-2xl overflow-hidden">
                  {isImageLoading ? (
                    <div className="text-center text-gray-300">
                      <div className="animate-spin text-3xl mb-2">⚔️</div>
                      <div className="text-xs text-blue-400">Gerando imagem...</div>
                    </div>
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${classDetails.nome} - Imagem gerada por IA`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center text-gray-300">
                      <div className="text-5xl mb-2">{classDetails.icone}</div>
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
          </div>

          {/* Coluna 3 - Detalhes da Classe */}
          <div className="w-1/3 flex flex-col">
            <div className="flex-1 bg-gray-800/30 p-3 overflow-y-auto">
              {/* Menu de Seleção */}
              <div className="flex space-x-1 mb-3">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded transition-colors',
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
                    'px-2 py-1 text-xs font-medium rounded transition-colors',
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
                    'px-2 py-1 text-xs font-medium rounded transition-colors',
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
                    'px-2 py-1 text-xs font-medium rounded transition-colors',
                    activeTab === 'abilities'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  )}
                >
                  ⚡ Habilidades
                </button>
              </div>

              {/* Conteúdo dos Menus */}
              {activeTab === 'overview' && (
                <div className="space-y-3">
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
                            <span className="text-green-400 text-xs">✓</span>
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
                            <span className="text-red-400 text-xs">✗</span>
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
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white mb-2">Estatísticas Detalhadas</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(classDetails.bonusInicial).map(([attr, bonus]) => {
                        const attrNames: Record<string, string> = {
                          forca: 'Força',
                          vitalidade: 'Vitalidade',
                          inteligencia: 'Inteligência',
                          sabedoria: 'Sabedoria',
                          agilidade: 'Agilidade'
                        }
                        return (
                          <div key={attr} className="bg-gray-700 rounded p-2">
                            <p className="text-xs text-gray-400">{attrNames[attr] || attr}</p>
                            <p className="text-sm font-semibold text-white">+{bonus}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
              )}

              {activeTab === 'equipment' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white mb-2">Equipamentos Recomendados</h4>
                    <div className="space-y-2">
                      {getRecommendedEquipments(currentClass).map((equipmentId, index) => {
                        const equipment = getEquipment(equipmentId)
                        if (!equipment) return null
                        return (
                          <div key={index} className="bg-gray-700 rounded p-2">
                            <p className="text-xs text-white font-semibold">{equipment.nome}</p>
                            <p className="text-xs text-gray-400">{equipment.tipo}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
              )}

              {activeTab === 'abilities' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white mb-2">Habilidades Iniciais</h4>
                    <div className="space-y-2">
                      {getRecommendedSkills(currentClass).map((skillId, index) => {
                        const skill = getSkill(skillId)
                        if (!skill) return null
                        return (
                          <div key={index} className="bg-gray-700 rounded p-2">
                            <p className="text-xs text-white font-semibold">{skill.nome}</p>
                            <p className="text-xs text-gray-400">{skill.descricao}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer com Botão */}
      <footer className="flex-shrink-0 p-3 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {selectedClass ? `${CLASSES[selectedClass].nome} selecionado` : 'Selecione uma classe'}
          </div>
          <button
            onClick={handleCreateCharacter}
            disabled={!selectedClass || !characterName.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Criar Personagem
          </button>
        </div>
      </footer>
    </div>
  )
}
