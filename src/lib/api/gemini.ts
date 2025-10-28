import { Character, NarrativeResponse } from '@/types/game'

// Configuração do cliente Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

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

export async function generateNarrative(
  character: Character,
  playerAction: string,
  previousContext?: string,
  settings?: { maxTokens?: number; temperature?: number }
): Promise<NarrativeResponse> {
  try {
    const prompt = `${WORLD_CONTEXT}

PERSONAGEM: ${character.nome} (${character.classe}, Nível ${character.level})
AÇÃO DO JOGADOR: "${playerAction}"

INSTRUÇÕES ESPECÍFICAS:
- Crie uma narrativa épica e envolvente que desenvolva a história baseada na ação do jogador
- Seja criativo, detalhado e cinematográfico
- Seja conciso e direto - termine naturalmente
- Adapte o tamanho ao contexto da ação
- NUNCA corte a narrativa no meio de uma frase
- Termine sempre com uma pergunta ou situação que convide à próxima ação`

    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
            generationConfig: {
              temperature: settings?.temperature || 0.8,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: settings?.maxTokens || 1000,
            }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('🔍 Resposta Gemini:', JSON.stringify(data, null, 2))
    
    // Verificar se há candidatos na resposta
    if (!data.candidates || data.candidates.length === 0) {
      console.error('❌ Estrutura da resposta:', data)
      throw new Error('Nenhum candidato encontrado na resposta do Gemini')
    }
    
    // Verificar se há conteúdo na resposta
    if (!data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
      console.error('❌ Estrutura do candidato:', data.candidates[0])
      
      // Se atingiu o limite de tokens, usar fallback
      if (data.candidates[0].finishReason === 'MAX_TOKENS') {
        console.log('⚠️ Gemini atingiu limite de tokens, usando fallback')
        return {
          narrative: `Você, ${character.nome}, ${playerAction}. O que você faz a seguir?`,
          imageUrl: '/images/placeholder-scene.jpg',
          xp: 10,
          sceneMood: 'tranquilo',
          timeOfDay: 'dia'
        }
      }
      
      throw new Error('Estrutura de conteúdo inválida na resposta do Gemini')
    }
    
    let narrative = data.candidates[0].content.parts[0].text
    
    // Verificar se o texto foi gerado
    if (!narrative || narrative.trim() === '') {
      console.error('❌ Texto vazio na resposta:', data)
      throw new Error('Texto não foi gerado pelo Gemini')
    }
    
    // Corrigir problemas de encoding
    try {
      // Tentar decodificar se necessário
      narrative = decodeURIComponent(escape(narrative))
    } catch (e) {
      console.log('⚠️ Tentativa de correção de encoding falhou, usando texto original')
    }
    
    console.log('✅ Narrativa gerada:', narrative.substring(0, 100) + '...')

    // Gerar imagem baseada na narrativa
    const imagePrompt = `Fantasy RPG scene: ${narrative.substring(0, 200)}...`
    const imageUrl = await generateImage(imagePrompt)

    return {
      narrative,
      imageUrl,
      xp: Math.floor(Math.random() * 20) + 5,
      sceneMood: 'tranquilo',
      timeOfDay: 'dia'
    }

  } catch (error) {
    console.error('Erro ao gerar narrativa:', error)
    
    // Fallback para narrativa local épica
    const fallbackNarratives = [
      `Você, ${character.nome}, decide ${playerAction.toLowerCase()}. A situação se desenvolve de forma interessante... Entre as árvores centenárias, você encontra pegadas frescas e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`,
      `Você, ${character.nome}, decide ${playerAction.toLowerCase()}. A floresta parece reagir à sua presença. O vento sussurra segredos antigos entre as folhas, e você sente que algo grande está prestes a acontecer. De repente, uma figura encapuzada emerge das sombras e sussurra: 'Aventureiro, você está sendo observado...' O que você faz?`,
      `Você, ${character.nome}, decide ${playerAction.toLowerCase()}. O ambiente ao redor muda sutilmente. Você nota que as pegadas no chão são mais frescas do que esperava, e há um cheiro estranho no ar - como metal enferrujado e terra úmida. Algo não está certo aqui. O que você faz?`
    ]
    
    const randomNarrative = fallbackNarratives[Math.floor(Math.random() * fallbackNarratives.length)]
    
    return {
      narrative: randomNarrative,
      imageUrl: '/images/placeholder-scene.jpg',
      xp: Math.floor(Math.random() * 15) + 10,
      sceneMood: 'tenso',
      timeOfDay: 'dia'
    }
  }
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    console.log('🎨 Gemini não suporta geração de imagens diretamente')
    console.log('🎨 Prompt recebido:', prompt)
    
    // Gemini 2.0 Flash é apenas texto, não gera imagens
    // Vamos usar uma imagem placeholder específica baseada na classe
    const classImages: Record<string, string> = {
      'guerreiro': '/images/classes/warrior.jpg',
      'mago': '/images/classes/wizard.jpg',
      'ladino': '/images/classes/rogue.jpg',
      'arqueiro': '/images/classes/archer.jpg',
      'clerigo': '/images/classes/cleric.jpg',
      'paladino': '/images/classes/paladin.jpg',
      'necromante': '/images/classes/necromancer.jpg',
      'barbaro': '/images/classes/barbarian.jpg',
      'druida': '/images/classes/druid.jpg',
      'inventor': '/images/classes/inventor.jpg'
    }
    
    // Tentar extrair a classe do prompt
    const lowerPrompt = prompt.toLowerCase()
    for (const [classe, imagePath] of Object.entries(classImages)) {
      if (lowerPrompt.includes(classe)) {
        console.log(`🎨 Usando imagem específica para ${classe}: ${imagePath}`)
        return imagePath
      }
    }
    
    console.log('🎨 Usando imagem placeholder genérica')
    return '/images/placeholder-scene.jpg'

  } catch (error) {
    console.error('Erro ao gerar imagem:', error)
    return '/images/placeholder-scene.jpg'
  }
}

export async function generateCharacterDescription(character: Character): Promise<string> {
  try {
    const prompt = `
Descreva um personagem de RPG de fantasia:

Nome: ${character.nome}
Classe: ${character.classe}
Nível: ${character.level}
Atributos: ${JSON.stringify(character.atributos)}

Crie uma descrição épica e imersiva deste herói em 2-3 frases.
`

    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 256,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates[0].content.parts[0].text

  } catch (error) {
    console.error('Erro ao gerar descrição:', error)
    return `${character.nome} é um ${character.classe} de nível ${character.level}, pronto para aventuras épicas em Altherion.`
  }
}
