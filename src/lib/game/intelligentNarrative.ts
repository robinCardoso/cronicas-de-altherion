import { Character } from '@/types/game'

// Sistema de análise de poder
export interface PowerLevel {
  level: number
  health: number
  attack: number
  defense: number
  magic?: number
  special?: string[]
}

// Análise de poder do jogador
export function analyzePlayerPower(character: Character): PowerLevel {
  const baseStats = {
    level: character.level,
    health: 50 + (character.level * 10),
    attack: 15 + (character.level * 5),
    defense: 10 + (character.level * 3),
  }

  // Bonificações por classe
  const classBonuses = {
    guerreiro: { attack: 10, defense: 5 },
    mago: { attack: 5, defense: 2, magic: 20 },
    ladino: { attack: 8, defense: 3, special: ['furtividade'] },
    arqueiro: { attack: 12, defense: 2, special: ['precisão'] },
    clerigo: { attack: 3, defense: 8, magic: 15, special: ['cura'] },
    paladino: { attack: 8, defense: 10, magic: 10, special: ['proteção'] },
    necromante: { attack: 7, defense: 4, magic: 25, special: ['necromancia'] },
    barbaro: { attack: 15, defense: 3, special: ['fúria'] },
    druida: { attack: 6, defense: 6, magic: 18, special: ['natureza'] },
    inventor: { attack: 9, defense: 7, special: ['engenharia'] }
  }

  const bonus = classBonuses[character.classe] || {}
  
  return {
    level: baseStats.level,
    health: baseStats.health,
    attack: baseStats.attack + (bonus.attack || 0),
    defense: baseStats.defense + (bonus.defense || 0),
    magic: bonus.magic || 0,
    special: bonus.special || []
  }
}

// Análise de poder dos inimigos
export function analyzeEnemyPower(enemyType: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): PowerLevel {
  const enemyStats = {
    'bandido': { level: 2, health: 30, attack: 12, defense: 8 },
    'lobo': { level: 1, health: 20, attack: 8, defense: 5 },
    'goblin': { level: 1, health: 15, attack: 6, defense: 4 },
    'orc': { level: 3, health: 50, attack: 18, defense: 12 },
    'dragão': { level: 10, health: 200, attack: 50, defense: 30 },
    'líder_bandidos': { level: 4, health: 60, attack: 20, defense: 15, special: ['liderança'] }
  }

  const base = enemyStats[enemyType] || enemyStats['bandido']
  
  // Ajustar por dificuldade
  const multiplier = {
    easy: 0.7,
    medium: 1.0,
    hard: 1.5
  }[difficulty]

  return {
    level: Math.floor(base.level * multiplier),
    health: Math.floor(base.health * multiplier),
    attack: Math.floor(base.attack * multiplier),
    defense: Math.floor(base.defense * multiplier),
    special: base.special || []
  }
}

// Calcular chances de vitória
export function calculateVictoryChance(player: PowerLevel, enemy: PowerLevel): number {
  const playerScore = (player.attack + player.defense + player.health / 10) * player.level
  const enemyScore = (enemy.attack + enemy.defense + enemy.health / 10) * enemy.level
  
  const ratio = playerScore / enemyScore
  
  // Converter para porcentagem
  if (ratio >= 2) return 95 // Vitória quase certa
  if (ratio >= 1.5) return 80 // Vitória provável
  if (ratio >= 1.2) return 65 // Vitória possível
  if (ratio >= 1) return 50 // Empate
  if (ratio >= 0.8) return 35 // Derrota possível
  if (ratio >= 0.6) return 20 // Derrota provável
  return 5 // Derrota quase certa
}

// Sistema de opções inteligentes
export interface IntelligentOption {
  id: string
  text: string
  type: 'combat' | 'diplomacy' | 'stealth' | 'magic' | 'exploration'
  risk: 'low' | 'medium' | 'high'
  successChance: number
  consequences: string[]
  requirements?: string[]
}

