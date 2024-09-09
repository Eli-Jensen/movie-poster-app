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
        <IconButton onClick={handleOpen} aria-label="help">
          <HelpOutlineIcon />
        </IconButton>
      </Stack>

      {/* Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Model Comparison
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <strong>CLIP</strong> (Contrastive Language–Image Pretraining). It will group movie posters based not only on visual appearance (colors, shapes, etc.), but also on thematic content. Groupings may include posters which do not have obvious visual similarities, but do have similar genres or storylines.

            <br />
            <br />
            <strong>ResNet-50</strong> is a deep convolutional neural network (CNN) with an ability to recognize and group images based on learned low-level to mid-level features. ResNet-50 focuses on the structural elements of an image — things like the overall layout, shapes, and textures.

            <br />
            <br />
            <strong>VGG-16</strong> is a simple deep CNN. VGG-16 groups images that are visually similar in terms of textures, color palettes, patterns, and basic object forms (like human figures), but the model may miss the more abstract or thematic groupings that models like CLIP pick up on.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
