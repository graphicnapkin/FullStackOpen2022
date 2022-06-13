import React, { useEffect, useState } from "react";
import getCountries from "./util/api";
import { CountryType } from "./util/types";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState<CountryType[] | undefined>();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getCountries().then((data) => setCountries(data));
  }, []);

  const filteredCountries =
    countries &&
    countries.filter((country) => country.name.common.match(filter));

  const countryList =
    (filteredCountries &&
      filteredCountries.map((country) => (
        <div key={country.name.official}>{country.name.common}</div>
      ))) ||
    [];

  if (!filteredCountries || filteredCountries.length > 10)
    return (
      <>
        <Filter filter={filter} setFilter={setFilter} />
        <div>Too many matches, specify another filter</div>
      </>
    );

  if (filteredCountries && filteredCountries.length === 1) {
    return (
      <>
        <Filter filter={filter} setFilter={setFilter} />
        <Country country={filteredCountries[0]} />
      </>
    );
  }
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {countryList}
    </div>
  );
}

const Filter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      find countries{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};
export default App;
