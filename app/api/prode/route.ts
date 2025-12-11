import { NextRequest, NextResponse } from 'next/server'
import { getAllProde, saveProde, deleteProde } from '@/lib/storage'

// GET: Obtener todos los prodes guardados
export async function GET(request: NextRequest) {
  try {
    const allProdes = getAllProde()
    return NextResponse.json(allProdes)
  } catch (error) {
    console.error('Error in GET /api/prode:', error)
    return NextResponse.json(
      { error: 'Error al obtener los datos' },
      { status: 500 }
    )
  }
}

// POST: Guardar un nuevo prode
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validar que tenemos todos los campos requeridos (aceptar '0' y valores numéricos)
    const requiredFields = ['nombre', 'fechaNacimiento', 'horaNacimiento', 'peso', 'longitud', 'tipoParto', 'numeroHabitacion']
    const missing: string[] = []
    const isEmpty = (v: any) => v === undefined || v === null || String(v).trim() === ''
    for (const f of requiredFields) {
      if (isEmpty(body[f])) missing.push(f)
    }
    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos', missing },
        { status: 400 }
      )
    }

    const newProde = saveProde(body)
    return NextResponse.json(newProde, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/prode:', error)
    return NextResponse.json(
      { error: 'Error al guardar los datos' },
      { status: 500 }
    )
  }
}

// DELETE: Eliminar un prode
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }

    deleteProde(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/prode:', error)
    return NextResponse.json(
      { error: 'Error al eliminar los datos' },
      { status: 500 }
    )
  }
}
