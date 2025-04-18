import { useEffect } from "react";
import { socket } from "../../api/index";
import { CircleProps, RectProps, TextProps } from "../../lib/types";


export const useSocketCanvas = (
  roomId: string | undefined,
  setRectangles: (shapes: RectProps[]) => void,
  setCircles: (shapes: CircleProps[]) => void,
  setTexts: (shapes: TextProps[]) => void
) => {
  useEffect(() => {
    socket.connect();
    socket.emit("join-room", roomId);

    socket.on("canvas-updated", (data: { rectangles?: RectProps[]; circles?: CircleProps[]; texts?: TextProps[] }) => {
      if (data.rectangles) setRectangles(data.rectangles);
      if (data.circles) setCircles(data.circles);
      if (data.texts) setTexts(data.texts);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);
};
