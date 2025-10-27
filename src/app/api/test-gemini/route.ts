import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY não configurada' }, { status: 500 })
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Escreva uma frase curta sobre magia em português.'
          }]
        }]
      })
    })

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Gemini API error: ${response.status}`,
        status: response.status 
      }, { status: 500 })
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      rawResponse: data,
      narrative: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Texto não encontrado'
    })

  } catch (error) {
    console.error('Erro no teste Gemini:', error)
    return NextResponse.json({ 
      error: 'Erro interno',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
