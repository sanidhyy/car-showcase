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
