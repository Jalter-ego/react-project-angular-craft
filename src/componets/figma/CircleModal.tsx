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
        <div className="absolute top-1 right-1 bg-[var(--bg-chatgpt2)]
            p- z-50 flex flex-col gap-3 rounded-sm w-[100px] md:w-[200px]
            md:text-sm text-[9px] text-zinc-300">
            <div className="flex flex-col gap-2 md:px-4 px-2 pt-1">
                <label >Color de relleno</label>
                <input
                    type="color"
                    onChange={handleColorChange}
                    value={selectedRect.fill || "#000000"}
                    className="w-full h-5 md:h-20 cursor-pointer rounded-lg"
                />
            </div>
        </div>
    );
};