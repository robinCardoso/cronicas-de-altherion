import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API funcionando!',
    geminiKey: process.env.GEMINI_API_KEY ? '✅ Configurada' : '❌ Não configurada',
    openaiKey: process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não configurada',
    timestamp: new Date().toISOString()
  })
}
