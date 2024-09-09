## Movie Poster Similarity App

https://movie-poster-app.vercel.app/

Shows similar movie posters for popular movies (sourced from [TMDB](https://developer.themoviedb.org/reference/movie-popular-list) in August 2024).

Allows the user to compare the movie poster image embedding results of three different models ([CLIP](https://huggingface.co/openai/clip-vit-base-patch32), [ResNet-50](https://huggingface.co/microsoft/resnet-50), [VGG16](https://huggingface.co/timm/vgg16.tv_in1k)).

## Technologies used

* [Next.js 14](https://nextjs.org/) with TypeScript
* [Pinecone](https://www.pinecone.io/) vector database
* [Material UI](https://mui.com/) component library
* [Tailwind CSS](https://tailwindcss.com/) for styling/layout
* [Zustand](https://github.com/pmndrs/zustand) for state management

https://github.com/Eli-Jensen/movie-poster-model shows how Pinecone indices were created/populated
