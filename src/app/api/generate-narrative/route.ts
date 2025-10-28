import { NextRequest, NextResponse } from 'next/server'
import { Character, NarrativeResponse } from '@/types/game'

// Importar todos os provedores
import { generateNarrative as openaiGenerateNarrative } from '@/lib/api/openai'
import { generateNarrative as geminiGenerateNarrative } from '@/lib/api/gemini'
import { generateNarrativeWithHuggingFace } from '@/lib/api/huggingface-text'
import { generateNarrativeWithGroq } from '@/lib/api/groq'

// Detectar qual API está disponível
function getAvailableAIProvider(): 'openai' | 'gemini' | 'huggingface' | 'groq' | 'none' {
  // Priorizar Groq (rápido e confiável)
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
    return 'groq'
  }
  
  // Depois Hugging Face para textos (gratuito e sem limite)
  if (process.env.HUGGINGFACE_API_TOKEN && process.env.HUGGINGFACE_API_TOKEN !== 'your_huggingface_api_token_here') {
    return 'huggingface'
  }
  
  // Depois Gemini (funciona bem e é gratuito)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return 'gemini'
  }
  
  // Por último OpenAI (pago mas confiável)
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    return 'openai'
  }
  
  return 'none'
}

export async function POST(request: NextRequest) {
  try {
    console.log('📥 API Route - Iniciando processamento...')
    const body = await request.json()
    console.log('📥 API Route - Dados recebidos:', body)
    
    // Aceitar tanto 'action' quanto 'playerAction' para compatibilidade
    const playerAction = body.action || body.playerAction || 'investigar'
    const character = body.character || { nome: 'Herói', classe: 'guerreiro', level: 1 }
    const previousContext = body.currentStory || body.previousContext || ''
    
    // Validar e normalizar configurações
    const settings = {
      maxTokens: Math.max(50, Math.min(1000, body.settings?.maxTokens || 200)),
      temperature: Math.max(0.1, Math.min(2.0, body.settings?.temperature || 0.8))
    }
    
    console.log('⚙️ API Route - Configurações aplicadas:', settings)
    
    console.log('🎮 API Route - Processando:', { playerAction, character: character.nome, previousContext: previousContext.substring(0, 50) + '...' })
    
    const provider = getAvailableAIProvider()
    console.log('🤖 API Route - Provedor detectado:', provider)
    console.log('🔑 API Route - Chaves disponíveis:', {
      groq: process.env.GROQ_API_KEY ? '✅ Configurada' : '❌ Não configurada',
      huggingface: process.env.HUGGINGFACE_API_TOKEN ? '✅ Configurada' : '❌ Não configurada',
      gemini: process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ Não configurada',
      openai: process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não configurada'
    })
    
    let response: NarrativeResponse
    
    try {
      switch (provider) {
        case 'groq':
          console.log('🚀 API Route - Usando Groq...')
          try {
            response = await generateNarrativeWithGroq(character, playerAction, previousContext, settings)
            console.log('🚀 Groq funcionou!')
          } catch (groqError) {
            console.log('🚀 Groq falhou, tentando Hugging Face...')
            if (process.env.HUGGINGFACE_API_TOKEN && process.env.HUGGINGFACE_API_TOKEN !== 'your_huggingface_api_token_here') {
              try {
                response = await generateNarrativeWithHuggingFace(character, playerAction, previousContext, settings)
                console.log('🤗 Hugging Face funcionou como fallback!')
              } catch (hfError) {
                console.log('🤗 Hugging Face falhou, tentando Gemini...')
                if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
                  response = await geminiGenerateNarrative(character, playerAction, previousContext, settings)
                  console.log('🤖 Gemini funcionou como fallback!')
                } else {
                  throw groqError
                }
              }
            } else {
              throw groqError
            }
          }
          break
          
        case 'huggingface':
          console.log('🚀 API Route - Usando Hugging Face...')
          try {
            response = await generateNarrativeWithHuggingFace(character, playerAction, previousContext, settings)
            console.log('🤗 Hugging Face funcionou!')
          } catch (hfError) {
            console.log('🤗 Hugging Face falhou, tentando Gemini...')
            if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
              response = await geminiGenerateNarrative(character, playerAction, previousContext, settings)
              console.log('🤖 Gemini funcionou como fallback!')
            } else {
              throw hfError
            }
          }
          break
          
        case 'gemini':
          console.log('🚀 API Route - Usando Gemini...')
          response = await geminiGenerateNarrative(character, playerAction, previousContext, settings)
          break
          
        case 'openai':
          console.log('🚀 API Route - Usando OpenAI...')
          response = await openaiGenerateNarrative(character, playerAction, previousContext, undefined, settings)
          break
          
        case 'none':
        default:
          console.log('⚠️ API Route - Nenhuma IA configurada')
          return NextResponse.json(
            { 
              error: 'Nenhuma IA configurada. Configure pelo menos uma chave de API.',
              narrative: '',
              sceneMood: 'tranquilo',
              timeOfDay: 'dia'
            },
            { status: 400 }
          )
      }
      
      console.log('📤 API Route - Resposta gerada com sucesso')
      console.log('📤 API Route - Resposta:', response.narrative.substring(0, 100) + '...')
      return NextResponse.json(response)
      
    } catch (aiError) {
      console.error('❌ Erro na IA:', aiError)
      return NextResponse.json(
        { 
          error: 'Todas as IAs falharam. Verifique suas configurações ou tente novamente.',
          narrative: '',
          sceneMood: 'tranquilo',
          timeOfDay: 'dia'
        },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('❌ Erro geral na API route:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        narrative: '',
        sceneMood: 'tranquilo',
        timeOfDay: 'dia'
      },
      { status: 500 }
    )
  }
}
