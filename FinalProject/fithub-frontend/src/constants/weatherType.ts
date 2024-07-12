interface weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
interface main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min?: number;
}

interface weatherType {
  name: string;
  weather: weather[];
  main: main;
}
