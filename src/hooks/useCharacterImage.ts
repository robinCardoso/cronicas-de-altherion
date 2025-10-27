import { useState, useEffect } from 'react'
import { generateImage } from '@/lib/api/ai-provider'

interface UseCharacterImageProps {
  characterClass: string
  characterName?: string
}

export function useCharacterImage({ characterClass, characterName }: UseCharacterImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!characterClass) return

    const generateCharacterImage = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Criar prompt específico para a classe do personagem
        const classPrompts: Record<string, string> = {
          guerreiro: 'A powerful medieval warrior in heavy armor, holding a sword and shield, heroic pose, fantasy art style',
          mago: 'A wise wizard with a long beard, wearing robes and holding a magical staff, mystical aura, fantasy art style',
          ladino: 'A stealthy rogue in dark leather armor, holding daggers, shadowy appearance, fantasy art style',
          arqueiro: 'A skilled archer with a bow and quiver, wearing green clothing, forest background, fantasy art style',
          clerigo: 'A holy cleric in white robes with divine symbols, holding a holy symbol, radiant light, fantasy art style',
          paladino: 'A noble paladin in shining armor, holding a sword and shield with holy symbols, heroic stance, fantasy art style',
          necromante: 'A dark necromancer in black robes, surrounded by dark magic, skeletal elements, fantasy art style',
          barbaro: 'A fierce barbarian warrior with tribal tattoos, wielding a massive axe, wild appearance, fantasy art style',
          druida: 'A nature druid in green robes, surrounded by plants and animals, natural magic, fantasy art style',
          inventor: 'A clever inventor with mechanical tools, wearing goggles, surrounded by gadgets, steampunk fantasy art style'
        }

        const basePrompt = classPrompts[characterClass.toLowerCase()] || 'A fantasy character'
        const fullPrompt = characterName 
          ? `${basePrompt}, character named ${characterName}`
          : basePrompt

        const imageUrl = await generateImage(fullPrompt, 'heroico', 'dia')
        setImageUrl(imageUrl)
      } catch (err) {
        console.error('Erro ao gerar imagem do personagem:', err)
        setError('Erro ao gerar imagem do personagem')
      } finally {
        setIsLoading(false)
      }
    }

    generateCharacterImage()
  }, [characterClass, characterName])

  return { imageUrl, isLoading, error }
}
