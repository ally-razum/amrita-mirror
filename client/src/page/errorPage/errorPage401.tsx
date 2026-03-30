import { Card, CardMedia, Box, Typography, Button} from '@mui/material';
import { Link } from "react-router-dom";

function ErrorPage401(): JSX.Element {
  return (    
      <Box marginLeft={10} marginTop={10} sx={{ display: 'flex', alignItems: 'center' }}> 
      <Card sx={{ maxWidth: 600 , marginLeft: 0, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="600"          
          image="/images/Error-401.png"
          alt="logo"
          />                        
      </Card>
      <Typography variant="h6" marginLeft={10} sx={{color:"#4a148c"}} > 
      <p>Страница недоступна.</p> 
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp" type="image/webp" />
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif" alt="🥳" width="100" height="100" />
      </picture>
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif" alt="🧐" width="150" height="150"/>
      </picture>
      <p>Для продолжения работы, пожалуйста, войдите в систему: </p>
        <Button
            type="submit"  variant="contained"
            sx={{fontSize: 20, marginTop: 2, marginBottom: 2, borderRadius: 20 ,  backgroundColor: '#5d4037'}}>
                <Link to="/"
                style={{ marginLeft: 5, textDecoration: "none" , color: 'white'}}>
                Войти в систему 
                </Link>            
        </Button> <br />
         Или обратитесь к администратору сайта.
        </Typography>
  
      
        
            
      
      </Box>
    
  );
}

export default ErrorPage401;
