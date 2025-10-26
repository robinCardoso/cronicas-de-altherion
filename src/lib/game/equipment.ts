import { Equipment } from '@/types/game'

// Lista de equipamentos disponíveis
export const EQUIPAMENTOS: Record<string, Equipment> = {
  // Armas
  espadaFerro: {
    nome: 'Espada de Ferro',
    bonus: { forca: 3 },
    tipo: 'arma'
  },
  cajadoBasico: {
    nome: 'Cajado Básico',
    bonus: { inteligencia: 2 },
    tipo: 'arma'
  },
  arcoSimples: {
    nome: 'Arco Simples',
    bonus: { agilidade: 2 },
    tipo: 'arma'
  },
  adaga: {
    nome: 'Adaga',
    bonus: { agilidade: 1, forca: 1 },
    tipo: 'arma'
  },
  marteloGuerra: {
    nome: 'Martelo de Guerra',
    bonus: { forca: 4 },
    tipo: 'arma'
  },
  cajadoArcano: {
    nome: 'Cajado Arcano',
    bonus: { inteligencia: 3, sabedoria: 1 },
    tipo: 'arma'
  },

  // Armaduras
  armaduraCouro: {
    nome: 'Armadura de Couro',
    bonus: { vitalidade: 2 },
    tipo: 'armadura'
  },
  armaduraMalha: {
    nome: 'Armadura de Malha',
    bonus: { vitalidade: 3, agilidade: -1 },
    tipo: 'armadura'
  },
  armaduraPlaca: {
    nome: 'Armadura de Placa',
    bonus: { vitalidade: 5, agilidade: -2 },
    tipo: 'armadura'
  },
  tunicaMago: {
    nome: 'Túnica de Mago',
    bonus: { inteligencia: 2, sabedoria: 1 },
    tipo: 'armadura'
  },

  // Acessórios
  anelForca: {
    nome: 'Anel de Força',
    bonus: { forca: 1 },
    tipo: 'acessorio'
  },
  amuletoSabedoria: {
    nome: 'Amuleto de Sabedoria',
    bonus: { sabedoria: 2 },
    tipo: 'acessorio'
  },
  braceleteAgilidade: {
    nome: 'Bracelete de Agilidade',
    bonus: { agilidade: 2 },
    tipo: 'acessorio'
  },
  colarVitalidade: {
    nome: 'Colar de Vitalidade',
    bonus: { vitalidade: 2 },
    tipo: 'acessorio'
  },
  oculosInteligencia: {
    nome: 'Óculos de Inteligência',
    bonus: { inteligencia: 2 },
    tipo: 'acessorio'
  }
}

// Função para obter equipamento por ID
export function getEquipment(id: string): Equipment | undefined {
  return EQUIPAMENTOS[id]
}

// Função para obter todos os equipamentos de um tipo
export function getEquipmentsByType(tipo: Equipment['tipo']): Equipment[] {
  return Object.values(EQUIPAMENTOS).filter(eq => eq.tipo === tipo)
}

// Função para obter equipamentos recomendados para uma classe
export function getRecommendedEquipments(classe: string): string[] {
  const recomendacoes: Record<string, string[]> = {
    guerreiro: ['espadaFerro', 'armaduraMalha', 'anelForca'],
    mago: ['cajadoBasico', 'tunicaMago', 'oculosInteligencia'],
    ladino: ['adaga', 'armaduraCouro', 'braceleteAgilidade'],
    arqueiro: ['arcoSimples', 'armaduraCouro', 'braceleteAgilidade'],
    clerigo: ['cajadoBasico', 'tunicaMago', 'amuletoSabedoria'],
    paladino: ['espadaFerro', 'armaduraMalha', 'amuletoSabedoria'],
    necromante: ['cajadoArcano', 'tunicaMago', 'oculosInteligencia'],
    barbaro: ['marteloGuerra', 'armaduraCouro', 'anelForca'],
    druida: ['cajadoBasico', 'tunicaMago', 'amuletoSabedoria'],
    inventor: ['adaga', 'armaduraCouro', 'oculosInteligencia']
  }

  return recomendacoes[classe] || []
}
