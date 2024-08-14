import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

// Define the image URLs
const logoUrl = 'https://bellissimo.uz/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75';
const locationIconUrl = 'https://bellissimo.uz/images/location.svg';
const arrowIconUrl = 'https://bellissimo.uz/images/arrowGreen.svg';
const phoneIconUrl = 'https://bellissimo.uz/images/phone.svg';
const uzFlagUrl = 'https://bellissimo.uz/images/uzFlag.svg';
const halalIconUrl = 'https://bellissimo.uz/_next/image?url=%2Fimages%2Fhalal.png&w=64&q=75';

// Styled components
const LogoImage = styled('img')(({ theme }) => ({
  height: 50,
  width: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: 40,
  },
}));

const LocationBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#d0f5e5',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  marginLeft: '20px',
  width: 50,
  height: 50,
  [theme.breakpoints.down('sm')]: {
    width: 50,
    height: 50,
    padding: 8,
  },
}));

const ContactBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#d0f5e5',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  marginLeft: '20px',
  width: 90,
  height: 46,
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 50,
    padding: 8,
  },
}));

const LocationImage = styled('img')({
  height: '100%',
  width: 'auto',
});

const PhoneImage = styled('img')({
  height: '100%',
  width: 'auto',
  marginRight: 8,
});

const ArrowImage = styled('img')({
  height: 10,
  width: 'auto',
  cursor: 'pointer',
  marginLeft: 2,
});

const HalalImage = styled('img')({
  height: 54,
  width: 'auto',
  marginLeft: 8,
  cursor: 'pointer',
});

const KirishButton = styled('button')({
  backgroundColor: '#006f4c',
  color: '#ffffff',
  border: 'none',
  borderRadius: '20px',
  padding: '12px 28px',
  fontSize: '14px',
  fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important',
  cursor: 'pointer',
  marginLeft: '16px',
  '&:hover': {
    backgroundColor: '#004d40',
  },
});

const ContactLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#d0f5e5',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  marginLeft: '20px',
  width: 200, // Fixed width
  height: 50, // Fixed height to match LocationBox
  textAlign: 'center', // Center text horizontally
  [theme.breakpoints.down('sm')]: {
    width: 160, // Further reduced width on smaller screens
    padding: '8px 12px',
  },
}));

const FlagBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
  },
}));

const drawerWidth = 240;

// List of cities
const cities = [
  'Samarqand', 'Yangiyul', 'Qo‘qon', 'Buxoro', 'Chirchiq', 'Namangan', 'Fargona',
  'Olmaliq', 'Nurafshon', 'Angren'
];

export default function DrawerAppBar(props: { window: any; }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState('Toshkent');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCityInModal, setSelectedCityInModal] = React.useState('');
  const router = useRouter(); // Initialize the router

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCityClick = (city: React.SetStateAction<string>) => {
    setSelectedCity(city);
    setSelectedCityInModal(city);
    handleCloseModal();
  };

  const handleLogoClick = () => {
    router.push('/'); // Navigate to the main page
  };

  const handleHalalClick = () => {
    router.push('/certificate'); // Navigate to Certificate page
  };

  const handleKirishClick = () => {
    router.push('/Kirish'); // Navigate to Kirish page
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }}>
        {/* Drawer Title */}
      </Typography>
      <Divider />
      {/* Remove navigation items from the drawer */}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', overflowX: 'hidden' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: '#ffffff', boxShadow: 'none', position: 'sticky', top: 0, zIndex: 1200, width: '100%', marginTop: '16px' }}> {/* Added marginTop */}
        <Toolbar
          sx={{
            maxWidth: 'lg',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '70px',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
          >
            <LogoImage src={logoUrl} alt="Logo" onClick={handleLogoClick} /> {/* Added onClick handler */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationBox>
                <LocationImage src={locationIconUrl} alt="Location" />
              </LocationBox>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                <Typography style={{ marginTop: '-14px', color: 'black', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }} variant="body2">Shahar:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-50px', marginTop: '20px' }}>
                  <Typography variant='h6' sx={{ color: '#006f4c', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }}>{selectedCity}</Typography>
                  <ArrowImage
                    src={arrowIconUrl}
                    alt="Arrow"
                    onClick={handleOpenModal}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ContactBox>
                <PhoneImage src={phoneIconUrl} alt="Phone" />
                <Typography variant="h6" sx={{ color: '#006f4c', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }}>1174</Typography>
              </ContactBox>
              <ContactLabel>
                <Typography variant="body2" sx={{ fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important', color: 'black' }}>
                  Yagona Aloqa
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important', color: 'black' }}>
                  Markazi
                </Typography>
              </ContactLabel>
              <InfoBox style={{ marginLeft: '50px' }}>
                <Typography variant="h6" sx={{ marginLeft: '-150px', color: '#006f4c', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important', marginBottom: '-33px' }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "11px", marginLeft: '30px', color: 'black', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important', marginTop: '5px' }}>
                  Bepul yetkazish endi 24/7
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '11px', marginLeft: '-60px', color: 'black', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }}>
                  mavjud
                </Typography>
              </InfoBox>
              <FlagBox style={{ marginLeft: '50px' }}>
                <img src={uzFlagUrl} alt="UZ Flag" style={{ height: 24, width: 'auto', marginRight: 8 }} />
                <Typography variant="body2" sx={{ fontSize: '13px', color: '#006f4c', fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }}>
                  Uz
                </Typography>
                <ArrowImage
                  src={arrowIconUrl}
                  alt="Arrow"
                />
                <HalalImage
                  src={halalIconUrl}
                  alt="Halal"
                  onClick={handleHalalClick} // Add click handler for navigation
                />
                <KirishButton onClick={handleKirishClick} style={{ marginLeft: '30px' }}>Kirish</KirishButton>
              </FlagBox>
            </Box>
          </Box>
          {/* Removed nav items from the AppBar */}
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        <Toolbar />
        <Typography sx={{ fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif!important' }}>
          {/* Content goes here */}
        </Typography>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: 450,
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 5,
            boxShadow: 24,
            border: 'none',
            overflow: 'auto',
            textAlign: 'left',
          }}
        >
          <Box>
            {cities.map((city) => (
              <Box
                key={city}
                sx={{ display: 'inline-block', width: '100%' }}
              >
                <Typography
                  onClick={() => handleCityClick(city)}
                  sx={{
                    padding: '8px 0',
                    cursor: 'pointer',
                    borderBottom: selectedCityInModal === city ? '2px solid #006f4c' : 'none',
                    '&:hover': {
                      borderBottom: '2px solid black',
                    },
                    display: 'inline-block',
                  }}
                >
                  {city}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
