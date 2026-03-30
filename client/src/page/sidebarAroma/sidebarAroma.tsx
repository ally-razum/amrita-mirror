import { Button, Box} from '@mui/material';
import { Link } from "react-router-dom";


function SidebarAroma (): JSX.Element {
    return (
        <>
        <Box
          sx={{
            display: 'flex', // Используем flex для выстраивания в ряд
            alignItems: 'center', // Выравнивание элементов по вертикали
            justifyContent: 'space-around', // Распределение пространства между элементами
            gap: 2, // Пробелы между элементами
            flexWrap: 'wrap', // На случай, если экран маленький, элементы переходят на новую строку
            width: '100%',
            backgroundImage: "url(/images/stastPage.png)",
            // filter: 'brightness(50%)', // Делает изображение более бледным
          }}
        >


        <Button
            type="submit" color="success" variant="contained"
            sx={{
              fontSize: 20,
              marginTop: 2,
              marginBottom: 2,
            //   width: "100%",
              borderRadius: 20
            }}>
            <Link to="/newcard"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
            Создать карточку
        </Link>
        </Button>

        <Button
            type="submit" color="success" variant="contained"
            sx={{
              fontSize: 20,
              marginTop: 2,
              marginBottom: 2,
            //   width: "100%",
              borderRadius: 20
            }}>
            <Link to="/"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
            Список диагнозов 
            </Link>
        </Button>

        <Button
            type="submit" color="success" variant="contained"
            sx={{
              fontSize: 20,
              marginTop: 2,
              marginBottom: 2,
            //   width: "100%",
              borderRadius: 20
            }}>
            <Link to="/"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
            список масел
            </Link>
        </Button>

        <Button
            type="submit" color="warning" variant="contained"
            sx={{
              fontSize: 20,
              marginTop: 2,
              marginBottom: 2,
            //   width: "100%",
              borderRadius: 20
            }}>
            <Link to="/"
            style={{ marginLeft: 5, textDecoration: "none", color: "white"}}>
            ВЫЙТИ 
            </Link>
        </Button>

    

        </Box>
        </>
    )
}

export default SidebarAroma