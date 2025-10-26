import { Character, NarrativeResponse } from '@/types/game'

// Importar ambos os provedores
import { generateNarrative as openaiGenerateNarrative, generateSceneImage as openaiGenerateImage } from './openai'
import { generateNarrative as geminiGenerateNarrative, generateImage as geminiGenerateImage } from './gemini'

// Detectar qual API está disponível
export function getAvailableAIProvider(): 'openai' | 'gemini' | 'none' {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    return 'openai'
  }
  
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return 'gemini'
  }
  
  return 'none'
}

// Função unificada para gerar narrativa
export async function generateNarrative(
  character: Character,
  playerAction: string,
  previousContext?: string
): Promise<NarrativeResponse> {
  const provider = getAvailableAIProvider()
  
  switch (provider) {
    case 'openai':
      return openaiGenerateNarrative(character, playerAction, previousContext)
    
    case 'gemini':
      return geminiGenerateNarrative(character, playerAction, previousContext)
    
    case 'none':
    default:
      // Fallback para narrativa local
      return {
        narrative: `Você, ${character.nome}, ${playerAction.toLowerCase()}. O que você faz a seguir?`,
        imageUrl: '/images/placeholder-scene.jpg',
        sceneMood: 'tranquilo',
        timeOfDay: 'dia'
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
