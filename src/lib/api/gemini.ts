import { Character, NarrativeResponse } from '@/types/game'

// Configuração do cliente Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

// Contexto base do mundo
const WORLD_CONTEXT = `
Você é o narrador de um RPG de fantasia medieval chamado "Crônicas de Altherion". 
Este é um mundo mágico e perigoso onde heróis enfrentam desafios épicos no reino de Altherion.

REGRAS IMPORTANTES:
- Sempre responda em português brasileiro
- Seja descritivo e imersivo
- Mantenha a consistência do mundo
- Considere as ações dos jogadores
- Gere consequências realistas
- Use um tom épico e envolvente
- Limite a resposta a 2-3 parágrafos
- Sempre termine com uma pergunta ou situação que exija ação do jogador

MUNDO DE ALTHERION:
- Reino medieval com magia e criaturas fantásticas
- Cidades, florestas, montanhas e masmorras
- NPCs com personalidades únicas
- Sistema de magia baseado em elementos
- Criaturas: dragões, orcs, elfos, anões, etc.
`

export async function generateNarrative(
  character: Character,
  playerAction: string,
  previousContext?: string
): Promise<NarrativeResponse> {
  try {
    const prompt = `
${WORLD_CONTEXT}

PERSONAGEM:
- Nome: ${character.nome}
- Classe: ${character.classe}
- Nível: ${character.level}
- Atributos: ${JSON.stringify(character.atributos)}

AÇÃO DO JOGADOR: "${playerAction}"

${previousContext ? `CONTEXTO ANTERIOR: ${previousContext}` : ''}

Gere uma narrativa épica baseada na ação do jogador. Seja criativo e imersivo!
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
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const narrative = data.candidates[0].content.parts[0].text

    // Gerar imagem baseada na narrativa
    const imagePrompt = `Fantasy RPG scene: ${narrative.substring(0, 200)}...`
    const imageUrl = await generateImage(imagePrompt)

    return {
      narrative,
      imageUrl,
      sceneMood: 'tranquilo',
      timeOfDay: 'dia'
    }

  } catch (error) {
    console.error('Erro ao gerar narrativa:', error)
    
    // Fallback para narrativa local
    return {
      narrative: `Você, ${character.nome}, ${playerAction.toLowerCase()}. O que você faz a seguir?`,
      imageUrl: '/images/placeholder-scene.jpg',
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
    return data.candidates[0].content.parts[0].text

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
