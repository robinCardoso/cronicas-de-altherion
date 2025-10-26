'use client'

import { useState } from 'react'
import { useTranslation } from '@/contexts/LanguageContext'

interface MenuOption {
  id: string
  title: string
  icon: string
  description: string
  component: React.ReactNode
}

interface MainMenuProps {
  onStartGame: () => void
  children: React.ReactNode
}

export function MainMenu({ onStartGame, children }: MainMenuProps) {
  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const menuOptions: MenuOption[] = [
    {
      id: 'manifesto',
      title: t('menu.manifesto.title'),
      icon: '🎭',
      description: t('menu.manifesto.description'),
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              🎭 {t('menu.manifesto.mainTitle')}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('menu.manifesto.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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
      )
    },
    {
      id: 'classes',
      title: t('menu.classes.title'),
      icon: '⚔️',
      description: t('menu.classes.description'),
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              ⚔️ {t('menu.classes.mainTitle')}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('menu.classes.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Guerreiro', icon: '🛡️', desc: 'Mestre do combate corpo a corpo' },
              { name: 'Mago', icon: '🔮', desc: 'Manipulador das artes arcanas' },
              { name: 'Ladino', icon: '🗡️', desc: 'Especialista em furtividade e agilidade' },
              { name: 'Arqueiro', icon: '🏹', desc: 'Precisão letal à distância' },
              { name: 'Clérigo', icon: '⛑️', desc: 'Canalizador do poder divino' },
              { name: 'Paladino', icon: '⚔️', desc: 'Cruzado da justiça e honra' },
              { name: 'Necromante', icon: '💀', desc: 'Mestre das artes das trevas' },
              { name: 'Bárbaro', icon: '🔥', desc: 'Fúria selvagem e força bruta' },
              { name: 'Druida', icon: '🌿', desc: 'Guardião da natureza e suas criaturas' },
              { name: 'Inventor', icon: '⚙️', desc: 'Criador de engenhocas e artefatos' }
            ].map((classe, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600 hover:border-purple-500/50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">{classe.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{classe.name}</h3>
                  <p className="text-gray-300 text-xs">{classe.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onStartGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              🎮 {t('menu.startButton')}
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'como-jogar',
      title: t('menu.tutorial.title'),
      icon: '📖',
      description: t('menu.tutorial.description'),
      component: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              📖 {t('menu.tutorial.mainTitle')}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('menu.tutorial.subtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Crie Seu Personagem',
                description: 'Escolha um nome e uma classe que combine com seu estilo de jogo',
                icon: '👤'
              },
              {
                step: '2',
                title: 'Descreva Suas Ações',
                description: 'Digite o que você quer fazer. Seja criativo! A IA vai interpretar suas ações',
                icon: '✍️'
              },
              {
                step: '3',
                title: 'Veja a História Se Desenrolar',
                description: 'A IA gera narrativas épicas baseadas em suas escolhas e consequências',
                icon: '📚'
              },
              {
                step: '4',
                title: 'Explore e Evolua',
                description: 'Ganhe experiência, descubra novos locais e crie sua própria saga',
                icon: '🌟'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onStartGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              🚀 {t('menu.startNow')}
            </button>
          </div>
        </div>
      )
    }
  ]

  if (activeMenu) {
    const selectedMenu = menuOptions.find(option => option.id === activeMenu)
    
    return (
      <div className="space-y-6">
        {/* Botão de Voltar */}
        <div className="flex justify-start">
          <button
            onClick={() => setActiveMenu(null)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <span>←</span>
            <span>{t('menu.back')}</span>
          </button>
        </div>

        {/* Conteúdo do Menu Selecionado */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/30">
          {selectedMenu?.component}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header do Menu Principal */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
          🎮 {t('menu.title')}
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {t('menu.subtitle')}
        </p>
      </div>

      {/* Grid de Opções do Menu */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveMenu(option.id)}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {option.title}
              </h3>
              <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
                {option.description}
              </p>
            </div>
          </button>
        ))}

        {/* Botão Principal - Começar Jogo */}
        <button
          onClick={onStartGame}
          className="group bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg p-4 border border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
        >
          <div className="text-center">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
              ⚔️
            </div>
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-100 transition-colors">
              {t('menu.startGame.title')}
            </h3>
            <p className="text-purple-100 text-xs group-hover:text-white transition-colors">
              {t('menu.startGame.description')}
            </p>
          </div>
        </button>
      </div>

      {/* Renderizar o conteúdo do jogo quando não estiver no menu */}
      {children}
    </div>
  )
}
