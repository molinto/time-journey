interface Coordinates {
  lat: number;
  lng: number;
}

interface GameQuestion {
  id: string;
  imageSrc: string;
}

interface Answer {
  id: string;
  year: number;
  coordinates: Coordinates;
}

interface Score {
  id: string;
  score: number;
}
