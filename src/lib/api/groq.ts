import { Character, NarrativeResponse } from '@/types/game'

// Configuração do Groq para geração de texto
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

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
7. IMPORTANTE: Seja conciso e direto - termine sua resposta de forma natural, sem cortes abruptos
8. Adapte o tamanho da narrativa ao contexto - seja mais breve quando necessário

EXEMPLO DE RESPOSTA BOA (CURTA):
Jogador: "quero desbravar a floresta"
Narrador: "Você se aventura pela densa floresta de Pedravale. Entre as árvores, encontra pegadas de lobos e ouve sons misteriosos. De repente, três bandidos armados aparecem bloqueando o caminho. O líder grita: 'Ninguém passa sem pagar pedágio!' O que você faz?"

EXEMPLO DE RESPOSTA BOA (MÉDIA):
Jogador: "quero desbravar a floresta"
Narrador: "Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?"
`

export async function generateNarrativeWithGroq(
  character: Character,
  playerAction: string,
  previousContext?: string,
  settings?: { maxTokens?: number; temperature?: number }
): Promise<NarrativeResponse> {
  try {
    console.log('🚀 === INÍCIO GERAÇÃO GROQ ===')
    console.log('🚀 Personagem:', character.nome, character.classe)
    console.log('🚀 Ação:', playerAction)
    console.log('🚀 Contexto anterior:', previousContext?.substring(0, 100) + '...')

    // Verificar se o token está configurado
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      console.log('🚀 Token Groq não configurado, lançando erro para fallback')
      throw new Error('Groq não configurado')
    }

    const prompt = `O herói ${character.nome} decide ${playerAction.toLowerCase()}. 

INSTRUÇÕES ESPECÍFICAS:
- Crie uma narrativa envolvente e épica
- Seja conciso e direto - termine naturalmente
- Adapte o tamanho ao contexto da ação
- NUNCA corte a narrativa no meio de uma frase
- Termine sempre com uma pergunta ou situação que convide à próxima ação`

    console.log('🚀 Prompt completo:', prompt.substring(0, 200) + '...')
    console.log('🚀 Fazendo requisição para Groq API...')
    console.log('🚀 URL:', GROQ_API_URL)
    console.log('🚀 Token configurado:', !!process.env.GROQ_API_KEY)

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
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
        model: 'llama-3.3-70b-versatile',
        stream: false,
        temperature: settings?.temperature || 0.8,
        max_tokens: settings?.maxTokens || 200
      }),
      // Adicionar timeout para evitar travamento
      signal: AbortSignal.timeout(30000) // 30 segundos
    })

    console.log('🚀 Resposta recebida - Status:', response.status)
    console.log('🚀 Resposta recebida - OK:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Groq API error: ${response.status} - ${errorText}`)
      throw new Error(`Groq API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('🚀 Resposta completa:', JSON.stringify(data, null, 2))

    // Extrair texto gerado
    let narrative = ''
    if (data.choices && data.choices[0] && data.choices[0].message) {
      narrative = data.choices[0].message.content
    } else if (data.content) {
      narrative = data.content
    } else {
      console.error('🚀 Estrutura de resposta inesperada:', data)
      throw new Error('Estrutura de resposta inesperada do Groq')
    }

    // Limpar o texto gerado (remover o prompt original)
    if (narrative.includes(prompt)) {
      narrative = narrative.replace(prompt, '').trim()
    }

    // Garantir que temos uma narrativa válida
    if (!narrative || narrative.trim() === '') {
      throw new Error('IA não conseguiu gerar narrativa válida')
    }

    console.log('🚀 ✅ Narrativa gerada:', narrative.substring(0, 100) + '...')

    // Gerar sugestões inteligentes baseadas na narrativa
    let suggestions: string[] = []
    try {
      suggestions = await generateSmartSuggestionsGroq(narrative, character)
      
      // Se sugestões estão vazias ou poucas, tentar novamente
      if (!suggestions || suggestions.length < 2) {
        console.log('🚀 Poucas sugestões, tentando novamente...')
        suggestions = await generateSmartSuggestionsGroq(narrative, character)
      }
      
      // Se ainda estiver vazio, deixar vazio
      if (!suggestions || suggestions.length === 0) {
        console.log('🚀 Nenhuma sugestão gerada, deixando vazio')
        suggestions = []
      }
    } catch (suggestionError) {
      console.error('❌ Erro ao gerar sugestões:', suggestionError)
      suggestions = []
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
    console.error('❌ Erro ao gerar narrativa com Groq:', error)
    throw new Error('Não foi possível gerar narrativa com a IA')
  }
}

// Função para gerar sugestões inteligentes baseadas na narrativa
async function generateSmartSuggestionsGroq(narrative: string, character: Character): Promise<string[]> {
  try {
    console.log('🚀 Gerando sugestões inteligentes...')
    
    // Se não temos token do Groq, retornar vazio
    if (!process.env.GROQ_API_KEY) {
      console.log('🚀 Sem token Groq, retornando vazio')
      return []
    }
    
    const prompt = `Baseado nesta narrativa de RPG, sugira EXATAMENTE 4 ações específicas que o jogador pode fazer:

NARRATIVA: ${narrative.substring(0, 300)}...

PERSONAGEM: ${character.nome} (${character.classe}, Nível ${character.level})

IMPORTANTE: Retorne EXATAMENTE 4 ações específicas, uma por linha, sem numeração ou marcadores. Seja criativo e específico baseado no contexto da narrativa.`

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.3-70b-versatile',
        stream: false,
        temperature: 0.7,
        max_tokens: 150
      }),
    })

    if (!response.ok) {
      console.log('🚀 Erro na API de sugestões, retornando vazio')
      return []
    }

    const data = await response.json()
    let suggestionsText = ''
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      suggestionsText = data.choices[0].message.content
    } else if (data.content) {
      suggestionsText = data.content
    } else {
      return []
    }

    // Processar as sugestões
    const suggestions = suggestionsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 100)
      .slice(0, 4)

    console.log('🚀 ✅ Sugestões geradas:', suggestions)
    console.log('🚀 Quantidade de sugestões:', suggestions.length)
    
    // Se não temos sugestões suficientes, retornar vazio
    if (suggestions.length < 1) {
      console.log('🚀 Nenhuma sugestão gerada, retornando vazio')
      return []
    }
    
    return suggestions

  } catch (error) {
    console.error('❌ Erro ao gerar sugestões:', error)
    return []
  }
}

