import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Geo_Api_Url, geoApiOptions } from "../../Api";
function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${Geo_Api_Url}cities?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();
      console.log(result);
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name},${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleonChange = (searchData) => {
    console.log(searchData);
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleonChange}
        loadOptions={loadOptions}
      />
    </>
  );
}

export default Search;
