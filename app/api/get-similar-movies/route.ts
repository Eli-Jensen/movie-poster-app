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

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');
  const modelType = searchParams.get('model') as ModelType; // Type assertion

  if (!movieId || !modelType || !modelMappings[modelType]) {
    return NextResponse.json({ error: 'Movie ID and valid model type are required' }, { status: 400 });
  }

  const { indexName, namespace } = modelMappings[modelType];
  const index = pc.index(indexName);

  const similarMovies = await getSimilarMoviesFromPinecone(index, namespace, movieId);
  return NextResponse.json(similarMovies);
}

async function getSimilarMoviesFromPinecone(index: any, namespace: string, movieId: string) {
  return await index.namespace(namespace).query({
    id: movieId,
    topK: 10,
    includeValues: true,
    includeMetadata: true
  });
}
