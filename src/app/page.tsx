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
            {/* Seção de Diferencial do Jogo Narrativo */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/30 mb-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                  🎭 Por que um RPG Narrativo?
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Descubra a magia de criar sua própria história com inteligência artificial
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Coluna Esquerda */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🧠</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Você é o Autor da História</h3>
                      <p className="text-gray-300">
                        Nos jogos tradicionais, você consome histórias. Aqui, você <strong>escreve o próprio destino</strong>.
                        Cada ação gera consequências únicas através da IA.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🗺️</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Mundo Infinito</h3>
                      <p className="text-gray-300">
                        Sem limitações de gráficos ou mapas. Apenas <strong>imaginação + IA</strong> criam aventuras infinitas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🕰️</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Imersão Psicológica</h3>
                      <p className="text-gray-300">
                        Sinta-se dentro de um <strong>livro vivo</strong> onde suas escolhas moldam o mundo ao redor.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🧙‍♂️</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">IA que Reage a Você</h3>
                      <p className="text-gray-300">
                        O mundo "ouve" suas ações e se adapta. NPCs lembram do que você fez.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">⚡</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Leve e Acessível</h3>
                      <p className="text-gray-300">
                        Roda no navegador, sem GPU. Milhares de jogadores simultâneos sem problemas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">🎨</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Arte Gerada por IA</h3>
                      <p className="text-gray-300">
                        Imagens únicas para cada cena, criadas dinamicamente pela IA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparação Visual */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-2xl font-bold text-center text-white mb-6">Comparação: Tradicional vs Narrativo</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎮</div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Jogos Tradicionais</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• História pré-programada</li>
                      <li>• Liberdade limitada</li>
                      <li>• Rejogabilidade média</li>
                      <li>• Custo alto de produção</li>
                      <li>• Imersão apenas visual</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">✨</div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Crônicas de Altherion</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• História viva e mutável</li>
                      <li>• Liberdade infinita</li>
                      <li>• Rejogabilidade infinita</li>
                      <li>• Escalável e leve</li>
                      <li>• Imersão emocional profunda</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <p className="text-lg text-purple-300 mb-4">
                  <strong>Pronto para escrever sua própria saga épica?</strong>
                </p>
                <div className="flex justify-center space-x-2 text-2xl">
                  <span>⚔️</span>
                  <span>🧙‍♂️</span>
                  <span>🐉</span>
                  <span>🏰</span>
                  <span>✨</span>
                </div>
              </div>
            </div>
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
