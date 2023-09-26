export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GameQuestion {
  id: string;
  imageSrc: string;
}

export interface GameAnswer extends UserAnswer {
  description: string;
  license: string;
}

export interface UserAnswer {
  id: string;
  year: number;
  coordinates: Coordinates;
}

export interface Score {
  firstQuestionId: string;
  score: number;
}

export interface AuthForm {
  name?: string;
  email: string;
  password: string;
  customError: string;
}

export interface CompleteAnswer {
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

export interface Ranking {
  name: string;
  value: number;
  id: string;
}
