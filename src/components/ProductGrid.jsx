import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ onSelect }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ zoekterm: '', stijl: '', merk: '' })

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProducts = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.zoekterm) params.set('zoekterm', filters.zoekterm)
    if (filters.stijl) params.set('stijl', filters.stijl)
    if (filters.merk) params.set('merk', filters.merk)

    const res = await fetch(`${backend}/api/products?${params.toString()}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
        <input
          value={filters.zoekterm}
          onChange={e => setFilters({ ...filters, zoekterm: e.target.value })}
          placeholder="Zoeken op naam, tags, beschrijving..."
          className="flex-1 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400"
        />
        <input
          value={filters.stijl}
          onChange={e => setFilters({ ...filters, stijl: e.target.value })}
          placeholder="Stijl (freestyle, park, all-mountain)"
          className="px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400"
        />
        <input
          value={filters.merk}
          onChange={e => setFilters({ ...filters, merk: e.target.value })}
          placeholder="Merk"
          className="px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400"
        />
        <button onClick={fetchProducts} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white">Zoek</button>
      </div>

      {loading ? (
        <p className="text-blue-200">Laden...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center text-blue-200/80">Nog geen producten. Voeg er eentje toe hieronder.</div>
          )}
        </div>
      )}
    </section>
  )
}
