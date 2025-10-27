# 🚀 GUIA RÁPIDO: Como Testar a IA

## ⚡ Método Mais Simples (2 minutos)

### 1. Obter Chave Gemini (GRATUITA)
1. **Acesse**: https://makersuite.google.com/app/apikey
2. **Faça login** com Google
3. **Clique "Create API Key"**
4. **Copie a chave**

### 2. Configurar no Projeto
1. **Crie arquivo `.env.local`** na raiz do projeto
2. **Adicione**:
```bash
GEMINI_API_KEY=sua_chave_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Reiniciar
```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

### 4. Testar
1. **Abra**: http://localhost:3000
2. **Crie personagem**: Nome "Teste", Classe "Mago"
3. **Digite ação**: "Estudo as ruínas antigas"
4. **Compare**:
   - **Sem IA**: "Você estudo as ruínas antigas. O que você faz a seguir?"
   - **Com IA**: Narrativa rica e detalhada sobre as ruínas

## 🎯 Teste Rápido

**Ações para testar**:
- "Exploro a floresta"
- "Conversar com aldeões"
- "Usar magia para iluminar"
- "Investigar rumores estranhos"

## ✅ Sinais de que Funciona

- ✅ Narrativa rica e detalhada
- ✅ Menciona o nome do personagem
- ✅ Considera a classe escolhida
- ✅ Ambiente e horário dinâmicos
- ✅ Sugestões de próximos passos

## 🐛 Problemas Comuns

**"Modo Demo" aparece**:
- Verifique se `.env.local` existe
- Verifique se a chave está correta
- Reinicie o servidor

**Respostas básicas**:
- IA está em modo fallback
- Configure uma chave de API

---

**🎮 Pronto! Em 2 minutos você pode testar IA real no jogo.**
