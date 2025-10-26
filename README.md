# ⚔️ Crônicas de Altherion

**RPG Narrativo com IA** - Um mundo de fantasia onde vários jogadores participam da mesma história, tomam decisões diferentes e a IA reage considerando as ações de todos, criando um universo persistente e dinâmico.

## 🚀 Funcionalidades Implementadas

### ✅ **Base Completa (100%)**
- ✅ **Sistema de Personagens**: 10 classes diferentes com atributos e evolução
- ✅ **Integração com IA**: Narrativa dinâmica usando OpenAI GPT-4
- ✅ **Geração de Imagens**: Imagens automáticas das cenas com DALL-E 3
- ✅ **Interface Imersiva**: Efeitos visuais e animações
- ✅ **Sistema de XP**: Experiência e evolução de personagens
- ✅ **Modal de Detalhes**: Interface detalhada para seleção de classes
- ✅ **Sistema Multilíngue**: Português, Inglês e Espanhol
- ✅ **Validação de Traduções**: Sistema automático de verificação

### ⏳ **Em Desenvolvimento (0%)**
- ⏳ **Banco de Dados**: Persistência com Supabase
- ⏳ **Sistema Multiplayer**: Chat global e sincronização
- ⏳ **Equipamentos Funcionais**: Sistema de inventário
- ⏳ **Habilidades Funcionais**: Sistema de treinamento
- ⏳ **Arquitetura Escalável**: Filas e cache para 5.000 jogadores

## 🛠️ Tecnologias

- **Frontend**: Next.js 14 + React + TypeScript
- **Estilização**: Tailwind CSS + Framer Motion
- **IA**: OpenAI API (GPT-4 + DALL-E 3)
- **Banco**: Supabase (em desenvolvimento)
- **Tempo Real**: WebSocket (em desenvolvimento)

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta OpenAI com API Key
- Conta Supabase (opcional, para persistência)

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# OpenAI API (OBRIGATÓRIO)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Supabase (OPCIONAL - para persistência)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Obter API Key da OpenAI

1. Acesse [OpenAI Platform](https://platform.openai.com/)
2. Crie uma conta ou faça login
3. Vá para "API Keys" no menu
4. Clique em "Create new secret key"
5. Copie a chave e cole no arquivo `.env.local`

### 4. Executar o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Constrói o projeto para produção
- `npm run start` - Inicia o servidor de produção
- `npm run check-env` - Verifica a configuração do ambiente
- `npm run setup` - Alias para check-env
- `npm run check-i18n` - Valida as traduções

## 🎮 Como Jogar

1. **Crie seu Herói**: Escolha um nome e uma das 10 classes disponíveis em Altherion
2. **Digite Ações**: Use linguagem natural para descrever o que seu personagem faz
3. **Veja a História**: A IA gera narrativas épicas baseadas em suas ações
4. **Ganhe XP**: Cada ação bem-sucedida concede experiência
5. **Evolua**: Seu herói sobe de nível conforme ganha experiência

### Exemplos de Ações

- "Exploro a floresta escura de Altherion"
- "Ataco o goblin com minha espada"
- "Conversar com o mercador sobre preços"
- "Usar magia de cura no ferido"
- "Investigar as ruínas antigas do reino"

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   │   └── story/         # Endpoints de narrativa
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── game/             # Componentes do jogo
│   └── ui/               # Componentes de UI
├── lib/                  # Lógica de negócio
│   ├── api/              # Integrações com APIs
│   ├── game/             # Sistema do jogo
│   └── hooks/            # Hooks personalizados
└── types/                # Definições TypeScript
```

## 📊 Progresso do Projeto

| Categoria | Status | Progresso |
|-----------|--------|-----------|
| **Frontend Base** | ✅ Completo | 100% |
| **Sistema de Personagens** | ✅ Completo | 100% |
| **Interface/UX** | ✅ Completo | 100% |
| **Traduções** | ✅ Completo | 100% |
| **IA Básica** | ✅ Completo | 100% |
| **Banco de Dados** | ⏳ Pendente | 0% |
| **Multiplayer** | ⏳ Pendente | 0% |
| **Equipamentos** | ⏳ Pendente | 0% |
| **Habilidades** | ⏳ Pendente | 0% |
| **Arquitetura Escalável** | ⏳ Pendente | 0% |

**Progresso Geral**: 42% (5/12 categorias implementadas)

## 🎯 Próximos Passos (Fase 1)

### 🗃️ **1. Banco de Dados (Supabase)**
- [ ] Configurar Supabase
- [ ] Criar tabelas principais (stories, players, turns, narratives)
- [ ] Implementar persistência de personagens
- [ ] Sistema de login e autenticação

### ⚙️ **2. Sistema de Equipamentos**
- [ ] Implementar estrutura de equipamentos
- [ ] Criar função de equipar
- [ ] Adicionar bonificações de atributos
- [ ] Sistema de inventário funcional

### 🌀 **3. Sistema de Habilidades**
- [ ] Implementar habilidades básicas
- [ ] Criar sistema de treinamento
- [ ] Adicionar efeitos de habilidades
- [ ] Habilidades ativas e passivas

## 📚 Documentação

- 📊 [Análise Comparativa](docs/ANALISE-COMPARATIVA.md) - Comparação detalhada com o LEIA-ME
- 🌍 [Sistema de Traduções](docs/i18n.md) - Documentação completa do i18n
- 🛡️ [Garantia de Traduções](docs/translation-guarantee.md) - Sistema de validação

## 🐛 Solução de Problemas

### Erro de API Key
- Verifique se a `OPENAI_API_KEY` está correta no `.env.local`
- Certifique-se de que tem créditos na conta OpenAI

### Erro de CORS
- O projeto roda em `localhost:3000` por padrão
- Verifique se não há conflitos de porta

### Imagens não carregam
- Verifique se a API Key tem acesso ao DALL-E 3
- Algumas imagens podem demorar para gerar

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Reportar bugs
2. Sugerir novas funcionalidades
3. Enviar pull requests
4. Melhorar a documentação

---

**Divirta-se explorando Altherion! ⚔️✨**