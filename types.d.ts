interface Coordinates {
  lat: string;
  lng: string;
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
