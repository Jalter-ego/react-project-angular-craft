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
    <div className="absolute top-4 right-4 bg-white dark:bg-[#333] p-4 rounded-xl shadow-xl z-50 flex flex-col gap-3 w-60">
      <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
        Color del texto:
        <input
          type="color"
          onChange={handleColorChange}
          value={selectedText.fill}
          className="ml-2 w-8 h-8 cursor-pointer rounded-4xl"
        />
      </label>

      <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
        Texto:
        <input
          type="text"
          min={5}
          max={200}
          value={selectedText.text}
          onChange={handleTextContentChange}
          className="ml-2 mt-1 w-full px-2  rounded border dark:bg-[#444] dark:text-white flex items-center"
        />
      </label>

      <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
        Tamaño de fuente:
        <input
          type="number"
          min={5}
          max={200}
          value={selectedText.fontSize}
          onChange={handleFontSizeChange}
          className="ml-2 mt-1 w-16 px-2  rounded border dark:bg-[#444] dark:text-white flex items-center"
        />
      </label>

      <label className="text-sm font-medium text-gray-700 dark:text-white flex items-center">
        Fuente:
        <select
          value={selectedText.fontFamily || "Arial"}
          onChange={handleFontFamilyChange}
          className="ml-2 mt-1 w-full px-2 py-1 rounded border dark:bg-[#444] dark:text-white flex items-center text-sm"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>
      </label>
    </div>
  );
};
