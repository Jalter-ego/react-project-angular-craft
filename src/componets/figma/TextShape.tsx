import Konva from "konva";
import { useEffect, useRef } from "react";
import { TextProps } from "../../lib/types";
import { Text, Transformer } from "react-konva";

interface TextShapeProps {
    shapeProps: TextProps;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (newAttrs: TextProps) => void;
}


export const TextShape: React.FC<TextShapeProps> = ({
    shapeProps,
    isSelected,
    onSelect,
    onChange,
}) => {
    const shapeRef = useRef<Konva.Text>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                fontFamily={shapeProps.fontFamily || undefined}
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

                    // Reset scale to 1 to avoid accumulation
                    node.scaleX(1);
                    node.scaleY(1);

                    // Calcular nuevo tamaño de fuente (usamos promedio para mantener proporción)
                    const newFontSize = Math.max(5, shapeProps.fontSize * (scaleX + scaleY) / 2);

                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        fontSize: newFontSize,
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
