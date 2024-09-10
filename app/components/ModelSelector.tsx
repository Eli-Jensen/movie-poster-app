import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import useModelStore from '../store/useModelStore';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw', // Updated to 80% of viewport width
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useModelStore();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Stack direction="row" spacing={2} alignItems="center">
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
        <IconButton 
          onClick={handleOpen} 
          aria-label="help"
          sx={{ marginBottom: '-5px' }} // Slightly raise the question mark
        >
          <HelpOutlineIcon />
        </IconButton>
      </Stack>

      {/* Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={style}>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Select a movie using the dropdown (you can type any substring of the movie title or its release date) and select one of the models (CLIP, ResNet-50, VGG-16). 
            <br />
            <br />
            <strong>CLIP</strong> (Contrastive Language–Image Pretraining) uses transformers and groups images based not only on visual appearance (colors, shapes, etc.), but also on thematic content. Groupings may have similar genres or objects while not having strong visual similarities.

            <br />
            <br />
            <strong>ResNet-50</strong> is a deep convolutional neural network (CNN) with an ability to recognize and group images based on learned low-level to mid-level features. ResNet-50 focuses on the structural elements of an image — things like the overall layout, shapes, and textures.

            <br />
            <br />
            <strong>VGG-16</strong> is a simple deep CNN. VGG-16 groups images that are visually similar in terms of textures, color palettes, patterns, and basic object forms, but the model may miss the more abstract or thematic groupings that models like CLIP pick up on.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
