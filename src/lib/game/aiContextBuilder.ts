// src/lib/game/aiContextBuilder.ts

import { Character, NarrativeResponse } from '@/types/game'
import { WORLD_CONTEXT, INITIAL_HOOKS } from './storyInitializer'

// Interface para contexto da IA
export interface AIContext {
  character: Character
  worldState: string
  previousActions: string[]
  currentLocation: string
  mood: string
  timeOfDay: string
  sessionHistory: string[]
}

// Builder de contexto para IA
export class AIContextBuilder {
  private context: AIContext

  constructor(character: Character) {
    this.context = {
      character,
      worldState: WORLD_CONTEXT.situacao,
      previousActions: [],
      currentLocation: WORLD_CONTEXT.localizacao,
      mood: 'tranquilo',
      timeOfDay: 'dia',
      sessionHistory: []
    }
  }

  // Adicionar ação ao contexto
  addAction(action: string): void {
    this.context.previousActions.push(action)
    this.context.sessionHistory.push(`Ação: ${action}`)
  }

  // Adicionar resultado da IA ao contexto
  addAIResponse(response: NarrativeResponse): void {
    this.context.sessionHistory.push(`IA: ${response.narrative}`)
    
    if (response.sceneMood) {
      this.context.mood = response.sceneMood
    }
    
    if (response.timeOfDay) {
      this.context.timeOfDay = response.timeOfDay
    }
  }

  // Construir prompt para IA
  buildPrompt(playerAction: string): string {
    const hook = INITIAL_HOOKS[this.context.character.classe]
    
    return `
# CONTEXTO DO JOGO - CRÔNICAS DE ALTHERION

## PERSONAGEM
- Nome: ${this.context.character.nome}
- Classe: ${this.context.character.classe}
- Nível: ${this.context.character.level}
- XP: ${this.context.character.experiencia}
- Atributos: ${JSON.stringify(this.context.character.atributos)}

## MUNDO
- Situação: ${this.context.worldState}
- Localização: ${this.context.currentLocation}
- Clima: ${WORLD_CONTEXT.clima}
- Ameaças: ${WORLD_CONTEXT.ameacas.join(', ')}
- Oportunidades: ${WORLD_CONTEXT.oportunidades.join(', ')}

## CONTEXTO DO PERSONAGEM
- Background: ${hook.contexto}
- Objetivo: ${hook.objetivo}

## HISTÓRICO DA SESSÃO
${this.context.sessionHistory.slice(-5).join('\n')}

## AÇÃO ATUAL
O jogador quer: "${playerAction}"

## INSTRUÇÕES PARA IA
1. Gere uma narrativa envolvente baseada na ação do jogador
2. Considere a classe e atributos do personagem
3. Mantenha consistência com o mundo de Altherion
4. Crie consequências interessantes e lógicas
5. Sugira próximos passos sem ser muito direto
6. Use linguagem narrativa rica e imersiva
7. Inclua detalhes sensoriais (sons, cheiros, texturas)
8. Mantenha o tom adequado ao humor da cena

## FORMATO DE RESPOSTA
Responda APENAS com um JSON válido no formato:
{
  "narrative": "Texto narrativo detalhado...",
  "sceneMood": "tranquilo|tenso|mistico|nevoa|fogo",
  "timeOfDay": "dia|noite|alvorecer|entardecer",
  "event": "ganho_de_experiencia|combate|exploracao|social",
  "xp": 10,
  "imageUrl": "URL da imagem gerada"
}

IMPORTANTE: Responda APENAS com o JSON, sem texto adicional.
`
  }

  // Obter contexto atual
  getContext(): AIContext {
    return { ...this.context }
  }

  // Atualizar estado do mundo
  updateWorldState(newState: string): void {
    this.context.worldState = newState
  }

  // Atualizar localização
  updateLocation(newLocation: string): void {
    this.context.currentLocation = newLocation
  }
}

// Função utilitária para criar contexto
export function createAIContext(character: Character): AIContextBuilder {
  return new AIContextBuilder(character)
}

// Função para processar resposta da IA
export function processAIResponse(response: string): NarrativeResponse {
  try {
    const parsed = JSON.parse(response)
    
    // Validar campos obrigatórios
    if (!parsed.narrative) {
      throw new Error('Narrative é obrigatório')
    }
    
    return {
      narrative: parsed.narrative,
      sceneMood: parsed.sceneMood || 'tranquilo',
      timeOfDay: parsed.timeOfDay || 'dia',
      event: parsed.event,
      xp: parsed.xp || 0,
      imageUrl: parsed.imageUrl
    }
  } catch (error) {
    console.error('Erro ao processar resposta da IA:', error)
    
    // Fallback para resposta básica
    return {
      narrative: 'A ação foi executada com sucesso. O que você faz a seguir?',
      sceneMood: 'tranquilo',
      timeOfDay: 'dia',
      xp: 5
    }
  }
}
