'use client'

import { useState, useEffect } from 'react'

interface ProdeFormData {
  nombre: string
  fechaNacimiento: string
  horaNacimiento: string
  peso: string
  longitud: string
  tipoParto: 'Natural' | 'Cesárea'
  numeroHabitacion: string
}

interface ProdeData extends ProdeFormData {
  id: string
  fechaCreacion: string
}

export default function Home() {
  const [formData, setFormData] = useState<ProdeFormData>({
    nombre: '',
    fechaNacimiento: '',
    horaNacimiento: '',
    peso: '',
    longitud: '',
    tipoParto: 'Natural',
    numeroHabitacion: '',
  })

  const [savedData, setSavedData] = useState<ProdeData[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/prode')
        if (response.ok) {
          const data = await response.json()
          setSavedData(data)
        } else {
          console.error('Error al cargar datos:', response.statusText)
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    }
    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTipoPartoToggle = () => {
    setFormData(prev => ({
      ...prev,
      tipoParto: prev.tipoParto === 'Natural' ? 'Cesárea' : 'Natural',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const saveData = async () => {
      try {
        const response = await fetch('/api/prode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          const newEntry = await response.json()
          setSavedData(prev => [newEntry, ...prev])
          
          // Limpiar formulario
          setFormData({
            nombre: '',
            fechaNacimiento: '',
            horaNacimiento: '',
            peso: '',
            longitud: '',
            tipoParto: 'Natural',
            numeroHabitacion: '',
          })
        } else {
          let message = 'Error al guardar los datos'
          try {
            const err = await response.json()
            if (err && err.error) message = `${err.error}${err.missing ? ': ' + err.missing.join(', ') : ''}`
          } catch (_) {}
          console.error('Error al guardar:', message)
          alert(message)
        }
      } catch (error) {
        console.error('Error al guardar:', error)
        alert('Error al guardar los datos')
      } finally {
        setIsSubmitting(false)
      }
    }

    // Simular un pequeño delay para mejor UX
    setTimeout(saveData, 300)
  }

  const handleDelete = (id: string) => {
    const deleteData = async () => {
      try {
        const response = await fetch(`/api/prode?id=${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setSavedData(prev => prev.filter(entry => entry.id !== id))
        } else {
          console.error('Error al eliminar:', response.statusText)
          alert('Error al eliminar los datos')
        }
      } catch (error) {
        console.error('Error al eliminar:', error)
        alert('Error al eliminar los datos')
      }
    }

    deleteData()
  }

  // Lógica de paginación
  const totalPages = Math.ceil(savedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = savedData.slice(startIndex, endIndex)

  return (
    <main className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-6xl space-y-8">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
            JuliProde
          </h1>
          <p className="text-lg text-amber-900/70 font-medium">
            Completa el formulario con tus predicciones
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200/50 p-8 md:p-10 hover:shadow-3xl transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-amber-900/80 mb-2.5">
                Nombre de quien realiza el prode
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 bg-white/80 hover:bg-white hover:border-amber-300 placeholder:text-amber-600/50"
                placeholder="Ingresa tu nombre"
              />
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-semibold text-amber-900/80 mb-2.5">
                  Fecha del nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 bg-white/80 hover:bg-white hover:border-amber-300"
                />
              </div>

              <div>
                <label htmlFor="horaNacimiento" className="block text-sm font-semibold text-amber-900/80 mb-2.5">
                  Hora del nacimiento
                </label>
                <input
                  type="time"
                  id="horaNacimiento"
                  name="horaNacimiento"
                  value={formData.horaNacimiento}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 bg-white/80 hover:bg-white hover:border-amber-300"
                />
              </div>
            </div>

            {/* Peso y Longitud */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="peso" className="block text-sm font-semibold text-amber-900/80 mb-2.5">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-5 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 bg-white/80 hover:bg-white hover:border-amber-300 placeholder:text-amber-600/50"
                  placeholder="Ej: 3.5"
                />
              </div>

              <div>
                <label htmlFor="longitud" className="block text-sm font-semibold text-amber-900/80 mb-2.5">
                  Longitud (cm)
                </label>
                <input
                  type="number"
                  id="longitud"
                  name="longitud"
                  value={formData.longitud}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0"
                  className="w-full px-5 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 bg-white/80 hover:bg-white hover:border-amber-300 placeholder:text-amber-600/50"
                  placeholder="Ej: 50"
                />
              </div>
            </div>

            {/* Tipo de Parto - Selección */}
            <div>
              <label className="block text-sm font-semibold text-amber-900/80 mb-3">
                Tipo de parto
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, tipoParto: 'Natural' }))}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 ${
                    formData.tipoParto === 'Natural'
                      ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600 text-white shadow-lg transform scale-105'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  Natural
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, tipoParto: 'Cesárea' }))}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 ${
                    formData.tipoParto === 'Cesárea'
                      ? 'bg-gradient-to-r from-stone-500 via-neutral-500 to-stone-600 text-white shadow-lg transform scale-105'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Cesárea
                </button>
              </div>
            </div>

            {/* Número de Habitación */}
            <div>
              <label htmlFor="numeroHabitacion" className="block text-sm font-semibold text-amber-900/80 mb-2.5">
                Número de habitación
              </label>
              <input
                type="text"
                id="numeroHabitacion"
                name="numeroHabitacion"
                value={formData.numeroHabitacion}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all duration-200 bg-white/80 hover:bg-white hover:border-amber-300 placeholder:text-amber-600/50"
                placeholder="Ej: 205 o A-12"
              />
            </div>

            {/* Botón Guardar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                'Guardar'
              )}
            </button>
          </form>
        </div>

        {/* Tabla de todos los prodes guardados */}
        {savedData.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200/50 p-8 md:p-10 transition-all duration-500 ease-in-out hover:shadow-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent mb-2">
                Todos los Prodes Guardados
              </h2>
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold">
                {savedData.length} {savedData.length === 1 ? 'prode' : 'prodes'}
              </span>
              {totalPages > 1 && (
                <p className="text-xs text-amber-700 mt-2">
                  Página {currentPage} de {totalPages}
                </p>
              )}
            </div>
            <div className="overflow-x-auto rounded-2xl border border-amber-200/50">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Hora
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Peso
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Longitud
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Tipo Parto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Habitación
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-amber-900/80 uppercase tracking-wider">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {paginatedData.map((entry, index) => (
                    <tr 
                      key={entry.id} 
                      className="hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 transition-all duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 text-sm text-amber-900 font-semibold">
                        {entry.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900/80">
                        {new Date(entry.fechaNacimiento).toLocaleDateString('es-AR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900/80 font-medium">
                        {entry.horaNacimiento}
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900/80 font-medium">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-lg font-semibold">
                          {entry.peso} kg
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900/80 font-medium">
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-lg font-semibold">
                          {entry.longitud} cm
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1.5 rounded-full font-bold text-xs ${
                          entry.tipoParto === 'Natural' 
                            ? 'bg-amber-200 text-amber-900' 
                            : 'bg-stone-200 text-stone-800'
                        }`}>
                          {entry.tipoParto}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-amber-900/80 font-medium">
                        <span className="px-2 py-1 bg-stone-100 text-stone-700 rounded-lg">
                          {entry.numeroHabitacion}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="hidden px-3 py-1.5 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200 text-xs"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Controles de Paginación */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-2.5 bg-amber-100 text-amber-800 rounded-lg font-semibold hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  ← Anterior
                </button>

                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2.5 bg-amber-100 text-amber-800 rounded-lg font-semibold hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

