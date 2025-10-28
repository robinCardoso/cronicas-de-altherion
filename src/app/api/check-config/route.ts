import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const geminiKey = process.env.GEMINI_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY
    const huggingfaceKey = process.env.HUGGINGFACE_API_TOKEN
    
    return NextResponse.json({
      geminiConfigured: !!geminiKey && geminiKey !== 'your_gemini_api_key_here',
      openaiConfigured: !!openaiKey && openaiKey !== 'your_openai_api_key_here',
      huggingfaceConfigured: !!huggingfaceKey && huggingfaceKey !== 'your_huggingface_api_token_here',
      geminiKeyLength: geminiKey ? geminiKey.length : 0,
      openaiKeyLength: openaiKey ? openaiKey.length : 0,
      huggingfaceKeyLength: huggingfaceKey ? huggingfaceKey.length : 0
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao verificar configuração' }, { status: 500 })
  }
}
