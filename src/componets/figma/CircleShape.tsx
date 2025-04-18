import React from "react";
import { Circle, Transformer } from "react-konva";
import Konva from "konva";
import { CircleProps } from "../../lib/types";

interface CircleShapeProps {
  shapeProps: CircleProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: CircleProps) => void;
}

export const CircleShape: React.FC<CircleShapeProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = React.useRef<Konva.Circle>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          // Usamos el promedio de ambos para mantener proporción circular
          const newRadius = Math.max(5, node.radius() * (scaleX + scaleY) / 2);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: newRadius,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
