import { Inter } from "next/font/google";
import Head from "next/head";
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Container, Grid, Link as MuiLink, Button, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import Layout from "@/client/components/Layout";
import { useEffect, useState } from "react";
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const inter = Inter({ subsets: ["latin"] });

interface Product {
  quantity: number;
  id: number;
  title: string;
  description: string;
  price: number;
  fake_price?: number; // Made optional to handle cases where it's not provided
  img: string;
  category: string;
}

const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }
};

const categoryPriceStyles = (category: string) => {
  switch (category) {
    case 'Pitsa':
    case 'Gazaklar':
    case 'Ichimliklar':
    case 'Desertlar':
    case 'Salatlar':
    case 'Souslar':
      return {
        priceStyle: {
          fontWeight: 'bold',
          backgroundColor: '#ebebeb',
          color: 'black',
          borderRadius: '13px',
          fontSize: '14px',
          padding: '4px 4px',
          width: "110px",
          textAlign: "center",
          marginTop: "10px"
        }
      };
    case 'Kombo':
    default:
      return {
        priceStyle: {
          fontWeight: '700',
          color: 'black',
        }
      };
  }
};

const updateCart = (product: Product) => {
  const existingCart = localStorage.getItem('cart');
  const cart = existingCart ? JSON.parse(existingCart) : [];
  const productIndex = cart.findIndex((item: Product) => item.id === product.id);

  if (productIndex > -1) {
    cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart.reduce((total: number, item: Product) => total + (item.quantity || 1), 0);
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const itemCount = cart.reduce((total: number, item: Product) => total + (item.quantity || 1), 0);
    setCartItemCount(itemCount);
  }, []);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const updatedItemCount = updateCart(selectedProduct);
      setCartItemCount(updatedItemCount);
      toast.success(`${selectedProduct.title} savatga qo'shildi`, {
        position: 'top-center',
        autoClose: 3000,
      });
      router.push(`/savat?id=${selectedProduct.id}`);
    }
    handleCloseDialog();
  };

  if (loading) {
    return (
      <Layout>
        <Box mt={9} textAlign="center">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box mt={9} textAlign="center">
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </Layout>
    );
  }

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Unknown';
    (acc[category] = acc[category] || []).push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <Box mt={9}>
            <Box display="flex" justifyContent="flex-start" alignItems="center" marginTop={"-40px"}>
              <Box display="flex">
                {Object.keys(groupedProducts).map(category => (
                  <MuiLink
                    key={category}
                    component="button"
                    onClick={() => scrollToElement(category)}
                    style={{
                      textDecoration: 'none',
                      backgroundColor: '#f4f4f4',
                      padding: '8px 20px',
                      color: 'black',
                      borderRadius: '20px',
                      margin: '0 4px',
                      cursor: 'pointer'
                    }}
                  >
                    {category}
                  </MuiLink>
                ))}
              </Box>
              <Link href="/savat" passHref>
                <Button
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    backgroundColor: "#ff002b",
                    marginLeft: '266px',
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <Typography>Savatcha</Typography>
                  <Box
                    sx={{
                      ml: 1,
                      color: '#fff',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {cartItemCount}
                  </Box>
                </Button>
              </Link>
            </Box>

            {Object.entries(groupedProducts).map(([category, products]) => {
              const { priceStyle } = categoryPriceStyles(category);
              return (
                <Box id={category} key={category} mb={4} mt={category === 'Pitsa' ? 4 : 0}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                      fontWeight: 700,
                      color: 'black',
                      mb: 2,
                      marginTop: '20px'
                    }}
                  >
                    {category}
                  </Typography>
                  <Grid container spacing={2}>
                    {products.map((product) => (
                      <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: "13px",
                            backgroundColor: "#fff",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                            height: '100%',
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                            margin: '0 auto',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleCardClick(product)}
                        >
                          <CardMedia
                            component="img"
                            image={product.img}
                            alt={product.title}
                            sx={{
                              height: { xs: '150px', sm: '200px' },
                              objectFit: "cover",
                              borderRadius: "4px 4px 0 0",
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                                fontWeight: 700,
                                color: 'black',
                                mb: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {product.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                flexGrow: 1,
                                fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                                fontWeight: 400,
                                color: 'black',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                                mb: 1,
                                maxHeight: '3.6rem',
                              }}
                            >
                              {product.description}
                            </Typography>
                            {category === 'Kombo' && (
                              <Typography
                                variant="body2"
                                sx={{
                                  textDecoration: 'line-through',
                                  color: '#9e9e9e',
                                }}
                              >
                                {product.fake_price} so'm
                              </Typography>
                            )}
                            <Typography
                              variant="h6"
                              sx={priceStyle}
                            >
                              {product.price} so'm
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })}
          </Box>

          {/* Modal Dialog */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            sx={{
              '& .MuiDialog-paper': {
                width: '80%',
                maxWidth: '600px',
                borderRadius: '20px',
              },
            }}
          >
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {selectedProduct?.title}
                </Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleCloseDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              {selectedProduct && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image={selectedProduct.img}
                    alt={selectedProduct.title}
                    sx={{ maxHeight: 500, maxWidth: '60%', objectFit: 'cover', borderRadius: '20px' }}
                  />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {selectedProduct.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
                    {selectedProduct.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {selectedProduct.price} so'm
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleAddToCart}
                    style={{ backgroundColor: "#006f4c", borderRadius: "10px" }}
                  >
                    Savatga qo'shish
                  </Button>
                </Box>
              )}
            </DialogContent>
          </Dialog>
        </Container>
        <ToastContainer />
      </Layout>
    </>
  );
}
