'use client'

import { useState } from 'react'

interface GameSettingsProps {
  isOpen: boolean
  onClose: () => void
  onSettingsChange: (settings: GameSettings) => void
  currentSettings: GameSettings
}

export interface GameSettings {
  narrativeLength: 'short' | 'medium' | 'long'
  aiCreativity: 'low' | 'medium' | 'high'
  showSuggestions: boolean
  autoScroll: boolean
}

export function GameSettings({ isOpen, onClose, onSettingsChange, currentSettings }: GameSettingsProps) {
  const [settings, setSettings] = useState<GameSettings>(currentSettings)

  const handleSave = () => {
    onSettingsChange(settings)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">⚙️ Configurações do Jogo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Tamanho da Narrativa */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              📝 Tamanho da Narrativa
            </label>
            <div className="space-y-2">
              {[
                { value: 'short', label: 'Curta (1-2 parágrafos)', desc: 'Respostas concisas' },
                { value: 'medium', label: 'Média (2-3 parágrafos)', desc: 'Equilíbrio ideal' },
                { value: 'long', label: 'Longa (3+ parágrafos)', desc: 'Descrições detalhadas' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="narrativeLength"
                    value={option.value}
                    checked={settings.narrativeLength === option.value}
                    onChange={(e) => setSettings(prev => ({ ...prev, narrativeLength: e.target.value as any }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-white text-sm">{option.label}</div>
                    <div className="text-gray-400 text-xs">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Criatividade da IA */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              🎨 Criatividade da IA
            </label>
            <div className="space-y-2">
              {[
                { value: 'low', label: 'Baixa', desc: 'Respostas mais previsíveis' },
                { value: 'medium', label: 'Média', desc: 'Equilíbrio criativo' },
                { value: 'high', label: 'Alta', desc: 'Respostas muito criativas' }
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="aiCreativity"
                    value={option.value}
                    checked={settings.aiCreativity === option.value}
                    onChange={(e) => setSettings(prev => ({ ...prev, aiCreativity: e.target.value as any }))}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-white text-sm">{option.label}</div>
                    <div className="text-gray-400 text-xs">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Outras Configurações */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showSuggestions}
                onChange={(e) => setSettings(prev => ({ ...prev, showSuggestions: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <div>
                <div className="text-white text-sm">💡 Mostrar Sugestões</div>
                <div className="text-gray-400 text-xs">Exibir sugestões inteligentes da IA</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoScroll}
                onChange={(e) => setSettings(prev => ({ ...prev, autoScroll: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <div>
                <div className="text-white text-sm">📜 Auto-scroll</div>
                <div className="text-gray-400 text-xs">Rolar automaticamente para novas respostas</div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
