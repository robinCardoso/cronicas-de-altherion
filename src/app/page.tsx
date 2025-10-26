'use client'

import { useState } from 'react'
import { Character, CharacterClass } from '@/types/game'
import { createCharacter, adicionarExperiencia } from '@/lib/game/character'
import { CharacterCard } from '@/components/game/CharacterCard'
import { AdvancedCharacterSelector } from '@/components/game/AdvancedCharacterSelector'
import { NarrativeWindow } from '@/components/game/NarrativeWindow'
import { Logo } from '@/components/ui/Logo'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { useTranslation } from '@/contexts/LanguageContext'
import { TranslationDevPanel } from '@/components/dev/TranslationDevPanel'

export default function Home() {
  const { t } = useTranslation()
  const [character, setCharacter] = useState<Character | null>(null)
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null)
  const [characterName, setCharacterName] = useState('')

  const handleCreateCharacter = () => {
    if (!selectedClass || !characterName.trim()) return
    
    const newCharacter = createCharacter(characterName.trim(), selectedClass)
    setCharacter(newCharacter)
  }

  const handleAddXP = () => {
    if (!character) return
    const updatedCharacter = adicionarExperiencia(character, 100)
    setCharacter(updatedCharacter)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center space-y-4 mb-4">
            <Logo size="xl" />
            <LanguageSelector size="md" />
          </div>
          <p className="text-center text-gray-400 text-lg">
            {t('game.description')}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {!character ? (
          /* Criação de Personagem */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t('game.welcome')}
              </h2>
              <p className="text-gray-400 text-lg">
                {t('game.createHero')}
              </p>
            </div>

            {/* Input do nome */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder={t('game.heroName')}
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
{t('game.createCharacter')}
              </button>
            </div>
          </div>
        ) : (
          /* Personagem Criado */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t('game.heroOfAltherion')}
              </h2>
              <p className="text-gray-400 text-lg">
                {t('game.welcomeAdventure', { name: character.nome })}
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
{t('game.addXP')}
              </button>
              <button
                onClick={() => setCharacter(null)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
{t('game.createNewCharacter')}
              </button>
            </div>

            {/* Próximos passos */}
            <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('nextSteps.title')}
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>{t('nextSteps.characterSystem')}</p>
                <p>{t('nextSteps.aiIntegration')}</p>
                <p>{t('nextSteps.narrativeInterface')}</p>
                <p>{t('nextSteps.imageGeneration')}</p>
                <p>{t('nextSteps.multiplayer')}</p>
                <p>{t('nextSteps.database')}</p>
              </div>
            </div>
        </div>
        )}
      </main>

      {/* Painel de desenvolvimento para traduções */}
      <TranslationDevPanel />
    </div>
  )
}
