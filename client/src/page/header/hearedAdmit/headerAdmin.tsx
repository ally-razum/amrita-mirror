/* eslint-disable no-constant-condition */
import client from '../../../api/client.ts';
import { useState } from 'react';
import { Box, Toolbar, Menu,  MenuItem, Button, ListItemIcon } from '@mui/material';
import { useUser } from '../../../userContext/userContext';
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LibraryBooksIcon  from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group'; // Иконка для всех клиентов
import AddBoxIcon from '@mui/icons-material/AddBox'; // Иконка для создания карточки
import PlaylistAdd from '@mui/icons-material/PlaylistAdd'; // Иконка для диагнозов
import SpaIcon from '@mui/icons-material/Spa'; // Иконка для масел
import SecurityIcon from '@mui/icons-material/Security'; // Иконка для управления правами
import GroupAdd from '@mui/icons-material/GroupAdd'; // Иконка для управления правами
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import DoneOutline from '@mui/icons-material/DoneOutline'; // Иконка для главной страницы



const HeaderAdmin = () => {
  const { setUser} = useUser(); // Получаем функцию для очистки пользователя из контекста и самого юзера
  // console.log(useUser,'userName из хедера');
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      // Отправляем запрос на сервер для выхода из аккаунта
      const response = await client.get('/logout', { withCredentials: true });
      
      if (response.status === 200) {
        // console.log('Пользователь успешно вышел из аккаунта');
        setUser(null); // Очищаем пользователя из контекста
        navigate('/'); // Перенаправляем на стартовую страницу
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error);
    }
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };


  
  return (  
     
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* AROMA cabinet */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            fontSize: 15,
            marginTop: 2,
            marginRight: 2,
            marginBottom: 2,
            borderRadius: 20,
          }}
          onClick={() => handleNavigation('/cabinet')}
        >
          AROMA cabinet
        </Button>

        {/* admin panel */}
        <Button
          onClick={handleMenuOpen}
          variant="contained"
          color="secondary"
          startIcon={<AdminPanelSettingsIcon />}
          sx={{ borderRadius: 20, fontSize: 15, marginRight: 2 }}
        >
          admin panel
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleNavigation('/diagnoslist');
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <PlaylistAdd />
            </ListItemIcon>
            Диагнозы
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNavigation('/oillist');
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <SpaIcon />
            </ListItemIcon>
            Масла
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNavigation('/users');
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            Все пользователи
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNavigation('/newuser');
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <GroupAdd />
            </ListItemIcon>
            Добавить пользователя
          </MenuItem>
        </Menu>

        {/* Карточки */}
        <Button
          onClick={handleMenuOpen2}
          variant="contained"
          color="secondary"
          startIcon={<LibraryBooksIcon />}
          sx={{ borderRadius: 20, fontSize: 15 }}
        >
          Карточки
        </Button>
        <Menu anchorEl={anchorEl2} open={open2} onClose={handleMenuClose2}>
          <MenuItem
            onClick={() => {
              handleNavigation('/clientlist');
              handleMenuClose2();
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            Все
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNavigation('/newcard');
              handleMenuClose2();
            }}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <b>Создать</b>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNavigation('/unready');
              handleMenuClose2();
            }}
          >
            <ListItemIcon>
              <ErrorOutlineTwoToneIcon />
            </ListItemIcon>
            Незаполненные
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleNavigation('/done');
              handleMenuClose2();
            }}
          >
            <ListItemIcon>
              <DoneOutline />
            </ListItemIcon>
            Готовые
          </MenuItem>
        </Menu>
      </Box>

      {/* выход */}
      <Button
        onClick={() => {
          handleLogout();
          handleNavigation('/');
        }}
        type="submit"
        color="warning"
        variant="contained"
        sx={{ fontSize: 15, marginTop: 2, marginBottom: 2, borderRadius: 20 }}
      >
        выход
      </Button>

    
    </Toolbar>
     );
};

export default HeaderAdmin;
