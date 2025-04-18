import { Fragment, useEffect, useRef, useState } from "react";
import { tools } from "../lib/NavTools";
import { Layer, Stage } from "react-konva";
import { CircleProps, RectProps, TextProps, UpdateFigma } from "../lib/types";
import { createShapeHandlers } from "../lib/shapeHandlers";
import { Rectangle } from "../componets/figma/RectangleShape";
import { CircleShape } from "../componets/figma/CircleShape";
import { TextShape } from "../componets/figma/TextShape";
import { useParams } from "react-router-dom";
import { socket } from "../api/index";
import { ModalText } from "../componets/figma/TextModal";
import { ModalCircle } from "../componets/figma/CircleModal";
import { ModalRect } from "../componets/figma/RectangleModal";
import { useSocketCanvas } from "../componets/figma/useSocketCanvas";
import { useDeleteKey } from "../componets/figma/useSocketDelete";
import { fetchFindOneFigma, fetchUpdateFigma, fetchUpdateImageFigma, uploadImage } from "../api/figma";
import Konva from "konva";


export default function Figma() {

    const { id } = useParams()
    const stateRef = useRef<Konva.Stage | null> (null)
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [rectangles, setRectangles] = useState<RectProps[]>([]);
    const [circles, setCircles] = useState<CircleProps[]>([]);
    const [texts, setTexts] = useState<TextProps[]>([]);
    const [selectedId, selectShape] = useState<string | null>(null);
    const {
        handleColorChange,
        handleStrokeColorChange,
        handleStrokeWidthChange,
        handleCornerRadiusChange,
        handleFontSizeChange,
        handleFontFamilyChange,
        handleStageClick,
        handleTextContentChange,
    } = createShapeHandlers(selectedId, selectedTool, rectangles, circles, texts,
        selectShape, setSelectedTool, setRectangles, setCircles, setTexts);



    const handleCanvasChange = (newData: any) => {
        socket.emit("update-canvas", {
            roomId: id,
            data: newData,
        });
    };
    useSocketCanvas(id, setRectangles, setCircles, setTexts)
    useDeleteKey(selectedId, setRectangles, setCircles, setTexts, rectangles, circles, texts, selectShape, handleCanvasChange);



    const handleRectChange = (newAttrs: RectProps) => {
        const newRects = rectangles.map((r) => r.id === newAttrs.id ? newAttrs : r);
        setRectangles(newRects);
        handleCanvasChange({ rectangles: newRects });
    };

    const handleCircleChange = (newAttrs: CircleProps) => {
        const newCircles = circles.map((c) => c.id === newAttrs.id ? newAttrs : c);
        setCircles(newCircles);
        handleCanvasChange({ circles: newCircles });
    };

    const handleTextChange = (newAttrs: TextProps) => {
        const newTexts = texts.map((t) => t.id === newAttrs.id ? newAttrs : t);
        setTexts(newTexts);
        handleCanvasChange({ texts: newTexts });
    };

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
            

        } catch (error) {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFindOneFigma(id || '');
                console.log(data);
                handleSetStatus(data)
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

    const handleExport = async() => {
        if (!stateRef.current) return;
        const uri = stateRef.current.toDataURL({ mimeType: "image/png" });
        const blob = dataURLtoBlob(uri);
        const urlImage = await uploadImage(blob)
        console.log(urlImage)
        return urlImage
    }



    return (
        <div className="flex flex-col items-center w-full h-full gap-10 relative">
            <button
                onClick={handleSaveFigma}
                className="z-50 absolute cursor-pointer left-2 dark:bg-[var(--bg-dark)] p-1 px-3 rounded-3xl hover:opacity-80">
                save
            </button>
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

            <nav className="flex items-center justify-center gap-4 dark:bg-[#2c2c2c] bg-[#1c1d1c45] p-2 px-2 rounded-2xl bottom-4 absolute">
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
            </nav>
            {selectedId && (
                <>
                    <ModalRect {...{ selectedId, rectangles, handleColorChange, handleCornerRadiusChange, handleStrokeColorChange, handleStrokeWidthChange }} />
                    <ModalCircle {...{ selectedId, circles, handleColorChange }} />
                    <ModalText {...{ selectedId, texts, handleColorChange, handleFontSizeChange, handleFontFamilyChange, handleTextContentChange }} />
                </>
            )}


        </div>
    );
}
