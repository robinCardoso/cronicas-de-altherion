# Configuração do Groq API

## Como obter sua API Key do Groq:

1. **Acesse:** https://console.groq.com
2. **Crie uma conta** gratuita
3. **Vá para:** API Keys
4. **Crie uma nova** API Key
5. **Copie a chave** gerada

## Configurar no projeto:

1. **Abra o arquivo:** `.env.local`
2. **Adicione a linha:**
```
GROQ_API_KEY=sua_chave_aqui
```

## Modelos disponíveis no Groq:

- `llama-3.3-70b-versatile` (Recomendado - mais poderoso)
- `llama-3.1-70b-versatile` (Alternativa)
- `llama-3.1-8b-instant` (Mais rápido, menos poderoso)

## Vantagens do Groq:

✅ **Velocidade ultra-rápida** (LPU - Language Processing Unit)
✅ **Baixa latência** determinística
✅ **Modelos Llama** de alta qualidade
✅ **Preços competitivos** por token
✅ **API compatível** com OpenAI

## Sistema de Fallback:

1. **Groq** (Prioridade máxima - mais rápido)
2. **Hugging Face** (Gratuito, quando créditos disponíveis)
3. **Gemini** (Gratuito, 5 comandos/dia)
4. **OpenAI** (Pago, mais confiável)

## Teste da configuração:

Após configurar, teste no jogo:
- Acesse `/game/solo`
- Clique em qualquer ação
- Verifique os logs para confirmar: "🚀 Groq funcionou!"
