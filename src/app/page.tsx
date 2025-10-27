'use client'

import { useState } from 'react'
import { MainMenu } from '@/components/ui/MainMenu'
import { Logo } from '@/components/ui/Logo'

export default function HomePage() {
  const [showGame, setShowGame] = useState(false)

  const handleStartGame = () => {
    // Redirecionar para página de criação de personagem
    window.location.href = '/create-character'
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col px-2">
      {/* Header */}
      <header className="flex-shrink-0 p-6 border-b border-gray-700">
        <div className="w-full px-6">
          <div className="flex flex-col items-center space-y-4 mb-4">
            <Logo size="xl" />
            <p className="text-gray-400 text-center">
              Crie seu herói e embarque em aventuras épicas
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full min-h-0">
        <MainMenu onStartGame={handleStartGame} />
      </main>
    </div>
  )
}