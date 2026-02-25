import { CarProps, FilterProps } from "@/types";

// fetch cars data
export async function fetchCars(filters: FilterProps) {
  // extract filters
  const { manufacturer, year, model, fuel } = filters;
  // api headers
  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // api response
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`,
    { headers: headers },
  );

  // fetch result
  const result = await response.json();

  // return result
  return result;
}

// calculate car rent
export const calculateCarRent = (displacement: number, year: number) => {
  const basePricePerDay = 50; // base rental price per day in dollars
  const engineFactor = 5; // additional rate per liter of engine displacement
  const ageFactor = 0.05; // additional rate per year of vehicle age

  // calculate additional rate based on engine size (acting as a proxy for vehicle tier)
  const performanceRate = displacement * engineFactor;

  // calculate additional rate based on age
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + performanceRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

// generate car image url
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  // base url
  const url = new URL("https://cdn.imagin.studio/getimage");
  // extract car data
  const { make, year, model } = car;

  // append api key
  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_CAR_IMAGE_API_KEY || "",
  );

  // append car details
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  // return updated url
  return `${url}`;
};

// update search params
export const updateSearchParams = (type: string, value: string) => {
  // get current search params
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value); // set new search params

  // set new pathname
  const newPathname = `${
    window.location.pathname
  }?${searchParams.toString()}#discover`;

  // return new pathname url
  return newPathname;
};
