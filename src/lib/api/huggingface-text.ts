import { Character, NarrativeResponse } from '@/types/game'

// Configuração do Hugging Face para geração de texto
const HUGGINGFACE_CHAT_API_URL = 'https://router.huggingface.co/v1/chat/completions'

// Contexto base do mundo
const WORLD_CONTEXT = `
Você é um narrador mestre de RPG épico especializado em criar narrativas envolventes e detalhadas.

REGRAS IMPORTANTES:
1. NUNCA apenas repita a ação do jogador
2. SEMPRE construa uma narrativa rica com detalhes visuais, sonoros e atmosféricos
3. Crie consequências interessantes para cada ação
4. Use linguagem épica e cinematográfica
5. Inclua elementos de suspense, descoberta ou conflito
6. Termine sempre com uma pergunta ou situação que convide à próxima ação

EXEMPLO DE RESPOSTA BOA:
Jogador: "quero desbravar a floresta"
Narrador: "Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?"
`

export async function generateNarrativeWithHuggingFace(
  character: Character,
  playerAction: string,
  previousContext?: string,
  settings?: { maxTokens?: number; temperature?: number }
): Promise<NarrativeResponse> {
  try {
    console.log('🤗 === INÍCIO GERAÇÃO HUGGING FACE TEXT ===')
    console.log('🤗 Personagem:', character.nome, character.classe)
    console.log('🤗 Ação:', playerAction)
    console.log('🤗 Contexto anterior:', previousContext?.substring(0, 100) + '...')
    
    const prompt = `O herói ${character.nome} decide ${playerAction.toLowerCase()}.`

    console.log('🤗 Prompt completo:', prompt.substring(0, 200) + '...')
    console.log('🤗 Fazendo requisição para Hugging Face Chat API...')
    console.log('🤗 URL:', HUGGINGFACE_CHAT_API_URL)
    console.log('🤗 Token configurado:', !!process.env.HUGGINGFACE_API_TOKEN)

    const response = await fetch(HUGGINGFACE_CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: WORLD_CONTEXT
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'openai/gpt-oss-20b:groq',
        stream: false,
        temperature: settings?.temperature || 0.8,
        max_tokens: settings?.maxTokens || 200
      }),
      // Adicionar timeout para evitar travamento
      signal: AbortSignal.timeout(30000) // 30 segundos
    })

    console.log('🤗 Resposta recebida - Status:', response.status)
    console.log('🤗 Resposta recebida - OK:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Hugging Face Text API error: ${response.status} - ${errorText}`)
      throw new Error(`Hugging Face Text API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('🤗 Resposta completa:', JSON.stringify(data, null, 2))

    // Extrair texto gerado da nova estrutura de chat
    let narrative = ''
    if (data.choices && data.choices[0] && data.choices[0].message) {
      narrative = data.choices[0].message.content
    } else if (data.content) {
      narrative = data.content
    } else if (Array.isArray(data) && data.length > 0) {
      narrative = data[0].generated_text || ''
    } else if (data.generated_text) {
      narrative = data.generated_text
    } else {
      console.error('🤗 Estrutura de resposta inesperada:', data)
      throw new Error('Estrutura de resposta inesperada do Hugging Face')
    }

    // Limpar o texto gerado (remover o prompt original)
    if (narrative.includes(prompt)) {
      narrative = narrative.replace(prompt, '').trim()
    }

    // Se o texto estiver vazio, tentar novamente com prompt diferente
    if (!narrative || narrative.trim() === '') {
      console.log('🤗 Texto vazio, tentando novamente com prompt expandido')
      const expandedPrompt = `Como narrador de RPG épico, descreva detalhadamente o que acontece quando ${character.nome} (${character.classe}, nível ${character.level}) decide ${playerAction.toLowerCase()}. Seja criativo e específico sobre o ambiente, ações e consequências.`
      
      try {
        const retryResponse = await fetch(HUGGINGFACE_CHAT_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'user',
                content: expandedPrompt
              }
            ],
            model: 'openai/gpt-oss-20b:groq',
            stream: false,
            temperature: settings?.temperature || 0.8,
            max_tokens: settings?.maxTokens || 200
          }),
        })

        if (retryResponse.ok) {
          const retryData = await retryResponse.json()
          if (retryData.choices && retryData.choices[0] && retryData.choices[0].message) {
            narrative = retryData.choices[0].message.content
          }
        }
      } catch (retryError) {
        console.error('❌ Erro no retry:', retryError)
      }
    }

    // Garantir que temos uma narrativa válida
    if (!narrative || narrative.trim() === '') {
      throw new Error('IA não conseguiu gerar narrativa válida')
    }

    console.log('🤗 ✅ Narrativa gerada:', narrative.substring(0, 100) + '...')

    // Gerar sugestões inteligentes baseadas na narrativa
    let suggestions: string[] = []
    try {
      suggestions = await generateSmartSuggestions(narrative, character)
    } catch (suggestionError) {
      console.error('❌ Erro ao gerar sugestões:', suggestionError)
      suggestions = ['Investigar mais', 'Conversar', 'Usar habilidades', 'Explorar']
    }

    return {
      narrative,
      imageUrl: '/images/placeholder-scene.jpg',
      xp: Math.floor(Math.random() * 15) + 10,
      sceneMood: 'tenso',
      timeOfDay: 'dia',
      suggestions: suggestions
    }

  } catch (error) {
    console.error('❌ Erro ao gerar narrativa com Hugging Face:', error)
    
    // Tentar uma última vez com prompt mais simples
    try {
      console.log('🤗 Tentativa final com prompt simplificado')
      const simplePrompt = `Descreva o que acontece quando ${character.nome} decide ${playerAction.toLowerCase()}.`
      
      const finalResponse = await fetch(HUGGINGFACE_CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: simplePrompt }],
          model: 'openai/gpt-oss-20b:groq',
          stream: false,
          temperature: 0.7,
          max_tokens: 150
        }),
      })

      if (finalResponse.ok) {
        const finalData = await finalResponse.json()
        let finalNarrative = ''
        
        if (finalData.choices && finalData.choices[0] && finalData.choices[0].message) {
          finalNarrative = finalData.choices[0].message.content
        }
        
        if (finalNarrative && finalNarrative.trim()) {
          return {
            narrative: finalNarrative,
            imageUrl: '/images/placeholder-scene.jpg',
            xp: Math.floor(Math.random() * 15) + 10,
            sceneMood: 'tenso',
            timeOfDay: 'dia',
            suggestions: ['Investigar mais', 'Conversar', 'Usar habilidades', 'Explorar']
          }
        }
      }
    } catch (finalError) {
      console.error('❌ Falha na tentativa final:', finalError)
    }
    
    // Se tudo falhar, retornar erro sem fallback fixo
    throw new Error('Não foi possível gerar narrativa com a IA')
  }
}

// Função para gerar sugestões inteligentes baseadas na narrativa
async function generateSmartSuggestions(narrative: string, character: Character): Promise<string[]> {
  try {
    console.log('🤗 Gerando sugestões inteligentes...')
    
    // Se não temos token do Hugging Face, usar fallback direto
    if (!process.env.HUGGINGFACE_API_TOKEN) {
      console.log('🤗 Sem token Hugging Face, usando fallback')
      return generateFallbackSuggestions(narrative)
    }
    
    const prompt = `Baseado nesta narrativa de RPG, sugira 4 ações específicas que o jogador pode fazer:

NARRATIVA: ${narrative.substring(0, 200)}...

PERSONAGEM: ${character.nome} (${character.classe}, Nível ${character.level})

Retorne apenas 4 ações específicas, uma por linha, sem numeração ou marcadores.`

    const response = await fetch(HUGGINGFACE_CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: 'openai/gpt-oss-20b:groq',
        stream: false,
        temperature: 0.7,
        max_tokens: 150
      }),
    })

    if (!response.ok) {
      console.log('🤗 Erro na API de sugestões, usando fallback')
      return generateFallbackSuggestions(narrative)
    }

    const data = await response.json()
    let suggestionsText = ''
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      suggestionsText = data.choices[0].message.content
    } else if (data.content) {
      suggestionsText = data.content
    } else {
      return generateFallbackSuggestions(narrative)
    }

    // Processar as sugestões
    const suggestions = suggestionsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 100)
      .slice(0, 4)

    console.log('🤗 ✅ Sugestões geradas:', suggestions)
    return suggestions.length >= 4 ? suggestions : generateFallbackSuggestions(narrative)

  } catch (error) {
    console.error('❌ Erro ao gerar sugestões:', error)
    return generateFallbackSuggestions(narrative)
  }
}

// Fallback para sugestões baseadas no contexto
function generateFallbackSuggestions(narrative: string): string[] {
  const context = narrative.toLowerCase()
  
  // Se menciona porta ou entrada
  if (context.includes('porta') || context.includes('entrada') || context.includes('passagem')) {
    return [
      'Examinar a porta cuidadosamente',
      'Tentar abrir a porta',
      'Escutar atrás da porta',
      'Procurar uma chave'
    ]
  }
  
  // Se menciona pergaminho ou documento
  if (context.includes('pergaminho') || context.includes('documento') || context.includes('papel')) {
    return [
      'Ler o pergaminho',
      'Examinar a escrita',
      'Verificar símbolos',
      'Guardar o pergaminho'
    ]
  }
  
  // Se menciona criatura ou inimigo
  if (context.includes('criatura') || context.includes('inimigo') || context.includes('monstro')) {
    return [
      'Preparar-se para combate',
      'Tentar conversar',
      'Usar magia defensiva',
      'Recuar cuidadosamente'
    ]
  }
  
  // Se menciona tesouro ou item
  if (context.includes('tesouro') || context.includes('item') || context.includes('objeto')) {
    return [
      'Examinar o tesouro',
      'Verificar se é seguro',
      'Procurar armadilhas',
      'Pegar o item'
    ]
  }
  
  // Sugestões genéricas
  return [
    'Investigar os arredores',
    'Conversar com NPCs',
    'Usar habilidades especiais',
    'Explorar mais profundamente'
  ]
}
