export async function fetchSimilarMovies(movieId: string) {
  const response = await fetch(`/api/get-similar-movies?movieId=${movieId}`);
  const data = await response.json();
  return data;
}