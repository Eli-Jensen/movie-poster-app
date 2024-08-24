export async function fetchSimilarMovies(movieId: string) {
    const response = await fetch(`/api/get-similar-movies?movieId=${movieId}`);
    const data = await response.json();

    // Extract matches array
    if (!data.matches || !Array.isArray(data.matches)) {
        console.error('Expected matches array but got:', data);
        return [];
    }

    // Map the `matches` to an array of Movie objects
    const movies = data.matches.map((match: any) => ({
        id: match.metadata.id,
        title: match.metadata.original_title,
        overview: match.metadata.overview,
        poster_path: match.metadata.poster_path,
        release_date: match.metadata.release_date,
        vote_average: match.metadata.vote_average,
    }));

    return movies;
}