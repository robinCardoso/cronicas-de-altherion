import { NextRequest, NextResponse } from 'next/server'
import { Character, NarrativeResponse } from '@/types/game'

// Importar ambos os provedores
import { generateNarrative as openaiGenerateNarrative } from '@/lib/api/openai'
import { generateNarrative as geminiGenerateNarrative } from '@/lib/api/gemini'

// Detectar qual API está disponível
function getAvailableAIProvider(): 'openai' | 'gemini' | 'none' {
  // Priorizar Gemini (gratuito) sobre OpenAI (pago)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return 'gemini'
  }
  
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    return 'openai'
  }
  
  return 'none'
}

export async function POST(request: NextRequest) {
  try {
    const { character, playerAction, previousContext } = await request.json()
    
    const provider = getAvailableAIProvider()
    console.log('🤖 API Route - Provedor detectado:', provider)
    console.log('🔑 API Route - Chaves disponíveis:', {
      gemini: process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ Não configurada',
      openai: process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não configurada'
    })
    
    let response: NarrativeResponse
    
    switch (provider) {
      case 'gemini':
        console.log('🚀 API Route - Usando Gemini...')
        response = await geminiGenerateNarrative(character, playerAction, previousContext)
        break
        
      case 'openai':
        console.log('🚀 API Route - Usando OpenAI...')
        response = await openaiGenerateNarrative(character, playerAction, previousContext)
        break
        
      case 'none':
      default:
        console.log('⚠️ API Route - Usando modo fallback épico')
        response = {
          narrative: `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`,
          imageUrl: '/images/placeholder-scene.jpg',
          sceneMood: 'tenso',
          timeOfDay: 'dia',
          xp: Math.floor(Math.random() * 15) + 10
        }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('❌ Erro na API route:', error)
    return NextResponse.json(
      { 
        narrative: 'Ocorreu um erro ao processar sua ação. Tente novamente.',
        sceneMood: 'tranquilo',
        timeOfDay: 'dia'
      },
      { status: 500 }
    )
  }
}
