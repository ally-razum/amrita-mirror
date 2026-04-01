import {  Toolbar, Button,  ListItemIcon} from '@mui/material';

// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home'; // Иконка для главной страницы
import DoneOutline from '@mui/icons-material/DoneOutline'; // Иконка для главной страницы
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';



function HeaderUser () {
 
  const navigate = useNavigate();
  

  //  const handleLogout = async () => {
  //   try {
  //     // Отправляем запрос на сервер для выхода из аккаунта
  //     const response = await client.get('/logout', { withCredentials: true });
      
  //     if (response.status === 200) {
  //       // console.log('Пользователь успешно вышел из аккаунта');
  //       setUser(null); // Очищаем пользователя из контекста
  //       navigate('/'); // Перенаправляем на стартовую страницу
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при выходе из аккаунта:', error);
  //   }
  // };

 

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (  
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h3>AROMA cabinet</h3>
  
  <Button
    variant="contained"
    onClick={() => handleNavigation('/all_list_og')}
    sx={{
      borderRadius: 20,
      fontSize: 25,
      backgroundColor: '#9c27b0',
      '&:hover': {
        backgroundColor: '#ab47bc',
      },
    }}
  >
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    Все заявки
  </Button>

  <Button
    variant="contained"
    onClick={() => handleNavigation('/unready')}
    sx={{
      borderRadius: 20,
      fontSize: 25,
      backgroundColor: '#ef5350',
      '&:hover': {
        backgroundColor: '#e57373',
      },
    }}
  >
    <ListItemIcon>
      <ErrorOutlineTwoToneIcon />
    </ListItemIcon>
    Незаполненные
  </Button>

  <Button
    variant="contained"
    onClick={() => handleNavigation('/done')}
    sx={{
      borderRadius: 20,
      fontSize: 25,
      backgroundColor:  "#4caf50",
      '&:hover': {
        backgroundColor:  "#66bb6a",
      },
    }}
  >
    <ListItemIcon>
      <DoneOutline />
    </ListItemIcon>
    Подобранные
  </Button>

  <Button
    
    type="submit"
    color="warning"
    variant="contained"
    sx={{
      fontSize: 15,
      marginTop: 2,
      marginBottom: 2,
      borderRadius: 20,
    }}
  >
    ВЫЙТИ
  </Button>
</Toolbar>
    );
};

export default HeaderUser;
