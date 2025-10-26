# 🔧 Configuração do Arquivo .env.local

## 📋 Status da Instalação

✅ **Arquivo `.env.local` criado com sucesso!**

O arquivo foi criado a partir do `env.example` e está pronto para configuração.

## 🔑 Configuração Necessária

### 1. **API de IA (OBRIGATÓRIO - escolha uma ou ambas)**

#### **Opção A: OpenAI API (Pago, Premium)**
1. **Acesse**: https://platform.openai.com/api-keys
2. **Faça login** na sua conta OpenAI
3. **Clique em "Create new secret key"**
4. **Copie a chave** gerada
5. **Abra o arquivo** `.env.local`
6. **Substitua** `your_openai_api_key_here` pela sua chave

**Exemplo:**
```env
OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef1234567890abcdef
```

#### **Opção B: Google Gemini API (GRATUITO!)**
1. **Acesse**: https://aistudio.google.com/app/apikey
2. **Faça login** com sua conta Google
3. **Clique em "Create API Key"**
4. **Copie a chave** gerada
5. **Abra o arquivo** `.env.local`
6. **Substitua** `your_gemini_api_key_here` pela sua chave

**Exemplo:**
```env
GEMINI_API_KEY=AIzaSyB1234567890abcdef1234567890abcdef1234567890
```

#### **Opção C: Ambas (Recomendado!)**
Configure ambas as APIs para ter:
- **OpenAI como prioridade** (qualidade premium)
- **Gemini como fallback** (gratuito e confiável)

### 2. **Supabase (OPCIONAL)**

Para persistência de dados (salvar personagens), configure o Supabase:

1. **Acesse**: https://supabase.com/dashboard
2. **Crie um novo projeto**
3. **Vá em Settings > API**
4. **Copie os valores**:
   - Project URL
   - anon public key
   - service_role key
5. **Substitua** no arquivo `.env.local`

**Exemplo:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://seuprojeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🚀 Como Configurar

### Método 1: Editor de Texto
1. Abra o arquivo `.env.local` no seu editor
2. Substitua os valores conforme instruções acima
3. Salve o arquivo

### Método 2: Terminal
```bash
# Editar o arquivo
notepad .env.local

# Ou usar VS Code
code .env.local
```

## ✅ Verificação

Após configurar, teste se está funcionando:

```bash
# Iniciar o projeto
npm run dev

# Acessar no navegador
http://localhost:3000
```

## 🔒 Segurança

- ✅ O arquivo `.env.local` está no `.gitignore`
- ✅ Suas chaves não serão commitadas
- ✅ Mantenha suas chaves seguras
- ✅ Não compartilhe este arquivo

## 🎮 Funcionalidades

### Com OpenAI API Key:
- ✅ Geração de narrativa
- ✅ Geração de imagens
- ✅ Sistema de personagens
- ✅ Interface completa

### Com Supabase (opcional):
- ✅ Persistência de personagens
- ✅ Sistema de login
- ✅ Sincronização de dados
- ✅ Histórico de jogos

## 🆘 Problemas Comuns

### Erro: "OpenAI API Key not found"
- Verifique se a chave está correta no `.env.local`
- Certifique-se de que tem créditos na conta OpenAI

### Erro: "Supabase connection failed"
- Verifique as URLs e chaves do Supabase
- O jogo funciona sem Supabase (modo local)

### Arquivo não encontrado
- Certifique-se de estar na pasta `rpg-narrativo`
- O arquivo deve estar na raiz do projeto

## 📞 Suporte

Se tiver problemas:
1. Verifique se todas as chaves estão corretas
2. Reinicie o servidor (`npm run dev`)
3. Verifique o console do navegador para erros
4. Consulte a documentação do projeto

---

**Pronto para jogar! Configure sua chave OpenAI e comece sua aventura em Altherion!** ⚔️✨
