import { NextRequest, NextResponse } from 'next/server'
import { generateImage } from '@/lib/api/ai-provider'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, sceneMood, timeOfDay, characterClass } = body

    // Validação básica
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt é obrigatório' },
        { status: 400 }
      )
    }

    console.log('🎨 Gerando imagem com prompt:', prompt)

    // Usar a função unificada que já gerencia as APIs
    const imageUrl = await generateImage(prompt, sceneMood, timeOfDay, characterClass)

    console.log('🎨 Imagem gerada:', imageUrl)

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('❌ Erro na API de geração de imagem:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}