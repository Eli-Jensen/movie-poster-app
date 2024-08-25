import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import useModelStore from '../store/useModelStore';

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useModelStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const model = models.find((m) => m.name === selectedName);
    if (model) {
      setSelectedModel(model);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="model-select">
          Model Type
        </InputLabel>
        <NativeSelect
          value={selectedModel.name} // Set the selected value from Zustand
          onChange={handleChange} // Update Zustand when a selection is made
          inputProps={{
            name: 'model',
            id: 'model-select',
          }}
        >
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
