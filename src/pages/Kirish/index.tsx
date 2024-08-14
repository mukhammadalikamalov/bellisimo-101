// pages/Kirish/index.tsx
import React from 'react';
import { NextPage } from 'next';
import DrawerAppBar from '@/client/components/Layout/Header';
import { Typography, TextField, Box, Button } from '@mui/material';

const Kirish: NextPage = () => {
    return (
        <>
            <DrawerAppBar window={undefined} />
            <Box
                sx={{
                    textAlign: 'center',
                    mt: '10%', // Margin top
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                        color: 'black',
                        fontSize: '30px',
                        mb: 4, // Margin bottom to separate from input
                    }}
                >
                    Raqamingizni kiriting
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="+998 (_ _ ) _ _ _ _ _ _ _"
                    fullWidth
                    InputProps={{
                        style: {
                            textAlign: 'center',
                            fontSize: '23px', // Adjust font size
                            borderRadius: '20px',
                            backgroundColor: '#f4f4f4',
                            border: '1px solid #ccc', // Light gray border
                            padding: '10px', // Adjust padding for better height
                            boxShadow: 'none', // Remove box-shadow
                        },
                    }}
                    sx={{
                        maxWidth: '400px', // Maximum width of the input field
                        mx: 'auto', // Centering the input field horizontally
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none', // Remove the border from fieldset
                            },
                            '&:hover fieldset': {
                                border: 'none', // Remove border on hover
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none', // Remove border when focused
                            },
                        },
                    }}
                />
                <Button
                    sx={{
                        display: 'block', // Ensure the button is a block element
                        mt: 4, // Margin top for spacing from input
                        backgroundColor: '#262a2c', // Button background color
                        color: 'white', // Text color
                        borderRadius: '25px', // Rounded corners
                        padding: '10px 110px', // Padding inside the button
                        textTransform: 'none', // Prevents uppercase text
                        fontWeight: 600, // Font weight
                        fontSize: '16px', // Font size
                        marginLeft: '37%',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow
                        '&:hover': {
                            backgroundColor: "lightgray", // Button color on hover
                            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)', // Darker shadow on hover
                        },
                    }}
                >
                    Kodni qabul qilish
                </Button>
                <Typography
                    variant='body2'
                    sx={{
                        fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                        color: 'grey',
                        fontSize: '12px',
                        width: '100%',
                        mt: 3, // Margin bottom to separate from input
                    }}
                >
                    This site is protected by reCAPTCHA and
                    the Google Privacy Policy and Terms of Service apply.
                </Typography>
            </Box>
        </>
    );
};

export default Kirish;
