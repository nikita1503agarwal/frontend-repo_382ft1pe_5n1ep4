import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/40 blur-3xl rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          Snowboard Reviews voor Freestylers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
        >
          Ontdek de beste jib- en parkboards, lees eerlijke reviews en klik direct door naar de beste deals via onze affiliate links.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8"
        >
          <button onClick={onStart} className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg shadow-pink-600/30">
            Bekijk boards
          </button>
        </motion.div>
      </div>
    </section>
  )
}
