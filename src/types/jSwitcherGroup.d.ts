import type { JColor } from "../";

export type JSwitcherGroup = Array<{
  title: string;
  value: any;
  icon?: string;
  color?: JColor;
  disabled?: boolean;
  callback?(value: any): void;
}>;