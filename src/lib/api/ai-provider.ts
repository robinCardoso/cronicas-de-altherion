import { Character, NarrativeResponse } from '@/types/game'

// Importar ambos os provedores
import { generateNarrative as openaiGenerateNarrative, generateSceneImage as openaiGenerateImage } from './openai'
import { generateNarrative as geminiGenerateNarrative, generateImage as geminiGenerateImage } from './gemini'

// Detectar qual API está disponível
export function getAvailableAIProvider(): 'openai' | 'gemini' | 'none' {
  // Priorizar Gemini (gratuito) sobre OpenAI (pago)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return 'gemini'
  }
  
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    return 'openai'
  }
  
  return 'none'
}

// Função unificada para gerar narrativa
export async function generateNarrative(
  character: Character,
  playerAction: string,
  previousContext?: string
): Promise<NarrativeResponse> {
  try {
    // Usar API route para acessar variáveis de ambiente do servidor
    const response = await fetch('/api/generate-narrative', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        character,
        playerAction,
        previousContext
      })
    })
    
    if (!response.ok) {
      throw new Error(`API route error: ${response.status}`)
    }
    
    return await response.json()
    
  } catch (error) {
    console.error('❌ Erro ao chamar API route:', error)
    
    // Fallback para narrativa épica
    return {
      narrative: `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`,
      imageUrl: '/images/placeholder-scene.jpg',
      sceneMood: 'tenso',
      timeOfDay: 'dia',
      xp: Math.floor(Math.random() * 15) + 10
    }
  }
}

// Função unificada para gerar imagem
export async function generateImage(prompt: string): Promise<string> {
  const provider = getAvailableAIProvider()
  
  switch (provider) {
    case 'openai':
      const openaiResult = await openaiGenerateImage(prompt, 'tranquilo', 'dia')
      return openaiResult || '/images/placeholder-scene.jpg'
    
    case 'gemini':
      const geminiResult = await geminiGenerateImage(prompt)
      return geminiResult || '/images/placeholder-scene.jpg'
    
    case 'none':
    default:
      return '/images/placeholder-scene.jpg'
  }
}

// Função para obter informações do provedor
export function getAIProviderInfo() {
  const provider = getAvailableAIProvider()
  
  switch (provider) {
    case 'openai':
      return {
        name: 'OpenAI GPT-4',
        status: 'active',
        features: ['Narrativa', 'Imagens (DALL-E)'],
        cost: 'Pago'
      }
    
    case 'gemini':
      return {
        name: 'Google Gemini 2.0',
        status: 'active',
        features: ['Narrativa', 'Imagens'],
        cost: 'Gratuito'
      }
    
    case 'none':
    default:
      return {
        name: 'Modo Demo',
        status: 'fallback',
        features: ['Narrativa básica'],
        cost: 'Gratuito'
      }
  }
}
