import React from "react";
import { Rect, Transformer } from "react-konva";
import Konva from "konva";
import { RectProps } from "../../lib/types";



interface RectangleProps {
  shapeProps: RectProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: RectProps) => void;
}

export const Rectangle: React.FC<RectangleProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = React.useRef<Konva.Rect>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        strokeWidth={shapeProps.strokeWidth ?? undefined}
        stroke={shapeProps.stroke ?? undefined}
        cornerRadius={shapeProps.cornerRadius ?? 0}
        opacity={shapeProps.opacity ?? 1}
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

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            cornerRadius: shapeProps.cornerRadius,
            stroke: shapeProps.stroke,
            strokeWidth: shapeProps.strokeWidth,
            opacity: shapeProps.opacity,
            fill: shapeProps.fill,
            id: shapeProps.id,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
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