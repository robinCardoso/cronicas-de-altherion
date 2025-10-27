'use client'

import { useState } from 'react'

export default function GamePage() {
  const [character] = useState({
    nome: 'Herói',
    classe: 'guerreiro',
    level: 1,
    xp: 0
  })

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col px-2">
      {/* Header */}
      <header className="flex-shrink-0 p-4 border-b border-gray-700">
        <div className="w-full px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">⚔️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Crônicas de Altherion</h1>
                <p className="text-gray-400 text-sm">RPG Narrativo com IA</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">{character.nome}</p>
                <p className="text-gray-400 text-sm">Nível {character.level}</p>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                ← Menu
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full min-h-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            🎮 Jogo em Desenvolvimento
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            A aventura de {character.nome} começará em breve!
          </p>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Próximas Funcionalidades</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li>• Sistema de combate</li>
              <li>• Narrativa com IA</li>
              <li>• Sistema de inventário</li>
              <li>• Quests e missões</li>
              <li>• Sistema de progressão</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
