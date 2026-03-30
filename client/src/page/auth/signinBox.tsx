/* eslint-disable @typescript-eslint/no-unused-vars */
import client from '../../api/client.ts';
import { useState } from "react";
import { Box, TextField, Button,Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext/userContext';

function SigninBox(): JSX.Element {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    // console.log('я слышу кнопку ВОЙТИ');
    
    try {
      // Отправляем запрос на сервер для проверки пользователя
      // console.log('Отправляем запрос на сервер для проверки пользователя');
      const response = await client.post('/login', {
        userLogin: login,
        userPassword: password,
      },  {
        withCredentials: true, // Обязательно при работе с куками
      });

      // Если сервер возвращает успешный результат
      if (response.data.message === 'success') {
        // console.log(response.data.message,'Успешный вход!!!');   
        // console.log('USER INFO:', response.data);
        
        const currentUser = response.data.findUser
        // console.log(currentUser, 'это юзер');
        setUser(currentUser);  // Сохраняем в контексте
        if ((response.data.findUser.userRole === "admin") || (response.data.findUser.userRole === "moderator") ){
          // console.log("я вижу роль админ или модератор");
          
          navigate('/cabinet');      // Перенаправляем на главную страницу
        } else {
          // console.log("я вижу роль торсунов");
          navigate('/clientlist');      // Перенаправляем на страницу со списком клиентов
        }
          
      } else {
        // Если логин неудачный, показываем сообщение об ошибке
        // console.log('Не удалось войти в систему');
        // console.log(response.data, 'response.data');            
        setErrorMessage(response.data.message || 'Неверное имя пользователя или пароль');
      }
    } catch (error) {
      // console.log(error,'ошибка авторизации');
      // alert(`Ошибка входа:${error} ВВЕДИТЕ КОРРЕКТНЫЕ ДАННЫЕ` )
      
      // Обработка ошибок сети или сервера
      setErrorMessage(`ОШИБКА ВХОДА ВВЕДИТЕ КОРРЕКТНЫЕ ДАННЫЕ (${error}) `);
      
    }
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
      marginRight={5}
      marginLeft={10}
    >
      <Box
        flexDirection="column"
        maxWidth={450}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
      >

        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Введите логин"
            variant="outlined"
            placeholder="Login"
            name = "login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField fullWidth
            margin="normal"
            label="Введите пароль"
            type="password"
            variant="outlined"
            placeholder="password"
            name = "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <Button onClick={handleLogin} type="submit"  variant="contained"
            sx={{fontSize: 20, marginTop: 2, marginBottom: 2, width: "100%",borderRadius: 20, backgroundColor: '#ba68c8'}}>
            Войти
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SigninBox;
