import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()

    const handleGoToFigma = () => {
        navigate("/figma")
    }

    return (
        <div className="w-full h-full flex flex-col gap-10 px-[10%] py-20 animate-fade-in">
            <div className="flex flex-col gap-2">
                <h1
                    className="text-5xl font-extrabold tracking-tight animate-fade-in-right"
                    style={{
                        background: 'linear-gradient(90deg, #FF5D01, #FFC300)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    ¡Bienvenido de nuevo!
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg animate-fade-in-left">
                    Tu espacio creativo con estilo y velocidad. 🌟
                </p>
            </div>

            <div className="flex flex-wrap gap-6">
                <button
                    onClick={handleGoToFigma}
                    className="bg-[var(--bg-astro)] hover:bg-[var(--bg-astro-h)] text-white
                    transition-all duration-300 py-3 px-6 rounded-xl text-lg font-medium shadow-lg
                    animate-slide-in-bottom"
                >
                    Ir a mis diseños
                </button>

            </div>

            <div className="mt-16 text-center text-zinc-400 dark:text-zinc-500 text-sm">
                Diseñado con ❤️ usando Tailwind y React.
            </div>
        </div>
    )
}
