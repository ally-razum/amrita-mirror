import { Card, CardMedia, Box, Typography} from '@mui/material';


function ErrorPage403(): JSX.Element {
  return (    
      <Box marginLeft={10} marginTop={10} sx={{ display: 'flex', alignItems: 'center' }}> 
      <Card sx={{ maxWidth: 600 , marginLeft: 0, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="600"          
          image="/images/Error-403.png"
          alt="logo"
          />                        
      </Card>
      <Typography variant="h6" marginLeft={10} sx={{color:"#4a148c"}} > 
      <p><b>Упс! Страница недоступна.</b></p> 
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp" type="image/webp" />
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif" alt="🥳" width="100" height="100" />
      </picture>
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif" alt="🧐" width="150" height="150"/>
      </picture>
      <p>К сожалению, у вас нет прав для доступа к этому ресурсу. </p>
      <p> Возможные причины могут включать: <br />

      🔸 Отсутствие необходимого уровня доступа или прав. <br />
      🔸 Истекший срок действия вашей сессии. <br />
      🔸 Попытка обращения к защищенному ресурсу без авторизации.</p>
        <b>Пожалуйста, обратитесь к администратору сайта.</b>
        
        </Typography>
  
      
        
            
      
      </Box>
    
  );
}

export default ErrorPage403;
