'use client'

import React, { useState } from 'react'
import { Character } from '@/types/game'

interface ChatMessage {
  id: string
  type: 'player' | 'ai'
  content: string
  timestamp: Date
  xpGained?: number
}

interface ActionCategory {
  id: string
  name: string
  icon: string
  color: string
  actions: string[]
}

const ACTION_CATEGORIES: ActionCategory[] = [
  {
    id: 'explore',
    name: 'Explorar',
    icon: '🗺️',
    color: 'bg-green-500',
    actions: [
      'Exploro a floresta sombria',
      'Investigo as ruínas antigas',
      'Procurar tesouros perdidos',
      'Escalar a montanha',
      'Navegar pelo rio',
      'Entrar na caverna misteriosa'
    ]
  },
  {
    id: 'combat',
    name: 'Combater',
    icon: '⚔️',
    color: 'bg-red-500',
    actions: [
      'Ataco o dragão com magia de fogo',
      'Lanço uma bola de raios',
      'Invoco um golem de pedra',
      'Conjuro uma tempestade épica',
      'Ataco com minha espada',
      'Lanço flechas mágicas'
    ]
  },
  {
    id: 'interact',
    name: 'Interagir',
    icon: '🗣️',
    color: 'bg-blue-500',
    actions: [
      'Conversar com o ancião da aldeia',
      'Negociar com mercadores',
      'Perguntar sobre lendas locais',
      'Pedir informações ao guarda',
      'Conversar com outros aventureiros',
      'Interrogar o prisioneiro'
    ]
  },
  {
    id: 'magic',
    name: 'Magia',
    icon: '🧙‍♂️',
    color: 'bg-purple-500',
    actions: [
      'Estudar magia antiga',
      'Conjurar uma cura',
      'Lançar uma proteção',
      'Invocar um espírito',
      'Criar uma ilusão',
      'Teleportar para outro lugar'
    ]
  },
  {
    id: 'stealth',
    name: 'Furtividade',
    icon: '🥷',
    color: 'bg-gray-500',
    actions: [
      'Esgueirar-se silenciosamente',
      'Escutar conversas secretas',
      'Roubar informações',
      'Passar despercebido',
      'Investigar sem ser visto',
      'Seguir alguém furtivamente'
    ]
  }
]

interface InteractiveChatProps {
  character: Character
  onAction: (action: string) => Promise<void>
}

