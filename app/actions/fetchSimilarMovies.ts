export async function fetchSimilarMovies(movieId: string, model: string) {
    // Construct the URL with the correct query parameters
    const response = await fetch(`/api/get-similar-movies?movieId=${movieId}&model=${model}`);
    const data = await response.json();

    // Check if the matches array is present and valid
    if (!data.matches || !Array.isArray(data.matches)) {
        console.error('Expected matches array but got:', data);
        return [];
    }

    // Map the `matches` to an array of Movie objects
    const movies = data.matches.map((match: any) => ({
        id: match.metadata.id,
        title: match.metadata.title,
        overview: match.metadata.overview,
        poster_path: match.metadata.poster_path,
        release_date: match.metadata.release_date,
        vote_average: match.metadata.vote_average,
        score: match.score,
    }));

    return movies;
}
