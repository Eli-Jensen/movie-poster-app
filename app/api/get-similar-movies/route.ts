import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';

// Define the possible model types as string literals
type ModelType = 'CLIP' | 'ResNet-50' | 'VGG16';

const modelMappings: Record<ModelType, { indexName: string; namespace: string }> = {
  'CLIP': {
    indexName: 'movie-posters-v2-clip',
    namespace: 'clip-vit-large-patch14',
  },
  'ResNet-50': {
    indexName: 'movie-posters-v2-resnet-50',
    namespace: 'resnet50',
  },
  'VGG16': {
    indexName: 'movie-posters-v2-vgg16',
    namespace: 'vgg16-tv-in1k',
  },
};

// Initialize Pinecone client
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

// Create a global in-memory cache using a Map
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 600000; // Cache Time-to-Live (TTL) in milliseconds (10 minutes)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');
  const modelType = searchParams.get('model') as ModelType;

  if (!movieId || !modelType || !modelMappings[modelType]) {
    return NextResponse.json({ error: 'Movie ID and valid model type are required' }, { status: 400 });
  }

  const { indexName, namespace } = modelMappings[modelType];
  const cacheKey = `${movieId}-${modelType}`; // Unique cache key for each movieId and model

  // Check if the result is in the cache and still valid
  const cachedResult = cache.get(cacheKey);
  const now = Date.now();

  if (cachedResult && cachedResult.expiry > now) {
    // Return cached result if it exists and hasn't expired
    return NextResponse.json(cachedResult.data);
  }

  // Query Pinecone if not in cache or cache has expired
  const index = pc.index(indexName);

  try {
    const similarMovies = await getSimilarMoviesFromPinecone(index, namespace, movieId);

    // Store the result in cache with an expiry timestamp
    cache.set(cacheKey, { data: similarMovies, expiry: now + CACHE_TTL });

    return NextResponse.json(similarMovies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve similar movies' }, { status: 500 });
  }
}

async function getSimilarMoviesFromPinecone(index: any, namespace: string, movieId: string) {
  return await index.namespace(namespace).query({
    id: movieId,
    topK: 10,
    includeValues: true,
    includeMetadata: true,
  });
}
