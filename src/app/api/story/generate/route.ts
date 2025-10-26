import { NextRequest, NextResponse } from 'next/server'
import { generateNarrative, generateSceneImage } from '@/lib/api/openai'
import { Character } from '@/types/game'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { character, action, worldState, otherPlayersActions } = body

    // Validação básica
    if (!character || !action) {
      return NextResponse.json(
        { error: 'Personagem e ação são obrigatórios' },
        { status: 400 }
      )
    }

    // Gera a narrativa
    const narrativeResponse = await generateNarrative(
      character as Character,
      action,
      worldState,
      otherPlayersActions
    )

    // Gera a imagem da cena
    const imageUrl = await generateSceneImage(
      narrativeResponse.narrative,
      narrativeResponse.sceneMood,
      narrativeResponse.timeOfDay
    )

    // Adiciona a URL da imagem à resposta
    const response = {
      ...narrativeResponse,
      imageUrl
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro na API de geração de narrativa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
