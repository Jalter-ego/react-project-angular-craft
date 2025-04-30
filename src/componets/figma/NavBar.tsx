import { useState } from 'react'
import { toast } from 'sonner'
import { tools } from '../../lib/NavTools'
import { exportToJson, exportToXml, xmlToJson } from '../../lib/exportToUtils'

interface NavBarFigmaProps {
    selectedTool: string | null
    setSelectedTool: (tool: string) => void
    handleSaveFigma: () => Promise<any>
    handleSetStatus: (data: any) => void
}

export default function NavBarFigma(
    { selectedTool, setSelectedTool, handleSaveFigma, handleSetStatus }: NavBarFigmaProps
) {
    const [showModal, setShowModal] = useState(false)

    const handleExport = async (type: 'json' | 'xml') => {
        setShowModal(false);
        toast.success(`Exportando como ${type.toUpperCase()}`);

        try {
            const figmaData = await handleSaveFigma();

            let content = '';
            let fileName = 'figma_export';

            if (type === 'json') {
                content = exportToJson(figmaData);
                fileName += '.json';
            } else {
                content = exportToXml(figmaData);
                fileName += '.xml';
            }
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();

            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            toast.error("Ocurrió un error durante la exportación");
        }
    };


const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            const content = event.target?.result as string;
            let parsedData;

            if (file.name.endsWith('.json')) {
                parsedData = JSON.parse(content);

            } else if (file.name.endsWith('.xml')) {
                parsedData = xmlToJson(content)
            } else {
                toast.error("Tipo de archivo no soportado.");
                return;
            }

            handleSetStatus(parsedData);
            toast.success("Archivo cargado exitosamente");
            setShowModal(false);

        } catch (error) {
            toast.error("Error al cargar el archivo");
            console.error(error);
        }
    };

    reader.readAsText(file);
};

    


    return (
        <>
            <nav className="flex items-center justify-center gap-4 bg-[#2c2c2c] p-2 px-2 rounded-2xl bottom-4 absolute">
                {tools.map((tool) => (
                    <div
                        key={tool.name}
                        onClick={() => setSelectedTool(tool.name)}
                        className={`p-1 rounded-lg transition-all duration-300 hover:bg-[#f7f3f236] ${selectedTool === tool.name ? "bg-[#82aded]" : ""
                            }`}
                    >
                        {tool.icon}
                    </div>
                ))}

                {/* Guardar diseño */}
                <button
                    className="p-1 rounded-lg transition-all duration-300 hover:bg-[#f7f3f236]"
                    onClick={async () => {
                        try {
                            const promise = handleSaveFigma()
                            toast.promise(promise, {
                                loading: 'loading...',
                                success: 'Diseño guardado correctamente'
                            })
                        } catch (error) {
                            toast.error('No se pudo guardar el diseño')
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 4l0 4l-6 0l0 -4" /></svg>
                </button>

                <button
                    className="p-1 rounded-lg transition-all duration-300 hover:bg-[#f7f3f236]"
                    onClick={() => setShowModal(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-category"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h6v6h-6z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6h-6z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>
                </button>
            </nav>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 text-zinc-400">
                    <div className="bg-[#2c2c2c] p-6 rounded-xl shadow-lg w-72 space-y-4 flex flex-col items-center">
                        <h2 className="text-lg font-semibold border-b border-zinc-500 pb-1">Exportar diseño</h2>
                        <div className='w-full flex flex-col items-center justify-end gap-4'>
                            <button
                                onClick={() => handleExport('json')}
                                className="w-full rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-json"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 16v-8l3 8v-8" /><path d="M15 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" /><path d="M1 8h3v6.5a1.5 1.5 0 0 1 -3 0v-.5" /><path d="M7 15a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1" /></svg>
                                <span>Exportar JSON</span>
                            </button>
                            <button
                                onClick={() => handleExport('xml')}
                                className="w-full py-2 rounded-lg  flex items-center gap-2 hover:scale-105 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-xml"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M4 15l4 6" /><path d="M4 21l4 -6" /><path d="M19 15v6h3" /><path d="M11 21v-6l2.5 3l2.5 -3v6" /></svg>
                                <span>Exportar XML</span>
                            </button>
                            <div className="border border-dashed border-zinc-500 w-[80%] h-22 rounded-md flex flex-col 
                                items-center justify-center gap-2 relative hover:scale-105 transition-all duration-300">
                                <input
                                    type="file"
                                    id="upload"
                                    accept=".json,.xml"
                                    className="hidden"
                                    onChange={handleImport}
                                />

                                <label htmlFor="upload" className="cursor-pointer flex flex-col items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6 stroke-zinc-200"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                        <path d="M7 9l5 -5l5 5" />
                                        <path d="M12 4l0 12" />
                                    </svg>
                                    <p className="text-sm text-zinc-400 text-center mt-1">Cargar archivo .json o .xml</p>
                                </label>
                            </div>

                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-18 text-sm rounded-md border py-1 hover:scale-105 transition-all duration-300
                            cursor-pointer font-semibold"
                        >
                            <p>Cancelar</p>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
