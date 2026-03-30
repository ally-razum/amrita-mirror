import { Button, Card, CardMedia, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../header/Header";






function StartPage(){
  


  return (
    <>
      <Header />

    

      <Box marginLeft={10} sx={{ display: "flex", alignItems: "center" }}>
        <Card
          sx={{
            maxWidth: 500,
            marginTop: 10,
            position: "relative",
            borderRadius: 20,
          }}
        >
          <CardMedia
            component="img"
            height="500"
            image="/images/stastPage.png"
            alt="logo"
          />
        </Card>

        <Box
          marginTop={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" textAlign="center" color="#4a148c">
            <p>Добро пожаловать в демо!</p>
          </Typography>
          <Typography variant="h6" color="green" textAlign="center">
            Роль: {roleName}
          </Typography>
          <Typography variant="h6" textAlign="center">
            Переходите на вкладку
          </Typography>
          <Button
            sx={{
              fontSize: 16,
              width: "150px",
              borderRadius: 10,
              backgroundColor: "#4a148c",
            }}
            variant="contained"
          >
            <Link
              to="/clientlist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Все заявки
            </Link>
          </Button>
          <Typography
            variant="h5"
            color="#f50057"
            textAlign="center"
            margin={5}
          >
            <b>Или нажмите кнопку ВЫЙТИ в правом верхнем углу экрана</b>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default StartPage;
