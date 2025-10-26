'use client'

import { useState } from 'react'
import { Character, CharacterClass } from '@/types/game'
import { createCharacter, adicionarExperiencia } from '@/lib/game/character'
import { CharacterCard } from '@/components/game/CharacterCard'
import { AdvancedCharacterSelector } from '@/components/game/AdvancedCharacterSelector'
import { NarrativeWindow } from '@/components/game/NarrativeWindow'
import { Logo } from '@/components/ui/Logo'
import { MainMenu } from '@/components/ui/MainMenu'
import { StoryInitializer } from '@/components/game/StoryInitializer'

export default function Home() {
  const [character, setCharacter] = useState<Character | null>(null)
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null)
  const [characterName, setCharacterName] = useState('')
  const [showGame, setShowGame] = useState(false)
  const [showStoryInitializer, setShowStoryInitializer] = useState(false)

  const handleCreateCharacter = () => {
    if (!selectedClass || !characterName.trim()) return
    
    const newCharacter = createCharacter(characterName.trim(), selectedClass)
    setCharacter(newCharacter)
    setShowStoryInitializer(true)
  }

  const handleStoryComplete = (updatedCharacter: Character) => {
    setCharacter(updatedCharacter)
    setShowStoryInitializer(false)
  }

  const handleAddXP = () => {
    if (!character) return
    const updatedCharacter = adicionarExperiencia(character, 100)
    setCharacter(updatedCharacter)
  }

  const handleStartGame = () => {
    setShowGame(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-4 mb-4">
            <Logo size="xl" />
          </div>
          <p className="text-center text-gray-400 text-lg">
            Crie seu herói e embarque em aventuras épicas
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {!showGame ? (
          /* Menu Principal */
          <MainMenu onStartGame={handleStartGame} />
        ) : !character ? (
          /* Criação de Personagem */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Bem-vindo ao Mundo de Altherion
              </h2>
              <p className="text-gray-400 text-lg">
                Crie seu herói e comece sua aventura épica
              </p>
            </div>

            {/* Input do nome */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Nome do seu herói"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Seletor de classe */}
            <div className="h-[600px]">
              <AdvancedCharacterSelector
                onSelectClass={setSelectedClass}
                selectedClass={selectedClass || undefined}
              />
            </div>

            {/* Botão de criação */}
            <div className="text-center">
              <button
                onClick={handleCreateCharacter}
                disabled={!selectedClass || !characterName.trim()}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                Criar Personagem
              </button>
            </div>
          </div>
        ) : showStoryInitializer ? (
          /* Tutorial Narrativo */
          <StoryInitializer 
            character={character} 
            onStoryComplete={handleStoryComplete}
          />
        ) : (
          /* Personagem Criado */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Herói de Altherion
              </h2>
              <p className="text-gray-400 text-lg">
                Bem-vindo à aventura, {character.nome}!
              </p>
            </div>

            {/* Card do personagem */}
            <div className="max-w-2xl mx-auto">
              <CharacterCard character={character} />
            </div>

            {/* Interface de Narrativa */}
            <div className="max-w-4xl mx-auto">
              <NarrativeWindow 
                character={character} 
                onCharacterUpdate={setCharacter}
              />
            </div>

            {/* Ações de teste */}
            <div className="text-center space-x-4">
              <button
                onClick={handleAddXP}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Adicionar XP
              </button>
              <button
                onClick={() => setCharacter(null)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Criar Novo Personagem
              </button>
            </div>

            {/* Próximos passos */}
            <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Próximos Passos
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>• Sistema de personagens completo</p>
                <p>• Integração com IA para narrativa</p>
                <p>• Interface de narrativa interativa</p>
                <p>• Geração de imagens por IA</p>
                <p>• Sistema multiplayer</p>
                <p>• Banco de dados para persistência</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
