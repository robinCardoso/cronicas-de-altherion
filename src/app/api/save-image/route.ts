import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    console.log('💾 === INÍCIO SALVAR IMAGEM ===')
    const body = await request.json()
    const { imageData, characterClass, characterName } = body

    console.log('💾 Dados recebidos:')
    console.log('💾 - characterClass:', characterClass)
    console.log('💾 - characterName:', characterName)
    console.log('💾 - imageData length:', imageData?.length || 0)

    if (!imageData) {
      console.log('💾 ❌ Erro: Dados da imagem são obrigatórios')
      return NextResponse.json(
        { error: 'Dados da imagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar diretório se não existir
    const imagesDir = join(process.cwd(), 'public', 'images', 'characters')
    console.log('💾 Criando diretório:', imagesDir)
    await mkdir(imagesDir, { recursive: true })
    console.log('💾 ✅ Diretório criado/verificado')

    // Gerar nome do arquivo
    const timestamp = Date.now()
    const fileName = `${characterClass || 'character'}_${characterName || 'unnamed'}_${timestamp}.png`
    const filePath = join(imagesDir, fileName)
    console.log('💾 Salvando arquivo:')
    console.log('💾 - fileName:', fileName)
    console.log('💾 - filePath:', filePath)

    // Converter base64 para buffer
    console.log('💾 Processando dados da imagem...')
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    console.log('💾 Buffer criado, tamanho:', buffer.length, 'bytes')

    // Salvar arquivo
    await writeFile(filePath, buffer)
    console.log('💾 ✅ Arquivo salvo com sucesso!')

    // Retornar URL pública
    const publicUrl = `/images/characters/${fileName}`
    console.log('💾 ✅ Imagem salva:', publicUrl)
    
    return NextResponse.json({ 
      imageUrl: publicUrl,
      fileName: fileName
    })
  } catch (error) {
    console.error('❌ Erro ao salvar imagem:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
