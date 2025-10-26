import { CharacterClass } from '@/types/game'

export interface ClassDetails {
  nome: string
  descricao: string
  descricaoLonga: string
  historia: string
  atributosPrincipais: string[]
  bonusInicial: Record<string, number>
  habilidadesIniciais: string[]
  equipamentosRecomendados: string[]
  especialidades: string[]
  fraquezas: string[]
  estiloJogo: string
  icone: string
  cor: string
  imagem: string
}

export const CLASS_DETAILS: Record<CharacterClass, ClassDetails> = {
  guerreiro: {
    nome: 'Guerreiro',
    descricao: 'Mestre das armas e da força bruta.',
    descricaoLonga: 'Os guerreiros são combatentes experientes que dominam o uso de armas e armaduras. Eles são a linha de frente em qualquer batalha, protegendo aliados e causando dano devastador aos inimigos.',
    historia: 'Treinados desde jovens nas artes marciais, os guerreiros são a espinha dorsal dos exércitos. Sua coragem e determinação os tornam líderes naturais em combate.',
    atributosPrincipais: ['forca', 'vitalidade'],
    bonusInicial: { forca: 3, vitalidade: 2 },
    habilidadesIniciais: ['golpePesado', 'defesa'],
    equipamentosRecomendados: ['espadaFerro', 'armaduraMalha', 'anelForca'],
    especialidades: ['Combate corpo a corpo', 'Proteção de aliados', 'Resistência a danos'],
    fraquezas: ['Magia', 'Ataques à distância', 'Mobilidade limitada'],
    estiloJogo: 'Frontline Tank - Fique na linha de frente protegendo aliados',
    icone: '⚔️',
    cor: 'red',
    imagem: '/images/classes/guerreiro.jpg'
  },
  mago: {
    nome: 'Mago',
    descricao: 'Manipula energia arcana e sabedoria ancestral.',
    descricaoLonga: 'Os magos são estudiosos das artes arcanas, capazes de manipular as forças fundamentais do universo. Sua sabedoria e conhecimento os tornam poderosos aliados em qualquer aventura.',
    historia: 'Dedicados ao estudo das artes arcanas desde a infância, os magos passam anos em bibliotecas e laboratórios, desvendando os segredos da magia.',
    atributosPrincipais: ['inteligencia', 'sabedoria'],
    bonusInicial: { inteligencia: 3, sabedoria: 2 },
    habilidadesIniciais: ['bolaDeFogo', 'meditacao'],
    equipamentosRecomendados: ['cajadoBasico', 'tunicaMago', 'oculosInteligencia'],
    especialidades: ['Magia ofensiva', 'Conhecimento arcano', 'Resolução de enigmas'],
    fraquezas: ['Combate corpo a corpo', 'Armaduras pesadas', 'Resistência física'],
    estiloJogo: 'Glass Cannon - Cause muito dano, mas mantenha distância',
    icone: '🧙‍♂️',
    cor: 'blue',
    imagem: '/images/classes/mago.jpg'
  },
  ladino: {
    nome: 'Ladino',
    descricao: 'Ágil, sorrateiro e mortal nas sombras.',
    descricaoLonga: 'Os ladinos são mestres da furtividade e da precisão. Eles se movem como sombras, atacando pelos pontos fracos dos inimigos e desaparecendo antes que possam ser detectados.',
    historia: 'Criados nas ruas e becos escuros, os ladinos aprenderam a sobreviver usando astúcia e agilidade. Muitos começaram como pickpockets e evoluíram para assassinos habilidosos.',
    atributosPrincipais: ['agilidade', 'inteligencia'],
    bonusInicial: { agilidade: 3, inteligencia: 2 },
    habilidadesIniciais: ['furtividade', 'golpeFurtivo'],
    equipamentosRecomendados: ['adaga', 'armaduraCouro', 'braceleteAgilidade'],
    especialidades: ['Furtividade', 'Ataques críticos', 'Desarmamento de armadilhas'],
    fraquezas: ['Combate direto', 'Armaduras pesadas', 'Magia defensiva'],
    estiloJogo: 'Stealth Assassin - Ataque pelas costas e desapareça',
    icone: '🗡️',
    cor: 'green',
    imagem: '/images/classes/ladino.jpg'
  },
  arqueiro: {
    nome: 'Arqueiro',
    descricao: 'Preciso à distância, caçador nato.',
    descricaoLonga: 'Os arqueiros são mestres do arco e flecha, capazes de acertar alvos a grandes distâncias com precisão mortal. Sua paciência e concentração os tornam caçadores excepcionais.',
    historia: 'Criados nas florestas e montanhas, os arqueiros desenvolveram uma conexão profunda com a natureza. Eles são caçadores, rastreadores e guardiões das terras selvagens.',
    atributosPrincipais: ['agilidade', 'sabedoria'],
    bonusInicial: { agilidade: 3, sabedoria: 2 },
    habilidadesIniciais: ['tiroPreciso', 'visaoAguia'],
    equipamentosRecomendados: ['arcoSimples', 'armaduraCouro', 'braceleteAgilidade'],
    especialidades: ['Combate à distância', 'Rastreamento', 'Sobrevivência'],
    fraquezas: ['Combate corpo a corpo', 'Ambientes fechados', 'Armaduras pesadas'],
    estiloJogo: 'Ranged DPS - Mantenha distância e cause dano constante',
    icone: '🏹',
    cor: 'green',
    imagem: '/images/classes/arqueiro.jpg'
  },
  clerigo: {
    nome: 'Clérigo',
    descricao: 'Curandeiro e defensor espiritual.',
    descricaoLonga: 'Os clérigos são servos dos deuses, capazes de canalizar poder divino para curar ferimentos, proteger aliados e combater as forças do mal. Sua fé é sua maior arma.',
    historia: 'Dedicados aos deuses desde a infância, os clérigos passam anos em templos e monastérios, aprendendo a canalizar o poder divino para ajudar os necessitados.',
    atributosPrincipais: ['sabedoria', 'vitalidade'],
    bonusInicial: { sabedoria: 3, vitalidade: 2 },
    habilidadesIniciais: ['cura', 'protecaoDivina'],
    equipamentosRecomendados: ['cajadoBasico', 'tunicaMago', 'amuletoSabedoria'],
    especialidades: ['Cura', 'Proteção divina', 'Combate contra mortos-vivos'],
    fraquezas: ['Magia sombria', 'Combate corpo a corpo', 'Dependência de mana'],
    estiloJogo: 'Support Healer - Mantenha aliados vivos e protegidos',
    icone: '⛪',
    cor: 'yellow',
    imagem: '/images/classes/clerigo.jpg'
  },
  paladino: {
    nome: 'Paladino',
    descricao: 'Guerreiro sagrado, combina fé e espada.',
    descricaoLonga: 'Os paladinos são guerreiros sagrados que combinam a força física com o poder divino. Eles são campeões da justiça, protegendo os inocentes e combatendo o mal.',
    historia: 'Escolhidos pelos deuses para serem campeões da justiça, os paladinos juram defender os inocentes e combater as forças do mal. Sua fé os fortalece em batalha.',
    atributosPrincipais: ['forca', 'sabedoria'],
    bonusInicial: { forca: 3, sabedoria: 2 },
    habilidadesIniciais: ['golpeSagrado', 'auraProtecao'],
    equipamentosRecomendados: ['espadaFerro', 'armaduraMalha', 'amuletoSabedoria'],
    especialidades: ['Combate sagrado', 'Proteção de aliados', 'Cura divina'],
    fraquezas: ['Magia sombria', 'Mobilidade limitada', 'Dependência de fé'],
    estiloJogo: 'Holy Warrior - Combata o mal com força e fé',
    icone: '🛡️',
    cor: 'yellow',
    imagem: '/images/classes/paladino.jpg'
  },
  necromante: {
    nome: 'Necromante',
    descricao: 'Usa magia sombria e controla mortos.',
    descricaoLonga: 'Os necromantes são magos que estudam as artes sombrias da morte e da reanimação. Eles podem controlar mortos-vivos e usar magia negra para seus propósitos.',
    historia: 'Fascinados pelo poder da morte, os necromantes mergulharam nas artes sombrias proibidas. Muitos foram banidos de suas terras natais por suas práticas.',
    atributosPrincipais: ['inteligencia', 'sabedoria'],
    bonusInicial: { inteligencia: 3, sabedoria: 2 },
    habilidadesIniciais: ['drenarVida', 'resistenciaMorte'],
    equipamentosRecomendados: ['cajadoArcano', 'tunicaMago', 'oculosInteligencia'],
    especialidades: ['Controle de mortos-vivos', 'Magia sombria', 'Resistência à morte'],
    fraquezas: ['Magia sagrada', 'Combate corpo a corpo', 'Reputação negativa'],
    estiloJogo: 'Dark Mage - Use magia sombria e controle mortos-vivos',
    icone: '💀',
    cor: 'purple',
    imagem: '/images/classes/necromante.jpg'
  },
  barbaro: {
    nome: 'Bárbaro',
    descricao: 'Selvagem e imbatível em combate corpo a corpo.',
    descricaoLonga: 'Os bárbaros são guerreiros selvagens das terras distantes, conhecidos por sua fúria em batalha e resistência sobre-humana. Eles são a personificação da força bruta.',
    historia: 'Criados nas tribos selvagens das montanhas e florestas, os bárbaros aprenderam a sobreviver em ambientes hostis. Sua fúria em batalha é lendária.',
    atributosPrincipais: ['forca', 'vitalidade'],
    bonusInicial: { forca: 3, vitalidade: 2 },
    habilidadesIniciais: ['furia', 'resistencia'],
    equipamentosRecomendados: ['marteloGuerra', 'armaduraCouro', 'anelForca'],
    especialidades: ['Combate corpo a corpo', 'Resistência a danos', 'Fúria em batalha'],
    fraquezas: ['Magia', 'Estratégia complexa', 'Armaduras pesadas'],
    estiloJogo: 'Berserker - Entre em fúria e cause devastação',
    icone: '🪓',
    cor: 'red',
    imagem: '/images/classes/barbaro.jpg'
  },
  druida: {
    nome: 'Druida',
    descricao: 'Guardião da natureza, pode mudar de forma.',
    descricaoLonga: 'Os druidas são guardiões da natureza, capazes de se comunicar com animais e plantas. Eles podem se transformar em criaturas selvagens e usar magia natural.',
    historia: 'Vivendo em harmonia com a natureza, os druidas aprenderam os segredos das florestas antigas. Eles são os guardiões do equilíbrio natural do mundo.',
    atributosPrincipais: ['sabedoria', 'vitalidade'],
    bonusInicial: { sabedoria: 3, vitalidade: 2 },
    habilidadesIniciais: ['transformacao', 'conexaoNatureza'],
    equipamentosRecomendados: ['cajadoBasico', 'tunicaMago', 'amuletoSabedoria'],
    especialidades: ['Transformação animal', 'Magia natural', 'Comunicação com animais'],
    fraquezas: ['Ambientes urbanos', 'Magia arcana', 'Combate corpo a corpo'],
    estiloJogo: 'Nature Shaman - Use o poder da natureza e transforme-se',
    icone: '🌿',
    cor: 'green',
    imagem: '/images/classes/druida.jpg'
  },
  inventor: {
    nome: 'Inventor',
    descricao: 'Mestre de engenhocas e explosivos.',
    descricaoLonga: 'Os inventores são gênios da engenharia e alquimia, capazes de criar dispositivos incríveis e explosivos devastadores. Eles usam tecnologia e criatividade em combate.',
    historia: 'Fascinados pela mecânica e alquimia, os inventores passam anos em laboratórios, criando engenhocas e experimentando com novos materiais e fórmulas.',
    atributosPrincipais: ['inteligencia', 'agilidade'],
    bonusInicial: { inteligencia: 3, agilidade: 2 },
    habilidadesIniciais: ['explosivo', 'engenhocas'],
    equipamentosRecomendados: ['adaga', 'armaduraCouro', 'oculosInteligencia'],
    especialidades: ['Criação de dispositivos', 'Explosivos', 'Solução de problemas'],
    fraquezas: ['Combate corpo a corpo', 'Magia', 'Dependência de materiais'],
    estiloJogo: 'Tech Genius - Use engenhocas e explosivos para vencer',
    icone: '⚙️',
    cor: 'blue',
    imagem: '/images/classes/inventor.jpg'
  }
}

export function getClassDetails(classe: CharacterClass): ClassDetails {
  return CLASS_DETAILS[classe]
}
