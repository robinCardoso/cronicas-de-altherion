# 🗺️ Roadmap - Crônicas de Altherion

## 📊 Status Atual

**Progresso Geral**: 42% (5/12 categorias implementadas)

### ✅ **Completado (100%)**
- Frontend Base (Next.js + React + Tailwind)
- Sistema de Personagens (10 classes + atributos)
- Interface/UX (Design moderno + animações)
- Traduções (3 idiomas + validação)
- IA Básica (OpenAI + DALL-E)

### ⏳ **Pendente (0%)**
- Banco de Dados (Supabase)
- Sistema Multiplayer
- Equipamentos Funcionais
- Habilidades Funcionais
- Arquitetura Escalável
- Narrativa Avançada
- Recursos Extras

---

## 🚀 Fase 1: Funcionalidades Core (Prioridade Alta)

### 🗃️ **1. Banco de Dados (Supabase)**
**Estimativa**: 1-2 semanas

#### Tarefas:
- [ ] **Configurar Supabase**
  - [ ] Criar projeto no Supabase
  - [ ] Configurar variáveis de ambiente
  - [ ] Instalar dependências (`@supabase/supabase-js`)

- [ ] **Criar Tabelas Principais**
  ```sql
  -- Tabela de jogadores
  CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    classe TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    experiencia INTEGER DEFAULT 0,
    atributos JSONB NOT NULL,
    equipamentos JSONB DEFAULT '[]',
    habilidades JSONB DEFAULT '[]',
    inventario JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Tabela de histórias
  CREATE TABLE stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    contexto_inicial TEXT,
    status TEXT DEFAULT 'ativa',
    created_at TIMESTAMP DEFAULT NOW()
  );

  -- Tabela de turnos
  CREATE TABLE turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID REFERENCES stories(id),
    player_id UUID REFERENCES players(id),
    acao TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
  );

  -- Tabela de narrativas
  CREATE TABLE narratives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    turn_id UUID REFERENCES turns(id),
    resposta_ia TEXT NOT NULL,
    imagem_url TEXT,
    metadados JSONB,
    timestamp TIMESTAMP DEFAULT NOW()
  );
  ```

- [ ] **Implementar Persistência**
  - [ ] Criar hooks para Supabase
  - [ ] Implementar CRUD de personagens
  - [ ] Sistema de login/registro
  - [ ] Sincronização de estado

#### Entregáveis:
- ✅ Banco de dados configurado
- ✅ Personagens salvos persistentemente
- ✅ Sistema de autenticação
- ✅ API para CRUD de dados

---

### ⚙️ **2. Sistema de Equipamentos**
**Estimativa**: 1 semana

#### Tarefas:
- [ ] **Implementar Estrutura de Equipamentos**
  ```typescript
  // src/lib/game/equipment.ts
  export const EQUIPAMENTOS = {
    espadaFerro: {
      nome: "Espada de Ferro",
      tipo: "arma",
      bonus: { strength: 3 },
      raridade: "comum",
      preco: 50
    },
    cajadoBasico: {
      nome: "Cajado Básico",
      tipo: "arma",
      bonus: { intelligence: 2 },
      raridade: "comum",
      preco: 30
    },
    armaduraCouro: {
      nome: "Armadura de Couro",
      tipo: "armadura",
      bonus: { vitality: 2 },
      raridade: "comum",
      preco: 40
    }
  };
  ```

- [ ] **Criar Função de Equipar**
  ```typescript
  export function equipar(personagem: Character, itemKey: string) {
    const item = EQUIPAMENTOS[itemKey];
    personagem.equipamentos.push(itemKey);
    
    // Aplicar bonificações
    for (const [atributo, bonus] of Object.entries(item.bonus)) {
      personagem.atributos[atributo] += bonus;
    }
    
    return personagem;
  }
  ```

- [ ] **Interface de Inventário**
  - [ ] Componente de inventário
  - [ ] Sistema de drag & drop
  - [ ] Visualização de equipamentos
  - [ ] Bonificações visíveis

#### Entregáveis:
- ✅ Sistema de equipamentos funcional
- ✅ Interface de inventário
- ✅ Bonificações aplicadas automaticamente
- ✅ Persistência de equipamentos

---

### 🌀 **3. Sistema de Habilidades**
**Estimativa**: 1 semana

#### Tarefas:
- [ ] **Implementar Habilidades Básicas**
  ```typescript
  // src/lib/game/skills.ts
  export const HABILIDADES = {
    golpePesado: {
      nome: "Golpe Pesado",
      tipo: "ativa",
      poder: 10,
      atributo: "strength",
      custo: 5,
      descricao: "Ataque poderoso que causa dano extra"
    },
    bolaDeFogo: {
      nome: "Bola de Fogo",
      tipo: "ativa",
      poder: 12,
      atributo: "intelligence",
      custo: 8,
      descricao: "Projétil de fogo que queima o inimigo"
    },
    furtividade: {
      nome: "Furtividade",
      tipo: "passiva",
      bonus: { agility: 2 },
      descricao: "Aumenta a agilidade permanentemente"
    }
  };
  ```

- [ ] **Sistema de Treinamento**
  - [ ] Interface de treinamento
  - [ ] Custo de XP para aprender
  - [ ] Pré-requisitos de nível
  - [ ] Efeitos visuais

