import bgSunny from "../assets/sunny.jpg";
import bgRainy from "../assets/rain.jpg";
import bgShowers from "../assets/showers.jpg";
import bgCloudy from "../assets/cloudy.jpg";

const getImageForWeather = weather => {
  switch (weather) {
    case "Clear":
      return bgSunny;
    case "Light Rain":
      return bgRainy;
    case "Showers":
      return bgShowers;
    case "Light Cloud":
      return bgCloudy;
    default:
      return null;
  }
};

export default getImageForWeather;
