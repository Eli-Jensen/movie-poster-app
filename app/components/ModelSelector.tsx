import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import useModelStore from '../store/useModelStore';

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useModelStore();

  // Sort models alphabetically
  const sortedModels = [...models].sort((a, b) => a.name.localeCompare(b.name));

  const handleChipClick = (modelName: string) => {
    const model = sortedModels.find((m) => m.name === modelName);
    if (model) {
      setSelectedModel(model);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="row" spacing={2}>
        {sortedModels.map((model) => (
          <Chip
            key={model.name}
            label={model.name}
            clickable
            color={model.name === selectedModel.name ? 'primary' : 'default'}
            onClick={() => handleChipClick(model.name)}
            variant={model.name === selectedModel.name ? 'filled' : 'outlined'}
          />
        ))}
      </Stack>
    </Box>
  );
}