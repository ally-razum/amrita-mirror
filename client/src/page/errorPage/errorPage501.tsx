import { Card, CardMedia, Box, Typography} from '@mui/material';

function ErrorPage501(): JSX.Element {
  return (    
      <Box marginLeft={10} marginTop={10} sx={{ display: 'flex', alignItems: 'center' }}> 
      <Card sx={{ maxWidth: 600 , marginLeft: 0, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="600"          
          image="/images/Error-501.png"
          alt="logo"
          />                        
      </Card>
      <Typography variant="h6" marginLeft={10} sx={{color:"#4a148c"}} > 
      <h2>Не реализовано</h2> 
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp" type="image/webp" />
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif" alt="🥳" width="100" height="100" />
      </picture>
      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif" alt="🧐" width="150" height="150"/>
      </picture>
      <p>Данная страница является резервной и не доступна в текущей версии приложения </p>
      
        </Typography>
  
      
        
            
      
      </Box>
    
  );
}

export default ErrorPage501;
