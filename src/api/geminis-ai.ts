import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const run = async (
  selectedImage: File | undefined,
  request: string | null
) => {
  if (!selectedImage) {
    alert("Por favor selecciona una imagen primero.");
    return;
  }

  const reader = new FileReader();

  // Crear una nueva promesa para manejar la lectura del archivo y la llamada a la API
  return new Promise<string | undefined>((resolve, reject) => {
    reader.onloadend = async () => {
      if (!reader.result) {
        alert("Error al leer el archivo. Inténtalo de nuevo.");
        reject("Error al leer el archivo.");
        return;
      }

      const base64data = (reader.result as string).split(",")[1];

      try {
        // Hacer la solicitud para generar el contenido
        const result = await ai.models.generateContent({
          model: "gemini-1.5-pro",
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    data: base64data,
                    mimeType: selectedImage.type,
                  },
                },
                {
                  text: `Genera el código Angular (HTM(solo las etiquetas del componente
                                        no la raiz del html o head)L, CSS y TypeScript) para esta interfaz 
                                        de usuario,${request}`,
                },
              ],
            },
          ],
        });

        const textGenerate = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textGenerate) {
          alert("Revisa la consola para ver el código generado.");
          console.log(textGenerate);

          resolve(textGenerate);
        } else {
          console.error("No se pudo encontrar el texto generado.");
          reject("No se pudo encontrar el texto generado.");
        }
      } catch (error) {
        console.error(error);
        alert("Ocurrió un error al generar el contenido.");
        reject("Error al generar el contenido.");
      }
    };

    reader.readAsDataURL(selectedImage);
  });
};

export const runXsd = async (fileContent: string, request: string | null) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [
        {
          text: `
Tengo el siguiente esquema XML de clases:

${fileContent}

Por favor genera el código Angular (HTML solo el cuerpo del componente, sin etiquetas raíz de html ni head, CSS y TypeScript)
 para una interfaz de usuario que permita crear, editar y visualizar instancias de estas clases. 
Cada clase puede ser un componente o una sección. Utiliza formularios adecuados para cada tipo de dato, tambien le pones un estilo moderno con css, si puedes agrega unas tablas.
${request || ""}
`,
        },
      ],
    });

    const textGenerate = result.candidates?.[0]?.content?.parts?.[0]?.text;
    return textGenerate;
  } catch (error) {
    console.error(error);
    alert("Error al generar el contenido desde XSD.");
  }
};
