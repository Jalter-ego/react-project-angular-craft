export interface RectProps {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    id: string;
    stroke: string | null;
    strokeWidth: number | null;
    cornerRadius: number |number[]| null;
    opacity: number | null;
}

export interface CircleProps {
    x: number;
    y: number;
    radius: number;
    fill: string;
    id: string;
}

export interface TextProps{
    x: number;
    y: number;
    fill: string;
    id: string;
    text: string;
    fontSize: number;
    fontFamily: string | null;
}

export interface GenericProps{
    x: number;
    y: number;
    width: number | null;
    height: number | null;
    radius: number | null;
    fill: string;
    id: string;
    stroke: string | null;
    strokeWidth: number | null;
    cornerRadius: number | null;
}

export interface FigmaProps{
    hostEmail : string
    whitelist: string[]
    rectangles: RectProps[]
    circles: CircleProps[]
    texts: TextProps[]
}

export interface UpdateFigma{
    rectangles: RectProps[]
    circles: CircleProps[]
    texts: TextProps[]
}
