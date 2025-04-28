import { useEffect } from "react";
import { CircleProps, RectProps, TextProps } from '../../../lib/types';


export const useDeleteKey = (
  selectedId: string | null,
  setRectangles: (shapes: RectProps[]) => void,
  setCircles: (shapes: CircleProps[]) => void,
  setTexts: (shapes: TextProps[]) => void,
  rectangles: RectProps[],
  circles: CircleProps[],
  texts: TextProps[],
  selectShape: (id: string | null) => void,
  handleCanvasChange: (data: {
    rectangles: RectProps[];
    circles: CircleProps[];
    texts: TextProps[];
  }) => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        const newRects = rectangles.filter((r) => r.id !== selectedId);
        const newCircles = circles.filter((c) => c.id !== selectedId);
        const newTexts = texts.filter((t) => t.id !== selectedId);

        setRectangles(newRects);
        setCircles(newCircles);
        setTexts(newTexts);
        selectShape(null);
        handleCanvasChange({
          rectangles: newRects,
          circles: newCircles,
          texts: newTexts,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, rectangles, circles, texts]);
};
