import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function Nosotras() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Nosotras | Jolie Vie</title>
        <meta name="description" content="Conocé la historia detrás de Jolie Vie, marca costarricense de libretas y accesorios de cuero personalizados." />
        <link rel="canonical" href="https://jolieviecr.com/nosotras" />
        <meta property="og:url" content="https://jolieviecr.com/nosotras" />
        <meta property="og:title" content="Nosotras | Jolie Vie" />
        <meta property="og:description" content="Conocé la historia detrás de Jolie Vie, marca costarricense de libretas y accesorios de cuero personalizados." />
        <meta property="og:image" content="https://jolieviecr.com/nosotras.jpg" />
        <meta name="twitter:title" content="Nosotras | Jolie Vie" />
        <meta name="twitter:description" content="Conocé la historia detrás de Jolie Vie, marca costarricense de libretas y accesorios de cuero personalizados." />
        <meta name="twitter:image" content="https://jolieviecr.com/nosotras.jpg" />
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-14">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-brown mb-3">Sobre nosotras</h1>
          <p className="font-alegreya italic text-terracotta text-lg">
            Hechas con amor desde Costa Rica
          </p>
        </div>

        {/* Row 1: photo + who we are */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img src="/nosotras.jpg" alt="Arlene y Mariana" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-5">
            <p className="font-alegreya text-brown/75 leading-relaxed text-base md:text-lg">
              Somos Arlene y Mariana, madre e hija trabajando juntas para traer a la vida{' '}
              <em>Jolie Vie</em>, un concepto enfocado en que vos escojás tu propio lienzo para
              empezar a escribir tu historia.
            </p>
            <p className="font-alegreya text-brown/75 leading-relaxed text-base md:text-lg">
              <em>Jolie Vie</em> te ofrece una libreta que se adapta a tus necesidades y te
              acompaña conforme estas van cambiando. Las posibilidades son infinitas.
            </p>
            <p className="font-alegreya text-brown/75 leading-relaxed text-base md:text-lg">
              Con envoltura de cuero hecha 100% a mano, estas libretas están diseñadas por y para
              vos, haciendo cada una de ellas única y exclusiva.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-dark-red py-16 text-center px-4">
        <h2 className="font-playfair text-2xl md:text-3xl text-cream font-bold mb-3">
          ¿Querés conocernos mejor?
        </h2>
        <p className="font-alegreya text-cream/70 mb-7 text-base md:text-lg">
          Agenda una videollamada gratuita con nosotras
        </p>
        <Link
          to="/agenda"
          className="inline-block bg-cream text-dark-red font-alegreya-sc font-bold px-10 py-4 hover:bg-blush transition-colors tracking-wide"
        >
          AGENDAR MI CITA
        </Link>
      </div>
    </div>
  )
}
