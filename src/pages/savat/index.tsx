import { useEffect, useState } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, TextField, InputAdornment, IconButton, useMediaQuery, useTheme, Button } from '@mui/material';
import DrawerAppBar from '@/client/components/Layout/Header';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'; // Import useRouter for navigation

interface CartItem {
    id: number;
    title: string;
    description: string;
    price: number;
    img: string;
    quantity: number;
}

const SavatPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter(); // Initialize router

    useEffect(() => {
        const existingCart = localStorage.getItem('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        setCartItems(cart);
    }, []);

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
                .filter((item) => item.quantity > 0); // Remove items with quantity 0
            localStorage.setItem('cart', JSON.stringify(updatedItems)); // Update localStorage
            return updatedItems;
        });
    };

    const handleIncrement = (id: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id: number) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0) // Remove items with quantity 0
        );
    };

    // Calculate total cost
    const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Container>
            <DrawerAppBar window={undefined} />
            <Box
                mt={isSmallScreen ? 1 : 2}
                mb={isSmallScreen ? 2 : 3}
                sx={{ paddingX: isSmallScreen ? 1 : 2 }}
            >
                {cartItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Typography variant='h5' sx={{ fontWeight: 700, color: 'black' }}>
                            Hozircha sizning savatchangiz boʻsh 😕
                        </Typography>
                        <img
                            src="https://bellissimo.uz/images/emptystate/empty-cart-icon.svg"
                            alt="Empty Cart Icon"
                            style={{ width: '200px', height: '200px', marginTop: '20px' }}
                        />
                        <Box sx={{ marginTop: 4 }}>
                            <Button
                                sx={{
                                    backgroundColor: '#262a2c',
                                    color: 'white',
                                    borderRadius: '25px',
                                    padding: '10px 110px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        backgroundColor: "lightgray",
                                        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                onClick={() => router.push('/')}
                            >
                                Menyuni ko'rish
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                        <Box
                            sx={{ flexGrow: 1 }} // This allows the list to grow and take up remaining space
                        >
                            <List>
                                {cartItems.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        sx={{
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            marginBottom: isSmallScreen ? 1 : 2,
                                            padding: 2,
                                            display: 'flex',
                                            flexDirection: isSmallScreen ? 'column' : 'row',
                                            alignItems: 'center',
                                            bgcolor: 'background.paper',
                                            maxWidth: isSmallScreen ? '100%' : 700,
                                            width: '100%',
                                            position: 'relative', // Make the container relative to position the quantity controls absolutely
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item.img}
                                            alt={item.title}
                                            sx={{
                                                width: isSmallScreen ? 60 : 80,
                                                height: isSmallScreen ? 60 : 80,
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                mr: isSmallScreen ? 0 : 2,
                                                mb: isSmallScreen ? 1 : 0,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                textAlign: isSmallScreen ? 'center' : 'left',
                                                flexGrow: 1,
                                            }}
                                        >
                                            <ListItemText
                                                primary={item.title}
                                                secondary={`Price: ${item.price} so'm`}
                                            />
                                        </Box>
                                        {/* Absolute positioning of quantity controls */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                bgcolor: '#efefef',
                                                borderRadius: '8px',
                                                p: 1,
                                            }}
                                        >
                                            <TextField
                                                value={item.quantity}
                                                inputProps={{ min: 1, type: 'number', style: { textAlign: "center" } }}
                                                size="small"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton onClick={() => handleDecrement(item.id)} size="small">
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => handleIncrement(item.id)} size="small">
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    width: 80, // Reduced width
                                                    backgroundColor: 'transparent', // Transparent to blend with background
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '8px',
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    const newQuantity = Math.max(Number(e.target.value), 0); // Ensure quantity is non-negative
                                                    handleQuantityChange(item.id, newQuantity);
                                                }}
                                            />
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box
                            sx={{
                                width: isSmallScreen ? '100%' : '40%', // Adjust width for responsiveness
                                height: '20vh', // Set the height to 20vh
                                bgcolor: 'white', // Set background color
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add box shadow
                                borderRadius: '8px', // Rounded corners
                                padding: 2, // Padding inside the box
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',

                                ml: isSmallScreen ? 0 : 2, // Add margin-left for spacing from the list (adjust value as needed)
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                                Umumiy narx
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {totalCost} so'm
                            </Typography>
                            {/* Promo code input and button */}

                            <Button
                                sx={{
                                    backgroundColor: '#006f4c',
                                    color: 'white',
                                    borderRadius: '20px',
                                    padding: '8px 16px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        backgroundColor: '#004c36',
                                    },
                                    mt: 2, // Margin-top to separate button from the text
                                }}
                                onClick={() => router.push('/Kirish')} // Redirect to Kirish page
                            >
                                Keyingisi
                            </Button>
                        </Box>

                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default SavatPage;
