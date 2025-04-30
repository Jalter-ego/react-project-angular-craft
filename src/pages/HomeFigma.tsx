import { useNavigate } from "react-router-dom"
import { fetchAllByUserFigma, fetchCreateFigmac } from "../api/figma"
import { useUser } from "../hooks/user-context"
import { FigmaProps } from "../lib/types"
import { useEffect, useState } from "react"
import { CardFigma, CardFigmaProps } from "../componets/HomeFigma/CardFigma"

export default function HomeFigma() {
    const navigate = useNavigate()
    const { user } = useUser()
    const [designs, setDesings] = useState<CardFigmaProps[]>([])
    const [nameFigma, setNameFigma] = useState('')
    const [showModal, setShowModal] = useState(false)
    const email = user?.email || ''

    useEffect(() => {
        const fetchDesign = async () => {
            try {
                if (!email) return;
                const data = await fetchAllByUserFigma(email);
                setDesings(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDesign();
    }, [email]);

    const handleCreateFigma = async () => {
        try {
            const newFigma: FigmaProps = {
                hostEmail: email,
                whitelist: [],
                nameFigma: nameFigma,
                rectangles: [],
                circles: [],
                texts: []
            }
            const data = await fetchCreateFigmac(newFigma)
            navigate(`/figma/${data.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteLocal = (id: string) => {
        setDesings(prev => prev.filter(design => design.id !== id))
    }

    return (
        <div className="w-full h-full flex flex-col gap-6 p-10 px-[10%] mb-2">
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl w-[90%] max-w-md animate-fade-in-down relative">
                        <div className="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <h2 className="text-xl font-bold text-white">Crear nuevo diseño</h2>
                        </div>

                        <input
                            type="text"
                            value={nameFigma}
                            onChange={(e) => setNameFigma(e.target.value)}
                            placeholder="Ej: Diseño Landing Page"
                            className="w-full px-4 py-2 rounded-md mb-4 border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    setNameFigma('')
                                }}
                                className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (!nameFigma.trim()) return alert("Debes escribir un nombre para el diseño.")
                                    handleCreateFigma()
                                    setShowModal(false)
                                    setNameFigma('')
                                }}
                                className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-500 transition font-semibold"
                            >
                                Crear
                            </button>
                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-zinc-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}


            {/* Encabezado */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                    <h1 className="md:text-3xl text-2xl font-bold tracking-tight animate-fade-in-right"
                        style={{
                            background: 'linear-gradient(90deg, #FF5D01, #FFC300)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Diseños de {user?.given_name} 👨‍🎓
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Aquí puedes crear, ver o eliminar tus diseños guardados.
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[var(--bg-astro)] p-2 w-fit rounded-lg hover:bg-[var(--bg-astro-h)] transition-all duration-300 flex gap-2 font-semibold cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icon-tabler-plus"
                    >
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    <p>Nuevo diseño</p>
                </button>
            </div>

            {/* Lista de diseños */}
            <div className="w-full h-full flex md:flex-row flex-col items-center justify-between gap-10">
                {designs.length === 0 ? (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4 text-[var(--bg-astro)] animate-fade-in">
                        <span className="loading loading-bars loading-xl"></span>
                        <h2 className="text-xl font-semibold">No tienes diseños aún</h2>
                        <p className="text-zinc-400 text-sm">
                            ¡Crea tu primer diseño haciendo clic en "Nuevo diseño"! 🎨
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_max-content))] 
                        items-center justify-center gap-10 animate-fade-in-right w-full ">
                        {designs.map((design) => (
                            <CardFigma
                                key={design.id}
                                id={design.id}
                                nameFigma={design.nameFigma}
                                image={design.image}
                                onDelete={handleDeleteLocal}
                            />
                        ))}
                    </div>
                )}

                {/* Banner Inspiracional */}
                <section className="md:w-[550px] w-fit p-6 rounded-xl bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] 
                    flex flex-col md:flex-row items-center justify-between 
                    gap-2 animate-fade-in-up">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">¿Buscas inspiración?</h2>
                        <p className="text-sm text-zinc-300">
                            Explora nuevas ideas, juega con los colores y crea algo increíble. 🚀
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-white text-black md:px-1 px-3 rounded-lg md:w-fit w-[150px] 
                            font-semibold hover:bg-zinc-200 transition-all text-sm cursor-pointer"
                    >
                        Empezar a diseñar
                    </button>
                </section>
            </div>
        </div>
    )
}
