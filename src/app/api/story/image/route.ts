import { NextRequest, NextResponse } from 'next/server'
import { generateSceneImage } from '@/lib/api/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { narrative, sceneMood, timeOfDay } = body

    // Validação básica
    if (!narrative) {
      return NextResponse.json(
        { error: 'Narrativa é obrigatória' },
        { status: 400 }
      )
    }

    // Gera a imagem
    const imageUrl = await generateSceneImage(
      narrative,
      sceneMood || 'tranquilo',
      timeOfDay || 'dia'
    )

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Falha ao gerar imagem' },
        { status: 500 }
      )
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Erro na API de geração de imagem:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
