# 🎮 Crônicas de Altherion - RPG Narrativo com IA

Um RPG narrativo moderno que combina inteligência artificial com storytelling imersivo, permitindo que jogadores criem personagens únicos e embarquem em aventuras épicas no reino de Altherion.

## 🎭 Por que um RPG Narrativo com IA?

### **🧠 O Diferencial: Experiência Pessoal e Emocional**

Nos jogos 3D ou 2D tradicionais, o jogador **vê** uma história — mas não **cria** uma.
No **Crônicas de Altherion**, o jogador **escreve o próprio destino**.
A IA se adapta às suas escolhas, e cada jogada é única, como um livro sendo escrito em tempo real.

🎮 **Nos jogos comuns**: o jogador consome a história.  
🧠 **No nosso jogo**: o jogador se torna o autor da história.

Isso transforma o jogo em uma experiência emocionalmente mais profunda — algo que o jogador lembra, e não apenas "zerou".

### **🗺️ Mundo Infinito e Personalizável**

Um jogo 3D precisa de:
- Texturas, Modelos, Físicas, Missões pré-definidas

O nosso jogo precisa apenas de:
- **Imaginação + narrativa gerada pela IA**

Isso significa que o mundo nunca acaba:
- Um jogador pode explorar uma floresta e encontrar um templo perdido
- Outro jogador pode achar uma vila amaldiçoada no mesmo lugar
- O sistema cresce organicamente, sem precisar de assets ou mapas renderizados

### **🕰️ Imersão Psicológica, Não Visual**

Muitos pensam que "imersão" é só gráfico bonito.  
Mas imersão é quando o jogador esquece que está jogando.

Em um RPG narrativo com IA:
- O jogador sente que está em um **livro vivo**
- Ele vê as consequências de cada ação
- Ele se envolve emocionalmente com os personagens

**Isso é imersão psicológica, não visual.**

### **🧙‍♂️ A Magia da IA: O Mundo Reage ao Jogador**

Com IA generativa:
- O mundo "ouve" o jogador
- NPCs lembram o que ele fez
- Locais e eventos se adaptam às ações passadas

Isso é algo que nenhum jogo 3D consegue fazer de forma profunda sem IA narrativa.

### **⚙️ Leve, Acessível e Escalável**

- Roda no navegador (até em celular)
- Não exige GPU
- Pode ter milhares de jogadores simultâneos
- O servidor lida só com texto, contexto e lógica

## ✨ Características Principais

### 🎯 **Sistema de Personagens Avançado**
- **10 classes únicas**: Guerreiro, Mago, Ladino, Arqueiro, Clérigo, Paladino, Necromante, Bárbaro, Druida, Inventor
- **Interface de seleção moderna**: Layout de 3 colunas com personagem sempre visível
- **Sistema de atributos**: Força, Inteligência, Agilidade, Vitalidade, Sabedoria
- **Equipamentos e habilidades**: Sistema completo de progressão

### 🤖 **Integração com IA**
- **OpenAI GPT-4**: Narrativas épicas e imersivas
- **Google Gemini**: Alternativa gratuita e confiável
- **Geração de imagens**: Cenas dinâmicas com DALL-E
- **Sistema de fallback**: Funciona mesmo sem APIs configuradas

### 🌍 **Sistema de Traduções**
- **3 idiomas**: Português, Inglês, Espanhol
- **Interface multilíngue**: Troca de idioma em tempo real
- **Traduções validadas**: Sistema de verificação automática

### 🎨 **Interface Moderna**
- **Design responsivo**: Funciona em desktop e mobile
- **Animações suaves**: Transições e efeitos visuais
- **Tema escuro**: Interface imersiva e elegante
- **Navegação intuitiva**: Menus laterais e abas organizadas

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Chave de API (OpenAI ou Gemini)

### **Instalação**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/cronicas-de-altherion.git
cd cronicas-de-altherion
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env.local
```

4. **Configure suas chaves de API no `.env.local`**
```env
# OpenAI API (Pago)
OPENAI_API_KEY=sk-sua-chave-aqui

# Google Gemini API (Gratuito)
GEMINI_API_KEY=sua-chave-gemini-aqui
```

5. **Execute o projeto**
```bash
npm run dev
```

6. **Acesse no navegador**
```
http://localhost:3000
```

## 🔧 Configuração das APIs

### **OpenAI API (Recomendado)**
1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crie uma nova chave de API
3. Adicione créditos à sua conta
4. Cole a chave no `.env.local`

### **Google Gemini API (Gratuito)**
1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma nova chave de API
3. Cole a chave no `.env.local`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
├── components/             # Componentes React
│   ├── game/              # Componentes do jogo
│   └── ui/                # Componentes de interface
├── contexts/              # Contextos React
├── hooks/                 # Hooks customizados
├── lib/                   # Utilitários e lógica
│   ├── api/               # Integrações com APIs
│   ├── game/              # Lógica do jogo
│   └── utils/             # Funções auxiliares
├── locales/               # Arquivos de tradução
└── types/                 # Definições TypeScript
```

## 🎮 Como Jogar

1. **Crie seu personagem**
   - Digite o nome do herói
   - Escolha uma classe
   - Explore as habilidades e equipamentos

2. **Comece sua aventura**
   - Digite ações na interface de narrativa
   - A IA gerará respostas épicas
   - Ganhe XP e evolua seu personagem

3. **Explore o mundo**
   - Cada ação gera consequências
   - Imagens dinâmicas ilustram as cenas
   - Histórico completo das aventuras

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Constrói para produção
npm run start        # Inicia servidor de produção

# Qualidade de código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript

# Utilitários
node scripts/setup-env.js        # Configura arquivo .env.local
node scripts/test-env.js         # Testa variáveis de ambiente
node scripts/test-api.js         # Testa APIs de IA
node scripts/validate-translations.js  # Valida traduções
```

## 🌟 Funcionalidades Implementadas

- ✅ **Sistema de personagens completo**
- ✅ **Integração com IA (OpenAI + Gemini)**
- ✅ **Interface de seleção avançada**
- ✅ **Sistema de traduções**
- ✅ **Geração de imagens**
- ✅ **Sistema de XP e progressão**
- ✅ **Interface responsiva**
- ✅ **Sistema de fallback**

## 🚧 Próximas Funcionalidades

- ⏳ **Sistema multiplayer**
- ⏳ **Banco de dados (Supabase)**
- ⏳ **Sistema de combate**
- ⏳ **Inventário avançado**
- ⏳ **Sistema de missões**
- ⏳ **Modo offline**

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **OpenAI** pela API GPT-4
- **Google** pela API Gemini
- **Next.js** pelo framework React
- **Tailwind CSS** pelo sistema de estilos
- **Framer Motion** pelas animações

---

**Criado com ❤️ para a comunidade de RPG e IA**

⚔️ **Bem-vindos a Altherion!** ⚔️