// Gerar opções baseadas na situação
export function generateIntelligentOptions(
  situation: string,
  player: Character,
  enemy?: PowerLevel
): IntelligentOption[] {
  const playerPower = analyzePlayerPower(player)
  
  // Situações específicas
  if (situation.includes('bandidos') && situation.includes('pedágio')) {
    return [
      {
        id: 'pay_toll',
        text: 'Pagar o pedágio para passar em paz',
        type: 'diplomacy',
        risk: 'low',
        successChance: 90,
        consequences: ['Perde algumas moedas', 'Passa sem conflito', 'Ganha informação sobre a região']
      },
      {
        id: 'negotiate',
        text: 'Tentar negociar um preço menor',
        type: 'diplomacy',
        risk: 'medium',
        successChance: 60,
        consequences: ['Pode conseguir desconto', 'Pode irritar os bandidos', 'Mostra suas habilidades sociais']
      },
      {
        id: 'fight',
        text: 'Recusar e lutar contra os bandidos',
        type: 'combat',
        risk: 'high',
        successChance: enemy ? calculateVictoryChance(playerPower, enemy) : 30,
        consequences: ['Risco de morte', 'Pode ganhar equipamentos', 'Reputação de guerreiro']
      },
      {
        id: 'sneak',
        text: 'Tentar passar despercebido',
        type: 'stealth',
        risk: 'medium',
        successChance: player.classe === 'ladino' ? 70 : 40,
        consequences: ['Evita conflito', 'Pode ser descoberto', 'Desenvolve habilidades furtivas']
      }
    ]
  }

  if (situation.includes('floresta') && situation.includes('explorar')) {
    return [
      {
        id: 'explore_carefully',
        text: 'Explorar com cuidado, procurando por perigos',
        type: 'exploration',
        risk: 'low',
        successChance: 80,
        consequences: ['Descobre recursos', 'Evita armadilhas', 'Aprende sobre a área']
      },
      {
        id: 'explore_aggressively',
        text: 'Explorar rapidamente, sem medo',
        type: 'exploration',
        risk: 'high',
        successChance: 50,
        consequences: ['Pode encontrar tesouros', 'Risco de encontrar perigos', 'Mostra coragem']
      },
      {
        id: 'use_magic',
        text: 'Usar magia para detectar perigos',
        type: 'magic',
        risk: 'low',
        successChance: player.classe === 'mago' || player.classe === 'clerigo' ? 85 : 30,
        consequences: ['Detecta ameaças', 'Gasta energia mágica', 'Pode atrair atenção']
      }
    ]
  }

  // Opções genéricas
  return [
    {
      id: 'observe',
      text: 'Observar a situação antes de agir',
      type: 'exploration',
      risk: 'low',
      successChance: 90,
      consequences: ['Ganha informações', 'Evita erros', 'Planeja melhor']
    },
    {
      id: 'talk',
      text: 'Tentar conversar e entender a situação',
      type: 'diplomacy',
      risk: 'low',
      successChance: 70,
      consequences: ['Pode resolver pacificamente', 'Ganha aliados', 'Aprende sobre o mundo']
    },
    {
      id: 'act_carefully',
      text: 'Agir com cautela e estratégia',
      type: 'exploration',
      risk: 'medium',
      successChance: 60,
      consequences: ['Reduz riscos', 'Pode ser lento', 'Mostra sabedoria']
    }
  ]
}

// Filtrar respostas absurdas
export function filterAbsurdActions(action: string): boolean {
  const absurdPatterns = [
    /peido|pum|gás/i,
    /mijar|urinar|xixi/i,
    /cagar|defecar|cocô/i,
    /matar.*sem.*lutar/i,
    /voar.*sem.*magia/i,
    /teleportar.*sem.*poder/i
  ]

  return !absurdPatterns.some(pattern => pattern.test(action))
}

// Gerar resposta inteligente baseada na ação
export function generateIntelligentResponse(
  action: string,
  character: Character,
  situation: string
): {
  narrative: string
  options: IntelligentOption[]
  consequences: string[]
  xp: number
} {
  // Verificar se a ação é absurda
  if (!filterAbsurdActions(action)) {
    return {
      narrative: `Você tenta ${action.toLowerCase()}, mas percebe que isso não faz sentido na situação atual. Os bandidos olham para você com confusão, e você se dá conta de que precisa de uma abordagem mais séria. O que você realmente faz?`,
      options: generateIntelligentOptions(situation, character),
      consequences: ['Perde tempo', 'Confunde os inimigos', 'Aprende sobre estratégia'],
      xp: 5
    }
  }

  // Analisar a ação e gerar resposta apropriada
  const playerPower = analyzePlayerPower(character)
  
  if (action.toLowerCase().includes('matar') || action.toLowerCase().includes('atacar')) {
    const enemyPower = analyzeEnemyPower('líder_bandidos')
    const victoryChance = calculateVictoryChance(playerPower, enemyPower)
    
    if (victoryChance < 30) {
      return {
        narrative: `Você se prepara para atacar o líder dos bandidos, mas uma voz interior te avisa: "Cuidado! Este é um guerreiro experiente, muito mais forte que você." O líder sorri com confiança, segurando sua espada com firmeza. Você percebe que precisa de uma estratégia melhor. O que você faz?`,
        options: generateIntelligentOptions(situation, character, enemyPower),
        consequences: ['Evita morte certa', 'Aprende sobre estratégia', 'Ganha experiência'],
        xp: 10
      }
    }
  }

  // Resposta padrão inteligente
  return {
    narrative: `Você ${action.toLowerCase()}. A situação se desenvolve de forma interessante, e você percebe que há várias possibilidades diante de você. O que você escolhe fazer a seguir?`,
    options: generateIntelligentOptions(situation, character),
    consequences: ['Abre novas possibilidades', 'Desenvolve a história', 'Ganha experiência'],
    xp: 15
  }
}
