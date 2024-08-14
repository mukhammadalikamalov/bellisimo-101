import React from 'react';
import { NextPage } from 'next';
import DrawerAppBar from '@/client/components/Layout/Header';
import { Typography, Box } from '@mui/material';
import Footer from '@/client/components/Layout/Footer';

const Certificate: NextPage = () => {
    return (
        <>
            <DrawerAppBar window={undefined} />
            <Typography
                variant='h4'
                sx={{
                    fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                    fontWeight: 700, // Adjust weight as needed
                    color: 'black',
                    textAlign: 'center',
                    mb: 2, // Margin-bottom to space out from the image
                }}
            >
                Halol Sertifikati
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // Arrange children vertically
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    height: '100vh', // Full viewport height
                    p: 2, // Padding around the content
                }}
            >

                <Box
                    component="img"
                    src="https://bellissimo.uz/_next/image?url=%2Fimages%2Fhalal-cert.jpg&w=1920&q=75"
                    alt="Halal Certificate"
                    sx={{
                        maxWidth: '100%',
                        height: '100vh', // Maintain aspect ratio
                        maxHeight: '100vh', // Max height relative to viewport height
                        objectFit: 'contain', // Contain image within bounds
                    }}
                />
            </Box>
            <Footer />
        </>
    );
};

export default Certificate;
