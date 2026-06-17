import { Link } from 'react-router-dom'

export default function ProductCard({ name, description = '', productId, path, image, buttonLabel = 'VER MÁS' }) {
  const to = path ?? (productId ? `/libretas?product=${productId}` : '/libretas')
  return (
    <Link to={to} className="group block">
      <div className="w-full aspect-[3/4] bg-sage/30 overflow-hidden mb-4">
        {image
          ? <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <div className="w-1/3 h-1/2 bg-brown/10 border border-brown/15 rounded-sm" />
            </div>
        }
      </div>

      {/* Text below image */}
      <div>
        <h3 className="font-alegreya-sc font-bold text-brown text-sm tracking-widest uppercase mb-1">
          {name}
        </h3>
        {description && (
          <p className="font-alegreya text-brown/55 text-sm leading-snug mb-3">{description}</p>
        )}
        <span className="inline-block font-alegreya-sc text-xs tracking-widest text-brown border-b border-brown pb-0.5 group-hover:text-dark-red group-hover:border-dark-red transition-colors uppercase">
          {buttonLabel}
        </span>
      </div>
    </Link>
  )
}
