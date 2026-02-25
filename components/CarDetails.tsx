"use client";

import { Fragment } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { generateCarImageUrl } from "@/utils";
import { CarProps } from "@/types";

// car details interface
interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

// car details
const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  // omit car details only for premium subscribers
  const carDetails = Object.entries(car).filter(
    ([_key, value]) =>
      !String(value).toLowerCase().includes("premium subscribers"),
  );

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* model background shadow */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  {/* close button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  {/* car details */}
                  <div className="flex-1 flex flex-col gap-3">
                    {/* car top image */}
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt={`${car.make} ${car.model}`}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>

                    {/* car more images */}
                    <div className="flex gap-3">
                      {/* image 1 */}
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, "29")}
                          alt={`${car.make} ${car.model}`}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        {/* image 2 */}
                        <Image
                          src={generateCarImageUrl(car, "33")}
                          alt={`${car.make} ${car.model}`}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        {/* image 3 */}
                        <Image
                          src={generateCarImageUrl(car, "13")}
                          alt={`${car.make} ${car.model}`}
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    {/* car name */}
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>

                    {/* car details */}
                    <div className="mt-3 flex flex-wrap gap-4">
                      {carDetails.map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-white capitalize"
                          key={key}
                        >
                          {/* keys */}
                          <h4 className="text-grey">
                            {key.split("_").join(" ")}
                          </h4>
                          {/* values */}
                          <p className="text-black-100 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
