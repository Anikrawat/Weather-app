import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  visibility: number;
}

const App: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData>({
    weather: [{ main: "", description: "", icon: "01d" }],
    main: {
      temp: 273.15,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    wind: { speed: 0, deg: 0 },
    name: "",
    visibility: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="bg-mainBgColor h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[80vh] w-[30vw] bg-white flex flex-col items-center rounded-lg">
        <div className="flex w-full h-[5vh] max-w-sm mt-5 space-x-2 ">
          <Input
            type="text"
            placeholder="Enter Your City"
            value={city}
            onChange={handleChange}
            className="bg-gray-200"
          />
          <Button type="submit" onClick={fetchWeather}>
            Search
          </Button>
        </div>
        <div className="flex w-[90%] rounded-lg items-center justify-between bg-gray-300 mt-8">
          <div className="flex h-full w-[70%] items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              alt="ohyeah"
            />
            <h1 className="text-6xl text-center">
              {Math.round(weatherData.main.temp - 273.15)}
            </h1>
            &nbsp;
            <sup className="text-3xl text-gray-500">o </sup>
            <h1 className="text-6xl text-center text-gray-500">c</h1>
          </div>
          <div className=" w-[30%] h-full flex flex-col justify-center">
            <p className="text-xl text-gray-500">
              {weatherData.weather[0].main}
            </p>
            <p className="">
              Feels Like {Math.round(weatherData.main.feels_like - 273.15)}
              <sup className="text-sm ">o </sup>
              <span className="text-lg text-center ">c</span>
            </p>
          </div>
        </div>

        <div className="w-[90%] h-[45vh] justify-items-end mt-7 grid grid-rows-2 grid-cols-2">
          <div className="flex flex-col w-[93%] h-[83%] justify-self-start items-center rounded-lg bg-gray-300">
            <div className="ml-3 w-[90%] h-16 flex items-center gap-4">
              <i className="fa-solid fa-water fa-2x"></i>
              <p className="text-3xl">Humidity</p>
            </div>
            <p className="text-4xl mt-4">{weatherData.main.humidity}%</p>
          </div>
          <div className="flex flex-col items-center w-[93%] h-[83%] rounded-lg  bg-gray-300">
            <div className="ml-3 w-[90%] h-16 flex items-center gap-4">
              <i className="fa-regular fa-eye fa-2x"></i>
              <p className="text-3xl">Visibility</p>
            </div>
            <p className="text-4xl mt-4">{Math.round(weatherData.visibility/1024)} KM</p>
          </div>
          <div className="flex flex-col w-[93%] h-[83%] justify-self-start items-center rounded-lg bg-gray-300">
          <div className="ml-3 w-[90%] h-16 flex items-center gap-4">
              <i className="fa-solid fa-wind fa-2x"></i>
              <p className="text-3xl">Wind</p>
            </div>
            <p className="text-4xl mt-4">{Math.round(weatherData.wind.speed)} KPH</p>
          </div>
          <div className="flex flex-col w-[93%] h-[83%] rounded-lg bg-gray-300 items-center">
          <div className="ml-3 w-[90%] h-16 flex items-center gap-4">
          <i className="fa-regular fa-clock fa-2x"></i>
              <p className="text-3xl">Pressure</p>
            </div>
            <p className="text-4xl mt-4">{Math.round(weatherData.main.pressure/100)} Pa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
