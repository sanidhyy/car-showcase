"use client";

import Image from "next/image";
import { useState, Fragment } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

// search manufacturer
const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState(""); // search query

  // filtered manufacturers data
  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="search-manufacturer">
      {/* combo box (autocomplete search box) */}
      <Combobox
        value={manufacturer}
        onChange={(manufacturer) => setManufacturer(manufacturer || "")}
      >
        <div className="relative w-full">
          {/* sample car manufacurer logo */}
          <ComboboxButton className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              alt="car logo"
              width={20}
              height={20}
              className="ml-4"
            />
          </ComboboxButton>

          {/* car manufacurer input */}
          <ComboboxInput
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions>
              {/* show filtered manufacturers */}
              {filteredManufacturers.map((item) => (
                <ComboboxOption
                  key={item}
                  className={({ active }) => `
                      relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }
                    `}
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      {/* show active selected item */}
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {/* change style of selected item */}
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
