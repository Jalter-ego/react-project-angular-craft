import { useState } from "react";
import { run, runXsd } from "../api/geminis-ai";
import { extractFilesFromGeminiResponse } from "../lib/extractFilesResponse";
import { useNavigate } from "react-router-dom";

export default function FileUploader() {
    const [fileType, setFileType] = useState<"image" | "xsd">("image");
    const [file, setFile] = useState<File | undefined>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [request, setRequest] = useState<string | null>('')
    const [nameComponent, setNameComponent] = useState<string | null>('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setFileContent(null);
        setPreviewUrl(null);

        const reader = new FileReader();

        if (fileType === "image" && selectedFile.type.startsWith("image/")) {
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else if (
            fileType === "xsd" &&
            (selectedFile.name.endsWith(".xsd") || selectedFile.name.endsWith(".xml"))
        ) {
            reader.onload = () => {
                setFileContent(reader.result as string);
            };
            reader.readAsText(selectedFile);
        }
    };

    const GenerateUi = async () => {
        try {
            if (fileType === 'image') {
                setLoading(true)
                const textGenerate = await run(file, request)
                handleRun(textGenerate||'')
            }
            if (fileType === 'xsd') {
                setLoading(true)
                const textGenerate = await runXsd(fileContent || '', request)
                handleRun(textGenerate || '')
            }

        } catch (error) {

        }
    }

    const handleRun = (textGenerate: string) => {
        const { html, css, ts } = extractFilesFromGeminiResponse(textGenerate ?? '');
        console.log(html);
        console.log(css);
        console.log(ts);
        setLoading(false);
        setTimeout(() => {
            navigate('/code-blitz', {
                state: {
                    response: textGenerate,
                    nameComponent: nameComponent
                }
            });
        }, 300);
    }

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <span className="loading loading-bars loading-xl text-white"></span>
                </div>
            )}

            <div className="w-full h-auto md:h-full flex md:flex-row 
            flex-col justify-between md:p-8 p-1 gap-6
            ">
                <div className="flex flex-col md:w-[340px] w-full h-fit bg-[var(--bg-chatgpt1)]
                rounded-2xl p-4 animate-fade-in-right">
                    <div className="flex flex-col gap-2 justify-between w-full">
                        <h3 className="text-zinc-300 font-semibold">Tipo de archivo</h3>
                        <div className="flex gap-4 items-center text-zinc-400">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="fileType"
                                    value="image"
                                    checked={fileType === "image"}
                                    onChange={() => setFileType("image")}
                                />
                                Imagen
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="fileType"
                                    value="xsd"
                                    checked={fileType === "xsd"}
                                    onChange={() => setFileType("xsd")}
                                />
                                XSD/XML
                            </label>
                        </div>
                    </div>

                    <section className="w-full flex flex-col gap-8 mt-4">
                        <div className="w-full">
                            <h3 className="text-zinc-300 pb-3 font-semibold">Subir archivo</h3>
                            <div className="w-full h-[150px] border-2 border-dashed border-gray-500
                             rounded-xl flex flex-col items-center justify-center gap-4 
                             cursor-pointer hover:border-zinc-400 transition-all 
                             duration-300 relative overflow-hidden">
                                <input
                                    type="file"
                                    accept={fileType === "image" ? "image/*" : ".xsd,.xml"}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                {file ? (
                                    <p className="text-sm text-zinc-300">{file.name}</p>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon icon-tabler icon-tabler-upload w-[40px] mdh-[40px] stroke-zinc-200"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                            <path d="M7 9l5 -5l5 5" />
                                            <path d="M12 4l0 12" />
                                        </svg>
                                        <p className="text-sm text-zinc-500 px-2 text-center">
                                            {fileType === "image"
                                                ? "Soporta JPG y PNG hasta 5MB"
                                                : "Archivo .xsd o .xml"}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="pt-4 w-full">
                        <h3 className="text-zinc-300 pb-3 font-semibold">Solicitud de diseño</h3>
                        <textarea
                            className="w-full h-[50px] p-2 border border-zinc-600 rounded-xl
                             text-zinc-300 bg-transparent resize-none text-[10px]"
                            placeholder="Describe tu diseño o archivo XSD aquí..."
                            onChange={(e) => setRequest(e.target.value)}
                        />
                    </section>

                    <section>
                        <h3 className="text-zinc-300 pb-3 font-semibold">Nombre del componente</h3>
                        <input
                            className="w-full h-8 border border-zinc-600 rounded-xl
                             text-zinc-300 bg-transparent text-[12px] pl-2"
                            type="text" placeholder="nombre del componente"
                            value={nameComponent || ''}
                            onChange={(e) => setNameComponent(e.target.value)}
                        />
                    </section>

                    <button
                        onClick={GenerateUi}
                        className="flex items-center justify-center w-[150px] px-2 p-1 mt-4 
                    rounded-md gap-2 bg-[#ff711fc2] hover:bg-[#ff711f8e] transition-colors
                    duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
                        <span>Generate</span>
                    </button>
                </div>

                {/* Contenedor derecho: Vista previa */}
                <div className="md:w-[70%] w-full md:min-h-[100%] p-4 bg-[var(--bg-chatgpt1)] rounded-2xl
                animate-fade-in-left overflow-hidden">
                    <h3 className="text-zinc-300 pb-3 font-semibold">Vista previa</h3>
                    <div className="w-full md:min-h-[95%] border border-zinc-600 rounded-xl p-3 
                    bg-zinc-900 overflow-auto md:text-sm text-[8px] text-zinc-400 flex items-center
                     justify-center ">
                        {fileType === "image" && previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="w-full h-fit object-contain rounded-xl"
                            />
                        ) : fileType === "xsd" && fileContent ? (
                            <pre className="whitespace-pre-wrap ">
                                {fileContent}
                            </pre>
                        ) : (
                            <p className="text-zinc-500">No hay archivo cargado.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
