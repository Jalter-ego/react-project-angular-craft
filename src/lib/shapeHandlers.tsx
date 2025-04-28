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
    const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
    
        let updated = false;
    
        const rectFound = rectangles.find(r => r.id === selectedId);
        if (rectFound) {
            const newRects = rectangles.map(r =>
                r.id === selectedId ? { ...r, fill: newColor } : r
            );
            setRectangles(newRects);
            handleCanvasChange({ rectangles: newRects, circles, texts });
            updated = true;
        }
    
        const circleFound = circles.find(c => c.id === selectedId);
        if (!updated && circleFound) {
            const newCircles = circles.map(c =>
                c.id === selectedId ? { ...c, fill: newColor } : c
            );
            setCircles(newCircles);
            handleCanvasChange({ rectangles, circles: newCircles, texts });
            updated = true;
        }
    
        const textFound = texts.find(t => t.id === selectedId);
        if (!updated && textFound) {
            const newTexts = texts.map(t =>
                t.id === selectedId ? { ...t, fill: newColor } : t
            );
            setTexts(newTexts);
            handleCanvasChange({ rectangles, circles, texts: newTexts });
        }
    };
    

    const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStrokeColor = e.target.value;
        setRectangles(prev => updateById(prev, selectedId, r => ({ ...r, stroke: newStrokeColor })));
    };

    const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStrokeWidth = parseInt(e.target.value);
        setRectangles(prev => updateById(prev, selectedId, r => ({ ...r, strokeWidth: newStrokeWidth })));
    };

    const handleCornerRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCornerRadius = parseInt(e.target.value);
        setRectangles(prev => updateById(prev, selectedId, r => ({ ...r, cornerRadius: newCornerRadius })));
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = parseFloat(e.target.value);
        setRectangles(prev => updateById(prev, selectedId, r => ({ ...r, opacity: newOpacity })));
      };      

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        checkDeselect(e);
        const pointer = getPointerPosition(e);
        if (!pointer) return;

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
                setRectangles([...rectangles, newRect]);
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
                setCircles([...circles, newCircle]);
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
                setTexts([...texts, newText]);
                selectShape(newText.id);
                break;
            }
        }

        setSelectedTool('');
    };

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexts(prev => updateById(prev, selectedId, t => ({ ...t, fontSize: parseInt(e.target.value) })));
    };

    const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTexts(prev => updateById(prev, selectedId, t => ({ ...t, fontFamily: e.target.value })));
    };

    const handleTextContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTexts(prev => updateById(prev, selectedId, t => ({ ...t, text: e.target.value })));
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
        handleOpacityChange
    };
};
