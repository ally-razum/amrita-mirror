import { Card, CardMedia, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ErrorPage404() {
  return (
    <Box
      marginLeft={10}
      marginTop={10}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Card
        sx={{
          marginLeft: 0,
          position: "relative",
          borderRadius: 20,
        }}
      >
        <CardMedia
          component="img"
          height="600"
          image="/images/Error-404.png"
          alt="logo"
        />
      </Card>

      <Typography>
        <h2>Ого! Даже мы не знаем, как вы сюда попали !</h2>
        <img
          src="../../../public/images/404_cat.png"
          alt="🧐"
          width="150"
          height="150"
        />
        <picture>
          <source
            srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp"
            type="image/webp"
          />
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif"
            alt="🧐"
            width="50"
            height="50"
          />
        </picture>
        <br />

        <Link to="/"> Вернуться на главную</Link>
      </Typography>
    </Box>
  );
}

export default ErrorPage404;
