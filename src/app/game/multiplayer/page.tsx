'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MultiplayerGamePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'rooms' | 'create'>('rooms')
  const [rooms] = useState([
    { id: 1, name: 'Aventura Épica', players: 3, maxPlayers: 4, status: 'Jogando' },
    { id: 2, name: 'Dungeon dos Dragões', players: 1, maxPlayers: 6, status: 'Esperando' },
    { id: 3, name: 'Mistério da Torre', players: 5, maxPlayers: 5, status: 'Cheio' },
  ])

  const [newRoomName, setNewRoomName] = useState('')
  const [newRoomMaxPlayers, setNewRoomMaxPlayers] = useState(4)

  const handleJoinRoom = (roomId: number) => {
    // Simular entrada na sala
    alert(`Entrando na sala ${roomId}...`)
  }

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      alert(`Criando sala "${newRoomName}" para ${newRoomMaxPlayers} jogadores...`)
      setNewRoomName('')
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 p-4 border-b border-gray-700">
        <div className="w-full px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">👥</div>
              <div>
                <h1 className="text-xl font-bold text-white">Modo Multiplayer</h1>
                <p className="text-gray-400 text-sm">Aventuras Colaborativas</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/game')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'rooms'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🏠 Salas Disponíveis
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'create'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ➕ Criar Sala
            </button>
          </div>

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Salas de Aventura</h2>
              
              <div className="grid gap-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{room.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <span>👥</span>
                            <span>{room.players}/{room.maxPlayers} jogadores</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            room.status === 'Jogando' ? 'bg-green-600 text-white' :
                            room.status === 'Esperando' ? 'bg-yellow-600 text-white' :
                            'bg-red-600 text-white'
                          }`}>
                            {room.status}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleJoinRoom(room.id)}
                        disabled={room.status === 'Cheio'}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          room.status === 'Cheio'
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {room.status === 'Cheio' ? 'Sala Cheia' : 'Entrar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {rooms.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhuma sala disponível</h3>
                  <p className="text-gray-400">Crie uma nova sala para começar uma aventura!</p>
                </div>
              )}
            </div>
          )}

          {/* Create Room Tab */}
          {activeTab === 'create' && (
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Nova Sala</h2>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Nome da Sala
                    </label>
                    <input
                      type="text"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      placeholder="Ex: Aventura Épica"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Máximo de Jogadores
                    </label>
                    <select
                      value={newRoomMaxPlayers}
                      onChange={(e) => setNewRoomMaxPlayers(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value={2}>2 jogadores</option>
                      <option value={3}>3 jogadores</option>
                      <option value={4}>4 jogadores</option>
                      <option value={5}>5 jogadores</option>
                      <option value={6}>6 jogadores</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={handleCreateRoom}
                    disabled={!newRoomName.trim()}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Criar Sala
                  </button>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
                <h3 className="text-lg font-bold text-white mb-4">Funcionalidades da Sala</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Chat em tempo real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Narrativa compartilhada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Sistema de turnos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Combate colaborativo</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
