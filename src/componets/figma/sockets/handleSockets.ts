import { Dispatch , SetStateAction } from "react";
import { socket } from "../../../api/index";
import { CircleProps, RectProps, TextProps } from "../../../lib/types";

interface HandleSokectProps{
    id: string | undefined
    rectangles: RectProps[]
    circles: CircleProps[]
    texts: TextProps[]
    setRectangles: Dispatch<SetStateAction<RectProps[]>>
    setCircles: Dispatch<SetStateAction<CircleProps[]>>
    setTexts: Dispatch<SetStateAction<TextProps[]>>
}

export const handleSoket = ({
    id,
    rectangles,
    circles,
    texts,
    setRectangles,
    setCircles,
    setTexts
}: HandleSokectProps) => {

  const handleCanvasChange = (newData: any) => {
    socket.emit("update-canvas", {
      roomId: id,
      data: newData,
    });
  };

  const handleRectChange = (newAttrs: RectProps) => {
    const newRects = rectangles.map((r) =>
      r.id === newAttrs.id ? newAttrs : r
    );
    setRectangles(newRects);
    handleCanvasChange({
      rectangles: newRects,
      circles,
      texts,
    });
  };

  const handleCircleChange = (newAttrs: CircleProps) => {
    const newCircles = circles.map((c) =>
      c.id === newAttrs.id ? newAttrs : c
    );
    setCircles(newCircles);
    handleCanvasChange({
      rectangles,
      circles: newCircles,
      texts,
    });
  };

  const handleTextChange = (newAttrs: TextProps) => {
    const newTexts = texts.map((t) => (t.id === newAttrs.id ? newAttrs : t));
    setTexts(newTexts);
    handleCanvasChange({
      rectangles,
      circles,
      texts: newTexts,
    });
  };

  return {
    handleCanvasChange,
    handleRectChange,
    handleCircleChange,
    handleTextChange
  }
};
