import { Character, NarrativeResponse } from '@/types/game'

// Importar ambos os provedores
import { generateNarrative as openaiGenerateNarrative, generateSceneImage as openaiGenerateImage } from './openai'
import { generateNarrative as geminiGenerateNarrative, generateImage as geminiGenerateImage } from './gemini'
import { generateImageWithHuggingFace } from './huggingface'

// Detectar qual API está disponível para NARRATIVA (priorizar Gemini)
export function getAvailableAIProvider(): 'openai' | 'gemini' | 'none' {
  // Priorizar Gemini (gratuito) para narrativas
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return 'gemini'
  }
  
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    return 'openai'
  }
  
  return 'none'
}

// Detectar qual API está disponível para IMAGENS (priorizar Hugging Face gratuito)
export function getAvailableImageProvider(): 'huggingface' | 'openai' | 'none' {
  // Priorizar Hugging Face (gratuito)
  if (process.env.HUGGINGFACE_API_TOKEN && process.env.HUGGINGFACE_API_TOKEN !== 'your_huggingface_api_token_here') {
    return 'huggingface'
  }

  // Fallback para OpenAI DALL-E (pago)
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

// Função para gerar placeholder genérico (a IA deve gerar as imagens específicas)
function getClassPlaceholder(characterClass?: string): string {
  return '/images/placeholder-scene.svg'
}

// Função unificada para gerar imagem
export async function generateImage(prompt: string, sceneMood?: string, timeOfDay?: string, characterClass?: string): Promise<string> {
  const imageProvider = getAvailableImageProvider()
  
  switch (imageProvider) {
    case 'huggingface':
      console.log('🎨 Usando Hugging Face para gerar imagem')
      try {
        const huggingfaceResult = await generateImageWithHuggingFace(prompt, characterClass)
        return huggingfaceResult || getClassPlaceholder(characterClass)
      } catch (error) {
        console.log('🎨 Hugging Face falhou, usando placeholder')
        return getClassPlaceholder(characterClass)
      }
    
    case 'openai':
      console.log('🎨 Usando OpenAI DALL-E para gerar imagem')
      try {
        const openaiResult = await openaiGenerateImage(prompt, sceneMood || 'tranquilo', timeOfDay || 'dia')
        return openaiResult || getClassPlaceholder(characterClass)
      } catch (error) {
        console.log('🎨 OpenAI falhou (limite de cobrança?), usando placeholder')
        return getClassPlaceholder(characterClass)
      }
    
    case 'none':
    default:
      console.log('🎨 Nenhuma API de imagem configurada, usando placeholder')
      return getClassPlaceholder(characterClass)
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
