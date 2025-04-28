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
    const email = user?.email || ''

    useEffect(() => {
        const fetchDesign = async () => {
            try {
                if (!email) return;
                const data = await fetchAllByUserFigma(email);
                setDesings(data);
                console.log(data);
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
                rectangles: [],
                circles: [],
                texts: []
            }
            console.log(newFigma)
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
                    onClick={handleCreateFigma}
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
                        onClick={handleCreateFigma}
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
