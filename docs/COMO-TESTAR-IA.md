# 🚀 Como Testar a IA Real - Guia Passo a Passo

## 📋 Pré-requisitos

- ✅ Projeto funcionando (já está!)
- ✅ Node.js instalado
- ✅ Conta Google (para Gemini) ou OpenAI

## 🔑 Opção 1: Google Gemini (RECOMENDADO - GRATUITO)

### Passo 1: Obter Chave de API
1. **Acesse**: https://makersuite.google.com/app/apikey
2. **Faça login** com sua conta Google
3. **Clique em "Create API Key"**
4. **Copie a chave** gerada

### Passo 2: Configurar no Projeto
1. **Crie o arquivo `.env.local`** na raiz do projeto:
```bash
# Na pasta: c:\Users\Robson\.vscode\game-ia\rpg-narrativo\
# Crie o arquivo: .env.local
```

2. **Adicione a chave**:
```bash
GEMINI_API_KEY=sua_chave_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Passo 3: Reiniciar o Servidor
```bash
# Pare o servidor (Ctrl+C)
# Reinicie
npm run dev
```

## 🔑 Opção 2: OpenAI (PAGO)

### Passo 1: Obter Chave de API
1. **Acesse**: https://platform.openai.com/api-keys
2. **Crie uma conta** e adicione créditos
3. **Gere uma chave** de API
4. **Copie a chave**

### Passo 2: Configurar no Projeto
```bash
# No arquivo .env.local
OPENAI_API_KEY=sua_chave_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 Como Testar

### 1. Verificar se a IA está Ativa
1. **Abra o jogo**: http://localhost:3000
2. **Crie um personagem** (qualquer nome e classe)
3. **Execute uma ação** no tutorial
4. **Observe a resposta**:
   - **Com IA**: Narrativa rica e personalizada
   - **Sem IA**: Resposta básica "Você [ação]. O que você faz a seguir?"

### 2. Teste de Respostas Ricas
**Ações para testar**:
- "Estudo as ruínas antigas"
- "Conversar com os aldeões"
- "Explorar a floresta"
- "Investigar rumores estranhos"
- "Usar magia para iluminar o caminho"

### 3. Verificar Funcionalidades
- ✅ **Narrativa personalizada** com nome do personagem
- ✅ **Contexto da classe** (Mago, Guerreiro, etc.)
- ✅ **Ambiente dinâmico** (humor da cena)
- ✅ **Horário do dia** (dia/noite)
- ✅ **Ganho de XP** variável
- ✅ **Sugestões de próximos passos**

## 🐛 Troubleshooting

### Problema: "Modo Demo" aparece
**Solução**:
1. Verifique se o arquivo `.env.local` existe
2. Verifique se a chave está correta
3. Reinicie o servidor (`npm run dev`)

### Problema: Erro de API
**Solução**:
1. Verifique se a chave está válida
2. Verifique se tem créditos (OpenAI)
3. Verifique se a API está funcionando

### Problema: Respostas básicas
**Solução**:
1. A IA está em modo fallback
2. Configure uma chave de API
3. Reinicie o servidor

## 📊 Comparação: Com vs Sem IA

### ❌ Sem IA (Modo Fallback)
```
Você, Gandalf, estudo as ruínas antigas para desvendar seus segredos arcanos. O que você faz a seguir?
```

### ✅ Com IA (Gemini/OpenAI)
```
Você se aproxima das ruínas antigas, sentindo uma energia arcana pulsando entre as pedras. Seus conhecimentos mágicos revelam runas antigas gravadas na pedra, brilhando com uma luz azulada sobrenatural. O vento sopra suavemente, carregando sussurros de magia ancestral. Você consegue decifrar alguns símbolos que mencionam uma "Chave dos Elementos" perdida. O que você faz a seguir?
```

## 🎯 Teste Rápido (5 minutos)

1. **Configure Gemini** (gratuito)
2. **Crie personagem** "Teste"
3. **Execute ação**: "Exploro a floresta em busca de aventuras"
4. **Compare** a resposta com/sem IA
5. **Teste diferentes ações** para ver a variedade

## 🚀 Próximos Passos

Após configurar a IA:
1. **Teste diferentes classes** (Mago, Guerreiro, etc.)
2. **Experimente ações criativas**
3. **Observe como a IA adapta** o contexto
4. **Desenvolva funcionalidades** adicionais

---

**🎮 A IA está pronta para ser testada! Configure uma chave e experimente narrativas dinâmicas e personalizadas.**
