import { FC } from "react"
import { fetchDeleteFigma } from "../../api/figma"
import { useNavigate } from "react-router-dom"

export interface CardFigmaProps {
    id: string,
    hostEmail?: string
    whitelist?: []
    createdAt?: Date,
    updatedAt?: Date,
    nameFigma: string
    image: string
    onDelete: (id: string) => void
}

export const CardFigma: FC<CardFigmaProps> = ({ nameFigma, image, id, onDelete }) => {
    const img = image === null ? "" : image;
    const navigate = useNavigate()
    const handleDeleteFigma = async()=>{
        try {
            const result = await fetchDeleteFigma(id)
            onDelete(id)
            console.log(result)
        } catch (error) {
            
        }
    }

    return (
        <article
            className="border-1 rounded-2xl flex flex-col w-full p-3 gap-1
            border-[var(--bg-dark)] overflow-hidden">
            <div onClick={()=>navigate(`/figma/${id}`)}>
                <img
                    className="w-60 h-30 opacity-40 rounded-[10%] hover:opacity-80 
                    hover:scale-105 transition-all duration-300 "
                    src={img} alt=""
                />
            </div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">
                    {nameFigma}
                </h1>
                <button
                    onClick={handleDeleteFigma} 
                    className="hover:text-[var(--bg-astro)] transition-colors duration-300 p-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>                
                </button>
            </div>
        </article>
    )
}