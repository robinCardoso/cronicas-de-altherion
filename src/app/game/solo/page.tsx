'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { SmartActionSuggestions } from '@/components/game/SmartActionSuggestions'
import { GameSettings } from '@/components/ui/GameSettings'
import { useGameSettings } from '@/hooks/useGameSettings'

export default function SoloGamePage() {
  const router = useRouter()
  const [currentStory, setCurrentStory] = useState('')
  const [customAction, setCustomAction] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const { settings, updateSettings, getApiSettings } = useGameSettings()
  const [character] = useState({
    nome: 'Herói',
    classe: 'guerreiro',
    level: 1,
    xp: 0,
    hp: 100,
    mp: 50
  })

  useEffect(() => {
    // Inicializar história inicial
    setCurrentStory('Você está em uma taverna escura e misteriosa. O som de conversas baixas ecoa pelas paredes de madeira. Um homem encapuzado se aproxima de sua mesa e sussurra: "Aventureiro, há rumores de um tesouro perdido nas Montanhas Sombrias. Você tem coragem para essa jornada?"')
  }, [])

  const handleAction = async (action: string) => {
    setIsLoading(true)
    
    try {
      console.log('🎮 Enviando ação para IA:', action)
      
      // Chamar API real da IA
      const response = await fetch('/api/generate-narrative', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          character: character,
          currentStory: currentStory,
          settings: getApiSettings()
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()
      console.log('🎮 Resposta da IA:', data)
      console.log('🎮 data.narrative existe?', !!data.narrative)
      console.log('🎮 data.narrative valor:', data.narrative)
      console.log('🎮 data.suggestions existe?', !!data.suggestions)
      console.log('🎮 data.suggestions valor:', data.suggestions)
      console.log('🎮 data.suggestions.length:', data.suggestions?.length)
      
      if (data.narrative) {
        console.log('🎮 Usando resposta da IA')
        setCurrentStory(prev => data.narrative + '\n\n' + '---\n\n' + prev)
        
        // Atualizar sugestões da IA se disponíveis
        if (data.suggestions && data.suggestions.length > 0) {
          console.log('🎮 Atualizando sugestões da IA:', data.suggestions)
          setAiSuggestions(data.suggestions)
        }
      } else {
        console.log('🎮 Usando fallback - narrative não encontrado')
        // Fallback se a IA falhar
        setCurrentStory(prev => `Você decide ${action.toLowerCase()}. A situação se desenvolve de forma interessante...` + '\n\n' + '---\n\n' + prev)
      }
    } catch (error) {
      console.error('❌ Erro ao chamar IA:', error)
      
      // Mostrar erro para o usuário sem fallback fixo
      setCurrentStory(prev => `❌ Erro: Não foi possível gerar resposta da IA. Tente novamente ou verifique as configurações.` + '\n\n' + '---\n\n' + prev)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomAction = async () => {
    if (!customAction.trim() || isLoading) return
    
    const action = customAction.trim()
    setCustomAction('') // Limpar input
    await handleAction(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleCustomAction()
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 p-4 border-b border-gray-700">
        <div className="w-full px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">⚔️</div>
              <div>
                <h1 className="text-xl font-bold text-white">Modo Solo</h1>
                <p className="text-gray-400 text-sm">Aventura Individual</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Character Stats */}
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-400">HP</p>
                  <p className="text-red-400 font-semibold">{character.hp}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">MP</p>
                  <p className="text-blue-400 font-semibold">{character.mp}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">XP</p>
                  <p className="text-yellow-400 font-semibold">{character.xp}</p>
                </div>
              </div>
              
                  <button
                    onClick={() => router.push('/game')}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    ← Voltar
                  </button>
                  
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    ⚙️ Configurações
                  </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Story Panel */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">📖 História</h2>
              
              {/* Loading indicator at top */}
              {isLoading && (
                <div className="mb-4 flex items-center space-x-2 text-blue-400">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                  <span>IA está pensando...</span>
                </div>
              )}
              
              {/* Story content - newest at top */}
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {currentStory ? currentStory.split('---').map((part, index) => (
                  <div key={index} className={index > 0 ? 'mt-6 pt-4 border-t border-gray-600' : ''}>
                    {part.trim()}
                  </div>
                )) : 'Carregando história inicial...'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="w-96 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700/50 p-3 flex flex-col space-y-3 overflow-hidden">
          <h3 className="text-base font-bold text-white">🎮 Ações</h3>
          
          {/* Quick Actions */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-gray-400">Ações Rápidas</h4>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => handleAction('Investigar')}
                disabled={isLoading}
                className="px-2 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
              >
                🔍 Investigar
              </button>
              <button
                onClick={() => handleAction('Conversar')}
                disabled={isLoading}
                className="px-2 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
              >
                💬 Conversar
              </button>
              <button
                onClick={() => handleAction('Atacar')}
                disabled={isLoading}
                className="px-2 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
              >
                ⚔️ Atacar
              </button>
              <button
                onClick={() => handleAction('Usar Magia')}
                disabled={isLoading}
                className="px-2 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
              >
                ✨ Magia
              </button>
            </div>
          </div>

              {/* Smart Action Suggestions */}
              <div className="h-48">
                <SmartActionSuggestions 
                  onActionSelect={handleAction}
                  isLoading={isLoading}
                  currentContext={currentStory}
                  aiSuggestions={aiSuggestions}
                  showSuggestions={settings.showSuggestions}
                />
              </div>

          {/* Custom Action */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-gray-400">Ação Personalizada</h4>
            <div className="flex space-x-1">
              <input
                type="text"
                placeholder="Descreva sua ação..."
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-2 py-1.5 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-xs"
                disabled={isLoading}
              />
              <button
                onClick={handleCustomAction}
                disabled={isLoading || !customAction.trim()}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white rounded transition-colors text-xs"
              >
                {isLoading ? '...' : 'Enviar'}
              </button>
            </div>
          </div>

          {/* Character Info */}
          <div className="bg-gray-700/50 rounded p-2">
            <h4 className="text-xs font-semibold text-white mb-1">👤 Personagem</h4>
            <div className="space-y-0.5 text-xs text-gray-300">
              <p><span className="text-gray-400">Nome:</span> {character.nome}</p>
              <p><span className="text-gray-400">Classe:</span> {character.classe}</p>
              <p><span className="text-gray-400">Nível:</span> {character.level}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Configurações */}
      <GameSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChange={updateSettings}
        currentSettings={settings}
      />
    </div>
  )
}
