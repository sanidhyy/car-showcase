// Export new typscript types/definitions for components to be used in other pages/components.
// Don't remove anything from here (if not sure)

import { MouseEventHandler } from "react";

// custom button interface
export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
}

// search manufacturer interface
export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

// car interface
export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

// filter interface
export interface FilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  model: string;
}

// option interface
export interface OptionProps {
  title: string;
  value: string;
}

// custom filter interface
export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

// show more interface
export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
