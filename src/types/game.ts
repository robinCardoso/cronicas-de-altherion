// Tipos base do jogo
export interface Character {
  id: string
  nome: string
  classe: CharacterClass
  level: number
  experiencia: number
  idade: number
  nascimento: number
  atributos: Attributes
  equipamentos: string[]
  habilidades: string[]
  inventario: InventoryItem[]
}

export interface Attributes {
  forca: number
  inteligencia: number
  agilidade: number
  vitalidade: number
  sabedoria: number
}

export interface InventoryItem {
  item: string
  quantidade: number
}

export type CharacterClass = 
  | 'guerreiro'
  | 'mago'
  | 'ladino'
  | 'arqueiro'
  | 'clerigo'
  | 'paladino'
  | 'necromante'
  | 'barbaro'
  | 'druida'
  | 'inventor'

export interface ClassInfo {
  nome: string
  descricao: string
  atributosPrincipais: (keyof Attributes)[]
  bonusInicial: Partial<Attributes>
}

export interface Equipment {
  nome: string
  bonus: Partial<Attributes>
  tipo: 'arma' | 'armadura' | 'acessorio'
}

export interface Skill {
  nome: string
  tipo: 'ativa' | 'passiva'
  poder?: number
  atributo?: keyof Attributes
  bonus?: Partial<Attributes>
  descricao: string
}

// Tipos para narrativa
export interface NarrativeResponse {
  narrative: string
  sceneMood: 'nevoa' | 'fogo' | 'tranquilo' | 'tenso' | 'mistico'
  timeOfDay: 'dia' | 'noite' | 'alvorecer' | 'entardecer'
  event?: 'ganho_de_experiencia' | 'combate' | 'exploracao' | 'social'
  xp?: number
  imageUrl?: string
  suggestions?: string[]
}

// Tipos para o mundo
export interface WorldState {
  id: string
  sessaoId: string
  estado: Record<string, any>
  timestamp: number
}

export interface GameSession {
  id: string
  nome: string
  contexto: string
  status: 'ativa' | 'finalizada' | 'pausada'
  jogadores: Player[]
  turnoAtual: number
  createdAt: Date
}

export interface Player {
  id: string
  nome: string
  personagemId: string
  sessaoId: string
  isOnline: boolean
  createdAt: Date
}

export interface Turn {
  id: string
  sessaoId: string
  jogadorId: string
  acao: string
  timestamp: number
}

export interface Narrative {
  id: string
  turnoId: string
  texto: string
  imagemUrl?: string
  metadados: NarrativeResponse
}
