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

EXEMPLO DE RESPOSTA BOA:
Jogador: "quero desbravar a floresta"
Narrador: "Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?"
`

export async function generateNarrative(
  character: Character,
  playerAction: string,
  previousContext?: string
): Promise<NarrativeResponse> {
  try {
    const prompt = `${WORLD_CONTEXT}

PERSONAGEM: ${character.nome} (${character.classe}, Nível ${character.level})
AÇÃO DO JOGADOR: "${playerAction}"

Crie uma narrativa épica e envolvente que desenvolva a história baseada na ação do jogador. Seja criativo, detalhado e cinematográfico!`

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
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000, // Aumentado para aproveitar o poder do Gemini 2.5 Flash
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
    
    const narrative = data.candidates[0].content.parts[0].text
    
    // Verificar se o texto foi gerado
    if (!narrative || narrative.trim() === '') {
      console.error('❌ Texto vazio na resposta:', data)
      throw new Error('Texto não foi gerado pelo Gemini')
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
    
    // Fallback para narrativa local
    return {
      narrative: `Você, ${character.nome}, ${playerAction.toLowerCase()}. O que você faz a seguir?`,
      imageUrl: '/images/placeholder-scene.jpg',
      xp: 10,
      sceneMood: 'tranquilo',
      timeOfDay: 'dia'
    }
  }
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    // Gemini 2.0 Flash tem geração de imagens integrada
    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate an image: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini Image API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('🖼️ Resposta Gemini Imagem:', JSON.stringify(data, null, 2))
    
    // Verificar se há candidatos na resposta
    if (!data.candidates || data.candidates.length === 0) {
      console.error('❌ Estrutura da resposta da imagem:', data)
      throw new Error('Nenhum candidato encontrado na resposta da imagem do Gemini')
    }
    
    // Verificar se há conteúdo na resposta
    if (!data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
      console.error('❌ Estrutura do candidato da imagem:', data.candidates[0])
      throw new Error('Estrutura de conteúdo inválida na resposta da imagem do Gemini')
    }
    
    const imageUrl = data.candidates[0].content.parts[0].text
    
    // Verificar se a URL foi gerada
    if (!imageUrl || imageUrl.trim() === '') {
      console.error('❌ URL vazia na resposta da imagem:', data)
      throw new Error('URL da imagem não foi gerada pelo Gemini')
    }
    
    console.log('✅ Imagem gerada:', imageUrl)
    return imageUrl

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
