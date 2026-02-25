"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

// custom filter
const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0]); // current selected filter
  const router = useRouter(); // use router

  // update url params
  const handleUpdateParams = (e: { title: string; value: string }) => {
    // new path name
    const newPathname = updateSearchParams(title, e.value.toLowerCase());

    // push new path name
    router.push(newPathname);
  };

  return (
    <div className="w-fit">
      {/* list box */}
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            {/* current selected value */}
            <span className="block truncate">{selected.title}</span>
            {/* chevron up down icon */}
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </ListboxButton>

          {/* options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options.map((option) => (
                // single option
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {/* option name */}
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
