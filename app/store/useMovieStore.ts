import {create} from 'zustand';

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  score: number;
}

interface MovieStore {
  similarMovies: Movie[];
  setSimilarMovies: (movies: Movie[]) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  similarMovies: [], // Initialize as an empty array
  setSimilarMovies: (movies) => set({ similarMovies: movies }),
}));

export default useMovieStore;
