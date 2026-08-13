import { useMemo, useState, useRef, useEffect } from 'react'
import { coverColors, extendedCoverColors, cordonColors } from '../data/colors'

function darken(hex, amount = 40) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount)
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount)
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount)
  return `rgb(${r},${g},${b})`
}

function roundedRect(x, y, w, h, tl, tr, br, bl) {
  return [
    `M ${x + tl} ${y}`,
    `L ${x + w - tr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + tr}`,
    `L ${x + w} ${y + h - br}`,
    `Q ${x + w} ${y + h} ${x + w - br} ${y + h}`,
    `L ${x + bl} ${y + h}`,
    `Q ${x} ${y + h} ${x} ${y + h - bl}`,
    `L ${x} ${y + tl}`,
    `Q ${x} ${y} ${x + tl} ${y}`,
    'Z',
  ].join(' ')
}

const MIN_SCALE = 0.7
const MAX_SCALE = 2.2
const STEP      = 0.15

export default function NotebookPreview({ selectedColorName, cordonName, grabado, grabadoText, onClose, productId }) {
  const spineLineCount = (productId === 'pequena' || productId === 'portapasaporte') ? 2 : 3
  const [scale, setScale] = useState(1.3)
  const [pos, setPos] = useState({ x: 20, y: null })
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const panelRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      setPos({ x: clientX - dragOffset.current.x, y: clientY - dragOffset.current.y })
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  const onDragStart = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const rect = panelRef.current.getBoundingClientRect()
    dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top }
    dragging.current = true
  }

  const availableCoverColors = productId === 'grande' ? coverColors : extendedCoverColors
  const coverColor = useMemo(
    () => availableCoverColors.find((c) => c.name === selectedColorName) ?? availableCoverColors[2],
    [selectedColorName, availableCoverColors]
  )
  const coverHex = coverColor.hex
  const coverTexture = coverColor.texture ?? null
  const cordonHex = useMemo(
    () => cordonColors.find((c) => c.name === cordonName)?.hex ?? '#1a1a1a',
    [cordonName]
  )

  const borderColor = darken(coverHex, 60)
  const showEngrave = grabado && grabadoText && grabadoText.trim().length > 0
  const luminance = 0.299 * coverColor.r + 0.587 * coverColor.g + 0.114 * coverColor.b
  const engraveColor = luminance > 140 ? '#000000' : '#ffffff'

  // Base SVG dimensions (unscaled)
  const H      = 185
  const spineW = 28
  const gap    = 7
  const r      = 10
  const leftW  = 24
  const midW   = 72
  const rightW = 24
  const coverW = leftW + midW + rightW
  const frontX = spineW + gap + 1
  const seam2X = frontX + leftW + midW
  const totalW = frontX + coverW + 2
  const cordY  = Math.round(H / 2)
  const cordT  = 2.5
  const eX     = spineW / 2 - 6

  const svgW        = totalW + 2
  const svgH        = H + 2
  const panelWidth  = Math.round(svgW * MAX_SCALE) + 48

  return (
    <div
      ref={panelRef}
      className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-blush"
      style={{
        left: pos.x,
        top: pos.y ?? '50%',
        transform: pos.y == null ? 'translateY(-50%)' : 'none',
        width: panelWidth,
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-4 pt-3 pb-2 border-b border-blush/40 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
      >
        <span className="font-alegreya-sc text-xs text-brown tracking-wide">Vista previa</span>

        {/* Size controls */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={MIN_SCALE}
            max={MAX_SCALE}
            step={STEP}
            value={scale}
            onChange={(e) => setScale(+e.target.value)}
            className="preview-slider"
          />
          <span className="font-alegreya text-xs text-brown/40 w-8 text-right tabular-nums">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar vista previa"
          className="text-brown/40 hover:text-brown transition-colors text-xl leading-none font-light w-6 h-6 flex items-center justify-center"
        >×</button>
      </div>

      {/* Notebook illustration */}
      <div
        className="flex justify-center items-center py-6 overflow-hidden"
        style={{ height: svgH * scale + 48, transition: 'height 0.15s ease' }}
      >
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center', willChange: 'transform', transition: 'transform 0.15s ease' }}
        >
          {/* Leather texture pattern (only when a texture image is set) */}
          {coverTexture && (
            <defs>
              <pattern id="leatherPattern" patternUnits="userSpaceOnUse" x="0" y="0" width={totalW} height={H}>
                <image href={coverTexture} x="0" y="0" width={totalW} height={H} preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
          )}

          {/* ── SPINE ── */}
          <path
            d={roundedRect(1, 1, spineW, H - 2, r, r, r, r)}
            fill={coverTexture ? 'url(#leatherPattern)' : coverHex} stroke={borderColor} strokeWidth="1.5"
          />
          {Array.from({ length: spineLineCount }).map((_, i) => {
            const totalW = spineLineCount * 2.5 + (spineLineCount - 1) * 3
            const startX = (spineW / 2 + 1) - totalW / 2 + i * 5.5
            return (
              <g key={i}>
                <rect x={startX} y="20"      width="2.5" height="12" rx="1" fill={cordonHex} />
                <rect x={startX} y={H - 32}  width="2.5" height="12" rx="1" fill={cordonHex} />
              </g>
            )
          })}
          <line x1="1" y1={cordY} x2={spineW + 1} y2={cordY}
            stroke={cordonHex} strokeWidth={cordT} />

          {/* ── COVER ── */}
          <defs>
            <clipPath id="coverTextClip">
              <path d={roundedRect(frontX + 4, 1, coverW - 8, H - 2, r, r, r, r)} />
            </clipPath>
          </defs>
          <path
            d={roundedRect(frontX, 1, coverW, H - 2, r, r, r, r)}
            fill={coverTexture ? 'url(#leatherPattern)' : coverHex} stroke={borderColor} strokeWidth="1.5"
          />
          <line x1={frontX} y1={cordY} x2={frontX + coverW} y2={cordY}
            stroke={cordonHex} strokeWidth={cordT} />

          {showEngrave && (
            <text
              x={frontX + coverW - r - 4}
              y={H - 7}
              textAnchor="end"
              clipPath="url(#coverTextClip)"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              fontWeight="bold"
              fontSize="11"
              fill={engraveColor}
              opacity="0.9"
            >
              {grabadoText}
            </text>
          )}
        </svg>
      </div>

      {/* Labels */}
      <div className="px-4 pb-4 space-y-1">
        <p className="font-alegreya text-xs text-brown/50">
          Cuero:{' '}
          <span className="text-brown font-medium">
            {selectedColorName || <em className="font-normal opacity-60">sin seleccionar</em>}
          </span>
        </p>
        <p className="font-alegreya text-xs text-brown/50">
          Cordón:{' '}
          <span className="text-brown font-medium">
            {cordonName || <em className="font-normal opacity-60">sin seleccionar</em>}
          </span>
        </p>
        {showEngrave && (
          <p className="font-alegreya text-xs text-brown/50">
            Grabado:{' '}
            <span className="text-dark-red font-medium italic">{grabadoText}</span>
          </p>
        )}
      </div>
    </div>
  )
}
