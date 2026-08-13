import { useState } from 'react'
import { Link } from 'react-router-dom'
import ColorSwatch from './ColorSwatch'
import { cordonColors } from '../data/colors'

function ExpandableSection({ label, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-blush/60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center py-2 font-alegreya-sc text-sm text-brown hover:text-dark-red transition-colors"
      >
        {label}
        <span className="text-lg leading-none">{open ? '▼' : '▶'}</span>
      </button>
      {open && <div className="pb-3 text-sm font-alegreya text-brown/80">{children}</div>}
    </div>
  )
}


const repuestoOptions = [
  { name: 'Rayado', bg: '#f5f0e8', icon: 'lines' },
  { name: 'Liso', bg: '#fafafa', icon: 'blank' },
  { name: 'Punteado', bg: '#fafafa', icon: 'dots' },
]

function RepuestoSwatch({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(selected ? '' : option.name)}
      title={option.name}
      aria-label={option.name}
      aria-pressed={selected}
      className={`w-12 h-12 rounded-full flex-shrink-0 border-2 transition-all duration-200 flex items-center justify-center overflow-hidden ${
        selected
          ? 'ring-2 ring-offset-2 ring-brown scale-110 border-brown'
          : 'border-blush hover:scale-110'
      }`}
      style={{ backgroundColor: option.bg }}
    >
      {option.icon === 'lines' && (
        <div className="w-7 h-7 flex flex-col justify-center gap-1 px-1">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-px bg-brown/50 w-full" />)}
        </div>
      )}
      {option.icon === 'dots' && (
        <div className="w-7 h-7 grid grid-cols-3 gap-px p-1">
          {Array(9).fill(0).map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-brown/40 mx-auto" />)}
        </div>
      )}
      {option.icon === 'grid' && (
        <div className="w-7 h-7 relative">
          {[1, 2].map((i) => <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-brown/30" style={{ left: `${(i / 3) * 100}%` }} />)}
          {[1, 2].map((i) => <div key={`h${i}`} className="absolute left-0 right-0 border-t border-brown/30" style={{ top: `${(i / 3) * 100}%` }} />)}
        </div>
      )}
      {option.icon === 'blank' && <div className="w-7 h-7" />}
      {option.icon === 'watercolor' && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 opacity-80" />
      )}
      {option.icon === 'agenda' && (
        <div className="w-7 h-7 flex flex-col gap-0.5 p-1">
          <div className="h-1.5 bg-dark-red/40 rounded-sm w-full" />
          {[0, 1, 2].map((i) => <div key={i} className="h-px bg-brown/30 w-full" />)}
        </div>
      )}
    </button>
  )
}

function NotebookSection({ label, value, onChange, options }) {
  return (
    <ExpandableSection label={<span>{label}</span>}>
      <div className="flex flex-wrap gap-3 pt-2">
        {options.map((opt) => (
          <div key={opt.name} className="flex flex-col items-center gap-1">
            <RepuestoSwatch option={opt} selected={value === opt.name} onSelect={onChange} />
            <span className="text-xs text-brown/60 text-center w-12 leading-tight">{opt.name}</span>
          </div>
        ))}
      </div>
    </ExpandableSection>
  )
}

export default function PersonalizePanel({ onChange, hideInserts = false, productId }) {
  const [grabado, setGrabado] = useState(false)
  const [grabadoText, setGrabadoText] = useState('')
  const [charmsOpen, setCharmsOpen] = useState(false)
  const [charmFrontal, setCharmFrontal] = useState('')
  const [charm1Costado, setCharm1Costado] = useState('')
  const [charm2Costado, setCharm2Costado] = useState('')
  const [charm3Costado, setCharm3Costado] = useState('')
  const [cordon, setCordon] = useState('')
  const [notebook1, setNotebook1] = useState('')
  const [notebook2, setNotebook2] = useState('')
  const [notebook3, setNotebook3] = useState('')

  const MAX_GRABADO = 15

  const isPassport = productId === 'portapasaporte'
  const has3LateralCharms = productId === 'mediana' || productId === 'grande'
  const notebookOptions = productId === 'grande'
    ? repuestoOptions.filter((o) => o.name !== 'Punteado')
    : repuestoOptions

  const notify = (update) => {
    if (!onChange) return
    const merged = { grabado, grabadoText, charmFrontal, charm1Costado, charm2Costado, charm3Costado, cordon, notebook1, notebook2, notebook3, ...update }
    onChange({ ...merged, repuestoCost: 0 })
  }

  const handleGrabado = (v) => {
    setGrabado(v)
    notify({ grabado: v })
  }

  const handleGrabadoText = (v) => {
    if (v.length > MAX_GRABADO) return
    setGrabadoText(v)
    notify({ grabadoText: v })
  }

  const handleCharmsOpen = (v) => {
    setCharmsOpen(v)
    if (!v) {
      setCharmFrontal('')
      setCharm1Costado('')
      setCharm2Costado('')
      setCharm3Costado('')
      notify({ charmFrontal: '', charm1Costado: '', charm2Costado: '', charm3Costado: '' })
    }
  }

  return (
    <div className="border border-blush rounded-lg p-4 bg-white/50 space-y-1 overflow-hidden">
      {/* Engraving */}
      <label className="flex items-center gap-2 font-alegreya-sc text-sm text-brown cursor-pointer py-1">
        <input
          type="checkbox"
          checked={grabado}
          onChange={(e) => handleGrabado(e.target.checked)}
          className="accent-dark-red w-4 h-4"
        />
        Servicio de grabado
      </label>

      {grabado && (
        <div className="pb-2 px-1">
          <div className="flex justify-between mb-1">
            <label className="font-alegreya text-xs text-brown/70">Tu texto de grabado</label>
            <span className="font-alegreya text-xs text-brown/40">
              {grabadoText.length}/{MAX_GRABADO} caracteres máximo
            </span>
          </div>
          <input
            type="text"
            value={grabadoText}
            onChange={(e) => handleGrabadoText(e.target.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ]/g, ''))}
            placeholder="Ej: FV"
            maxLength={MAX_GRABADO}
            className="w-full border border-blush rounded px-3 py-2 text-sm font-alegreya text-brown bg-white focus:outline-none focus:border-dark-red transition-colors"
          />
        </div>
      )}

      {/* Cord color — circular swatches like leather */}
      <ExpandableSection label="Color del cordón">
        <div className="flex flex-wrap gap-3 pt-2 w-full">
          {cordonColors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1">
              <ColorSwatch
                color={c}
                selected={cordon === c.name}
                onSelect={(name) => {
                  const next = cordon === name ? '' : name
                  setCordon(next)
                  notify({ cordon: next })
                }}
              />
              <span className="text-xs text-brown/60 text-center w-10 leading-tight">{c.name}</span>
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* Notebook refill slots */}
      {!hideInserts && (
        <>
          <NotebookSection
            label="Cuaderno No. 1"
            value={notebook1}
            onChange={(v) => { setNotebook1(v); notify({ notebook1: v }) }}
            options={notebookOptions}
          />
          <NotebookSection
            label="Cuaderno No. 2"
            value={notebook2}
            onChange={(v) => { setNotebook2(v); notify({ notebook2: v }) }}
            options={notebookOptions}
          />
          <NotebookSection
            label="Cuaderno No. 3"
            value={notebook3}
            onChange={(v) => { setNotebook3(v); notify({ notebook3: v }) }}
            options={notebookOptions}
          />
        </>
      )}

      {/* Charms */}
      <label className="flex items-center gap-2 font-alegreya-sc text-sm text-brown cursor-pointer py-1">
        <input
          type="checkbox"
          checked={charmsOpen}
          onChange={(e) => handleCharmsOpen(e.target.checked)}
          className="accent-dark-red w-4 h-4"
        />
        Agregar charms
      </label>

      {charmsOpen && (
        <div className="pb-2 px-1 space-y-2">
          <a
            href="https://drive.google.com/drive/folders/1vbFzD5zKf8UAPkv130jvA-ifE9oUtAb1?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-alegreya-sc text-xs text-dark-red underline underline-offset-2 hover:text-brown transition-colors mb-1"
          >
            Ver charms
          </a>
          <div>
            <label className="font-alegreya text-xs text-brown/70 block mb-1">Charm frontal</label>
            <input
              type="text"
              value={charmFrontal}
              onChange={(e) => { setCharmFrontal(e.target.value); notify({ charmFrontal: e.target.value }) }}
              placeholder="Ej: C150"
              className="w-full border border-blush rounded px-3 py-2 text-sm font-alegreya text-brown bg-white focus:outline-none focus:border-dark-red transition-colors"
            />
          </div>
          <div>
            <label className="font-alegreya text-xs text-brown/70 block mb-1">
              {isPassport ? 'Charm costado' : 'Charm N°1 costado'}
            </label>
            <input
              type="text"
              value={charm1Costado}
              onChange={(e) => { setCharm1Costado(e.target.value); notify({ charm1Costado: e.target.value }) }}
              placeholder="Ej: C150"
              className="w-full border border-blush rounded px-3 py-2 text-sm font-alegreya text-brown bg-white focus:outline-none focus:border-dark-red transition-colors"
            />
          </div>
          {!isPassport && (
            <div>
              <label className="font-alegreya text-xs text-brown/70 block mb-1">Charm N°2 costado</label>
              <input
                type="text"
                value={charm2Costado}
                onChange={(e) => { setCharm2Costado(e.target.value); notify({ charm2Costado: e.target.value }) }}
                placeholder="Ej: C150"
                className="w-full border border-blush rounded px-3 py-2 text-sm font-alegreya text-brown bg-white focus:outline-none focus:border-dark-red transition-colors"
              />
            </div>
          )}
          {has3LateralCharms && (
            <div>
              <label className="font-alegreya text-xs text-brown/70 block mb-1">Charm N°3 costado</label>
              <input
                type="text"
                value={charm3Costado}
                onChange={(e) => { setCharm3Costado(e.target.value); notify({ charm3Costado: e.target.value }) }}
                placeholder="Ej: C150"
                className="w-full border border-blush rounded px-3 py-2 text-sm font-alegreya text-brown bg-white focus:outline-none focus:border-dark-red transition-colors"
              />
            </div>
          )}
          <p className="font-alegreya text-xs text-brown/60 pt-1">
            ¿Querés un charm de cuero personalizado?{' '}
            <Link to="/agenda" className="text-dark-red underline underline-offset-2 hover:text-brown transition-colors">
              Agendá tu cita
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
