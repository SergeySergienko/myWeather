export const fetchLocationId = city => {
  return fetch("https://www.metaweather.com/api/location/search/?query=" + city)
    .then(res => res.json())
    .then(json => json[0].woeid);
};

export const fetchWeather = id => {
  return fetch("https://www.metaweather.com/api/location/" + id)
    .then(res => res.json())
    .then(json => {
      return {
        location: json.title,
        temperature: json.consolidated_weather[0].the_temp,
        weather: json.consolidated_weather[0].weather_state_name
      };
    });
};
