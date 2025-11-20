import { useState } from 'react'

export default function UploadProduct({ onCreated }) {
  const [form, setForm] = useState({ naam: '', merk: '', stijl: 'freestyle', prijseur: '', beschrijving: '', afbeelding_url: '', affiliate_url: '', tags: '' })
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const body = {
      naam: form.naam,
      merk: form.merk,
      stijl: form.stijl,
      prijseur: Number(form.prijseur || 0),
      beschrijving: form.beschrijving || undefined,
      afbeelding_url: form.afbeelding_url || undefined,
      affiliate_url: form.affiliate_url || undefined,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    }

    const res = await fetch(`${backend}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setLoading(false)
    if (res.ok) {
      setForm({ naam: '', merk: '', stijl: 'freestyle', prijseur: '', beschrijving: '', afbeelding_url: '', affiliate_url: '', tags: '' })
      onCreated?.()
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold text-white mb-4">Upload nieuw snowboard</h3>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
        <input value={form.naam} onChange={e=>setForm({ ...form, naam: e.target.value })} placeholder="Naam" className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" required />
        <input value={form.merk} onChange={e=>setForm({ ...form, merk: e.target.value })} placeholder="Merk" className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" required />
        <input value={form.stijl} onChange={e=>setForm({ ...form, stijl: e.target.value })} placeholder="Stijl (freestyle/park/all-mountain)" className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 md:col-span-2" />
        <input value={form.prijseur} onChange={e=>setForm({ ...form, prijseur: e.target.value })} placeholder="Prijs (€)" type="number" step="0.01" className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={form.afbeelding_url} onChange={e=>setForm({ ...form, afbeelding_url: e.target.value })} placeholder="Afbeelding URL" className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={form.affiliate_url} onChange={e=>setForm({ ...form, affiliate_url: e.target.value })} placeholder="Affiliate URL (externe shop)" className="px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 md:col-span-2" />
        <textarea value={form.beschrijving} onChange={e=>setForm({ ...form, beschrijving: e.target.value })} placeholder="Beschrijving" className="md:col-span-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 h-28" />
        <input value={form.tags} onChange={e=>setForm({ ...form, tags: e.target.value })} placeholder="Tags, gescheiden door komma (bv: buttery, soft, park)" className="md:col-span-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <div className="md:col-span-2 flex justify-end">
          <button disabled={loading} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60">
            {loading ? 'Opslaan...' : 'Product plaatsen'}
          </button>
        </div>
      </form>
    </section>
  )
}
