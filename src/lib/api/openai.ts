import OpenAI from 'openai'
import { Character, NarrativeResponse } from '@/types/game'

// Função para obter o cliente OpenAI
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY não encontrada. Verifique se está configurada no arquivo .env.local')
  }
  
  return new OpenAI({
    apiKey: apiKey,
  })
}

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
- Limite as respostas a 2-3 parágrafos
`

// Função para gerar narrativa baseada nas ações dos jogadores
export async function generateNarrative(
  character: Character,
  action: string,
  worldState?: any,
  otherPlayersActions?: string[]
): Promise<NarrativeResponse> {
  try {
    // Monta o prompt contextual
    const prompt = buildNarrativePrompt(character, action, worldState, otherPlayersActions)
    
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: WORLD_CONTEXT
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    })

    const narrative = completion.choices[0]?.message?.content || "Algo misterioso acontece..."

    // Determina o mood da cena baseado na narrativa
    const sceneMood = determineSceneMood(narrative)
    const timeOfDay = determineTimeOfDay(narrative)
    const event = determineEvent(narrative)

    return {
      narrative,
      sceneMood,
      timeOfDay,
      event,
      xp: calculateXP(event, action)
    }
  } catch (error) {
    console.error('Erro ao gerar narrativa:', error)
    return {
      narrative: "O destino parece incerto neste momento...",
      sceneMood: "tranquilo",
      timeOfDay: "dia",
      event: "exploracao",
      xp: 10
    }
  }
}

// Função para gerar imagem baseada na narrativa
export async function generateSceneImage(
  narrative: string,
  sceneMood: string,
  timeOfDay: string
): Promise<string | null> {
  try {
    const imagePrompt = buildImagePrompt(narrative, sceneMood, timeOfDay)
    
    const openai = getOpenAIClient()
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    })

    return response.data[0]?.url || null
  } catch (error) {
    console.error('Erro ao gerar imagem:', error)
    return null
  }
}

// Função auxiliar para construir o prompt de narrativa
function buildNarrativePrompt(
  character: Character,
  action: string,
  worldState?: any,
  otherPlayersActions?: string[]
): string {
  const classInfo = character.classe
  const level = character.level
  
  let prompt = `
CONTEXTO DO PERSONAGEM:
- Nome: ${character.nome}
- Classe: ${classInfo}
- Nível: ${level}
- Atributos: Força ${character.atributos.forca}, Inteligência ${character.atributos.inteligencia}, Agilidade ${character.atributos.agilidade}, Vitalidade ${character.atributos.vitalidade}, Sabedoria ${character.atributos.sabedoria}

AÇÃO DO JOGADOR:
"${action}"

`

  if (otherPlayersActions && otherPlayersActions.length > 0) {
    prompt += `
AÇÕES DE OUTROS JOGADORES:
${otherPlayersActions.map((action, index) => `- Jogador ${index + 1}: ${action}`).join('\n')}

`
  }

  if (worldState) {
    prompt += `
ESTADO ATUAL DO MUNDO:
${JSON.stringify(worldState, null, 2)}

`
  }

  prompt += `
INSTRUÇÕES:
- Descreva o que acontece como resultado da ação
- Considere a classe e nível do personagem
- Seja criativo e envolvente
- Mantenha a consistência do mundo
- Gere consequências interessantes
- Use linguagem épica e descritiva

Narração:`

  return prompt
}

// Função auxiliar para construir o prompt de imagem
function buildImagePrompt(narrative: string, sceneMood: string, timeOfDay: string): string {
  const moodDescriptions = {
    nevoa: "misty, foggy atmosphere",
    fogo: "fire, flames, burning",
    tranquilo: "peaceful, serene",
    tenso: "tense, dramatic",
    mistico: "mystical, magical"
  }

  const timeDescriptions = {
    dia: "bright daylight",
    noite: "dark night",
    alvorecer: "dawn, sunrise",
    entardecer: "sunset, dusk"
  }

  return `Fantasy RPG scene: ${narrative.substring(0, 200)}... ${moodDescriptions[sceneMood as keyof typeof moodDescriptions]}, ${timeDescriptions[timeOfDay as keyof typeof timeDescriptions]}, medieval fantasy art style, detailed, atmospheric`
}

// Função auxiliar para determinar o mood da cena
function determineSceneMood(narrative: string): NarrativeResponse['sceneMood'] {
  const text = narrative.toLowerCase()
  
  if (text.includes('névoa') || text.includes('neblina') || text.includes('mistério')) {
    return 'nevoa'
  }
  if (text.includes('fogo') || text.includes('chamas') || text.includes('queimar')) {
    return 'fogo'
  }
  if (text.includes('tenso') || text.includes('perigo') || text.includes('ameaça')) {
    return 'tenso'
  }
  if (text.includes('mágico') || text.includes('encantado') || text.includes('arcano')) {
    return 'mistico'
  }
  
  return 'tranquilo'
}

// Função auxiliar para determinar o horário
function determineTimeOfDay(narrative: string): NarrativeResponse['timeOfDay'] {
  const text = narrative.toLowerCase()
  
  if (text.includes('noite') || text.includes('escuro') || text.includes('lua')) {
    return 'noite'
  }
  if (text.includes('alvorecer') || text.includes('amanhecer') || text.includes('nascer do sol')) {
    return 'alvorecer'
  }
  if (text.includes('entardecer') || text.includes('pôr do sol') || text.includes('crepúsculo')) {
    return 'entardecer'
  }
  
  return 'dia'
}

// Função auxiliar para determinar o tipo de evento
function determineEvent(narrative: string): NarrativeResponse['event'] {
  const text = narrative.toLowerCase()
  
  if (text.includes('luta') || text.includes('combate') || text.includes('batalha')) {
    return 'combate'
  }
  if (text.includes('conversa') || text.includes('fala') || text.includes('diálogo')) {
    return 'social'
  }
  
  return 'exploracao'
}

// Função auxiliar para calcular XP baseado no evento
function calculateXP(event: string, action: string): number {
  const baseXP = {
    exploracao: 10,
    social: 15,
    combate: 25,
    ganho_de_experiencia: 20
  }
  
  return baseXP[event as keyof typeof baseXP] || 10
}
