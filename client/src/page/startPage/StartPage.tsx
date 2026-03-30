import { Button, Card, CardMedia, Box, Typography} from '@mui/material';
import SigninBox from "../auth/signinBox";
import { Link } from "react-router-dom";
import { useUser } from '../../userContext/userContext';
import Header from '../header/Header';

function StartPage(): JSX.Element {
  const { user, } = useUser();
  let role = 'someRole'
  if(user?.userRole === 'admin') {
    role = 'ADMIN'
  } else if (user?.userRole === 'moderator') {
    role = 'администратор кабинета'
  } else {
    role = 'Торсунов Олег Геннадьевич'
  }

  if(!user) {
    return (
         <Box marginLeft={10} sx={{ display: 'flex', alignItems: 'center' }}> 
      <Card sx={{ maxWidth: 600 , marginLeft: 0, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="600"          
          image="/images/stastPage.png"
          alt="logo"
          />                        
      </Card>
      <SigninBox/>
      </Box>
    )
  } else {
    return (    
      <><Header/>

      <Box marginLeft={10} sx={{ display: 'flex', alignItems: 'center' }}>       
      <Card sx={{ maxWidth: 500 ,marginTop:10, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="500"          
          image="/images/stastPage.png"
          alt="logo"
          />                        
      </Card>  
      <Box marginTop={10} sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap:2 }}>
        <Typography variant="h4"  textAlign="center" color="#4a148c">      
        <p>Вы уже авторизованы! </p></Typography>
        <Typography variant="h6" color="green" textAlign="center">
          Роль :{role}
        </Typography> 
        <Typography variant="h6" textAlign="center">
          Переходите на вкладку
        </Typography>         
        <Button 
            sx={{ fontSize: 16,  width: "150px", borderRadius: 10, backgroundColor: '#4a148c' }}
            variant="contained">
            <Link to="/clientlist" style={{ textDecoration: "none", color: "inherit" }}>
                  Все заявки
            </Link>
            
          </Button>
          <Typography variant="h5" color="#f50057" textAlign="center" margin={5} >
          <b>Или нажмите кнопку ВЫЙТИ в правом верхнем углу экрана</b>
        </Typography> 
       
        
      </Box> 
      
      </Box>
      </>
    
  )
  }
  
}

export default StartPage;
