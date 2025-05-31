import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Widget {
  id: number;
  name: string;
  description?: string;
}

export const WIDGETS: Widget[] = [
  { id: 2, name: "Image Generation" },
  { id: 4, name: "Data Analysis" },
  { id: 5, name: "Document AI" },
  { id: 6, name: "Music Composer" },
];
