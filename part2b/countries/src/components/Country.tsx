import React from "react";
import { CountryType } from "../util/types";

const Country = ({ country }: { country: CountryType }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital || ""} <br />
        area {country.area} <br />
      </p>
      <h3>languages:</h3>
      {Object.entries(country.languages).map((language) => (
        <li key={language.toString() || "opps"}>{language}</li>
      ))}
    </div>
  );
};

export default Country;
