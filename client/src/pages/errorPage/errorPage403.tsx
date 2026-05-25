import { Card, CardMedia, Box, Typography } from "@mui/material";

function ErrorPage403() {
  return (
    <Box
      marginLeft={10}
      marginTop={10}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Card
        sx={{
          maxWidth: 600,
          marginLeft: 0,
          position: "relative",
          borderRadius: 20,
        }}
      >
        <CardMedia
          component="img"
          height="600"
          image="/images/Error-403.png"
          alt="logo"
        />
      </Card>
      <Typography variant="h6" marginLeft={10} sx={{ color: "#4a148c" }}>
        <h1>Доступа нет </h1>
        <picture>
          <source
            srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp"
            type="image/webp"
          />
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif"
            alt="🥳"
            width="100"
            height="100"
          />
        </picture>
        <picture>
          <source
            srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp"
            type="image/webp"
          />
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif"
            alt="🧐"
            width="150"
            height="150"
          />
        </picture>
        <p>Тут секреты не для всех =P </p>
      </Typography>
    </Box>
  );
}

export default ErrorPage403;
