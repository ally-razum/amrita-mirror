import React from 'react';
import { Box, Card, CardMedia, Button, ListItemIcon} from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from '../../userContext/userContext';
import ErrorPage from '../errorPage/errorPage401';

import GroupIcon from '@mui/icons-material/Group'; // Иконка для всех клиентов
import AddBoxIcon from '@mui/icons-material/AddBox'; // Иконка для создания карточки
import PlaylistAdd from '@mui/icons-material/PlaylistAdd'; // Иконка для диагнозов
import SpaIcon from '@mui/icons-material/Spa'; // Иконка для масел

const MainPageAroma: React.FC = () => {
  const { user} = useUser();
    return (      
      <Box marginLeft={10} sx={{ display: 'flex', alignItems: 'center' }}> 
        {(user) ? (
        <>
        <Card sx={{ maxWidth: 600 , marginLeft: 0, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="600"
          image="/images/stastPage.png"
          alt="logo"
          />                        
      </Card>
      
      <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDirection={'column'}
      height="75vh"
      marginRight={5}
      marginLeft={10}
    >
        <Button
            type="submit"  variant="contained"
            sx={{
              fontSize: 20, 
              marginTop: 2, 
              marginBottom: 2, 
              borderRadius: 20,  
              backgroundColor: '#ba68c8', 
              width:350, display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
              }}>
            <Link to="/clientlist"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
              <ListItemIcon sx={{ position: 'absolute', left: 16 }}>
                  <GroupIcon/>                 
              </ListItemIcon>
            Все заявки
        </Link>
        </Button>
        <Button
            type="submit"  variant="contained"
            sx={{
              fontSize: 20, 
              marginTop: 2, 
              marginBottom: 2, 
              borderRadius: 20,  
              backgroundColor: '#ba68c8', 
              width:350, display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
              }}>
              <Link to="/newcard"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
              <ListItemIcon  sx={{ position: 'absolute', left: 16 }}>
                  <AddBoxIcon />
              </ListItemIcon>
            Создать карточку
        </Link>
        </Button>

        <Button
            type="submit"  variant="contained"
            sx={{
              fontSize: 20, 
              marginTop: 2, 
              marginBottom: 2, 
              borderRadius: 20,  
              backgroundColor: '#ba68c8', 
              width:350, display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
              }}>
                <Link to="/diagnoslist"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
              <ListItemIcon  sx={{ position: 'absolute', left: 16 }}>
                  <PlaylistAdd />
              </ListItemIcon>
             Диагнозы 
            </Link>
        </Button>

        <Button
            type="submit"  variant="contained"
            sx={{
              fontSize: 20, 
              marginTop: 2, 
              marginBottom: 2, 
              borderRadius: 20,  
              backgroundColor: '#ba68c8', 
              width:350, display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
              }}>
                <Link to="/oillist"
            style={{ marginLeft: 5, textDecoration: "none", color: "white" }}>
              <ListItemIcon  sx={{ position: 'absolute', left: 16 }}>
                  <SpaIcon />
              </ListItemIcon>
             Масла
            </Link>
        </Button>

        
        </Box>
        </>
      
        ) : (
        
        <ErrorPage/>
        
        ) }

      
      </Box>
        
      

    )
}

export default MainPageAroma