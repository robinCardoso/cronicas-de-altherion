'use client'

import { Character } from '@/types/game'
import { getClassInfo } from '@/lib/game/character'
import { cn } from '@/lib/utils/cn'

interface CharacterCardProps {
  character: Character
  className?: string
}

export function CharacterCard({ character, className }: CharacterCardProps) {
  const classInfo = getClassInfo(character.classe)

  return (
    <div className={cn(
      'bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700',
      'shadow-lg hover:shadow-xl transition-all duration-300',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{character.nome}</h3>
          <p className="text-sm text-gray-400">{classInfo.nome}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-blue-400">Nível {character.level}</p>
          <p className="text-sm text-gray-400">{character.experiencia} XP</p>
        </div>
      </div>

      {/* Atributos */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-700 rounded p-2">
          <p className="text-xs text-gray-400">Força</p>
          <p className="text-lg font-semibold text-red-400">{character.atributos.forca}</p>
        </div>
        <div className="bg-gray-700 rounded p-2">
          <p className="text-xs text-gray-400">Inteligência</p>
          <p className="text-lg font-semibold text-blue-400">{character.atributos.inteligencia}</p>
        </div>
        <div className="bg-gray-700 rounded p-2">
          <p className="text-xs text-gray-400">Agilidade</p>
          <p className="text-lg font-semibold text-green-400">{character.atributos.agilidade}</p>
        </div>
        <div className="bg-gray-700 rounded p-2">
          <p className="text-xs text-gray-400">Vitalidade</p>
          <p className="text-lg font-semibold text-yellow-400">{character.atributos.vitalidade}</p>
        </div>
        <div className="bg-gray-700 rounded p-2 col-span-2">
          <p className="text-xs text-gray-400">Sabedoria</p>
          <p className="text-lg font-semibold text-purple-400">{character.atributos.sabedoria}</p>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="space-y-2 text-sm text-gray-300">
        <p>Idade: {character.idade} anos</p>
        <p>Habilidades: {character.habilidades.length}</p>
        <p>Equipamentos: {character.equipamentos.length}</p>
      </div>

      {/* Descrição da classe */}
      <div className="mt-4 p-3 bg-gray-700 rounded">
        <p className="text-sm text-gray-300">{classInfo.descricao}</p>
      </div>
    </div>
  )
}
