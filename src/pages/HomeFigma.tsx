import { useNavigate } from "react-router-dom"
import { fetchAllByUserFigma, fetchCreateFigmac } from "../api/figma"
import { useUser } from "../hooks/user-context"
import { FigmaProps } from "../lib/types"
import { useEffect, useState } from "react"
import { CardFigma, CardFigmaProps } from "../componets/HomeFigma/CardFigma"





export default function HomeFigma() {
    const { user } = useUser()
    const navigate = useNavigate()
    const [designs, setDesings] = useState<CardFigmaProps[]>([])
    const name = 'jhon'
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

        }
    }

    const handleDeleteLocal = (id: string) => {
        setDesings(prev => prev.filter(design => design.id !== id))
    }


    return (
        <div className="w-full h-full flex flex-col gap-6 p-10 px-[10%]">
            <div className="flex flex-col md:flex-row items-start md:items-center
                 justify-between gap-4 pb-6 border-b border-zinc-200 
                 dark:border-zinc-800 ">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-800
                     dark:text-zinc-100 animate-fade-in-right"
                     style={{
                        background: 'linear-gradient(90deg, #FF5D01, #FFC300)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                     >
                        Diseños de {name} 👨‍🎓
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Aquí puedes crear, ver o eliminar tus diseños guardados.
                    </p>
                </div>

                <button
                    onClick={handleCreateFigma}
                    className="bg-[var(--bg-astro)] p-2 w-fit rounded-lg hover:bg-[var(--bg-astro-h)] transition-all
                    duration-300 flex gap-2 font-semibold cursor-pointer "
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
                    <p>
                        Nuevo diseño
                    </p>
                </button>
            </div>

            {designs.length === 0 ? (
                <div className="text-center text-zinc-400 text-lg mt-10">No hay diseños aún 📭</div>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_max-content))] 
                    items-center justify-center gap-10 animate-fade-in-right ">
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
        </div>
    )

}