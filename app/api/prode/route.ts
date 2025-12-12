import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET: Obtener todos los prodes guardados
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('prodes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(data || [])
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
    // Validar que tenemos todos los campos requeridos
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

    const { data, error } = await supabase
      .from('prodes')
      .insert([
        {
          nombre: body.nombre,
          fecha_nacimiento: body.fechaNacimiento,
          hora_nacimiento: body.horaNacimiento,
          peso: parseFloat(body.peso),
          longitud: parseFloat(body.longitud),
          tipo_parto: body.tipoParto,
          numero_habitacion: body.numeroHabitacion,
        }
      ])
      .select()

    if (error) {
      throw error
    }

    // Transformar la respuesta al formato esperado por el frontend
    const newProde = data?.[0]
    return NextResponse.json({
      id: newProde.id.toString(),
      nombre: newProde.nombre,
      fechaNacimiento: newProde.fecha_nacimiento,
      horaNacimiento: newProde.hora_nacimiento,
      peso: newProde.peso.toString(),
      longitud: newProde.longitud.toString(),
      tipoParto: newProde.tipo_parto,
      numeroHabitacion: newProde.numero_habitacion,
      fechaCreacion: newProde.created_at,
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/prode:', error)
    const msg = (error && error.message) ? String(error.message) : 'Error al guardar los datos'
    return NextResponse.json(
      { error: 'Error al guardar los datos', message: msg },
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

    const { error } = await supabase
      .from('prodes')
      .delete()
      .eq('id', parseInt(id))

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/prode:', error)
    return NextResponse.json(
      { error: 'Error al eliminar los datos' },
      { status: 500 }
    )
  }
}
