// useMovieStore.ts
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

interface MovieState {
  similarMovies: Movie[];
  setSimilarMovies: (movies: Movie[]) => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const useMovieStore = create<MovieState>((set) => ({
  similarMovies: [],
  setSimilarMovies: (movies) => set({ similarMovies: movies }),
  loading: false,
  setLoading: (isLoading) => {
    set({ loading: isLoading });
    if (isLoading) {
      set({ similarMovies: [] }); // Clear previous results when loading new ones
    }
  },
}));

export default useMovieStore;
