import { useUser } from "../hooks/user-context"

export function Header() {
    const { user, logout } = useUser()
    const locationUrl = location.pathname
    return (
        <header className="relative flex justify-end items-center gap-4 px-6 py-2 text-[#666]">
            <div
                className="absolute left-0 right-0 bottom-0 h-[1px]"
                style={{
                    background: 'linear-gradient(90deg, #FF5D01, #FFC300)',
                    opacity: 0.7,
                }}
            />
            <section className="flex items-center gap-4 md:text-sm text-[10px]">
                <div className="flex items-center md:text-sm text-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-coins"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" /><path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" /><path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" /><path d="M3 6v10c0 .888 .772 1.45 2 2" /><path d="M3 11c0 .888 .772 1.45 2 2" /></svg>
                    <p className="">{user?.credits ?? ''}</p>
                </div>
                {
                    !user && (
                        <div className="flex gap-2 items-center justify-center">
                            <a
                                href="/auth/login"
                                className="bg-white rounded-4xl 
                                text-black font-semibold p-1.5 px-4 hover:opacity-90
                                 transition-all duration-300" >
                                Iniciar Sesion
                            </a>
                            <a
                                href="/auth/register"
                                className="max-sm:hidden max-md:hidden border-1 b
                                order-[#ffffffad] text-white rounded-4xl 
                                 font-semibold p-1.5 px-4 hover:opacity-90 transition-all duration-300" >
                                Registrate
                            </a>
                        </div>
                    )
                }
                {
                    user && (
                        <a
                            onClick={logout}
                            href={locationUrl}
                            className="bg-white rounded-4xl
                             text-black font-semibold p-1 px-4 md:p-1.5 md:px-4 hover:opacity-90 
                             transition-all duration-300 w-fit">
                            Cerrar Sesion
                        </a>
                    )
                }

            </section>
        </header>
    )
}