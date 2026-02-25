"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SearchManufacturer } from "./";

// search button
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    {/* search icon */}
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

// search bar
const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState<string>(""); // car manufacturer
  const [model, setModel] = useState(""); // car model
  const router = useRouter(); // use router

  // handle car search
  const handleSearch = (e: React.SubmitEvent) => {
    // prevent browser reload
    e.preventDefault();

    // check if manufacturer and model is empty
    if (manufacturer === "" && model === "") {
      return alert("Please fill in the search bar!");
    }

    // update search params in url
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  // update search params
  const updateSearchParams = (model: string, manufacturer: string) => {
    // get current search params
    const searchParams = new URLSearchParams(window.location.search);

    // update model param
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // update manufacturer param
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }

    // set new pathname
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}#discover`;

    // update new pathname url
    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        {/* search manufacturer */}
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />

        {/* search button */}
        <SearchButton otherClasses="sm:hidden" />
      </div>

      {/* search bar */}
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />

        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />

        {/* search button (lg devices) */}
        <SearchButton otherClasses="sm:hidden" />
      </div>

      {/* search button (sm devices) */}
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
