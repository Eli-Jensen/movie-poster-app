import create from 'zustand';

interface Model {
  name: string;
}

interface ModelStore {
  selectedModel: Model;
  models: Model[];
  setSelectedModel: (model: Model) => void;
}

const useModelStore = create<ModelStore>((set) => ({
  models: [
    { name: 'VGG16' },
    { name: 'ResNet-50' },
    { name: 'CLIP' },
  ],
  selectedModel: { name: 'CLIP' }, // Default to CLIP
  setSelectedModel: (model) => set({ selectedModel: model }),
}));

export default useModelStore;
