import React from "react";
import { RectProps } from "../../lib/types";

interface ShapeSettingsPanelProps {
    selectedId: string | null;
    rectangles: RectProps[];
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleStrokeColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleStrokeWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCornerRadiusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModalRect: React.FC<ShapeSettingsPanelProps> = ({
    selectedId,
    rectangles,
    handleColorChange,
    handleStrokeColorChange,
    handleStrokeWidthChange,
    handleCornerRadiusChange
}) => {
    const selectedRect = rectangles.find((r) => r.id === selectedId);

    if (!selectedRect) return null;

    return (
        <div className="absolute top-4 right-4 bg-white dark:bg-[#333] p-4 rounded-xl shadow-xl z-50 flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
                Color de relleno:
                <input
                    type="color"
                    onChange={handleColorChange}
                    value={selectedRect.fill || "#000000"}
                    className="ml-2 w-8 h-8 cursor-pointer rounded-4xl"
                />
            </label>

            <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
                Color del borde:
                <input
                    type="color"
                    onChange={handleStrokeColorChange}
                    value={selectedRect.stroke || "#000000"}
                    className="ml-2 w-8 h-8 cursor-pointer rounded-4xl"
                />
            </label>

            <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
                Grosor del borde:
                <input
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={selectedRect.strokeWidth || 0}
                    onChange={handleStrokeWidthChange}
                    className="ml-2"
                />
            </label>

            <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
                Esquinas redondeadas:
                <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={Array.isArray(selectedRect.cornerRadius) ? selectedRect.cornerRadius[0] : selectedRect.cornerRadius || 0}
                    onChange={handleCornerRadiusChange}
                    className="ml-2"
                />
            </label>
        </div>
    );
};