- [ ] **Habilidades Ativas**
  - [ ] Sistema de combate
  - [ ] Uso de habilidades em batalha
  - [ ] Cooldowns e custos
  - [ ] Efeitos visuais

#### Entregáveis:
- ✅ Sistema de habilidades funcional
- ✅ Interface de treinamento
- ✅ Habilidades ativas em combate
- ✅ Persistência de habilidades

---

## 🚀 Fase 2: Multiplayer e Escalabilidade (Prioridade Média)

### 🔁 **4. Sistema Multiplayer**
**Estimativa**: 2-3 semanas

#### Tarefas:
- [ ] **Supabase Realtime**
  - [ ] Configurar Realtime
  - [ ] Sincronização de estado
  - [ ] Chat global
  - [ ] Ações em tempo real

- [ ] **Sistema de Salas**
  - [ ] Criação de salas
  - [ ] Entrada/saída de jogadores
  - [ ] Limite de jogadores por sala
  - [ ] Moderação básica

- [ ] **Chat e Comunicação**
  - [ ] Chat global da história
  - [ ] Chat privado entre jogadores
  - [ ] Sistema de reações
  - [ ] Notificações

#### Entregáveis:
- ✅ Sistema multiplayer funcional
- ✅ Chat em tempo real
- ✅ Sincronização de ações
- ✅ Sistema de salas

---

### 🧠 **5. Arquitetura Escalável**
**Estimativa**: 2-3 semanas

#### Tarefas:
- [ ] **Filas (BullMQ)**
  - [ ] Configurar Redis
  - [ ] Implementar filas de IA
  - [ ] Workers para processamento
  - [ ] Sistema de prioridades

- [ ] **Cache (Redis)**
  - [ ] Cache de respostas da IA
  - [ ] Cache de estado do mundo
  - [ ] Invalidação inteligente
  - [ ] Métricas de performance

- [ ] **Backend Separado**
  - [ ] Migrar para Node.js/FastAPI
  - [ ] API Gateway
  - [ ] Load balancing
  - [ ] Monitoramento

#### Entregáveis:
- ✅ Arquitetura escalável
- ✅ Suporte para 5.000 jogadores
- ✅ Performance otimizada
- ✅ Monitoramento completo

---

## 🚀 Fase 3: Recursos Avançados (Prioridade Baixa)

### 🌤️ **6. Narrativa Avançada**
**Estimativa**: 1-2 semanas

#### Tarefas:
- [ ] **Efeitos Visuais**
  - [ ] sceneMood (névoa, fogo, etc.)
  - [ ] timeOfDay (dia/noite)
  - [ ] Transições de ambiente
  - [ ] Partículas e efeitos

- [ ] **Metadados da IA**
  - [ ] Estrutura de resposta expandida
  - [ ] Eventos automáticos
  - [ ] Sistema de clima
  - [ ] NPCs dinâmicos

#### Entregáveis:
- ✅ Efeitos visuais dinâmicos
- ✅ Ambiente reativo
- ✅ Narrativa imersiva

---

### 🗺️ **7. Recursos Extras**
**Estimativa**: 2-3 semanas

#### Tarefas:
- [ ] **Mapa Dinâmico**
  - [ ] Mapa interativo
  - [ ] Exploração visual
  - [ ] Pontos de interesse
  - [ ] Navegação

- [ ] **Sistema de Missões**
  - [ ] Missões principais
  - [ ] Missões secundárias
  - [ ] Sistema de recompensas
  - [ ] Progressão de história

- [ ] **Sistema de Clãs**
  - [ ] Criação de clãs
  - [ ] Hierarquia
  - [ ] Recursos compartilhados
  - [ ] Competições

#### Entregáveis:
- ✅ Mapa interativo
- ✅ Sistema de missões
- ✅ Sistema de clãs

---

## 📅 Cronograma Estimado

| Fase | Duração | Início | Fim |
|------|---------|--------|-----|
| **Fase 1** | 3-4 semanas | Semana 1 | Semana 4 |
| **Fase 2** | 4-6 semanas | Semana 5 | Semana 10 |
| **Fase 3** | 3-5 semanas | Semana 11 | Semana 15 |

**Total Estimado**: 10-15 semanas

---

## 🎯 Critérios de Sucesso

### Fase 1:
- ✅ Personagens salvos persistentemente
- ✅ Sistema de equipamentos funcional
- ✅ Habilidades implementadas
- ✅ Base sólida para expansão

### Fase 2:
- ✅ Suporte para 100+ jogadores simultâneos
- ✅ Chat em tempo real
- ✅ Performance estável
- ✅ Arquitetura escalável

### Fase 3:
- ✅ Experiência imersiva completa
- ✅ Recursos avançados funcionais
- ✅ Jogo pronto para produção
- ✅ Suporte para 5.000+ jogadores

---

## 📊 Métricas de Acompanhamento

- **Jogadores Simultâneos**: Meta de 5.000
- **Tempo de Resposta**: < 2 segundos
- **Uptime**: > 99.9%
- **Satisfação do Usuário**: > 4.5/5
- **Performance da IA**: < 5 segundos por resposta

---

**Última atualização**: 25/10/2025  
**Próxima revisão**: 01/11/2025
