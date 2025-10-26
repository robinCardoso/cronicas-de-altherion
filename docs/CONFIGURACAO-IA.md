# 🤖 Configuração de IA - Crônicas de Altherion

## 📋 Visão Geral

O jogo está configurado para usar **IA real** (OpenAI ou Gemini) para gerar narrativas dinâmicas e personalizadas. Atualmente está funcionando em **modo fallback** (sem chaves de API).

## 🔑 Configuração de Chaves de API

### Opção 1: Google Gemini (RECOMENDADO - GRATUITO)

1. **Acesse**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Crie uma conta** Google (gratuita)
3. **Gere uma chave** de API
4. **Configure no arquivo `.env.local`**:

```bash
# Google Gemini API (GRATUITO!)
GEMINI_API_KEY=sua_chave_gemini_aqui
```

### Opção 2: OpenAI (PAGO)

1. **Acesse**: [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Crie uma conta** e adicione créditos
3. **Gere uma chave** de API
4. **Configure no arquivo `.env.local`**:

```bash
# OpenAI API (PAGO)
OPENAI_API_KEY=sua_chave_openai_aqui
```

## 🚀 Como Configurar

### 1. Criar arquivo `.env.local`

Na raiz do projeto, crie o arquivo `.env.local`:

```bash
# Escolha UMA das opções abaixo:

# Opção 1: Gemini (GRATUITO)
GEMINI_API_KEY=sua_chave_gemini_aqui

# Opção 2: OpenAI (PAGO)
# OPENAI_API_KEY=sua_chave_openai_aqui

# Outras configurações
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Reiniciar o servidor

```bash
npm run dev
```

### 3. Testar a integração

1. Crie um personagem
2. Execute ações no tutorial narrativo
3. Verifique se as respostas são mais ricas e personalizadas

## 🎯 Funcionalidades da IA

### ✅ **Implementado**
- **Narrativa dinâmica**: Respostas personalizadas baseadas na ação
- **Contexto inteligente**: IA lembra do personagem e situação
- **Ambiente reativo**: Humor da cena e horário do dia
- **Sistema de XP**: Ganho de experiência baseado nas ações
- **Fallback robusto**: Funciona mesmo sem chaves de API

### 🔄 **Próximas Implementações**
- **Geração de imagens**: Cenas visuais para cada ação
- **NPCs dinâmicos**: Personagens com personalidade
- **Eventos aleatórios**: Surpresas na narrativa
- **Sistema de clima**: Ambiente que afeta a história

## 📊 Comparação das APIs

| Recurso | Gemini | OpenAI |
|---------|--------|--------|
| **Custo** | Gratuito | Pago |
| **Qualidade** | Excelente | Excelente |
| **Velocidade** | Rápida | Rápida |
| **Imagens** | ✅ | ✅ |
| **Limite** | Generoso | Por uso |

## 🛠️ Troubleshooting

### Problema: "Modo Demo" aparece
**Solução**: Verifique se a chave está no arquivo `.env.local` e reinicie o servidor.

### Problema: Erro de API
**Solução**: Verifique se a chave está correta e tem créditos/permissões.

### Problema: Respostas básicas
**Solução**: A IA está funcionando em modo fallback. Configure uma chave de API.

## 🎮 Testando a Integração

1. **Sem chaves**: Respostas básicas mas funcionais
2. **Com Gemini**: Narrativas ricas e personalizadas
3. **Com OpenAI**: Narrativas de alta qualidade

## 📈 Próximos Passos

1. **Configure uma chave de API** (recomendado: Gemini)
2. **Teste o sistema** com diferentes ações
3. **Desenvolva funcionalidades** adicionais
4. **Implemente geração de imagens**

---

**🎯 O sistema está pronto para usar IA real! Configure uma chave e experimente narrativas dinâmicas e personalizadas.**
