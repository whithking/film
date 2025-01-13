export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  genres: string[];
  duration: number;
  releaseDate: string;
  director: string;
  cast: string[];
  synopsis: string;
  language: string;
}

export interface Screening {
  id: string;
  movieId: string;
  hallId: string;
  startTime: string;
  endTime: string;
  language: string;
  price: number;
}

export interface Seat {
  id: string;
  row: number;
  column: number;
  type: 'regular' | 'vip' | 'couple' | 'disabled';
  status: 'available' | 'occupied' | 'selected';
  price: number;
}

export interface Order {
  id: string;
  movieId: string;
  screeningId: string;
  seats: Seat[];
  totalPrice: number;
  status: 'pending' | 'paid' | 'cancelled';
  createTime: string;
  paymentMethod?: string;
} 