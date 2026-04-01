
import { useState } from 'react';
import {  Toolbar, Menu,  MenuItem, Button, ListItemIcon ,Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';


import GroupIcon from '@mui/icons-material/Group'; // Иконка для всех клиентов
import AddBoxIcon from '@mui/icons-material/AddBox'; // Иконка для создания карточки
import PlaylistAdd from '@mui/icons-material/PlaylistAdd'; // Иконка для диагнозов
import SpaIcon from '@mui/icons-material/Spa'; // Иконка для масел
import LibraryBooksIcon  from '@mui/icons-material/LibraryBooks';




import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import DoneOutline from '@mui/icons-material/DoneOutline'; // Иконка для главной страницы

function HeaderModerator  () {
  
  // console.log(useUser,'userName из хедера');
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
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
      {/* AROMA Cabinet */}
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

      {/* Настройки */}
      <Button
        onClick={handleMenuOpen}
        variant="contained"
        color="secondary"
        startIcon={<Settings />}
        sx={{ borderRadius: 20, fontSize: 15, marginRight: 2 }}
      >
        Настройки
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => {
            handleNavigation('/diagnoslist');
            handleMenuClose();
        }}>
          <ListItemIcon>
            <PlaylistAdd />
          </ListItemIcon>
          Диагнозы
        </MenuItem>
        <MenuItem onClick={() => {
            handleNavigation('/oillist');
            handleMenuClose();
        }}>
          <ListItemIcon>
            <SpaIcon />
          </ListItemIcon>
          Масла
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
        <MenuItem onClick={() => {
            handleNavigation('/clientlist');
            handleMenuClose2();
        }}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          Все
        </MenuItem>
        <MenuItem onClick={() => {
            handleNavigation('/newcard');
            handleMenuClose2();
        }}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <b>Создать</b>
        </MenuItem>
        <MenuItem onClick={() => {
            handleNavigation('/unready');
            handleMenuClose2();
        }}>
          <ListItemIcon>
            <ErrorOutlineTwoToneIcon />
          </ListItemIcon>
          Незаполненные
        </MenuItem>
        <MenuItem onClick={() => {
            handleNavigation('/done');
            handleMenuClose2();
        }}>
          <ListItemIcon>
            <DoneOutline />
          </ListItemIcon>
          Готовые
        </MenuItem>
      </Menu>
    </Box>

    {/* ВЫЙТИ */}
    <Button
      onClick={() => {
       
        handleNavigation('/');
      }}
      type="submit"
      color="warning"
      variant="contained"
      sx={{ fontSize: 15, marginTop: 2, marginBottom: 2, borderRadius: 20 }}
    >
      ВЫЙТИ
    </Button>
  </Toolbar>
    
  );
};

export default HeaderModerator;
