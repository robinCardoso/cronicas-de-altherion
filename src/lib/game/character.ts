import { Character, CharacterClass, ClassInfo, Attributes } from '@/types/game'

// Informações das classes de personagem
export const CLASSES: Record<CharacterClass, ClassInfo> = {
  guerreiro: {
    nome: 'Guerreiro',
    descricao: 'Mestre das armas e da força bruta.',
    atributosPrincipais: ['forca', 'vitalidade'],
    bonusInicial: { forca: 3, vitalidade: 2 }
  },
  mago: {
    nome: 'Mago',
    descricao: 'Manipula energia arcana e sabedoria ancestral.',
    atributosPrincipais: ['inteligencia', 'sabedoria'],
    bonusInicial: { inteligencia: 3, sabedoria: 2 }
  },
  ladino: {
    nome: 'Ladino',
    descricao: 'Ágil, sorrateiro e mortal nas sombras.',
    atributosPrincipais: ['agilidade', 'inteligencia'],
    bonusInicial: { agilidade: 3, inteligencia: 2 }
  },
  arqueiro: {
    nome: 'Arqueiro',
    descricao: 'Preciso à distância, caçador nato.',
    atributosPrincipais: ['agilidade', 'sabedoria'],
    bonusInicial: { agilidade: 3, sabedoria: 2 }
  },
  clerigo: {
    nome: 'Clérigo',
    descricao: 'Curandeiro e defensor espiritual.',
    atributosPrincipais: ['sabedoria', 'vitalidade'],
    bonusInicial: { sabedoria: 3, vitalidade: 2 }
  },
  paladino: {
    nome: 'Paladino',
    descricao: 'Guerreiro sagrado, combina fé e espada.',
    atributosPrincipais: ['forca', 'sabedoria'],
    bonusInicial: { forca: 3, sabedoria: 2 }
  },
  necromante: {
    nome: 'Necromante',
    descricao: 'Usa magia sombria e controla mortos.',
    atributosPrincipais: ['inteligencia', 'sabedoria'],
    bonusInicial: { inteligencia: 3, sabedoria: 2 }
  },
  barbaro: {
    nome: 'Bárbaro',
    descricao: 'Selvagem e imbatível em combate corpo a corpo.',
    atributosPrincipais: ['forca', 'vitalidade'],
    bonusInicial: { forca: 3, vitalidade: 2 }
  },
  druida: {
    nome: 'Druida',
    descricao: 'Guardião da natureza, pode mudar de forma.',
    atributosPrincipais: ['sabedoria', 'vitalidade'],
    bonusInicial: { sabedoria: 3, vitalidade: 2 }
  },
  inventor: {
    nome: 'Inventor',
    descricao: 'Mestre de engenhocas e explosivos.',
    atributosPrincipais: ['inteligencia', 'agilidade'],
    bonusInicial: { inteligencia: 3, agilidade: 2 }
  }
}

// Atributos base para todos os personagens
export const BASE_ATTRIBUTES: Attributes = {
  forca: 10,
  inteligencia: 10,
  agilidade: 10,
  vitalidade: 10,
  sabedoria: 10
}

// Função para criar um novo personagem
export function createCharacter(
  nome: string,
  classe: CharacterClass,
  idade: number = 20
): Character {
  const agora = Date.now()
  const classeInfo = CLASSES[classe]
  
  // Aplica bônus da classe aos atributos base
  const atributos: Attributes = { ...BASE_ATTRIBUTES }
  Object.entries(classeInfo.bonusInicial).forEach(([attr, bonus]) => {
    atributos[attr as keyof Attributes] += bonus
  })

  return {
    id: `char_${agora}_${Math.random().toString(36).substr(2, 9)}`,
    nome,
    classe,
    level: 1,
    experiencia: 0,
    idade,
    nascimento: agora,
    atributos,
    equipamentos: [],
    habilidades: [],
    inventario: []
  }
}

// Função para calcular o nível baseado na experiência
export function calcularNivel(experiencia: number): number {
  return Math.floor(Math.sqrt(experiencia / 100)) + 1
}

// Função para calcular a idade do personagem
export function calcularIdade(nascimento: number): number {
  const agora = Date.now()
  const anos = (agora - nascimento) / (1000 * 60 * 60 * 24 * 365)
  return Math.floor(anos)
}

// Função para adicionar experiência
export function adicionarExperiencia(
  personagem: Character,
  xp: number
): Character {
  const novaExperiencia = personagem.experiencia + xp
  const novoLevel = calcularNivel(novaExperiencia)
  
  return {
    ...personagem,
    experiencia: novaExperiencia,
    level: novoLevel,
    idade: calcularIdade(personagem.nascimento)
  }
}

// Função para obter informações da classe
export function getClassInfo(classe: CharacterClass): ClassInfo {
  return CLASSES[classe]
}

// Função para obter todos os atributos totais (base + equipamentos)
export function getTotalAttributes(personagem: Character): Attributes {
  // Por enquanto, retorna apenas os atributos base
  // Futuramente, aqui será somado os bônus dos equipamentos
  return { ...personagem.atributos }
}
