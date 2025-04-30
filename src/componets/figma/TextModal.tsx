import React from "react";
import { TextProps } from "../../lib/types";

interface ModalTextProps {
  selectedId: string | null;
  texts: TextProps[];
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFontSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFontFamilyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ModalText: React.FC<ModalTextProps> = ({
  selectedId,
  texts,
  handleColorChange,
  handleFontSizeChange,
  handleFontFamilyChange,
  handleTextContentChange
}) => {
  const selectedText = texts.find((t) => t.id === selectedId);
  if (!selectedText) return null;

  return (
    <div className="absolute top-1 right-1 bg-[var(--bg-chatgpt2)]  rounded-sm
        z-50 flex flex-col gap-3 w-[100px] md:w-[200px] overflow-hidden
        md:text-sm text-[9px] text-zinc-300">


      <div className="flex flex-col gap-2 md:px-4 px-2 pt-1 border-b pb-4 border-b-zinc-600">
        <label >Position</label>
        <section className="flex md:flex-row flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <label>X:</label>
            <input
              type="number"
              onChange={() => { }}
              value={selectedText.x.toFixed()}
              className="w-14 h-5 md:h-8 cursor-pointer rounded-md border border-zinc-600 text-center"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Y:</label>
            <input
              type="number"
              onChange={() => { }}
              value={selectedText.y.toFixed()}
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
          value={selectedText.fill || "#000000"}
          className="w-full h-5 md:h-20 cursor-pointer rounded-3xl"
        />
      </div>

      <div className="flex flex-col gap-2 md:px-4 px-2 pt-1">
        <label >Text</label>
        <input
          type="text"
          min={5}
          max={200}
          value={selectedText.text}
          onChange={handleTextContentChange}
          className="w-full px-2 rounded border"
        />
      </div>

      <div className="flex flex-col gap-2 md:px-4 px-2 pt-1">
        <label >Font Size</label>
        <input
          type="number"
          min={5}
          max={200}
          value={selectedText.fontSize.toFixed()}
          onChange={handleFontSizeChange}
          className="w-16 px-2  rounded border"
        />
      </div>

      <div className="flex flex-col gap-2 md:px-4 px-2 pb-4">
        <label >Font Family</label>
        <select
          value={selectedText.fontFamily || "Arial"}
          onChange={handleFontFamilyChange}
          className="px-2 py-1 rounded border text-sm"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Segoe UI">Segoe UI</option>
          <option value="Roboto">Roboto</option>
        </select>
      </div>
    </div>
  );
};
