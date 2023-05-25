interface Coordinates {
  lat: number;
  lng: number;
}

interface GameQuestion {
  id: string;
  imageSrc: string;
}

interface GameAnswer extends UserAnswer {
  description: string;
  license: string;
}

interface UserAnswer {
  id: string;
  year: number;
  coordinates: Coordinates;
}

interface Score {
  firstQuestionId: string;
  score: number;
}

interface AuthForm {
  name?: string;
  email: string;
  password: string;
  customError: string;
}

interface CompleteAnswer {
  id: string;
  userYear: number;
  gameYear: number;
  userLocation: Coordinates;
  gameLocation: Coordinates;
  distance: number;
  yearDifference: number;
  distanceScore: number;
  yearScore: number;
  description: string;
  license: string;
}
