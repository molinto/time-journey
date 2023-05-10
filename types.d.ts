interface Coordinates {
  lat: number;
  lng: number;
}

interface Question {
  id: string;
  src: string;
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
