export default function ColorSwatch({ color, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(color.name)}
      title={color.name}
      aria-label={color.name}
      aria-pressed={selected}
      className={`w-8 h-8 rounded-full transition-all duration-200 flex-shrink-0 ${
        color.seasonal
          ? 'border-2 border-dashed border-brown/50'
          : 'border-2 border-black/20'
      } ${selected ? 'ring-2 ring-offset-2 ring-brown scale-110' : 'hover:scale-110'}`}
      style={{
        backgroundColor: color.hex,
        backgroundImage: color.texture ? `url(${color.texture})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: color.blendMode || undefined,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.08)',
      }}
    />
  )
}
