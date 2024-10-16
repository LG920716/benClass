import {
  Box,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ProductAddProps {
  newProduct: {
    desc: string;
    price: number;
  };
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  update: () => void;
  hide: () => void;
}

export default function ProductAdd({
  newProduct,
  handleClick,
  update,
  hide,
}: ProductAddProps) {
  return (
    <Box>
      <DialogTitle>新增產品</DialogTitle>
      <DialogContent>
        <TextField
          label="產品描述"
          variant="outlined"
          name="desc"
          value={newProduct.desc}
          onInput={handleClick}
        />
        <br />
        <TextField
          label="產品價格"
          variant="outlined"
          name="price"
          value={newProduct.price}
          onInput={handleClick}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <IconButton
          aria-label="close"
          onClick={hide}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Button variant="contained" color="primary" onClick={update}>
          新增
        </Button>
      </DialogActions>
    </Box>
  );
}
