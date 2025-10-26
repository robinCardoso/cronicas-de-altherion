#!/usr/bin/env node

/**
 * Script para validar traduções
 * Uso: node scripts/validate-translations.js
 */

const fs = require('fs')
const path = require('path')

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

// Função para extrair chaves de um objeto
function extractKeys(obj, prefix = '') {
  const keys = []
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'string') {
      keys.push(fullKey)
    } else if (typeof value === 'object' && value !== null) {
      keys.push(...extractKeys(value, fullKey))
    }
  }
  
  return keys.sort()
}

// Função para carregar traduções
function loadTranslations() {
  const localesDir = path.join(__dirname, '..', 'public', 'locales')
  const translations = {}
  
  const files = fs.readdirSync(localesDir)
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const lang = file.replace('.json', '')
      const filePath = path.join(localesDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      
      try {
        translations[lang] = JSON.parse(content)
        console.log(`${colors.green}✓${colors.reset} Carregado: ${lang}.json`)
      } catch (error) {
        console.error(`${colors.red}✗${colors.reset} Erro ao carregar ${lang}.json:`, error.message)
      }
    }
  })
  
  return translations
}

// Função para validar traduções
function validateTranslations(translations) {
  const languages = Object.keys(translations)
  const allKeys = new Set()
  const results = {
    isValid: true,
    missingKeys: [],
    extraKeys: [],
    coverage: {},
    errors: []
  }

  // Coleta todas as chaves
  languages.forEach(lang => {
    const keys = extractKeys(translations[lang])
    keys.forEach(key => allKeys.add(key))
  })

  // Valida cada linguagem
  languages.forEach(lang => {
    const langKeys = extractKeys(translations[lang])
    const langKeySet = new Set(langKeys)
    
    // Chaves faltantes
    const missing = Array.from(allKeys).filter(key => !langKeySet.has(key))
    if (missing.length > 0) {
      results.missingKeys.push({ lang, keys: missing })
      results.isValid = false
    }
    
    // Chaves extras
    const extra = langKeys.filter(key => {
      return !languages.some(otherLang => {
        if (otherLang === lang) return true
        const otherKeys = extractKeys(translations[otherLang])
        return otherKeys.includes(key)
      })
    })
    
    if (extra.length > 0) {
      results.extraKeys.push({ lang, keys: extra })
    }
    
    // Cobertura
    const coverage = allKeys.size > 0 ? (langKeys.length / allKeys.size) * 100 : 100
    results.coverage[lang] = coverage
  })

  return results
}

// Função para gerar relatório
function generateReport(results) {
  console.log(`\n${colors.bold}${colors.blue}📊 RELATÓRIO DE VALIDAÇÃO DE TRADUÇÕES${colors.reset}\n`)
  
  // Status geral
  const status = results.isValid ? 
    `${colors.green}✅ VÁLIDO${colors.reset}` : 
    `${colors.red}❌ INVÁLIDO${colors.reset}`
  
  console.log(`Status Geral: ${status}`)
  
  // Cobertura por idioma
  console.log(`\n${colors.bold}Cobertura por Idioma:${colors.reset}`)
  Object.entries(results.coverage).forEach(([lang, coverage]) => {
    const color = coverage === 100 ? colors.green : 
                  coverage >= 80 ? colors.yellow : colors.red
    const icon = coverage === 100 ? '✅' : coverage >= 80 ? '⚠️' : '❌'
    
    console.log(`  ${icon} ${lang.toUpperCase()}: ${color}${coverage.toFixed(1)}%${colors.reset}`)
  })
  
  // Chaves faltantes
  if (results.missingKeys.length > 0) {
    console.log(`\n${colors.bold}${colors.red}Chaves Faltantes:${colors.reset}`)
    results.missingKeys.forEach(({ lang, keys }) => {
      console.log(`\n  ${colors.red}${lang.toUpperCase()}:${colors.reset}`)
      keys.forEach(key => {
        console.log(`    - ${key}`)
      })
    })
  }
  
  // Chaves extras
  if (results.extraKeys.length > 0) {
    console.log(`\n${colors.bold}${colors.yellow}Chaves Extras:${colors.reset}`)
    results.extraKeys.forEach(({ lang, keys }) => {
      console.log(`\n  ${colors.yellow}${lang.toUpperCase()}:${colors.reset}`)
      keys.forEach(key => {
        console.log(`    - ${key}`)
      })
    })
  }
  
  // Resumo
  const totalKeys = Object.values(results.coverage).length > 0 ? 
    Math.max(...Object.values(results.coverage).map(c => c / 100 * Object.keys(results.coverage).length)) : 0
  
  console.log(`\n${colors.bold}Resumo:${colors.reset}`)
  console.log(`  Total de idiomas: ${Object.keys(results.coverage).length}`)
  console.log(`  Total de chaves: ${totalKeys}`)
  console.log(`  Chaves faltantes: ${results.missingKeys.reduce((sum, { keys }) => sum + keys.length, 0)}`)
  console.log(`  Chaves extras: ${results.extraKeys.reduce((sum, { keys }) => sum + keys.length, 0)}`)
  
  return results.isValid
}

// Função principal
function main() {
  console.log(`${colors.bold}${colors.blue}🔍 Validando traduções...${colors.reset}`)
  
  try {
    const translations = loadTranslations()
    
    if (Object.keys(translations).length === 0) {
      console.error(`${colors.red}✗${colors.reset} Nenhuma tradução encontrada!`)
      process.exit(1)
    }
    
    const results = validateTranslations(translations)
    const isValid = generateReport(results)
    
    if (!isValid) {
      console.log(`\n${colors.red}❌ Validação falhou! Corrija os erros acima.${colors.reset}`)
      process.exit(1)
    } else {
      console.log(`\n${colors.green}✅ Todas as traduções estão válidas!${colors.reset}`)
      process.exit(0)
    }
    
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Erro durante a validação:`, error.message)
    process.exit(1)
  }
}

// Executa o script
if (require.main === module) {
  main()
}

module.exports = {
  loadTranslations,
  validateTranslations,
  extractKeys
}
