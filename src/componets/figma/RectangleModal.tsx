import React from "react";
import { RectProps } from "../../lib/types";

interface ShapeSettingsPanelProps {
    selectedId: string | null;
    rectangles: RectProps[];
    handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleStrokeColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleStrokeWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCornerRadiusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpacityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleXChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleYChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModalRect: React.FC<ShapeSettingsPanelProps> = ({
    selectedId,
    rectangles,
    handleColorChange,
    handleStrokeColorChange,
    handleStrokeWidthChange,
    handleCornerRadiusChange,
    handleOpacityChange,
    handleHeightChange,
    handleWidthChange,
    handleXChange,
    handleYChange
}) => {
    const selectedRect = rectangles.find((r) => r.id === selectedId);

    if (!selectedRect) return null;

    return (
        <div className="absolute top-1 right-1 bg-[var(--bg-chatgpt2)]  rounded-sm
            z-50 flex flex-col gap-3 w-[100px] md:w-[200px] overflow-hidden
            md:text-sm text-[9px] text-zinc-300 pb-2">

            <div className="flex flex-col gap-2 md:px-4 px-2 pt-1 border-b pb-4 border-b-zinc-600">
                <label >Layout</label>
                <section className="flex md:flex-row flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label>W:</label>
                        <input
                            type="number"
                            onChange={handleWidthChange}
                            value={selectedRect.width.toFixed()}
                            className="w-14 h-5 md:h-8 cursor-pointer rounded-md border border-zinc-600 text-center"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>H:</label>
                        <input
                            type="number"
                            onChange={handleHeightChange}
                            value={selectedRect.height.toFixed()}
                            className="w-14 h-5 md:h-8 cursor-pointer rounded-md border border-zinc-600 text-center"
                        />
                    </div>
                </section>
            </div>

            <div className="flex flex-col gap-2 md:px-4 px-2 pt-1 border-b pb-4 border-b-zinc-600">
                <label >Position</label>
                <section className="flex md:flex-row flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label>X:</label>
                        <input
                            type="number"
                            onChange={handleXChange}
                            value={selectedRect.x.toFixed()}
                            className="w-14 h-5 md:h-8 cursor-pointer rounded-md border border-zinc-600 text-center"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>Y:</label>
                        <input
                            type="number"
                            onChange={handleYChange}
                            value={selectedRect.y.toFixed()}
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
                    value={selectedRect.fill || "#000000"}
                    className="w-full h-5 md:h-8 cursor-pointer rounded-4xl"
                />
            </div>


            <div className="flex flex-col gap-2 md:px-4 px-2">
                <label>Color del borde</label>
                <input
                    type="color"
                    onChange={handleStrokeColorChange}
                    value={selectedRect.stroke || "#000000"}
                    className="w-full h-5 md:h-8 cursor-pointer rounded-4xl"
                />
            </div>

            <div className=" flex flex-col gap-2 md:px-4 px-2">
                <label> Opacidad: {((selectedRect.opacity ?? 1) * 100).toFixed()}%</label>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={selectedRect.opacity ?? 1}
                    onChange={handleOpacityChange}
                    className=""
                />
            </div>

            <div className=" flex flex-col gap-2 md:px-4 px-2">
                <label> Stroke Width: {((selectedRect.strokeWidth ?? 1)) * 5}%</label>
                <input
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={selectedRect.strokeWidth || 0}
                    onChange={handleStrokeWidthChange}
                    className=""
                />
            </div>

            <div className=" flex flex-col gap-2 md:px-4 px-2 pb-1">
                <label> Corner Radius: {((typeof selectedRect.cornerRadius === "number" ? selectedRect.cornerRadius : 1)) * 2}%</label>
                <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={Array.isArray(selectedRect.cornerRadius) ? selectedRect.cornerRadius[0] : selectedRect.cornerRadius || 0}
                    onChange={handleCornerRadiusChange}
                    className=""
                />
            </div>
        </div>
    );
};

