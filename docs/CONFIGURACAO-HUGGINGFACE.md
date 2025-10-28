# Configuração do Hugging Face para Geração de Imagens

## 🎨 Hugging Face Inference API

O Hugging Face oferece uma API gratuita para geração de imagens usando Stable Diffusion.

### 📋 Como Configurar:

1. **Acesse**: https://huggingface.co/settings/tokens
2. **Crie um token** (gratuito)
3. **Adicione ao `.env.local`**:
   ```
   HUGGINGFACE_API_TOKEN=seu_token_aqui
   ```

### 🚀 Como Funciona:

1. **Primeira tentativa**: Gera imagem com IA (Stable Diffusion)
2. **Fallback**: Se falhar, usa imagem SVG específica da classe
3. **Fallback final**: Se não encontrar classe, usa placeholder

### 🎯 Modelos Disponíveis:

- **runwayml/stable-diffusion-v1-5** (padrão)
- **stabilityai/stable-diffusion-2-1**
- **CompVis/stable-diffusion-v1-4**

### ⚡ Limites Gratuitos:

- **Sem token**: 1.000 requisições/mês
- **Com token**: 10.000 requisições/mês
- **Rate limit**: 1 requisição/segundo

### 🔧 Configurações da Imagem:

- **Resolução**: 512x768 (otimizada para personagens)
- **Steps**: 20 (balance entre qualidade e velocidade)
- **Guidance**: 7.5 (boa qualidade)

### 🎨 Prompts Otimizados:

Cada classe tem um prompt específico otimizado para Stable Diffusion:

- **Guerreiro**: "medieval warrior in heavy armor, sword and shield, heroic pose"
- **Mago**: "wise wizard with long beard, magical robes, staff, mystical aura"
- **Ladino**: "stealthy rogue in dark leather armor, daggers, shadowy appearance"

### 🛠️ Troubleshooting:

- **Erro 429**: Rate limit excedido, aguarde 1 segundo
- **Erro 503**: Modelo carregando, tente novamente
- **Timeout**: Modelo pode estar offline, usa fallback SVG

### 📊 Monitoramento:

Verifique os logs do console para:
- `🎨 Tentando gerar imagem com IA para [classe]`
- `✅ Imagem gerada com sucesso para [classe]`
- `🎨 IA falhou, usando imagem SVG para [classe]`
