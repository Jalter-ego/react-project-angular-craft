// lib/exportUtils.ts
import { XMLParser } from "fast-xml-parser";

export function exportToJson(data: any): string {
  return JSON.stringify(data, null, 2);
}

export function exportToXml(data: any): string {
  const convert = (obj: any, indent = ""): string => {
    let xml = "";
    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          xml += `${indent}<${key}>\n${convert(
            item,
            indent + "  "
          )}${indent}</${key}>\n`;
        });
      } else if (typeof value === "object" && value !== null) {
        xml += `${indent}<${key}>\n${convert(
          value,
          indent + "  "
        )}${indent}</${key}>\n`;
      } else {
        xml += `${indent}<${key}>${value}</${key}>\n`;
      }
    }
    return xml;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n<figma>\n${convert(
    data,
    "  "
  )}</figma>`;
}

export const xmlToJson = (content: string) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    parseTagValue: true,
    isArray: (jpath) => {
      return ["figma.rectangles", "figma.circles", "figma.texts"].includes(
        jpath
      );
    },
  });

  const jsonObj = parser.parse(content);
  const normalizeArray = (prop: any) => {
    if (!prop) return [];
    return Array.isArray(prop) ? prop : [prop];
  };

  let parsedData = {
    ...jsonObj.figma,
    rectangles: normalizeArray(jsonObj.figma.rectangles),
    circles: normalizeArray(jsonObj.figma.circles),
    texts: normalizeArray(jsonObj.figma.texts),
    whitelist: [],
  };
  return parsedData
};
