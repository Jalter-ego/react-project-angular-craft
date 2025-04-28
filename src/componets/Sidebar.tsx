import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../hooks/user-context";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const { user } = useUser()
    const [imageUser, setImageUser] = useState<string | undefined>()


    const location = useLocation()
    const isHome = location.pathname === "/";
    const isFigma = location.pathname === "/figma";
    const isImage = location.pathname === "/image";

    useEffect(() => {
        setImageUser(user?.picture)
    }, [user])

    const navigate = useNavigate()
    const handleNavigation = (dir: string) => {
        navigate(dir)
    }

    return (

        <aside className="relative md:w-20 w-11 h-screen py-4 flex flex-col justify-between bg-[var(--bg-d)]">
            <section className="flex flex-col justify-center gap-6">
                <div className="flex items-center justify-center ">
                    <div className="logopy-2"
                        onClick={() => handleNavigation('/')}>
                        <svg 
                        className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
                        viewBox="0 0 256 366" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path fill="#fff" d="M182.022 9.147c2.982 3.702 4.502 8.697 7.543 18.687L256 246.074a276.467 276.467 0 0 0-79.426-26.891L133.318 73.008a5.63 5.63 0 0 0-10.802.017L79.784 219.11A276.453 276.453 0 0 0 0 246.04L66.76 27.783c3.051-9.972 4.577-14.959 7.559-18.654a24.541 24.541 0 0 1 9.946-7.358C88.67 0 93.885 0 104.314 0h47.683c10.443 0 15.664 0 20.074 1.774a24.545 24.545 0 0 1 9.95 7.373Z" /><path fill="#FF5D01" d="M189.972 256.46c-10.952 9.364-32.812 15.751-57.992 15.751-30.904 0-56.807-9.621-63.68-22.56-2.458 7.415-3.009 15.903-3.009 21.324 0 0-1.619 26.623 16.898 45.14 0-9.615 7.795-17.41 17.41-17.41 16.48 0 16.46 14.378 16.446 26.043l-.001 1.041c0 17.705 10.82 32.883 26.21 39.28a35.685 35.685 0 0 1-3.588-15.647c0-16.886 9.913-23.173 21.435-30.48 9.167-5.814 19.353-12.274 26.372-25.232a47.588 47.588 0 0 0 5.742-22.735c0-5.06-.786-9.938-2.243-14.516Z" /></svg>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start  justify-center gap-8 text-zinc-300">
                    <div
                        onClick={() => handleNavigation("/")}
                        className={`group w-full flex flex-col items-center gap-1
                           rounded-lg transition-all duration-300 cursor-pointer`}>
                        <div className={`p-1 group-hover:animate-swing group-hover:bg-[#f2f7f336]
                             group-hover:text-white rounded-sm transition-all duration-300
                             ${isHome ? 'bg-[#f7f3f236]' : ''} flex items-center justify-center`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                        </div>
                        <p className="md:text-[11px] text-[7px] ">
                            Home
                        </p>
                    </div>
                    <div
                        onClick={() => handleNavigation("/figma")}
                        className={`group w-full flex flex-col items-center gap-1
                           rounded-lg transition-all duration-300 cursor-pointer`}>
                        <div className={`p-1 group-hover:animate-swing group-hover:bg-[#f2f7f336]
                             group-hover:text-white rounded-sm transition-all duration-300
                             ${isFigma ? 'bg-[#f7f3f236]' : ''} flex items-center justify-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256" data-darkreader-inline-fill="" className="--darkreader-inline-fill: currentColor;"><path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,120v88a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h88a8,8,0,0,1,0,16H48V208H208V120a8,8,0,0,1,16,0Z"></path></svg>                            
                        </div>
                        <p className="md:text-[11px] text-[7px] ">
                            Figma to Ui
                        </p>
                    </div>

                    <div
                        onClick={() => handleNavigation("/image")}
                        className={`group w-full flex flex-col items-center gap-1
                           rounded-lg transition-all duration-300 cursor-pointer`}>
                        <div className={`p-1 group-hover:animate-swing group-hover:bg-[#f2f7f336]
                             group-hover:text-white rounded-sm transition-all duration-300
                             ${isImage ? 'bg-[#f7f3f236]' : ''} flex items-center justify-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-library-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" /><path d="M17 7h.01" /><path d="M7 13l3.644 -3.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M15 12l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l2.644 2.644" /></svg>
                        </div>
                        <p className="md:text-[11px] text-[7px] ">
                            Image to Ui
                        </p>
                    </div>
                </div>
            </section>
            {
                user && (
                    <a href={imageUser}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center "
                    >
                        <img
                            className="w-8 h-auto rounded-2xl"
                            src={imageUser} alt="imagen del perfil"
                        />
                    </a>
                )
            }
            <div
                className="absolute top-0 right-0 w-[1px] h-full"
                style={{
                    background: 'linear-gradient(to bottom, #FF5D01, #FFC300)',
                    opacity: 0.7,
                }}
            />
        </aside>
    )

}