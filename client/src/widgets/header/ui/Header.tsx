import { useState } from 'react';
import { Box, Toolbar, Menu,  MenuItem, Button, ListItemIcon } from '@mui/material';

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



function Header  ()  {
 
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
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            fontSize: 15,
            marginTop: 2,
            marginRight: 2,
            marginBottom: 2,
            borderRadius: 20,
            backgroundColor: "#f06292",
          }}
          onClick={() => handleNavigation("/dashboard")}
        >
          AROMA cabinet
        </Button>

        <Button
          onClick={handleMenuOpen}
          variant="contained"
          startIcon={<AdminPanelSettingsIcon />}
          sx={{
            borderRadius: 20,
            fontSize: 15,
            marginRight: 2,
            backgroundColor: "#f06292",
          }}
        >
          admin panel
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleNavigation("/diagnoslist");
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
              handleNavigation("/oillist");
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
              handleNavigation("/dashboard/users");
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
              handleNavigation("/dashboard/users/new");
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
          startIcon={<LibraryBooksIcon />}
          sx={{ borderRadius: 20, fontSize: 15, backgroundColor: "#f06292" }}
        >
          Карточки
        </Button>
        <Menu anchorEl={anchorEl2} open={open2} onClose={handleMenuClose2}>
          <MenuItem
            onClick={() => {
              handleNavigation("/dashboard/cards");
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
              handleNavigation("/dashboard/cards/new");
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
              handleNavigation("/unready");
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
              handleNavigation("/done");
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
          handleNavigation("/");
        }}
        type="submit"
        variant="contained"
        sx={{
          fontSize: 15,
          marginTop: 2,
          marginBottom: 2,
          borderRadius: 20,
          backgroundColor: "#880e4f",
        }}
      >
        выход
      </Button>
    </Toolbar>
  );
};

export default Header;
