'use client'

import { useState, useEffect } from 'react'

interface ActionSuggestion {
  id: string
  text: string
  icon: string
  color: string
}

interface SmartActionSuggestionsProps {
  onActionSelect: (action: string) => void
  isLoading: boolean
  currentContext?: string
  aiSuggestions?: string[]
  showSuggestions?: boolean
}

export function SmartActionSuggestions({ onActionSelect, isLoading, currentContext, aiSuggestions, showSuggestions: propShowSuggestions }: SmartActionSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(propShowSuggestions !== false)

  // Se a prop showSuggestions mudou, atualizar o estado local
  useEffect(() => {
    setShowSuggestions(propShowSuggestions !== false)
  }, [propShowSuggestions])

  // Usar sugestões da IA se disponíveis, senão usar sugestões contextuais
  const getContextualSuggestions = (): ActionSuggestion[] => {
    console.log('🎯 SmartActionSuggestions - aiSuggestions:', aiSuggestions)
    console.log('🎯 SmartActionSuggestions - aiSuggestions.length:', aiSuggestions?.length)
    
    // Se temos sugestões da IA, usar elas
    if (aiSuggestions && aiSuggestions.length > 0) {
      const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600']
      const icons = ['🔍', '💬', '⚔️', '✨']
      
      return aiSuggestions.map((suggestion, index) => ({
        id: `ai-suggestion-${index}`,
        text: suggestion,
        icon: icons[index] || '🎯',
        color: colors[index] || 'bg-gray-600'
      }))
    }

    // Senão, usar sugestões contextuais baseadas no texto
    const context = currentContext?.toLowerCase() || ''
    
    // Se a figura misteriosa desapareceu ou foi embora
    if (context.includes('desaparece') || context.includes('desapareceu') || context.includes('foi embora') || context.includes('saiu') || context.includes('deixou')) {
      return [
        { id: 'examine-parchment', text: 'Examinar o pergaminho', icon: '📜', color: 'bg-yellow-600' },
        { id: 'investigate-door', text: 'Investigar a porta escura', icon: '🚪', color: 'bg-purple-600' },
        { id: 'search-tavern', text: 'Procurar na taverna', icon: '🔍', color: 'bg-blue-600' },
        { id: 'ask-tavern-keeper', text: 'Perguntar ao tavernkeeper', icon: '👨‍🍳', color: 'bg-green-600' }
      ]
    }
    
    // Se menciona capuz ou figura misteriosa (mas ainda está presente)
    if ((context.includes('capuz') || context.includes('figura') || context.includes('misterioso')) && 
        !context.includes('desaparece') && !context.includes('desapareceu') && !context.includes('foi embora')) {
      return [
        { id: 'ask-identity', text: 'Quem é você?', icon: '❓', color: 'bg-blue-600' },
        { id: 'ask-reason', text: 'Por que está usando capuz?', icon: '🎭', color: 'bg-purple-600' },
        { id: 'ask-treasure', text: 'Conte-me sobre o tesouro', icon: '💰', color: 'bg-yellow-600' },
        { id: 'investigate-tavern', text: 'Investigar a taverna', icon: '🔍', color: 'bg-green-600' }
      ]
    }
    
    // Se menciona pergaminho ou documento deixado
    if (context.includes('pergaminho') || context.includes('documento') || context.includes('papel') || context.includes('carta')) {
      return [
        { id: 'read-parchment', text: 'Ler o pergaminho', icon: '📖', color: 'bg-yellow-600' },
        { id: 'examine-writing', text: 'Examinar a escrita', icon: '🔍', color: 'bg-blue-600' },
        { id: 'check-symbols', text: 'Verificar símbolos', icon: '🔮', color: 'bg-purple-600' },
        { id: 'keep-parchment', text: 'Guardar o pergaminho', icon: '🎒', color: 'bg-green-600' }
      ]
    }
    
    // Se menciona porta ou entrada
    if (context.includes('porta') || context.includes('entrada') || context.includes('passagem')) {
      return [
        { id: 'examine-door', text: 'Examinar a porta', icon: '🚪', color: 'bg-purple-600' },
        { id: 'try-open', text: 'Tentar abrir', icon: '🔓', color: 'bg-blue-600' },
        { id: 'listen-door', text: 'Escutar atrás da porta', icon: '👂', color: 'bg-green-600' },
        { id: 'check-lock', text: 'Verificar a fechadura', icon: '🔐', color: 'bg-yellow-600' }
      ]
    }
    
    // Se menciona tesouro ou montanhas
    if (context.includes('tesouro') || context.includes('montanha') || context.includes('sombria')) {
      return [
        { id: 'ask-location', text: 'Onde fica o tesouro?', icon: '🗺️', color: 'bg-blue-600' },
        { id: 'ask-dangers', text: 'Quais os perigos?', icon: '⚠️', color: 'bg-red-600' },
        { id: 'ask-rewards', text: 'Qual a recompensa?', icon: '💎', color: 'bg-yellow-600' },
        { id: 'accept-quest', text: 'Aceito a missão', icon: '⚔️', color: 'bg-green-600' }
      ]
    }
    
    // Se menciona animais ou cavernas
    if (context.includes('animal') || context.includes('caverna') || context.includes('criatura')) {
      return [
        { id: 'ask-animals', text: 'Que animais existem?', icon: '🐺', color: 'bg-orange-600' },
        { id: 'ask-safety', text: 'É seguro entrar?', icon: '🛡️', color: 'bg-blue-600' },
        { id: 'prepare-gear', text: 'Preciso de equipamentos?', icon: '🎒', color: 'bg-purple-600' },
        { id: 'ask-guide', text: 'Você pode me guiar?', icon: '🧭', color: 'bg-green-600' }
      ]
    }
    
    // Sugestões padrão
    return [
      { id: 'investigate', text: 'Investigar ao redor', icon: '🔍', color: 'bg-blue-600' },
      { id: 'converse', text: 'Conversar mais', icon: '💬', color: 'bg-green-600' },
      { id: 'ask-questions', text: 'Fazer perguntas', icon: '❓', color: 'bg-purple-600' },
      { id: 'explore', text: 'Explorar o local', icon: '🗺️', color: 'bg-orange-600' }
    ]
  }

  const suggestions = getContextualSuggestions()

  if (!showSuggestions) {
    return (
      <div className="mt-4">
        <button
          onClick={() => setShowSuggestions(true)}
          className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors text-sm"
        >
          💡 Mostrar sugestões
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-48">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-semibold text-gray-400">💡 Sugestões</h4>
        <button
          onClick={() => setShowSuggestions(false)}
          className="text-xs text-gray-500 hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1 flex-1 overflow-hidden">
        {suggestions.map((suggestion, index) => (
          <div key={suggestion.id} className="relative group">
            <button
              onClick={() => onActionSelect(suggestion.text)}
              disabled={isLoading}
              className={`w-full px-2 py-1.5 ${suggestion.color} hover:opacity-80 disabled:opacity-50 text-white text-xs rounded transition-all duration-200 flex items-center space-x-1`}
            >
              <span className="text-xs">{suggestion.icon}</span>
              <span className="flex-1 text-left truncate">{suggestion.text}</span>
            </button>
            
            {/* Tooltip inteligente - para baixo nas primeiras 2 sugestões */}
            {index < 2 ? (
              // Tooltip para baixo (primeiras 2 sugestões)
              <div className="absolute top-full left-0 right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="text-center whitespace-normal break-words">
                  {suggestion.text}
                </div>
                {/* Seta do tooltip apontando para cima */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
              </div>
            ) : (
              // Tooltip para cima (últimas 2 sugestões)
              <div className="absolute bottom-full left-0 right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="text-center whitespace-normal break-words">
                  {suggestion.text}
                </div>
                {/* Seta do tooltip apontando para baixo */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-1 text-xs text-gray-400 text-center bg-gray-800/30 rounded p-1">
        💡 Clique em uma sugestão
      </div>
    </div>
  )
}
