import React from "react";
import { CircleProps } from "../../lib/types";

interface ModalCircleProps {
    selectedId: string | null;
    circles: CircleProps[];
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModalCircle: React.FC<ModalCircleProps> = ({
    selectedId,
    circles,
    handleColorChange
}) => {
    
    const selectedRect = circles.find((r) => r.id === selectedId);
    if (!selectedRect) return null;

    return (
        <div className="absolute top-4 right-4 bg-white dark:bg-[#333] p-4 rounded-xl shadow-xl z-50 flex flex-col gap-3">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-white">
                Color de relleno:
                <input
                    type="color"
                    onChange={handleColorChange}
                    value={selectedRect.fill}
                    className="ml-2 w-8 h-8 cursor-pointer rounded-[50%]"
                />
            </label>
        </div>
    );
};