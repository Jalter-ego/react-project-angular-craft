
import Konva from "konva";
import { RefObject, useEffect } from "react";

export const useZoom = (
    stateRef: RefObject<Konva.Stage | null>
)=>{

    useEffect(() => {
            const stage = stateRef.current;
            if (!stage) return;
          
            const handleWheel = (e: WheelEvent) => {
              if (!e.ctrlKey) return; 
          
              e.preventDefault(); 
          
              const scaleBy = 1.05;
              const oldScale = stage.scaleX();
              const mousePointTo = {
                x: stage.getPointerPosition()?.x! / oldScale - stage.x() / oldScale,
                y: stage.getPointerPosition()?.y! / oldScale - stage.y() / oldScale,
              };
          
              const direction = e.deltaY > 0 ? -1 : 1;
              const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
          
              stage.scale({ x: newScale, y: newScale });
          
              const newPos = {
                x: -(mousePointTo.x - stage.getPointerPosition()?.x! / newScale) * newScale,
                y: -(mousePointTo.y - stage.getPointerPosition()?.y! / newScale) * newScale,
              };
              stage.position(newPos);
              stage.batchDraw();
            };
          
            const container = stage.container();
            container.addEventListener('wheel', handleWheel, { passive: false });
          
            return () => {
              container.removeEventListener('wheel', handleWheel);
            };
          }, []);
}