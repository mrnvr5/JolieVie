import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const USERS_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_USERS_SCRIPT_ID/exec'

export default function Login() {
  const [tab, setTab] = useState('register')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onRegister = async (data) => {
    try {
      await fetch(USERS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      })
      alert('¡Cuenta creada exitosamente! Ya podés iniciar sesión.')
      reset()
      setTab('login')
    } catch {
      alert('Ocurrió un error. Por favor intentá de nuevo.')
    }
  }

  const onLogin = () => {
    alert('Inicio de sesión próximamente.')
  }

  const switchTab = (t) => {
    setTab(t)
    reset()
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12 animate-fade-in">
      <Helmet>
        <title>Mi cuenta | Jolie Vie</title>
        <meta name="description" content="Iniciá sesión o creá tu cuenta en Jolie Vie." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://jolieviecr.com/login" />
      </Helmet>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="sr-only">Mi cuenta | Jolie Vie</h1>
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/joliejolie.png"
            alt="Jolie Vie"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-blush">
          <button
            onClick={() => switchTab('register')}
            className={`flex-1 py-2 font-alegreya-sc text-sm font-bold transition-colors border-b-2 ${
              tab === 'register'
                ? 'text-dark-red border-dark-red'
                : 'text-brown/40 border-transparent hover:text-brown'
            }`}
          >
            Registrarse
          </button>
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 py-2 font-alegreya-sc text-sm font-bold transition-colors border-b-2 ${
              tab === 'login'
                ? 'text-dark-red border-dark-red'
                : 'text-brown/40 border-transparent hover:text-brown'
            }`}
          >
            Iniciar sesión
          </button>
        </div>

        {tab === 'register' ? (
          <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Usuario</label>
              <input
                {...register('usuario', { required: 'Requerido' })}
                className="w-full border border-blush rounded-lg px-4 py-3 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="Tu nombre de usuario"
              />
              {errors.usuario && (
                <p className="text-terracotta text-xs mt-1">{errors.usuario.message}</p>
              )}
            </div>
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Requerido' })}
                className="w-full border border-blush rounded-lg px-4 py-3 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-terracotta text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Contraseña</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Requerido',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                })}
                className="w-full border border-blush rounded-lg px-4 py-3 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-terracotta text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-3 hover:bg-brown transition-colors disabled:opacity-50 tracking-wide"
            >
              {isSubmitting ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Requerido' })}
                className="w-full border border-blush rounded-lg px-4 py-3 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-terracotta text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="font-alegreya-sc text-sm text-brown block mb-1">Contraseña</label>
              <input
                type="password"
                {...register('password', { required: 'Requerido' })}
                className="w-full border border-blush rounded-lg px-4 py-3 font-alegreya text-brown focus:outline-none focus:border-dark-red transition-colors"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-terracotta text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-dark-red text-cream font-alegreya-sc font-bold py-3 hover:bg-brown transition-colors tracking-wide"
            >
              INICIAR SESIÓN
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
