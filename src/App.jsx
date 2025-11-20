import { useState } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import UploadProduct from './components/UploadProduct'
import ReviewDrawer from './components/ReviewDrawer'

function App() {
  const [showGrid, setShowGrid] = useState(true)
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(236,72,153,0.08),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.08),transparent_40%)]"/>
      <div className="relative">
        <nav className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 bg-slate-900/70 border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-8 h-8 bg-pink-600 rounded-lg" />
              <span className="font-extrabold tracking-tight text-xl">Freestyle Boards</span>
            </div>
            <div className="text-sm text-blue-200/90">Voor jongeren en park riders</div>
          </div>
        </nav>

        {!showGrid && (
          <Hero onStart={() => setShowGrid(true)} />
        )}

        {showGrid && (
          <>
            <ProductGrid onSelect={(p)=> setSelected(p)} />
            <UploadProduct onCreated={() => window.location.reload()} />
          </>
        )}

        <footer className="border-t border-slate-800 py-10 text-center text-blue-200/70">
          Gemaakt voor riders die leven voor rails, side-hits en style. Klik door naar partners voor de beste deals.
        </footer>
      </div>

      <ReviewDrawer product={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default App
