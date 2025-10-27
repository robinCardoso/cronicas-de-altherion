#!/bin/bash

# Script para configurar IA - Crônicas de Altherion
echo "🤖 Configuração de IA - Crônicas de Altherion"
echo "=============================================="

# Verificar se o arquivo .env.local existe
if [ -f ".env.local" ]; then
    echo "✅ Arquivo .env.local encontrado"
else
    echo "📝 Criando arquivo .env.local..."
    touch .env.local
fi

echo ""
echo "🔑 Escolha uma opção de IA:"
echo "1) Google Gemini (GRATUITO - RECOMENDADO)"
echo "2) OpenAI (PAGO)"
echo "3) Modo Demo (sem IA)"
echo ""

read -p "Digite sua escolha (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🔑 Configurando Google Gemini..."
        echo "1. Acesse: https://makersuite.google.com/app/apikey"
        echo "2. Faça login com sua conta Google"
        echo "3. Clique em 'Create API Key'"
        echo "4. Copie a chave gerada"
        echo ""
        read -p "Cole sua chave Gemini aqui: " gemini_key
        
        if [ ! -z "$gemini_key" ]; then
            echo "GEMINI_API_KEY=$gemini_key" > .env.local
            echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
            echo "✅ Gemini configurado com sucesso!"
        else
            echo "❌ Chave não fornecida"
        fi
        ;;
    2)
        echo ""
        echo "🔑 Configurando OpenAI..."
        echo "1. Acesse: https://platform.openai.com/api-keys"
        echo "2. Crie uma conta e adicione créditos"
        echo "3. Gere uma chave de API"
        echo "4. Copie a chave gerada"
        echo ""
        read -p "Cole sua chave OpenAI aqui: " openai_key
        
        if [ ! -z "$openai_key" ]; then
            echo "OPENAI_API_KEY=$openai_key" > .env.local
            echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
            echo "✅ OpenAI configurado com sucesso!"
        else
            echo "❌ Chave não fornecida"
        fi
        ;;
    3)
        echo ""
        echo "🎮 Configurando Modo Demo..."
        echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
        echo "✅ Modo Demo configurado!"
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo "🚀 Próximos passos:"
echo "1. Reinicie o servidor: npm run dev"
echo "2. Abra: http://localhost:3000"
echo "3. Crie um personagem e teste a IA!"
echo ""
echo "📚 Documentação: docs/COMO-TESTAR-IA.md"
