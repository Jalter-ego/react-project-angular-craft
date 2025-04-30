import { Fragment, useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { CircleProps, RectProps, TextProps, UpdateFigma } from "../lib/types";
import { createShapeHandlers } from "../lib/shapeHandlers";
import { Rectangle } from "../componets/figma/RectangleShape";
import { CircleShape } from "../componets/figma/CircleShape";
import { TextShape } from "../componets/figma/TextShape";
import { useParams } from "react-router-dom";

import { ModalText } from "../componets/figma/TextModal";
import { ModalCircle } from "../componets/figma/CircleModal";
import { ModalRect } from "../componets/figma/RectangleModal";
import { useSocketCanvas } from "../componets/figma/sockets/useSocketCanvas";
import { useDeleteKey } from "../componets/figma/sockets/useSocketDelete";
import { fetchFindOneFigma, fetchUpdateFigma, fetchUpdateImageFigma, uploadImage } from "../api/figma";
import Konva from "konva";
import { handleSoket } from "../componets/figma/sockets/handleSockets";
import { useZoom } from "../hooks/useZoom";
import NavBarFigma from "../componets/figma/NavBar";


export default function Figma() {

    const { id } = useParams()
    const stateRef = useRef<Konva.Stage | null>(null)
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [rectangles, setRectangles] = useState<RectProps[]>([]);
    const [circles, setCircles] = useState<CircleProps[]>([]);
    const [texts, setTexts] = useState<TextProps[]>([]);
    const [selectedId, selectShape] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const { handleCanvasChange, handleRectChange, handleCircleChange
        , handleTextChange
    } = handleSoket({ id, rectangles, circles, texts, setRectangles, setCircles, setTexts })
    const {
        handleColorChange,
        handleStrokeColorChange,
        handleStrokeWidthChange,
        handleCornerRadiusChange,
        handleFontSizeChange,
        handleFontFamilyChange,
        handleStageClick,
        handleTextContentChange,
        handleOpacityChange
    } = createShapeHandlers(selectedId, selectedTool, rectangles, circles, texts,
        selectShape, setSelectedTool, setRectangles, setCircles, setTexts, handleCanvasChange);

    useSocketCanvas(id, setRectangles, setCircles, setTexts)
    useDeleteKey(selectedId, setRectangles, setCircles, setTexts,
        rectangles, circles, texts, selectShape, handleCanvasChange);
    useZoom(stateRef)

    const handleSaveFigma = async () => {
        try {
            const updateFigma: UpdateFigma = {
                rectangles: rectangles,
                circles: circles,
                texts: texts
            }
            const data = await fetchUpdateFigma(id || '', updateFigma)
            const img = await handleExport();
            const data2 = await fetchUpdateImageFigma(id || '', img);
            console.log(data);
            console.log(data2);
            return data2;
        } catch (error) {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchFindOneFigma(id || '');
                console.log(data);
                handleSetStatus(data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSetStatus = (data: any) => {
        setRectangles(data.rectangles)
        setCircles(data.circles)
        setTexts(data.texts)
    }

    const dataURLtoBlob = (dataurl: string) => {
        const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
        return new Blob([u8arr], { type: mime });
    };

    const handleExport = async () => {
        if (!stateRef.current) return;
        const uri = stateRef.current.toDataURL({ mimeType: "image/png" });
        const blob = dataURLtoBlob(uri);
        const urlImage = await uploadImage(blob)
        console.log(urlImage)
        return urlImage
    }





    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <span className="loading loading-bars loading-xl text-[var(--bg-astro)]"></span>
                </div>
            )}
            <div className="flex flex-col items-center w-full h-full gap-10 relative">
                <div className="w-full h-full absolute overflow-hidden">
                    <Fragment>
                        <Stage
                            width={window.innerWidth}
                            height={window.innerHeight}
                            onMouseDown={handleStageClick}
                            ref={stateRef}
                        >
                            <Layer>
                                {rectangles.map((rect) => (
                                    <Rectangle
                                        key={rect.id}
                                        shapeProps={rect}
                                        isSelected={rect.id === selectedId}
                                        onSelect={() => selectShape(rect.id)}
                                        onChange={handleRectChange}
                                    />
                                ))}
                                {circles.map((rect) => (
                                    <CircleShape
                                        key={rect.id}
                                        shapeProps={rect}
                                        isSelected={rect.id === selectedId}
                                        onSelect={() => selectShape(rect.id)}
                                        onChange={handleCircleChange}
                                    />
                                ))}
                                {texts.map((rect) => (
                                    <TextShape
                                        key={rect.id}
                                        shapeProps={rect}
                                        isSelected={rect.id === selectedId}
                                        onSelect={() => selectShape(rect.id)}
                                        onChange={handleTextChange}
                                    />
                                ))}
                            </Layer>
                        </Stage>
                    </Fragment>
                </div>

                <NavBarFigma
                    selectedTool={selectedTool}
                    handleSaveFigma={handleSaveFigma}
                    setSelectedTool={setSelectedTool}
                    handleSetStatus={handleSetStatus}
                />
                
                {selectedId && (
                    <>
                        <ModalRect {...{
                            selectedId, rectangles, handleColorChange,
                            handleCornerRadiusChange, handleStrokeColorChange, handleStrokeWidthChange,
                            handleOpacityChange
                        }} />
                        <ModalCircle {...{ selectedId, circles, handleColorChange }} />
                        <ModalText {...{ selectedId, texts, handleColorChange, handleFontSizeChange, handleFontFamilyChange, handleTextContentChange }} />
                    </>
                )}


            </div>
        </>
    );
}
