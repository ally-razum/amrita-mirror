import { Box, Typography } from "@mui/material";

function LoadingPage() {
  return (
    <Box
      marginLeft={10}
      marginTop={10}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Typography variant="h6" marginLeft={10} sx={{ color: "#4a148c" }}>
        <p>Идет загрузка страницы. Пожалуйста, подождите...</p>
      </Typography>
    </Box>
  );
}

export default LoadingPage;
