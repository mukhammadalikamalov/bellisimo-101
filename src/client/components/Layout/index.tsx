import React, { ReactNode } from "react";
import { Stack, Fade, Box, Typography, Button, useMediaQuery } from "@mui/material";
import DrawerAppBar from "./Header";
import Footer from "./Footer";
import Carousel from "./Caroucel";
import { useTheme } from '@mui/material/styles';
import Link from 'next/link'; // Import Link for navigation

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

  return (
    <>
      <DrawerAppBar window={undefined} />
      <Carousel />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile
          alignItems: "center",
          marginTop: isMobile ? "16px" : "23px",
          marginLeft: isMobile ? "0" : "150px",
          gap: isMobile ? "10px" : "20px",
          padding: isMobile ? "0 16px" : "0", // Add padding on mobile
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: isMobile ? "100%" : "470px", // Full width on mobile
            height: "47px",
            borderRadius: "40px",
            bgcolor: "#f4f4f4",
            alignItems: "center",
            padding: "0 8px", // Padding inside the box
            boxSizing: "border-box", // Ensure padding is included in the width
          }}
        >
          <button
            style={{
              width: "100%",
              height: "38px",
              borderRadius: "40px",
              border: "none",
              color: "black",
              backgroundColor: "white",
              fontSize: "17px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            Yetkazib berish
          </button>
          {!isMobile && (
            <Typography
              variant="body2"
              sx={{
                color: "grey",
                marginLeft: "70px",
                marginTop: "10px",
              }}
            >
              Olib ketish
            </Typography>
          )}
        </Box>

        {/* Updated Button with Image */}
        <Button
          variant="outlined"
          sx={{
            width: isMobile ? "100%" : '50%', // Full width on mobile
            height: "44px",
            borderRadius: "10px",
            bgcolor: "white",
            borderColor: "#FFC600", // Border color
            color: "#FFC600", // Text color
            border: "2px solid", // Border style
            boxShadow: "none", // Remove default shadow
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Align text to the start and image to the end
            paddingLeft: "16px", // Add padding to the left for text alignment
            paddingRight: "16px", // Add padding to the right for balance
            "&:hover": {
              borderColor: "#FBC02D", // Darker yellow on hover
              color: "#FBC02D",
            },
          }}
        >
          Filialni Tanlang
          <img
            src="https://bellissimo.uz/images/edit-yellow-icon.svg"
            alt="Edit Icon"
            style={{ width: "24px", height: "14px", marginLeft: "8px" }} // Adjust size and spacing
          />
        </Button>
      </Box>

      <Stack display="flex" minHeight="100vh" flexDirection="column">
        <Fade in={true} timeout={1000}>
          <Stack flex={1}>{props.children}</Stack>
        </Fade>
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
