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

    const selectedCircle = circles.find((r) => r.id === selectedId);
    if (!selectedCircle) return null;

    return (
        <div className="absolute top-1 right-1 bg-[var(--bg-chatgpt2)]
            p- z-50 flex flex-col gap-3 rounded-sm w-[100px] md:w-[200px]
            md:text-sm text-[9px] text-zinc-300 pb-3">


            <div className="flex flex-col gap-2 md:px-4 px-2 pt-1 border-b pb-4 border-b-zinc-600">
                <label >Position</label>
                <section className="flex md:flex-row flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label>X:</label>
                        <input
                            type="number"
                            onChange={() => { }}
                            value={selectedCircle.x.toFixed()}
                            className="w-14 h-5 md:h-8 cursor-pointer rounded-md border border-zinc-600 text-center"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>Y:</label>
                        <input
                            type="number"
                            onChange={() => { }}
                            value={selectedCircle.y.toFixed()}
                            className="w-14 h-5 md:h-8 cursor-pointer rounded-md border border-zinc-600 text-center"
                        />
                    </div>
                </section>
            </div>
            <div className="flex flex-col gap-2 md:px-4 px-2 pt-1">
                <label >Color de relleno</label>
                <input
                    type="color"
                    onChange={handleColorChange}
                    value={selectedCircle.fill || "#000000"}
                    className="w-full h-5 md:h-20 cursor-pointer rounded-3xl border-0"
                />
            </div>
        </div>
    );
};