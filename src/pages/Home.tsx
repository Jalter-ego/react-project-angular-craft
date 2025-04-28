
export default function Home() {

    return (
        <div className="w-full h-full flex flex-col items-center gap-10 px-[10%] py-10 animate-fade-in">
            <div className="flex flex-col gap-2 text-center">
                <h1
                    className="text-4xl md:text-5xl font-extrabold tracking-tight animate-fade-in-right"
                    style={{
                        background: 'linear-gradient(90deg, #FF5D01, #FFC300)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    ¡Bienvenido de nuevo!
                </h1>
                <p className="text-zinc-400 text-lg animate-fade-in-left">
                    Tu espacio creativo con estilo y velocidad. 🌟
                </p>
            </div>

            <div className="w-full mt-5 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Elige tu plan</h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {/* Card Standard */}
                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-6 border border-zinc-700 hover:scale-105 transition-transform">
                        <div>
                            <h3 className="text-xl font-bold text-white">Standard</h3>
                            <p className="text-3xl font-extrabold text-white mt-2">$16<span className="text-sm font-normal">/mes</span></p>
                            <p className="text-sm text-zinc-400 mt-1">Facturado anualmente</p>
                        </div>
                        <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                            <li>✓ 1200 créditos / mes</li>
                            <li>✓ Exportaciones ilimitadas</li>
                            <li>✓ Generación de UI web y móvil</li>
                            <li>✓ Uso comercial general</li>
                        </ul>
                        <button className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium">Empezar</button>
                    </div>

                    {/* Card Pro */}
                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl w-80 flex flex-col gap-6 border-2 border-purple-600 hover:scale-105 transition-transform relative">
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs py-1 px-3 rounded-full font-semibold">
                            Recomendado
                        </span>
                        <div>
                            <h3 className="text-xl font-bold text-white">Pro</h3>
                            <p className="text-3xl font-extrabold text-white mt-2">$32<span className="text-sm font-normal">/mes</span></p>
                            <p className="text-sm text-zinc-400 mt-1">Facturado anualmente</p>
                        </div>
                        <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                            <li>✓ 3000 créditos / mes</li>
                            <li>✓ Exportaciones ilimitadas</li>
                            <li>✓ Modo privado</li>
                            <li>✓ Generación de UI web y móvil</li>
                        </ul>
                        <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium">Empezar</button>
                    </div>

                    {/* Card Enterprise */}
                    <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-6 border border-zinc-700 hover:scale-105 transition-transform">
                        <div>
                            <h3 className="text-xl font-bold text-white">Enterprise</h3>
                            <p className="text-3xl font-extrabold text-white mt-2">Contáctanos</p>
                            <p className="text-sm text-zinc-400 mt-1">Precios personalizados</p>
                        </div>
                        <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                            <li>✓ Generaciones ilimitadas</li>
                            <li>✓ Privacidad y seguridad avanzada</li>
                            <li>✓ Velocidad de generación más rápida</li>
                            <li>✓ Soporte prioritario</li>
                        </ul>
                        <button className="mt-auto bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg font-medium">Contactar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