export default function InteractiveChat({ character, onAction }: InteractiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Bem-vindo a Altherion, ${character.nome}! Você está pronto para sua aventura épica. Escolha uma ação para começar!`,
      timestamp: new Date()
    }
  ])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleActionClick = async (action: string) => {
    setIsProcessing(true)
    
    // Adicionar mensagem do jogador
    const playerMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'player',
      content: action,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, playerMessage])
    
    try {
      const response = await onAction(action)
      
      // Fallback épico baseado na ação (sempre usar por enquanto)
      const epicNarratives = {
        'Exploro a floresta sombria': `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`,
        'Investigo as ruínas antigas': `Você se aproxima das ruínas antigas de Pedravale, onde pedras cobertas de musgo e símbolos misteriosos adornam as paredes desmoronadas. O ar está carregado de energia arcana e você sente uma presença antiga observando seus movimentos. De repente, uma voz ecoa das profundezas: 'Quem ousa perturbar o sono dos ancestrais?' Uma figura fantasmagórica emerge das sombras, seus olhos brilhando com luz sobrenatural. O que você faz?`,
        'Procurar tesouros perdidos': `Você inicia uma busca meticulosa pelos tesouros perdidos de Altherion. Após horas de exploração cuidadosa, você descobre uma entrada secreta escondida atrás de uma cachoeira. Dentro, uma sala repleta de ouro e joias reluzentes aguarda, mas também há armadilhas antigas e guardiões mágicos. Uma estátua de pedra ganha vida e aponta sua espada em sua direção: 'Prove-se digno ou pereça!' O que você faz?`,
        'Escalar a montanha': `Você inicia a escalada da Montanha dos Ventos, onde os picos se perdem nas nuvens. Durante a subida, você encontra uma caverna iluminada por cristais brilhantes. Dentro, um dragão ancião descansa sobre um tesouro imenso. Ele abre um olho e sussurra: 'Poucos ousam chegar até aqui, jovem guerreiro. Que propósito o traz?' O que você faz?`,
        'Navegar pelo rio': `Você embarca em uma pequena canoa e navega pelo Rio Cristalino. As águas são cristalinas e você pode ver peixes coloridos nadando abaixo. De repente, uma névoa misteriosa envolve o barco e você se encontra em um lago encantado cercado por ninfas dançantes. Uma delas se aproxima: 'Você é o escolhido para nossa profecia?' O que você faz?`,
        'Entrar na caverna misteriosa': `Você entra na caverna misteriosa, onde estalactites brilham como diamantes. No fundo, você encontra um altar antigo com runas pulsantes. Quando você se aproxima, o altar se ilumina e uma voz poderosa ecoa: 'Apenas o verdadeiro herói pode despertar o poder adormecido!' O que você faz?`
      }
      
      const epicNarrative = epicNarratives[action] || `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`
      
      // Usar narrativa épica em vez da resposta da IA
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: epicNarrative,
        timestamp: new Date(),
        xpGained: Math.floor(Math.random() * 15) + 10
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsProcessing(false)
      
    } catch (error) {
      console.error('Erro ao executar ação:', error)
      
      // Fallback épico baseado na ação
      const epicNarratives = {
        'Exploro a floresta sombria': `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`,
        'Investigo as ruínas antigas': `Você se aproxima das ruínas antigas de Pedravale, onde pedras cobertas de musgo e símbolos misteriosos adornam as paredes desmoronadas. O ar está carregado de energia arcana e você sente uma presença antiga observando seus movimentos. De repente, uma voz ecoa das profundezas: 'Quem ousa perturbar o sono dos ancestrais?' Uma figura fantasmagórica emerge das sombras, seus olhos brilhando com luz sobrenatural. O que você faz?`,
        'Procurar tesouros perdidos': `Você inicia uma busca meticulosa pelos tesouros perdidos de Altherion. Após horas de exploração cuidadosa, você descobre uma entrada secreta escondida atrás de uma cachoeira. Dentro, uma sala repleta de ouro e joias reluzentes aguarda, mas também há armadilhas antigas e guardiões mágicos. Uma estátua de pedra ganha vida e aponta sua espada em sua direção: 'Prove-se digno ou pereça!' O que você faz?`,
        'Escalar a montanha': `Você inicia a escalada da Montanha dos Ventos, onde os picos se perdem nas nuvens. Durante a subida, você encontra uma caverna iluminada por cristais brilhantes. Dentro, um dragão ancião descansa sobre um tesouro imenso. Ele abre um olho e sussurra: 'Poucos ousam chegar até aqui, jovem guerreiro. Que propósito o traz?' O que você faz?`,
        'Navegar pelo rio': `Você embarca em uma pequena canoa e navega pelo Rio Cristalino. As águas são cristalinas e você pode ver peixes coloridos nadando abaixo. De repente, uma névoa misteriosa envolve o barco e você se encontra em um lago encantado cercado por ninfas dançantes. Uma delas se aproxima: 'Você é o escolhido para nossa profecia?' O que você faz?`,
        'Entrar na caverna misteriosa': `Você entra na caverna misteriosa, onde estalactites brilham como diamantes. No fundo, você encontra um altar antigo com runas pulsantes. Quando você se aproxima, o altar se ilumina e uma voz poderosa ecoa: 'Apenas o verdadeiro herói pode despertar o poder adormecido!' O que você faz?`
      }
      
      const epicNarrative = epicNarratives[action] || `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: epicNarrative,
        timestamp: new Date(),
        xpGained: Math.floor(Math.random() * 15) + 10
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">🧙‍♂️</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{character.nome}</h3>
            <p className="text-gray-400 text-sm">{character.classe} • Nível {character.level}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'player' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.type === 'player'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.xpGained && (
                <p className="text-xs text-green-400 mt-1">+{message.xpGained} XP</p>
              )}
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm">Processando...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Categories */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="space-y-3">
          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
            {ACTION_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          {selectedCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACTION_CATEGORIES
                .find(cat => cat.id === selectedCategory)
                ?.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg text-sm hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {action}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
