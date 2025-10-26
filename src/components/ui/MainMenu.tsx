'use client'

import { useState } from 'react'

interface MainMenuProps {
  onStartGame: () => void
}

export function MainMenu({ onStartGame }: MainMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const menuOptions = [
    {
      id: 'manifesto',
      title: 'Por que RPG Narrativo?',
      icon: '🎭',
      description: 'Descubra os diferenciais do nosso jogo',
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              🎭 Por que um RPG Narrativo?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra a magia de criar sua própria história com inteligência artificial
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🧠</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Você é o Autor da História</h3>
                  <p className="text-gray-300 text-sm">Nos jogos tradicionais, você consome histórias. Aqui, você <strong>escreve o próprio destino</strong>. Cada ação gera consequências únicas através da IA.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🗺️</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mundo Infinito</h3>
                  <p className="text-gray-300 text-sm">Sem limitações de gráficos ou mapas. Apenas <strong>imaginação + IA</strong> criam aventuras infinitas.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🕰️</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Imersão Psicológica</h3>
                  <p className="text-gray-300 text-sm">Sinta-se dentro de um <strong>livro vivo</strong> onde suas escolhas moldam o mundo ao redor.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🧙‍♂️</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">IA que Reage a Você</h3>
                  <p className="text-gray-300 text-sm">O mundo "ouve" suas ações e se adapta. NPCs lembram do que você fez.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Leve e Acessível</h3>
                  <p className="text-gray-300 text-sm">Roda no navegador, sem GPU. Milhares de jogadores simultâneos sem problemas.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎨</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Arte Gerada por IA</h3>
                  <p className="text-gray-300 text-sm">Imagens únicas para cada cena, criadas dinamicamente pela IA.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
            <h3 className="text-xl font-bold text-center text-white mb-4">Comparação: Tradicional vs Narrativo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🎮</div>
                <h4 className="text-base font-semibold text-red-400 mb-2">Jogos Tradicionais</h4>
                <ul className="text-gray-300 space-y-1 text-xs">
                  <li>• História pré-programada</li>
                  <li>• Liberdade limitada</li>
                  <li>• Rejogabilidade média</li>
                  <li>• Custo alto de produção</li>
                  <li>• Imersão apenas visual</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">✨</div>
                <h4 className="text-base font-semibold text-green-400 mb-2">Crônicas de Altherion</h4>
                <ul className="text-gray-300 space-y-1 text-xs">
                  <li>• História viva e mutável</li>
                  <li>• Liberdade infinita</li>
                  <li>• Rejogabilidade infinita</li>
                  <li>• Escalável e leve</li>
                  <li>• Imersão emocional profunda</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-lg text-purple-300 mb-3"><strong>Pronto para escrever sua própria saga épica?</strong></p>
            <div className="flex justify-center space-x-2 text-xl">
              <span>⚔️</span><span>🧙‍♂️</span><span>🐉</span><span>🏰</span><span>✨</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'classes',
      title: 'Classes Disponíveis',
      icon: '⚔️',
      description: 'Conheça as 10 classes únicas do jogo',
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              ⚔️ Classes Disponíveis
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Escolha entre 10 classes únicas, cada uma com habilidades e estilos de jogo distintos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Guerreiro', desc: 'Mestre das armas e da força bruta', icon: '⚔️' },
              { name: 'Mago', desc: 'Manipula energia arcana e sabedoria ancestral', icon: '🧙‍♂️' },
              { name: 'Ladino', desc: 'Ágil, sorrateiro e mortal nas sombras', icon: '🗡️' },
              { name: 'Arqueiro', desc: 'Precisão letal à distância', icon: '🏹' },
              { name: 'Clérigo', desc: 'Canaliza poder divino para curar e proteger', icon: '⛪' },
              { name: 'Paladino', desc: 'Cavaleiro sagrado que combina força e fé', icon: '🛡️' },
              { name: 'Necromante', desc: 'Domina as artes das trevas e morte', icon: '💀' },
              { name: 'Bárbaro', desc: 'Fúria selvagem e instintos primitivos', icon: '🔥' },
              { name: 'Druida', desc: 'Guardião da natureza e suas criaturas', icon: '🌿' },
              { name: 'Inventor', desc: 'Criação de engenhocas e tecnologia', icon: '⚙️' }
            ].map((classe, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{classe.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{classe.name}</h3>
                    <p className="text-gray-300 text-sm">{classe.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'tutorial',
      title: 'Como Jogar',
      icon: '📖',
      description: 'Aprenda os conceitos básicos do jogo',
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              📖 Como Jogar
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Aprenda os conceitos básicos para começar sua aventura em Altherion
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { step: '1', title: 'Crie seu Personagem', desc: 'Escolha uma classe e personalize seu herói com nome e características únicas', icon: '👤' },
              { step: '2', title: 'Explore o Mundo', desc: 'Navegue por Altherion e descubra locais misteriosos e personagens interessantes', icon: '🗺️' },
              { step: '3', title: 'Tome Decisões', desc: 'Cada escolha que você faz influencia a história e o mundo ao seu redor', icon: '🤔' },
              { step: '4', title: 'Interaja com IA', desc: 'A inteligência artificial cria narrativas dinâmicas baseadas em suas ações', icon: '🤖' },
              { step: '5', title: 'Evolua seu Herói', desc: 'Ganhe experiência, aprenda habilidades e torne-se mais poderoso', icon: '📈' }
            ].map((tutorial, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {tutorial.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl">{tutorial.icon}</span>
                      <h3 className="text-lg font-semibold text-white">{tutorial.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{tutorial.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'startGame',
      title: 'Começar Aventura',
      icon: '⚔️',
      description: 'Crie seu personagem e embarque na jornada',
      component: (
        <div className="text-center space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              ⚔️ Começar Aventura
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Crie seu personagem e embarque na jornada épica em Altherion
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="text-6xl mb-4">🏰</div>
            <h2 className="text-2xl font-bold text-white mb-4">Pronto para a Aventura?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Altherion espera por você! Crie seu herói único e embarque em uma jornada onde suas escolhas moldam o destino do reino.
            </p>
            <button
              onClick={onStartGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Começar Agora
            </button>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Título do Menu */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
          🎮 Crônicas de Altherion
        </h1>
        <p className="text-gray-300">
          Bem-vindo ao mundo de Altherion! Escolha uma opção para começar sua aventura épica.
        </p>
      </div>

      {/* Menu de Opções */}
      <div className="grid md:grid-cols-2 gap-4">
        {menuOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveMenu(activeMenu === option.id ? null : option.id)}
            className={`p-4 rounded-lg border transition-all text-left ${
              activeMenu === option.id
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-600 bg-gray-800/50 hover:border-purple-500/50 hover:bg-gray-800/70'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="text-gray-300 text-sm">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Conteúdo do Menu Ativo */}
      {activeMenu && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600">
          {menuOptions.find(option => option.id === activeMenu)?.component}
        </div>
      )}
    </div>
  )
}