"use client";
import { useState, MouseEvent, ChangeEvent } from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Dialog,
  Fab,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { lightBlue } from "@mui/material/colors";
import ProductAdd from "../../components/productAddDialog";

interface Product {
  desc: string;
  price: number;
}

export default function ProductList() {
  const [newProduct, setNewProduct] = useState<Product>({ desc: "", price: 0 });
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([
    { desc: "iPad", price: 20000 },
    { desc: "iPhone 8", price: 20000 },
    { desc: "iPhone X", price: 30000 },
  ]);

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const update = () => {
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({ desc: "", price: 0 }); // 重置輸入框
    setVisible(false);
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <Container maxWidth="sm">
      {!visible ? (
        <Box sx={{ backgroundColor: "#fff", margin: "auto" }}>
          <Fab color="primary" aria-label="Add" onClick={show}>
            <AddIcon />
          </Fab>
          <List
            component="nav"
            sx={{ padding: 0 }}
            subheader={
              <ListSubheader
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  fontSize: 16,
                  fontWeight: 1000,
                }}
              >
                Product List
              </ListSubheader>
            }
            aria-label="product list"
          >
            {products.map((product, index) => (
              <div key={index}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{
                    backgroundColor: "#fff",
                    color: "#000",
                    "&.Mui-selected": {
                      backgroundColor: lightBlue[100],
                      color: "#000",
                    },
                  }}
                >
                  <ListItemText
                    primary={product.desc}
                    secondary={product.price}
                  />
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteProduct(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      ) : (
        <Dialog open={visible} onClose={hide} aria-labelledby="新增產品">
          <ProductAdd
            newProduct={newProduct}
            handleClick={handleClick}
            update={update}
            hide={hide}
          />
        </Dialog>
      )}
    </Container>
  );
}
