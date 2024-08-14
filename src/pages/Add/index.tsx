import { Button, Card, CardContent, CardMedia, Container, Grid, Paper, TextField, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  category: string;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  img: string;
  category: string;
}

const categories = [
  { value: "kombo", label: "Kombo" },
  { value: "pitsa", label: "Pitsa" },
  { value: "gazaklar", label: "Gazaklar" },
  { value: "ichimliklar", label: "Ichimliklar" },
  { value: "salatlar", label: "Salatlar" },
  { value: "desertlar", label: "Desertlar" },
  { value: "souslar", label: "Souslar" },
];

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      img: "",
      category: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/products", {
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct: SubmitHandler<FormData> = async (data) => {
    if (!data.title || !data.description || !data.price || !data.img || !data.category) {
      setError("All fields are required");
      return;
    }

    const newProduct = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      img: data.img,
      category: data.category,
    };

    try {
      const res = await fetch("http://localhost:8000/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      // Fetch updated product list
      const fetchRes = await fetch("http://localhost:8000/products", {
        cache: "no-cache",
      });

      if (!fetchRes.ok) {
        throw new Error("Failed to fetch updated products");
      }

      const updatedProducts = await fetchRes.json();
      setProducts(updatedProducts);
      reset();
      setSuccess("Product added successfully");
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== id));
      setSuccess("Product deleted successfully");
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Loading Products...
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: "#000" }}>
        Product Belissimo
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit(addProduct)}>
          <TextField
            label="Product Title"
            fullWidth
            margin="normal"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            {...register("price", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ""}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            {...register("img", { required: "Image URL is required" })}
            error={!!errors.img}
            helperText={errors.img ? errors.img.message : ""}
          />
          <Select
            label="Category"
            fullWidth
            {...register("category", { required: "Category is required" })}
            error={!!errors.category}
            displayEmpty
            renderValue={(selected) => (selected ? selected : "Select a category")}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#4CAF50", color: "white" }}
          >
            Add
          </Button>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" align="center" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
        </form>
      </Paper>
      <Grid container spacing={4} sx={{ width: "100%", maxWidth: "1500px", margin: "0 auto", marginBottom: "30%" }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                textAlign: "left",
                height: "auto",
                width: "100%",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={product.img}
                alt={product.title}
                sx={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "4px", marginBottom: "10px" }}
              />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {product.title}
                </Typography>
                <Typography sx={{ fontSize: "15px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {truncateText(product.description, 100)}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: "1.2em", fontWeight: "bold", paddingTop: "6%" }}>
                  {product.price} so'm
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;
