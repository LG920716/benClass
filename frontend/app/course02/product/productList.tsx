'use client'
import { useState } from "react";
import { Box, Container, Divider, List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

export default function ProductList() {
    const products = [
        { desc: "iPad", price: 20000 },
        { desc: "iPhone 8", price: 20000 },
        { desc: "iPhone X", price: 30000 }
    ];
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ backgroundColor: '#fff', margin: 'auto' }}>
                <List component="nav" sx={{ padding: 0 }} subheader={<ListSubheader sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: 16,
                    fontWeight: 1000
                }}>Product List</ListSubheader>} aria-label="product list" >
                    {products.map((product, index) => (
                        <div>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}
                                key={product.desc}
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    '&.Mui-selected': {
                                        backgroundColor: lightBlue[100],
                                        color: '#000',
                                    }
                                }}
                            >
                                <ListItemText primary={product.desc} secondary={product.price} />
                            </ListItemButton>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Box>
        </Container>
    );
}
