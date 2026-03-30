import client from '../../api/client.ts';
import { useState, useRef } from "react";
import { Card,CardMedia, Box, TextField, Button, Typography, IconButton, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom";


function RegBox(): JSX.Element {
  const [userFullName, setFullName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userLogin, setlogin] = useState("");
  const [userPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const userRole = 'moderator'
  const [userRole, setuserRole] = useState("");
  const [showPassword1, setShowPassword1] = useState(false); // Состояние для отображения пароля1
  const [showPassword2, setShowPassword2] = useState(false); // Состояние для отображения пароля2

  const [isSubmitted, setIsSubmitted] = useState(false); // Состояние для отслеживания успешной отправки
  const [userData, setUserData] = useState<{
    userFullName: string;
    userLogin: string;
    userEmail: string;
    userPassword: string;    
  } | null>(null); // Состояние для хранения данных пользователя
  const printRef = useRef<HTMLDivElement>(null); // Реф для области печати

  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({ 
    userFullName: '',
    userEmail: '',
    userLogin: ''
  });

 // Регулярные выражения
  const fullNameRegex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/; // ФИО из 3 слов
  const loginRegex = /^[A-Za-z0-9]+$/; // строка состоит только из латинских букв и цифр и является одним словом (без пробелов или спецсимволов)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const validateForm = () => {
    const newErrors = {
      userFullName: '',
      userEmail: '',
      userLogin: ''
    };
    let isValid = true;

    if (!fullNameRegex.test(userFullName)) {
      newErrors.userFullName = 'ФИО должно состоять из трёх слов';
      isValid = false;
    }
    if (!loginRegex.test(userLogin)) {
      newErrors.userLogin = 'Логин должен состоять из одного слова. Допускается ввод латинских букв и цифр';
      isValid = false;
    }
    if (!emailRegex.test(userEmail)) {
      newErrors.userEmail = 'e-mail введен неверно';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Функция для переключения состояния видимости пароля
  const handleClickShowPassword1 = () => {
    setShowPassword1((prev) => !prev);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2((prev) => !prev);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('я слышу кнопку ДОБАВИТЬ юзера');
    if (!validateForm()) {
      setErrorMessage('Форма не может быть отправлена! Внимательно заполните поля, убедитесь что данные обрабатываются корректно. Если красные рамки на полях отсутствуют - игнорируйте это сообщение');
      return
    } else {
      setErrorMessage('');
    }
    if (userPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      const response = await client.post('/register',
        { userFullName, userLogin, userEmail, userPassword, userRole });
      // console.log('Регистрация прошла успешно! инфо:', response.data);

      // Сохранение данных пользователя в состояние и переключение флага успешной отправки
      setUserData({
        userFullName: response.data.userFullName,
        userLogin: response.data.userLogin,
        userEmail: response.data.userEmail,
        userPassword, // Отображаем пароль, т.к. он нужен        
      });
      setIsSubmitted(true); // Устанавливаем, что отправка была успешной

    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const printWindow = window.open('', '', 'width=800,height=600');
  
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Распечатка данных</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                h1, h2, h3, p {
                  margin: 0;
                  padding: 0;
                }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
  
        // Установка таймаута для вызова печати
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 1500); // Подождать полсекунды перед вызовом печати
      }
    }
  };
  return (
    
      
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >     
    <Card sx={{ maxWidth: 600 , marginRight: 10, position: 'relative', borderRadius: 20}}>
        <CardMedia
          component="img"
          height="600"          
          image="/images/stastPage.png"
          alt="logo"
          />                        
      </Card>
      <Box
        flexDirection="column"
        maxWidth={800}
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
      >
        <Typography variant="h5"  textAlign="center">      
        Регистрация нового администратора Арома-кабинета
        </Typography>
        {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="ФИО"
            variant="outlined"
            placeholder="ФИО"
            value={userFullName}
            onChange={(e) => setFullName(e.target.value)}
            error={Boolean(errors.userFullName)}
            helperText={errors.userFullName}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            placeholder="Введите email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.userEmail)}
            helperText={errors.userEmail}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Логин"
            variant="outlined"
            placeholder="Придумайте логин для пользователя"
            value={userLogin}
            onChange={(e) => setlogin(e.target.value)}
            error={Boolean(errors.userLogin)}
            helperText={errors.userLogin}
          />
          <div style={{ position: 'relative' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Пароль"
            type={showPassword1 ? 'text' : 'password'} // Меняем тип на 'text' если нужно показать пароль        
            variant="outlined"
            placeholder="Введите пароль"
            value={userPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            onClick={handleClickShowPassword1}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
            aria-label="toggle password visibility"
            >
            {showPassword1 ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          </div>

          <div style={{ position: 'relative' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Повторите пароль"
            type={showPassword2 ? 'text' : 'password'} // Меняем тип на 'text' если нужно показать пароль        
            variant="outlined"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}    
          />
            <IconButton
              onClick={handleClickShowPassword2}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
              aria-label="toggle password visibility"
              >
              {showPassword2 ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <FormControl fullWidth margin="normal">
                <InputLabel id="label">Роль</InputLabel>
                <Select
                labelId="label"
                id="select"                
                label="Роль"    
                value={userRole}
                onChange={(e) => setuserRole(e.target.value)}            
                >
                <MenuItem value={"admin"}>admin*</MenuItem>
                <MenuItem value={"moderator"}>администратор</MenuItem>
                <MenuItem value={"user"}>Торсунов О.Г.</MenuItem>
                </Select>
            </FormControl>

            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{
                fontSize: 20,
                marginTop: 2,
                marginBottom: 2,
                width: "100%",
                borderRadius: 20,
                backgroundColor: '#ba68c8'
              }}
              variant="contained"
            >
              Добавить
            </Button>
          </Box>
        </form>
         ) : (
          <Box>
          <Typography variant="h6" color="green" textAlign="center">
            Пользователь добавлен успешно!
          </Typography>
          {userData && (
            <Box mt={3} ref={printRef}> {/* Оборачиваем блок, который нужно распечатать */}
              <Typography>ФИО: {userData.userFullName}</Typography>
              <Typography>Логин: {userData.userLogin}</Typography>
              <Typography>Email: {userData.userEmail}</Typography>
              <Typography>Пароль: {userData.userPassword}</Typography>
              
            </Box>
          )}
          {/* Кнопка для печати */}
          <Button
            sx={{ fontSize: 16, marginTop: 2, width: "100%", borderRadius: 10, backgroundColor: '#ba68c8' }}
            variant="contained"
            onClick={handlePrint}
          >
            Распечатать
          </Button>
          <Button
            sx={{ fontSize: 16, marginTop: 2, width: "100%", borderRadius: 10, backgroundColor: '#4a148c' }}
            variant="contained"
            
          ><Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
              к списку пользователей
          </Link>
            
          </Button>
          
        </Box>
        )}
      </Box>
    </Box>
  );
}

export default RegBox;
