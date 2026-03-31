import { Box, Typography } from "@mui/material";

function Footer (){
  return (
    <Box
      component="footer"
      sx={{
        width: "98,5%",
        backgroundColor: "#ad1457",
        color: "white",
        py: 1,
        px: 2,
        mt: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap", // Адаптация для маленьких экранов
          gap: 2,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Логотип или краткая информация */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Amrita mirror DEMO
          </Typography>
          <Typography variant="body2">
            © 2026 Ally A. All rights reserved. <br />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
