import { Dispatch, SetStateAction } from "react";
import { CircleProps, RectProps, TextProps } from "./types";
import Konva from "konva";

function updateById<T extends { id: string }>(
    items: T[],
    id: string | null,
    update: (item: T) => T
): T[] {
    if (!id) return items;
    return items.map(item => (item.id === id ? update(item) : item));
}

function getPointerPosition(e: Konva.KonvaEventObject<MouseEvent>) {
    const stage = e.target.getStage();
    return stage?.getPointerPosition() || null;
}


export const createShapeHandlers = (
    selectedId: string | null,
    selectedTool: string | null,
    rectangles: RectProps[],
    circles: CircleProps[],
    texts: TextProps[],
    selectShape: (id: string | null) => void,
    setSelectedTool: Dispatch<SetStateAction<string | null>>,
    setRectangles: Dispatch<SetStateAction<RectProps[]>>,
    setCircles: Dispatch<SetStateAction<CircleProps[]>>,
    setTexts: Dispatch<SetStateAction<TextProps[]>>,
    handleCanvasChange: (newData: any) => void
) => {

    function updateShapeAndNotify<T extends { id: string }>(
        currentArray: T[],
        setArray: Dispatch<SetStateAction<T[]>>,
        updateFn: (item: T) => T,
        shapeKey: 'rectangles' | 'circles' | 'texts'
    ) {
        const newArray = updateById(currentArray, selectedId, updateFn);
        setArray(newArray);
        handleCanvasChange({
            rectangles: shapeKey === 'rectangles' ? newArray : rectangles,
            circles: shapeKey === 'circles' ? newArray : circles,
            texts: shapeKey === 'texts' ? newArray : texts
        });
    }


    const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };



    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;

        if (rectangles.find(r => r.id === selectedId)) {
            updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, fill: newColor }),'rectangles');
        } else if (circles.find(c => c.id === selectedId)) {
            updateShapeAndNotify(circles, setCircles, c => ({ ...c, fill: newColor }),'circles');
        } else if (texts.find(t => t.id === selectedId)) {
            updateShapeAndNotify(texts, setTexts, t => ({ ...t, fill: newColor }),'texts');
        }
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Cambiar ancho a:", e.target.value, "para ID:", selectedId);
        const newWidth = parseInt(e.target.value);
        updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, width: newWidth }),'rectangles');
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = parseInt(e.target.value);
        updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, height: newHeight }),'rectangles');

    };

    const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newX = parseInt(e.target.value);
        if (rectangles.find(r => r.id === selectedId)) {
            updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, x: newX }),'rectangles');
        } else if (circles.find(c => c.id === selectedId)) {
            updateShapeAndNotify(circles, setCircles, c => ({ ...c, x: newX }),'circles');
        } else if (texts.find(t => t.id === selectedId)) {
            updateShapeAndNotify(texts, setTexts, t => ({ ...t, x: newX }),'texts');
        }
    };

    const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newY = parseInt(e.target.value);
        if (rectangles.find(r => r.id === selectedId)) {
            updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, y: newY }),'rectangles');
        } else if (circles.find(c => c.id === selectedId)) {
            updateShapeAndNotify(circles, setCircles, c => ({ ...c, y: newY }),'circles');
        } else if (texts.find(t => t.id === selectedId)) {
            updateShapeAndNotify(texts, setTexts, t => ({ ...t, y: newY }),'texts');
        }
    };

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        checkDeselect(e);
        const pointer = getPointerPosition(e);
        if (!pointer) return;

        let newRects = rectangles;
        let newCircles = circles;
        let newTexts = texts;

        switch (selectedTool) {
            case "cuadrado": {
                const newRect: RectProps = {
                    x: pointer.x,
                    y: pointer.y,
                    width: 100,
                    height: 100,
                    cornerRadius: null,
                    opacity: null,
                    stroke: null,
                    strokeWidth: null,
                    fill: "#ffffff",
                    id: `rect-${Date.now()}`
                };
                newRects = [...rectangles, newRect];
                setRectangles(newRects);
                selectShape(newRect.id);
                break;
            }
            case "circulo": {
                const newCircle: CircleProps = {
                    x: pointer.x,
                    y: pointer.y,
                    radius: 50,
                    fill: "#ffffff",
                    id: `circle-${Date.now()}`
                };
                newCircles = [...circles, newCircle];
                setCircles(newCircles);
                selectShape(newCircle.id);
                break;
            }
            case "text": {
                const newText: TextProps = {
                    x: pointer.x,
                    y: pointer.y,
                    fontSize: 12,
                    fontFamily: null,
                    text: "text",
                    fill: "#ffffff",
                    id: `text-${Date.now()}`
                };
                newTexts = [...texts, newText];
                setTexts(newTexts);
                selectShape(newText.id);
                break;
            }
        }

        setSelectedTool('');
        handleCanvasChange({ rectangles: newRects, circles: newCircles, texts: newTexts });
    };


    //-------------------Rectangle----------------------//

    const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStrokeColor = e.target.value;
        updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, stroke: newStrokeColor }),'rectangles');
    };

    const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStrokeWidth = parseInt(e.target.value);
        updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, strokeWidth: newStrokeWidth }),'rectangles');
    };

    const handleCornerRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCornerRadius = parseInt(e.target.value);
        updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, cornerRadius: newCornerRadius }),'rectangles');
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = parseFloat(e.target.value);
        updateShapeAndNotify(rectangles, setRectangles, r => ({ ...r, opacity: newOpacity }),'rectangles');
    };

    //-------------------Text----------------------//


    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value)
        updateShapeAndNotify(texts, setTexts, r => ({ ...r, fontSize: newSize }),'texts')
    };

    const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFontFamily = (e.target.value)
        updateShapeAndNotify(texts, setTexts, r => ({ ...r, fontFamily: newFontFamily }),'texts')
    };

    const handleTextContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = (e.target.value)
        updateShapeAndNotify(texts, setTexts, r => ({ ...r, text: newText }),'texts')
    };

    return {
        handleColorChange,
        handleStrokeColorChange,
        handleStrokeWidthChange,
        handleCornerRadiusChange,
        handleFontSizeChange,
        handleFontFamilyChange,
        handleStageClick,
        handleTextContentChange,
        handleOpacityChange,
        handleWidthChange,
        handleHeightChange,
        handleXChange,
        handleYChange
    };
};
