import { Skill } from '@/types/game'

// Lista de habilidades disponíveis
export const HABILIDADES: Record<string, Skill> = {
  // Habilidades de Guerreiro
  golpePesado: {
    nome: 'Golpe Pesado',
    tipo: 'ativa',
    poder: 10,
    atributo: 'forca',
    descricao: 'Um ataque devastador que causa dano extra baseado na força.'
  },
  defesa: {
    nome: 'Defesa',
    tipo: 'passiva',
    bonus: { vitalidade: 2 },
    descricao: 'Aumenta a resistência a danos físicos.'
  },

  // Habilidades de Mago
  bolaDeFogo: {
    nome: 'Bola de Fogo',
    tipo: 'ativa',
    poder: 12,
    atributo: 'inteligencia',
    descricao: 'Conjura uma esfera de fogo que explode ao atingir o alvo.'
  },
  meditacao: {
    nome: 'Meditação',
    tipo: 'passiva',
    bonus: { sabedoria: 2 },
    descricao: 'Aumenta a regeneração de mana e resistência mágica.'
  },

  // Habilidades de Ladino
  furtividade: {
    nome: 'Furtividade',
    tipo: 'passiva',
    bonus: { agilidade: 2 },
    descricao: 'Permite mover-se silenciosamente e atacar pelas costas.'
  },
  golpeFurtivo: {
    nome: 'Golpe Furtivo',
    tipo: 'ativa',
    poder: 8,
    atributo: 'agilidade',
    descricao: 'Um ataque rápido e preciso que ignora parte da defesa.'
  },

  // Habilidades de Arqueiro
  tiroPreciso: {
    nome: 'Tiro Preciso',
    tipo: 'ativa',
    poder: 9,
    atributo: 'agilidade',
    descricao: 'Um tiro certeiro que sempre acerta o alvo.'
  },
  visaoAguia: {
    nome: 'Visão de Águia',
    tipo: 'passiva',
    bonus: { sabedoria: 2 },
    descricao: 'Aumenta o alcance e precisão dos ataques à distância.'
  },

  // Habilidades de Clérigo
  cura: {
    nome: 'Cura',
    tipo: 'ativa',
    poder: 15,
    atributo: 'sabedoria',
    descricao: 'Restaura pontos de vida do alvo.'
  },
  protecaoDivina: {
    nome: 'Proteção Divina',
    tipo: 'passiva',
    bonus: { vitalidade: 2 },
    descricao: 'Reduz o dano recebido de ataques sombrios.'
  },

  // Habilidades de Paladino
  golpeSagrado: {
    nome: 'Golpe Sagrado',
    tipo: 'ativa',
    poder: 11,
    atributo: 'forca',
    descricao: 'Um ataque abençoado que causa dano extra a criaturas sombrias.'
  },
  auraProtecao: {
    nome: 'Aura de Proteção',
    tipo: 'passiva',
    bonus: { sabedoria: 2 },
    descricao: 'Protege aliados próximos de efeitos negativos.'
  },

  // Habilidades de Necromante
  drenarVida: {
    nome: 'Drenar Vida',
    tipo: 'ativa',
    poder: 10,
    atributo: 'inteligencia',
    descricao: 'Drena a vida do alvo e transfere para o necromante.'
  },
  resistenciaMorte: {
    nome: 'Resistência à Morte',
    tipo: 'passiva',
    bonus: { sabedoria: 2 },
    descricao: 'Reduz o dano de ataques sagrados e aumenta a resistência.'
  },

  // Habilidades de Bárbaro
  furia: {
    nome: 'Fúria',
    tipo: 'ativa',
    poder: 13,
    atributo: 'forca',
    descricao: 'Entra em estado de fúria, aumentando o dano mas reduzindo a defesa.'
  },
  resistencia: {
    nome: 'Resistência',
    tipo: 'passiva',
    bonus: { vitalidade: 3 },
    descricao: 'Aumenta significativamente a resistência a danos físicos.'
  },

  // Habilidades de Druida
  transformacao: {
    nome: 'Transformação',
    tipo: 'ativa',
    poder: 0,
    atributo: 'sabedoria',
    descricao: 'Transforma-se em um animal, ganhando habilidades especiais.'
  },
  conexaoNatureza: {
    nome: 'Conexão com a Natureza',
    tipo: 'passiva',
    bonus: { sabedoria: 2 },
    descricao: 'Aumenta a regeneração em ambientes naturais.'
  },

  // Habilidades de Inventor
  explosivo: {
    nome: 'Explosivo',
    tipo: 'ativa',
    poder: 14,
    atributo: 'inteligencia',
    descricao: 'Cria e lança um explosivo que causa dano em área.'
  },
  engenhocas: {
    nome: 'Engenhocas',
    tipo: 'passiva',
    bonus: { agilidade: 2 },
    descricao: 'Permite criar e usar dispositivos mecânicos úteis.'
  }
}

// Função para obter habilidade por ID
export function getSkill(id: string): Skill | undefined {
  return HABILIDADES[id]
}

// Função para obter habilidades recomendadas para uma classe
export function getRecommendedSkills(classe: string): string[] {
  const recomendacoes: Record<string, string[]> = {
    guerreiro: ['golpePesado', 'defesa'],
    mago: ['bolaDeFogo', 'meditacao'],
    ladino: ['furtividade', 'golpeFurtivo'],
    arqueiro: ['tiroPreciso', 'visaoAguia'],
    clerigo: ['cura', 'protecaoDivina'],
    paladino: ['golpeSagrado', 'auraProtecao'],
    necromante: ['drenarVida', 'resistenciaMorte'],
    barbaro: ['furia', 'resistencia'],
    druida: ['transformacao', 'conexaoNatureza'],
    inventor: ['explosivo', 'engenhocas']
  }

  return recomendacoes[classe] || []
}

// Função para obter todas as habilidades de um tipo
export function getSkillsByType(tipo: Skill['tipo']): Skill[] {
  return Object.values(HABILIDADES).filter(skill => skill.tipo === tipo)
}

// Função para treinar uma habilidade
export function treinarHabilidade(
  personagem: any,
  habilidadeId: string
): { success: boolean; message: string } {
  const habilidade = getSkill(habilidadeId)
  
  if (!habilidade) {
    return { success: false, message: 'Habilidade não encontrada.' }
  }

  if (personagem.habilidades.includes(habilidadeId)) {
    return { success: false, message: 'Você já possui esta habilidade.' }
  }

  // Adiciona a habilidade e experiência
  personagem.habilidades.push(habilidadeId)
  personagem.experiencia += 50

  return { 
    success: true, 
    message: `Você aprendeu ${habilidade.nome}! (+50 XP)` 
  }
}
