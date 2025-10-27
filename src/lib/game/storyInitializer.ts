// src/lib/game/storyInitializer.ts

import { Character } from '@/types/game'
import { generateNarrative } from '@/lib/api/ai-provider'
import { createAIContext, processAIResponse } from './aiContextBuilder'

// Estrutura base definida pelo designer
export const WORLD_CONTEXT = {
  nome: "Altherion",
  situacao: "O reino está em paz, mas rumores de antigas profecias começam a circular",
  localizacao: "Aldeia de Pedravale, cercada por florestas e montanhas",
  clima: "Primavera, com ventos suaves e sol brilhante",
  ameacas: ["Lobos selvagens", "Bandidos ocasionais", "Ruínas antigas"],
  oportunidades: ["Exploração", "Comércio", "Aventuras"]
}

// Ganchos narrativos iniciais
export const INITIAL_HOOKS = {
  guerreiro: {
    contexto: "Você é um jovem guerreiro recém-chegado à aldeia, buscando provar seu valor",
    primeiraEscolha: "Investigar rumores de bandidos nas estradas ou treinar com os guardas locais",
    objetivo: "Proteger a aldeia e ganhar respeito"
  },
  mago: {
    contexto: "Você chegou à aldeia seguindo antigos textos que mencionam energia arcana na região",
    primeiraEscolha: "Estudar as ruínas antigas ou ajudar os aldeões com problemas mágicos",
    objetivo: "Desvendar os segredos arcanos de Altherion"
  },
  ladino: {
    contexto: "Você é um viajante experiente que conhece os caminhos secretos da região",
    primeiraEscolha: "Explorar os túneis subterrâneos ou investigar atividades suspeitas",
    objetivo: "Descobrir informações valiosas e oportunidades"
  },
  arqueiro: {
    contexto: "Você é um caçador habilidoso que chegou para proteger a aldeia das ameaças da floresta",
    primeiraEscolha: "Patrulhar as fronteiras da floresta ou treinar novos caçadores",
    objetivo: "Manter a segurança da região"
  },
  clerigo: {
    contexto: "Você é um clérigo em peregrinação, buscando espalhar a luz divina",
    primeiraEscolha: "Curar os doentes da aldeia ou investigar sinais divinos",
    objetivo: "Servir aos deuses e ajudar os necessitados"
  },
  paladino: {
    contexto: "Você é um cavaleiro sagrado em missão para proteger os inocentes",
    primeiraEscolha: "Estabelecer uma base de operações ou investigar ameaças sobrenaturais",
    objetivo: "Combater o mal e proteger os justos"
  },
  necromante: {
    contexto: "Você chegou à aldeia seguindo rumores de antigas magias proibidas",
    primeiraEscolha: "Explorar os cemitérios antigos ou estudar os textos proibidos",
    objetivo: "Dominar as artes das trevas"
  },
  barbaro: {
    contexto: "Você é um guerreiro das tribos do norte, buscando novas aventuras",
    primeiraEscolha: "Demonstrar sua força em combate ou explorar territórios selvagens",
    objetivo: "Provar sua coragem e força"
  },
  druida: {
    contexto: "Você é um guardião da natureza que sente desequilíbrios na floresta",
    primeiraEscolha: "Comunicar-se com os espíritos da floresta ou investigar a natureza",
    objetivo: "Restaurar o equilíbrio natural"
  },
  inventor: {
    contexto: "Você é um inventor que chegou para estudar as tecnologias antigas da região",
    primeiraEscolha: "Examinar as ruínas tecnológicas ou ajudar com invenções práticas",
    objetivo: "Desenvolver novas tecnologias e descobertas"
  }
}

// Função para gerar história inicial personalizada
export function generateInitialStory(character: Character): string {
  const hook = INITIAL_HOOKS[character.classe]
  
  return `
**Bem-vindo a Altherion, ${character.nome}!**

${hook.contexto}

**Situação Atual:**
${WORLD_CONTEXT.situacao}

**Localização:**
Você está em ${WORLD_CONTEXT.localizacao}. ${WORLD_CONTEXT.clima}

**Sua Primeira Decisão:**
${hook.primeiraEscolha}

**Seu Objetivo:**
${hook.objetivo}

**O que você faz primeiro?**
`
}

// Sistema de evolução narrativa
export const EVOLUTION_TRIGGERS = {
  levelUp: {
    message: "Você sente uma energia crescer dentro de você...",
    effects: ["Novos atributos", "Habilidades desbloqueadas", "Equipamentos melhores"]
  },
  xpGain: {
    message: "Você aprende algo novo com essa experiência...",
    effects: ["Conhecimento expandido", "Habilidades aprimoradas"]
  },
  equipmentFound: {
    message: "Você encontra um item interessante...",
    effects: ["Novo equipamento", "Bonificações de atributos"]
  }
}

// Função para gerar consequências das ações com IA real
export async function generateActionConsequence(
  action: string, 
  character: Character,
  aiContext?: any
): Promise<{
  narrative: string
  xpGain?: number
  equipmentFound?: string
  levelUp?: boolean
  sceneMood?: string
  timeOfDay?: string
  event?: string
  imageUrl?: string
}> {
  try {
    // Usar IA real se disponível
    const aiResponse = await generateNarrative(character, action)
    
    return {
      narrative: aiResponse.narrative,
      xpGain: aiResponse.xp || Math.floor(Math.random() * 10) + 5,
      sceneMood: aiResponse.sceneMood,
      timeOfDay: aiResponse.timeOfDay,
      event: aiResponse.event,
      imageUrl: aiResponse.imageUrl,
      levelUp: false
    }
  } catch (error) {
    console.error('Erro ao gerar narrativa com IA:', error)
    
    // Fallback para resposta épica
    return {
      narrative: `Você se aventura pela densa floresta de Pedravale, onde os raios de sol filtram entre as folhas antigas. Entre as árvores centenárias, você encontra pegadas frescas de lobos e ouve sons misteriosos ecoando na distância. De repente, um grupo de três bandidos armados aparece à sua frente, bloqueando o caminho estreito. Eles parecem nervosos e carregam espadas enferrujadas. O líder grita: 'Ninguém passa por aqui sem pagar pedágio!' O que você faz?`,
      xpGain: Math.floor(Math.random() * 10) + 5,
      sceneMood: 'tenso',
      timeOfDay: 'dia',
      levelUp: false
    }
  }
}
