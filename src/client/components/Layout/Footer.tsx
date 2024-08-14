import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "auto", md: "300px" },
                bgcolor: "#262a2c",
                marginTop: "70px",
                padding: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    maxWidth: "1230px",
                    mx: "auto",
                    px: { xs: "20px", sm: "50px", md: "100px" },
                    justifyContent: { xs: "center", md: "space-between" },
                    alignItems: "center",
                }}
            >
                <Box sx={{ marginTop: { xs: "20px", md: "35px" }, textAlign: { xs: "center", md: "left" } }}>
                    <img
                        style={{ width: "220px", height: "58px", marginTop: "19px" }}
                        src="https://bellissimo.uz/images/footer-logo.svg"
                        alt="Bellissimo Logo"
                    />
                    <Typography sx={{ marginTop: "17px", color: "white" }}>Raqamga qo'ng'iroq qiling - 1174</Typography>
                </Box>
                <Box sx={{ marginTop: { xs: "30px", md: "60px" }, color: "grey", textAlign: { xs: "center", md: "left" } }}>
                    <Typography>Biz haqimizda</Typography>
                    <Typography>Ommaviy oferta</Typography>
                    <Typography>Maxfiylik siyosati</Typography>
                    <Typography>Halol sertifikati</Typography>
                    <Typography>Restoranlar</Typography>
                </Box>
                <Box sx={{ marginTop: { xs: "30px", md: "60px" }, color: "grey", textAlign: { xs: "center", md: "left" } }}>
                    <Typography>Bizning ish o'rinlarimiz</Typography>
                </Box>
                <Box sx={{ marginTop: { xs: "30px", md: "65px" } }}>
                    <Box sx={{ display: "flex", gap: "60px", justifyContent: { xs: "center", md: "flex-start" } }}>
                        <img
                            style={{ width: "90px", height: "26px", marginTop: "10px" }}
                            src="https://bellissimo.uz/images/payme-footer.svg"
                            alt="Payme"
                        />
                        <img
                            style={{ width: "44px", height: "50px" }}
                            src="https://bellissimo.uz/images/uzcard-footer.svg"
                            alt="Uzcard"
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, marginTop: "20px" }}>
                        <img
                            style={{ width: "92px", height: "35px" }}
                            src="https://bellissimo.uz/images/click-footer.svg"
                            alt="Click"
                        />
                    </Box>
                </Box>
                <Box sx={{ marginTop: { xs: "30px", md: "60px" }, color: "white", textAlign: { xs: "center", md: "left" } }}>
                    <Typography>Bizni kuzatib boring:</Typography>
                    <Box
                        sx={{ display: "flex", gap: "31px", justifyContent: { xs: "center", md: "flex-start" }, marginTop: "20px" }}
                    >
                        <img src="https://bellissimo.uz/images/footer-facebook.svg" alt="Facebook" />
                        <img
                            style={{ width: "28px", height: "28px", marginTop: "2px" }}
                            src="https://bellissimo.uz/images/instagram.svg"
                            alt="Instagram"
                        />
                        <img src="https://bellissimo.uz/images/telegram-icon.svg" alt="Telegram" />
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography
                    sx={{ color: "white", display: "flex", justifyContent: "center", marginTop: { xs: "40px", md: "70px" } }}
                >
                    © 2016-2024 Bellissimo Pizza.
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
