import { Dispatch, SetStateAction } from "react";// Ajusta esto a tu archivo real
import { CircleProps, RectProps, TextProps } from "./types";
import Konva from "konva";

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
    setTexts: Dispatch<SetStateAction<TextProps[]>>
) => {
    const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;

        setRectangles((prev) =>
            prev.map((shape) =>
                shape.id === selectedId ? { ...shape, fill: newColor } : shape
            )
        );
        setCircles((prev) =>
            prev.map((shape) =>
                shape.id === selectedId ? { ...shape, fill: newColor } : shape
            )
        );
        setTexts((prev) =>
            prev.map((shape) =>
                shape.id === selectedId ? { ...shape, fill: newColor } : shape
            )
        );
    };


    const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStrokeColor = e.target.value;
        setRectangles((prevRects) =>
            prevRects.map((rect) =>
                rect.id === selectedId ? { ...rect, stroke: newStrokeColor } : rect
            )
        );
    };

    const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStrokeWidth = parseInt(e.target.value);
        setRectangles((prevRects) =>
            prevRects.map((rect) =>
                rect.id === selectedId ? { ...rect, strokeWidth: newStrokeWidth } : rect
            )
        );
    };

    const handleCornerRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCornerRadius = parseInt(e.target.value);
        setRectangles((prevRects) =>
            prevRects.map((rect) =>
                rect.id === selectedId ? { ...rect, cornerRadius: newCornerRadius } : rect
            )
        );
    };

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        checkDeselect(e);
        console.log(selectedTool)

        if (selectedTool === "cuadrado") {
            const stage = e.target.getStage();
            if (!stage) return;

            const pointerPosition = stage.getPointerPosition();
            if (!pointerPosition) return;

            const newRect: RectProps = {
                x: pointerPosition.x,
                y: pointerPosition.y,
                width: 100,
                cornerRadius: null,
                stroke: null,
                strokeWidth: null,
                height: 100,
                fill: "#ffffff",
                id: `rect-${Date.now()}`,
            };
            console.log(newRect.stroke);
            

            setRectangles([...rectangles, newRect]);
            selectShape(newRect.id);
            setSelectedTool('')
        }

        if (selectedTool === "circulo") {
            const stage = e.target.getStage();
            if (!stage) return;

            const pointerPosition = stage.getPointerPosition();
            if (!pointerPosition) return;

            const newCircle: CircleProps = {
                x: pointerPosition.x,
                y: pointerPosition.y,
                radius: 50,
                fill: "#ffffff",
                id: `circle-${Date.now()}`
            };


            setCircles([...circles, newCircle]);
            selectShape(newCircle.id);
            setSelectedTool('')
        }

        if (selectedTool === "text") {
            const stage = e.target.getStage();
            if (!stage) return;

            const pointerPosition = stage.getPointerPosition();
            if (!pointerPosition) return;

            const newText: TextProps = {
                x: pointerPosition.x,
                y: pointerPosition.y,
                fontSize: 12,
                fontFamily: null,
                text: "text",
                fill: "#ffffff",
                id: `text-${Date.now()}`
            };


            setTexts([...texts, newText]);
            selectShape(newText.id);
            setSelectedTool('')
        }
    }

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = texts.map((t) =>
            t.id === selectedId ? { ...t, fontSize: parseInt(e.target.value) } : t
        );
        setTexts(updated);
    };

    const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updated = texts.map((t) =>
            t.id === selectedId ? { ...t, fontFamily: e.target.value } : t
        );
        setTexts(updated);
    };

    const handleTextContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updated = texts.map((t) =>
            t.id === selectedId ? { ...t, text: e.target.value } : t
        );
        setTexts(updated);
    };


    return {
        handleColorChange,
        handleStrokeColorChange,
        handleStrokeWidthChange,
        handleCornerRadiusChange,
        handleFontSizeChange,
        handleFontFamilyChange,
        handleStageClick,
        handleTextContentChange
    };
};
