import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, characterClass } = body

    // Validação básica
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt é obrigatório' },
        { status: 400 }
      )
    }

    console.log('🎨 Gerando imagem com Hugging Face:', prompt)

    // Criar prompt otimizado para Stable Diffusion
    const optimizedPrompt = createOptimizedPrompt(prompt, characterClass)
    
    // Chamar Hugging Face Inference API
    const imageUrl = await generateImageWithHuggingFace(optimizedPrompt)
    
    console.log('🎨 Imagem gerada:', imageUrl)

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Falha ao gerar imagem' },
        { status: 500 }
      )
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('❌ Erro na API Hugging Face:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Função para criar prompt otimizado para Stable Diffusion
function createOptimizedPrompt(originalPrompt: string, characterClass?: string): string {
  const classPrompts: Record<string, string> = {
    'guerreiro': 'medieval warrior in heavy armor, sword and shield, heroic pose, fantasy art, detailed, epic',
    'mago': 'wise wizard with long beard, magical robes, staff, mystical aura, fantasy art, detailed, epic',
    'ladino': 'stealthy rogue in dark leather armor, daggers, shadowy appearance, fantasy art, detailed, epic',
    'arqueiro': 'skilled archer with bow and quiver, forest clothing, fantasy art, detailed, epic',
    'clerigo': 'holy cleric in white robes, divine symbols, radiant light, fantasy art, detailed, epic',
    'paladino': 'noble paladin in shining armor, holy sword and shield, heroic stance, fantasy art, detailed, epic',
    'necromante': 'dark necromancer in black robes, dark magic, skeletal elements, fantasy art, detailed, epic',
    'barbaro': 'fierce barbarian warrior, tribal tattoos, massive axe, wild appearance, fantasy art, detailed, epic',
    'druida': 'nature druid in green robes, plants and animals, natural magic, fantasy art, detailed, epic',
    'inventor': 'clever inventor with mechanical tools, goggles, gadgets, steampunk fantasy art, detailed, epic'
  }

  const basePrompt = characterClass ? classPrompts[characterClass.toLowerCase()] : originalPrompt
  
  // Adicionar melhorias para Stable Diffusion
  return `${basePrompt}, high quality, detailed, fantasy RPG character, digital art, concept art, professional illustration, 4k resolution`
}

// Função para gerar imagem com Hugging Face
async function generateImageWithHuggingFace(prompt: string): Promise<string | null> {
  try {
    // Usar o modelo Stable Diffusion mais popular e gratuito
    const modelId = 'runwayml/stable-diffusion-v1-5'
    
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN || 'hf_demo'}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 20,
          guidance_scale: 7.5,
          width: 512,
          height: 768
        }
      })
    })

    if (!response.ok) {
      console.error('❌ Erro na resposta Hugging Face:', response.status, response.statusText)
      return null
    }

    // Verificar se a resposta é uma imagem
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.startsWith('image/')) {
      // Converter blob para base64
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString('base64')
      return `data:${contentType};base64,${base64}`
    }

    // Se não for imagem, pode ser JSON com erro
    const errorData = await response.json()
    console.error('❌ Erro do Hugging Face:', errorData)
    return null

  } catch (error) {
    console.error('❌ Erro ao chamar Hugging Face:', error)
    return null
  }
}
