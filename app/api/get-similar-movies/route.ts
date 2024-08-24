import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({apiKey: process.env.PINECONE_API_KEY!})
const index = pc.index("movie-posters-v2-clip")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const similarMovies = await getSimilarMoviesFromPinecone(movieId);
  return NextResponse.json(similarMovies);
}

async function getSimilarMoviesFromPinecone(movieId: string) {
  return await index.namespace('clip-vit-large-patch14').query({
    id: movieId,
    topK: 10,
    includeValues: false,
    includeMetadata: true
    });
}
