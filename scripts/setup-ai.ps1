# Script PowerShell para configurar IA - Crônicas de Altherion
Write-Host "🤖 Configuração de IA - Crônicas de Altherion" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

# Verificar se o arquivo .env.local existe
if (Test-Path ".env.local") {
    Write-Host "✅ Arquivo .env.local encontrado" -ForegroundColor Green
} else {
    Write-Host "📝 Criando arquivo .env.local..." -ForegroundColor Yellow
    New-Item -ItemType File -Name ".env.local" -Force | Out-Null
}

Write-Host ""
Write-Host "🔑 Escolha uma opção de IA:" -ForegroundColor Yellow
Write-Host "1) Google Gemini (GRATUITO - RECOMENDADO)" -ForegroundColor Green
Write-Host "2) OpenAI (PAGO)" -ForegroundColor Yellow
Write-Host "3) Modo Demo (sem IA)" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Digite sua escolha (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔑 Configurando Google Gemini..." -ForegroundColor Green
        Write-Host "1. Acesse: https://makersuite.google.com/app/apikey" -ForegroundColor Cyan
        Write-Host "2. Faça login com sua conta Google" -ForegroundColor Cyan
        Write-Host "3. Clique em 'Create API Key'" -ForegroundColor Cyan
        Write-Host "4. Copie a chave gerada" -ForegroundColor Cyan
        Write-Host ""
        $gemini_key = Read-Host "Cole sua chave Gemini aqui"
        
        if ($gemini_key) {
            $content = "GEMINI_API_KEY=$gemini_key`nNEXT_PUBLIC_APP_URL=http://localhost:3000"
            $content | Out-File -FilePath ".env.local" -Encoding UTF8
            Write-Host "✅ Gemini configurado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "❌ Chave não fornecida" -ForegroundColor Red
        }
    }
    "2" {
        Write-Host ""
        Write-Host "🔑 Configurando OpenAI..." -ForegroundColor Yellow
        Write-Host "1. Acesse: https://platform.openai.com/api-keys" -ForegroundColor Cyan
        Write-Host "2. Crie uma conta e adicione créditos" -ForegroundColor Cyan
        Write-Host "3. Gere uma chave de API" -ForegroundColor Cyan
        Write-Host "4. Copie a chave gerada" -ForegroundColor Cyan
        Write-Host ""
        $openai_key = Read-Host "Cole sua chave OpenAI aqui"
        
        if ($openai_key) {
            $content = "OPENAI_API_KEY=$openai_key`nNEXT_PUBLIC_APP_URL=http://localhost:3000"
            $content | Out-File -FilePath ".env.local" -Encoding UTF8
            Write-Host "✅ OpenAI configurado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "❌ Chave não fornecida" -ForegroundColor Red
        }
    }
    "3" {
        Write-Host ""
        Write-Host "🎮 Configurando Modo Demo..." -ForegroundColor Gray
        $content = "NEXT_PUBLIC_APP_URL=http://localhost:3000"
        $content | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host "✅ Modo Demo configurado!" -ForegroundColor Green
    }
    default {
        Write-Host "❌ Opção inválida" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🚀 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Reinicie o servidor: npm run dev" -ForegroundColor White
Write-Host "2. Abra: http://localhost:3000" -ForegroundColor White
Write-Host "3. Crie um personagem e teste a IA!" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentação: docs/COMO-TESTAR-IA.md" -ForegroundColor Cyan
