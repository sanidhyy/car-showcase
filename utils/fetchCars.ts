import "server-only";

import { CarProps, FilterProps } from "@/types";
import { manufacturers, yearsOfProduction } from "@/constants";

const CAR_API_URL = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars";
const PRODUCTION_YEARS = yearsOfProduction
  .map((option) => Number(option.value))
  .filter((year) => Number.isFinite(year) && year > 0);

async function fetchCarsFromApi(filters: FilterProps): Promise<CarProps[]> {
  const { manufacturer, year, model, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const params = new URLSearchParams();
  if (manufacturer) params.set("make", manufacturer);
  if (year) params.set("year", `${year}`);
  if (model) params.set("model", model);
  if (fuel) params.set("fuel_type", fuel);

  try {
    const response = await fetch(`${CAR_API_URL}?${params.toString()}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

function uniqueCars(cars: CarProps[]) {
  const seen = new Set<string>();

  return cars.filter((car) => {
    const key = [
      car.make,
      car.model,
      car.year,
      car.displacement,
      car.drive,
      car.transmission,
    ].join("-");

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// fetch cars data
export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, fuel, limit } = filters;
  const resultLimit = Number(limit) || 10;

  // a specific model is already a narrow lookup
  if (model) {
    const cars = await fetchCarsFromApi({ manufacturer, year, model, fuel });
    return uniqueCars(cars).slice(0, resultLimit);
  }

  // searching a make: request several years so more than one variant appears
  if (manufacturer) {
    const years = year ? [year] : PRODUCTION_YEARS.slice(0, resultLimit);
    const batches = await Promise.all(
      years.map((makeYear) =>
        fetchCarsFromApi({ manufacturer, year: makeYear, fuel }),
      ),
    );
    return uniqueCars(batches.flat()).slice(0, resultLimit);
  }

  // default catalogue: one request per make, since each call returns a single car
  const makes = manufacturers
    .slice(0, resultLimit)
    .map((make) => make.toLowerCase());
  const batches = await Promise.all(
    makes.map((make) => fetchCarsFromApi({ manufacturer: make, year, fuel })),
  );

  return uniqueCars(batches.flat()).slice(0, resultLimit);
}
