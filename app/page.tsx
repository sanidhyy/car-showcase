import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from "@/components";
import { fetchCars } from "@/utils/fetchCars";
import { fuels, yearsOfProduction } from "@/constants";
import { FilterProps } from "@/types";

// searchParams interface
interface searchParamsProps {
  searchParams: Promise<FilterProps>;
}

// home
export default async function Home({ searchParams }: searchParamsProps) {
  const { fuel, manufacturer, model, year, limit } = await searchParams;
  const resultLimit = Number(limit) || 10;

  // fetch all cars from api
  const allCars = await fetchCars({
    manufacturer: manufacturer || "",
    year: year ? Number(year) : undefined,
    fuel: fuel || "",
    model: model || "",
    limit: resultLimit,
  });

  // is car data empty
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div className="overflow-hidden">
      {/* hero */}
      <Hero />

      {/* discover */}
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          {/* heading and subheading */}
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        {/* filters */}
        <div className="home__filters">
          {/* search bar */}
          <SearchBar />

          {/* custom filters */}
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {/* check if car data is empty */}
        {!isDataEmpty ? (
          <section>
            {/* show all cars */}
            <div className="home__cars-wrapper">
              {allCars?.map((car, i) => (
                <CarCard car={car} key={`car-${i}`} />
              ))}
            </div>

            <ShowMore
              pageNumber={resultLimit / 10}
              isNext={resultLimit > allCars.length}
            />
          </section>
        ) : (
          // No results found
          <div className="home__error-container">
            <h2 className="text-black text-xl text-bold">Oops, no results</h2>
            <p>Try a different manufacturer, model, or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
