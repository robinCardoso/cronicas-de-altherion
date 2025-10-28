'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function GamePage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState<'solo' | 'multiplayer' | null>(null)

  const handleModeSelect = (mode: 'solo' | 'multiplayer') => {
    setSelectedMode(mode)
    
    // Pequeno delay para animação antes de navegar
    setTimeout(() => {
      if (mode === 'solo') {
        router.push('/game/solo')
      } else {
        router.push('/game/multiplayer')
      }
    }, 300)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 p-4 border-b border-gray-700">
        <div className="w-full px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">⚔️</div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Crônicas de Altherion
                </h1>
                <p className="text-xs text-gray-400">RPG Narrativo com IA</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-gray-300">Herói</p>
                <p className="text-sm font-semibold text-white">Nível 1</p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
              >
                ← Menu
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
              Escolha sua Aventura
            </h2>
            <p className="text-lg text-gray-300">
              Como você quer viver suas crônicas épicas?
            </p>
          </div>

          {/* Game Mode Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Solo Mode */}
            <div 
              className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedMode === 'solo' ? 'scale-105' : ''
              }`}
              onClick={() => handleModeSelect('solo')}
            >
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 h-full">
                <div className="text-center">
                  <div className="text-5xl mb-3">⚔️</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Modo Solo</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Embarque em uma jornada épica solo, onde a IA cria aventuras únicas e personalizadas para você.
                  </p>
                  
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Narrativa IA Personalizada</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Sistema de Combate Completo</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Progressão Individual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multiplayer Mode */}
            <div 
              className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedMode === 'multiplayer' ? 'scale-105' : ''
              }`}
              onClick={() => handleModeSelect('multiplayer')}
            >
              <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 h-full">
                <div className="text-center">
                  <div className="text-5xl mb-3">👥</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Modo Multiplayer</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Junte-se a outros aventureiros em aventuras colaborativas com narrativa compartilhada.
                  </p>
                  
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Aventuras Colaborativas</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Chat em Tempo Real</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Sistema de Salas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600">
            <h3 className="text-lg font-bold text-center text-white mb-3">Próximas Funcionalidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Sistema de combate</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Narrativa com IA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Sistema de inventário</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Quests e missões</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>Sistema de progressão</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
