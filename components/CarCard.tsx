"use client";

import { useState } from "react";
import Image from "next/image";

import { CarProps } from "@/types";
import { CustomButton, CarDetails } from "./";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

// cardCard interface
interface CarCardProps {
  car: CarProps;
}

// Car Card
const CarCard = ({ car }: CarCardProps) => {
  // extract car data
  const {
    city_mpg,
    year,
    make,
    model,
    transmission,
    drive,
    displacement,
    fuel_type,
  } = car;
  // is modal open
  const [isOpen, setIsOpen] = useState(false);

  // calculate car rent
  const carRent = calculateCarRent(
    Number(displacement) || 3,
    Number(year) || 2020,
  );

  return (
    <article className="car-card group">
      <div className="car-card__content">
        {/* car name */}
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      {/* car rent */}
      <p className="flex mt-6 text-[32px] font-bold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      {/* car image */}
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt={`${make} ${model}`}
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* car info */}
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          {/* automatic or manual */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />

            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          {/* drive type */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire" />

            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          {/* miles per gallon */}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="gas" />

            <p className="text-[14px]">{fuel_type.toUpperCase()}</p>
          </div>
        </div>

        {/* view more button */}
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* car details/model */}
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </article>
  );
};

export default CarCard;
