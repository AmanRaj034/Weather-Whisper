export const Geo_Api_Url = "https://wft-geo-db.p.rapidapi.com/v1/geo/";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_GeoKey}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
