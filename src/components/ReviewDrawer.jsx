import { useEffect, useState } from 'react'

export default function ReviewDrawer({ product, onClose }) {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ auteur: '', niveau: 'beginner', rating: 5, pluspunten: '', minpunten: '', review_tekst: '' })
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (product) {
      fetch(`${backend}/api/products/${product.id}/reviews`).then(r=>r.json()).then(setReviews)
    }
  }, [product])

  const submitReview = async (e) => {
    e.preventDefault()
    const body = { ...form, product_id: product.id }
    const res = await fetch(`${backend}/api/reviews`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) {
      setForm({ auteur: '', niveau: 'beginner', rating: 5, pluspunten: '', minpunten: '', review_tekst: '' })
      const list = await fetch(`${backend}/api/products/${product.id}/reviews`).then(r=>r.json())
      setReviews(list)
    }
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex">
      <div className="ml-auto w-full max-w-lg bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Reviews voor {product.naam}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white">Sluiten</button>
        </div>

        <div className="space-y-3 mb-6">
          {reviews.length === 0 && <p className="text-blue-200/80">Nog geen reviews. Wees de eerste!</p>}
          {reviews.map(r => (
            <div key={r.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium">{r.auteur} • {r.niveau}</p>
                <p className="text-yellow-400">{r.rating}/5</p>
              </div>
              {r.pluspunten && <p className="text-green-300 text-sm mt-2">+ {r.pluspunten}</p>}
              {r.minpunten && <p className="text-red-300 text-sm">- {r.minpunten}</p>}
              {r.review_tekst && <p className="text-blue-100 text-sm mt-2">{r.review_tekst}</p>}
            </div>
          ))}
        </div>

        <form onSubmit={submitReview} className="space-y-3">
          <input value={form.auteur} onChange={e=>setForm({ ...form, auteur: e.target.value })} placeholder="Naam of nickname" className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400" />
          <div className="flex gap-3">
            <select value={form.niveau} onChange={e=>setForm({ ...form, niveau: e.target.value })} className="flex-1 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-white">
              <option value="beginner">Beginner</option>
              <option value="gevorderd">Gevorderd</option>
              <option value="expert">Expert</option>
            </select>
            <input type="number" min="1" max="5" value={form.rating} onChange={e=>setForm({ ...form, rating: Number(e.target.value) })} className="w-24 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-white" />
          </div>
          <input value={form.pluspunten} onChange={e=>setForm({ ...form, pluspunten: e.target.value })} placeholder="Pluspunten" className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400" />
          <input value={form.minpunten} onChange={e=>setForm({ ...form, minpunten: e.target.value })} placeholder="Minpunten" className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400" />
          <textarea value={form.review_tekst} onChange={e=>setForm({ ...form, review_tekst: e.target.value })} placeholder="Schrijf je ervaring" className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-white placeholder:text-slate-400 h-28" />
          <button className="w-full px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white">Plaats review</button>
        </form>
      </div>
    </div>
  )
}
