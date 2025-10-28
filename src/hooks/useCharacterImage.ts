import { useState, useEffect } from 'react'

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
      console.log('🖼️ === INÍCIO GERAÇÃO IMAGEM PERSONAGEM ===')
      console.log('🖼️ Classe:', characterClass)
      console.log('🖼️ Nome:', characterName)
      
      setIsLoading(true)
      setError(null)

      try {
        // Primeiro, tentar gerar imagem com IA
        console.log(`🖼️ Tentando gerar imagem com IA para ${characterClass}`)
        
        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `A fantasy ${characterClass} character, detailed, epic RPG art style`,
            sceneMood: 'heroico',
            timeOfDay: 'dia',
            characterClass: characterClass
          })
        })

        console.log('🖼️ Resposta da API generate-image:')
        console.log('🖼️ - Status:', response.status)
        console.log('🖼️ - OK:', response.ok)

        if (response.ok) {
          const data = await response.json()
          console.log('🖼️ Dados recebidos:', data)
          if (data.imageUrl) {
            console.log(`🖼️ ✅ Imagem gerada com sucesso para ${characterClass}:`, data.imageUrl)
            setImageUrl(data.imageUrl)
            return
          }
        } else {
          const errorText = await response.text()
          console.log('🖼️ ❌ Erro na API:', errorText)
        }

        // Fallback para imagens SVG se a IA falhar
        console.log(`🎨 IA falhou, usando imagem SVG para ${characterClass}`)
        
        const classImages: Record<string, string> = {
          'guerreiro': '/images/classes/warrior.svg',
          'mago': '/images/classes/wizard.svg',
          'ladino': '/images/classes/rogue.svg',
          'arqueiro': '/images/classes/archer.svg',
          'clerigo': '/images/classes/cleric.svg',
          'paladino': '/images/classes/paladin.svg',
          'necromante': '/images/classes/necromancer.svg',
          'barbaro': '/images/classes/barbarian.svg',
          'druida': '/images/classes/druid.svg',
          'inventor': '/images/classes/inventor.svg'
        }

        const imagePath = classImages[characterClass.toLowerCase()]
        
        if (imagePath) {
          console.log(`🎨 Usando imagem SVG para ${characterClass}: ${imagePath}`)
          setImageUrl(imagePath)
        } else {
          console.log('🎨 Classe não encontrada, usando placeholder genérico')
          setImageUrl('/images/placeholder-scene.svg')
        }
      } catch (err) {
        console.error('Erro ao gerar imagem do personagem:', err)
        setError('Erro ao gerar imagem do personagem')
        
        // Fallback final para SVG
        const classImages: Record<string, string> = {
          'guerreiro': '/images/classes/warrior.svg',
          'mago': '/images/classes/wizard.svg',
          'ladino': '/images/classes/rogue.svg',
          'arqueiro': '/images/classes/archer.svg',
          'clerigo': '/images/classes/cleric.svg',
          'paladino': '/images/classes/paladin.svg',
          'necromante': '/images/classes/necromancer.svg',
          'barbaro': '/images/classes/barbarian.svg',
          'druida': '/images/classes/druid.svg',
          'inventor': '/images/classes/inventor.svg'
        }
        
        const fallbackImage = classImages[characterClass.toLowerCase()] || '/images/placeholder-scene.svg'
        setImageUrl(fallbackImage)
      } finally {
        setIsLoading(false)
      }
    }

    generateCharacterImage()
  }, [characterClass, characterName])

  return { imageUrl, isLoading, error }
}
