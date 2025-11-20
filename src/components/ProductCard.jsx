import { Star } from 'lucide-react'

export default function ProductCard({ product, onSelect }) {
  const rating = product.gemiddelde_rating ?? 0
  return (
    <div className="group bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden hover:border-pink-500/40 transition-colors">
      {product.afbeelding_url ? (
        <img src={product.afbeelding_url} alt={product.naam} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-slate-700/60" />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-pink-300/80">{product.stijl}</span>
        </div>
        <h3 className="mt-1 text-lg font-semibold text-white">{product.naam}</h3>
        <p className="text-sm text-blue-200/80">{product.merk}</p>
        <div className="mt-2 flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < Math.round(rating) ? 'fill-yellow-400' : 'opacity-30'} />
          ))}
          <span className="ml-2 text-xs text-blue-200/80">{rating ? rating.toFixed(1) : 'Geen rating'}</span>
        </div>
        <div className="mt-3 flex gap-2">
          {product.affiliate_url && (
            <a href={product.affiliate_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 text-sm rounded-lg bg-pink-600 hover:bg-pink-500 text-white">
              Check Deal
            </a>
          )}
          <button onClick={() => onSelect(product)} className="px-3 py-1.5 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-white">
            Reviews
          </button>
        </div>
      </div>
    </div>
  )
}
