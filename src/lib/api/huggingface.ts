const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0'

// Função para aprimorar o prompt para Stable Diffusion
function enhancePromptForStableDiffusion(originalPrompt: string, characterClass?: string): string {
  const classPrompts: Record<string, string> = {
    'guerreiro': 'powerful medieval warrior in heavy armor, holding a sword and shield, heroic pose, fantasy art style, detailed, epic',
    'mago': 'wise wizard with a long beard, wearing robes and holding a magical staff, mystical aura, fantasy art style, detailed, epic',
    'ladino': 'stealthy rogue in dark leather armor, holding daggers, shadowy appearance, fantasy art style, detailed, epic',
    'arqueiro': 'skilled archer with a bow and quiver, wearing green clothing, forest background, fantasy art style, detailed, epic',
    'clerigo': 'holy cleric in white robes with divine symbols, holding a holy symbol, radiant light, fantasy art style, detailed, epic',
    'paladino': 'noble paladin in shining armor, holding a sword and shield with holy symbols, heroic stance, fantasy art style, detailed, epic',
    'necromante': 'dark necromancer in black robes, surrounded by dark magic, skeletal elements, fantasy art style, detailed, epic',
    'barbaro': 'fierce barbarian warrior, tribal tattoos, massive axe, wild appearance, fantasy art, detailed, epic',
    'druida': 'nature druid in green robes, plants and animals, natural magic, fantasy art, detailed, epic',
    'inventor': 'clever inventor with mechanical tools, goggles, gadgets, steampunk fantasy art, detailed, epic'
  }

  const basePrompt = characterClass ? classPrompts[characterClass.toLowerCase()] : originalPrompt

  // Adicionar melhorias para Stable Diffusion
  return `${basePrompt}, high quality, detailed, fantasy RPG character, digital art, concept art, professional illustration, 4k resolution`
}

// Função para gerar imagem com Hugging Face
export async function generateImageWithHuggingFace(prompt: string, characterClass?: string): Promise<string | null> {
  try {
    console.log('🎨 === INÍCIO GERAÇÃO HUGGING FACE ===')
    console.log('🎨 Prompt original:', prompt)
    console.log('🎨 Classe do personagem:', characterClass)
    
    const enhancedPrompt = enhancePromptForStableDiffusion(prompt, characterClass)
    console.log('🎨 Prompt aprimorado:', enhancedPrompt)
    
    console.log('🎨 Fazendo requisição para Hugging Face API...')
    console.log('🎨 URL:', HUGGINGFACE_API_URL)
    console.log('🎨 Token configurado:', !!process.env.HUGGINGFACE_API_TOKEN)
    
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: enhancedPrompt }),
    })

    console.log('🎨 Resposta recebida - Status:', response.status)
    console.log('🎨 Resposta recebida - OK:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Hugging Face API error: ${response.status} - ${errorText}`)
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`)
    }

    console.log('🎨 ✅ Resposta OK! Convertendo blob para base64...')
    const imageBlob = await response.blob()
    console.log('🎨 Tamanho do blob:', imageBlob.size, 'bytes')
    
    // Converter blob para base64 para salvar como URL válida
    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`
    console.log('🎨 Base64 gerado, tamanho:', base64.length, 'caracteres')
    console.log('🎨 DataUrl criado com sucesso!')
    
    // Salvar imagem localmente usando fs diretamente (estamos no servidor)
    console.log('🎨 Tentando salvar imagem localmente...')
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      
      // Criar diretório se não existir
      const imagesDir = path.join(process.cwd(), 'public', 'images', 'characters')
      console.log('🎨 Criando diretório:', imagesDir)
      await fs.mkdir(imagesDir, { recursive: true })
      console.log('🎨 ✅ Diretório criado/verificado')

      // Gerar nome do arquivo
      const timestamp = Date.now()
      const fileName = `${characterClass || 'character'}_generated_${timestamp}.png`
      const filePath = path.join(imagesDir, fileName)
      const publicUrl = `/images/characters/${fileName}`
      
      console.log('🎨 Salvando arquivo:')
      console.log('🎨 - fileName:', fileName)
      console.log('🎨 - filePath:', filePath)
      console.log('🎨 - publicUrl:', publicUrl)

      // Converter base64 para buffer
      console.log('🎨 Processando dados da imagem...')
      const base64Data = dataUrl.replace(/^data:image\/[a-z]+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      console.log('🎨 Buffer criado, tamanho:', buffer.length, 'bytes')

      // Salvar arquivo
      await fs.writeFile(filePath, buffer)
      console.log('🎨 ✅ Arquivo salvo com sucesso!')
      console.log('🎨 ✅ Imagem salva localmente:', publicUrl)
      
      return publicUrl
    } catch (saveError) {
      console.log('🎨 ❌ Erro ao salvar imagem:', saveError)
    }
    
    console.log('🎨 ✅ Imagem gerada com sucesso pelo Hugging Face (usando base64)')
    console.log('🎨 Tamanho do dataUrl:', dataUrl.length, 'caracteres')
    console.log('🎨 Primeiros 100 caracteres:', dataUrl.substring(0, 100))
    return dataUrl
  } catch (error) {
    console.error('❌ Erro ao gerar imagem com Hugging Face:', error)
    return null
  }
}
