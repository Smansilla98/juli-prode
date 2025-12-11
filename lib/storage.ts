import fs from 'fs'
import path from 'path'

// Crear directorio de datos si no existe
// En entornos serverless (Vercel) el sistema de archivos puede ser de solo lectura.
// Usamos la variable de entorno `PRODE_DATA_PATH` si está definida, o `/tmp/prode-data`
// para entornos como Vercel donde `/tmp` sí es escribible (pero es efímero).
const defaultDataDir = path.join(process.cwd(), 'data')
const serverlessTmp = path.join('/tmp', 'prode-data')
const dataDir = process.env.PRODE_DATA_PATH || (process.env.VERCEL ? serverlessTmp : defaultDataDir)
const dataFile = path.join(dataDir, 'prode.json')

// Asegurar que el directorio existe
export function ensureDataDir() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
  } catch (err) {
    console.error('No se pudo crear el directorio de datos:', dataDir, err)
    throw err
  }
}

// Obtener todos los datos
export function getAllProde() {
  try {
    ensureDataDir()
    if (!fs.existsSync(dataFile)) {
      return []
    }
    const data = fs.readFileSync(dataFile, 'utf-8')
    return JSON.parse(data || '[]')
  } catch (error) {
    console.error('Error reading prode data:', error)
    return []
  }
}

// Guardar nuevos datos
export function saveProde(prodeData: any) {
  try {
    ensureDataDir()
    const allData = getAllProde()
    const newEntry = {
      ...prodeData,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString(),
    }
    allData.unshift(newEntry) // Agregar al inicio
    fs.writeFileSync(dataFile, JSON.stringify(allData, null, 2))
    return newEntry
  } catch (error) {
    console.error('Error saving prode data:', error)
    throw error
  }
}

// Eliminar un registro
export function deleteProde(id: string) {
  try {
    ensureDataDir()
    const allData = getAllProde()
    const filtered = allData.filter((item: any) => item.id !== id)
    fs.writeFileSync(dataFile, JSON.stringify(filtered, null, 2))
    return true
  } catch (error) {
    console.error('Error deleting prode data:', error)
    throw error
  }
}

// Obtener un prode por ID
export function getProdeById(id: string) {
  try {
    const allData = getAllProde()
    return allData.find((item: any) => item.id === id)
  } catch (error) {
    console.error('Error getting prode by id:', error)
    return null
  }
}
