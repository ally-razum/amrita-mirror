import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // для навигации


function UserCard(){
    const { userID } = useParams<{ userID: string }>(); // Получаем ID клиента из URL
    // console.log(userID, 'userID');
    const [userData, setUserData] = useState<UserCard | null>(null); // Используем интерфейс
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // Состояние редактирования
    const [errors, setErrors] = useState({ 
      userFullName: '',
      userEmail: '',
      userLogin: ''
    });
    const navigate = useNavigate();

    const handleChangePassword = () => {
        navigate(`/credentials/${userID}`);
    };

    useEffect(() => {
        const fetchCardData = async () => {
          try {
            const response = await client.get<UserCard>(`/users/${userID}`);
            setUserData(response.data);
            setLoading(false);
          } catch (error) {
            console.error(`Ошибка при получении данных карточки с ID: ${userID}`, error);
            setLoading(false);
          }
        };
    
        fetchCardData();
      }, [userID]);
    
      if (loading) {
        return <div>Загрузка...</div>;
      }
    
      if (!userData) {
        return <div>Данные карточки не найдены</div>;
      }
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
    
      
        if (!userData!.userFullName || !fullNameRegex.test(userData!.userFullName)) {
          newErrors.userFullName = 'ФИО должно состоять из трёх слов';
          isValid = false;
        }
        if (!userData!.userLogin || !loginRegex.test(userData!.userLogin)) {
          newErrors.userLogin = 'Логин должен состоять из одного слова. Допускается ввод латинских букв и цифр';
          isValid = false;
        }
        if (!userData!.userEmail || !emailRegex.test(userData!.userEmail)) {
          newErrors.userEmail = 'e-mail введен неверно';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };
    
      const handleSaveChanges = async () => {
        if (!validateForm()) return; // Если форма не валидна, не отправляем данные
    
        try {
          await client.put(`/users/info/${userID}`, userData);
          alert('Данные пользователя успешно обновлены');
          setIsEditing(false); // Выходим из режима редактирования после сохранения
          
        } catch (error) {
          console.error('Ошибка при сохранении данных пользователя', error);
        }
      };
    
      const handleChange = (field: keyof UserCard, value: string | boolean) => {
        setUserData((prevData) => ({
          ...prevData!,
          [field]: value
        }));
      };
    
    return (
        <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh" 
        maxWidth={1800} 
        marginRight={5} 
        marginLeft={10}>
        <Box marginLeft={5}>

        <Box flexDirection="column" maxWidth={1800} padding={3} borderRadius={5} boxShadow={"5px 5px 10px #ccc"}>
        <Button sx={{ backgroundColor: "#ab47bc", borderRadius: 20 }} variant="contained">
          <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
            Все пользователи
          </Link>
        </Button>
        <Button sx={{ marginLeft: 2, backgroundColor: "#ab47bc", borderRadius: 20 }} variant="contained" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Отмена' : 'Редактировать'}
        </Button>
        {isEditing && (
          <Button sx={{ marginLeft: 2,  backgroundColor: "#4caf50", borderRadius: 20 }} variant="contained" onClick={handleSaveChanges}>
            Сохранить
          </Button>
        )}
        
            <Typography variant="h4" textAlign="center" color="#4a148c"sx={{  marginTop:5}}>            
            Данные пользователя           
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="ID"
              variant="outlined"
              value={userID}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              variant="outlined"
              value={userData.userFullName}     
              onChange={(e) => handleChange('userFullName', e.target.value)}
              error={!!errors.userFullName}
              helperText={errors.userFullName}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}}      
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={userData.userEmail}
              onChange={(e) => handleChange('userEmail', e.target.value)}
              error={!!errors.userEmail}
              helperText={errors.userEmail}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}} 
            />

            <TextField
              fullWidth
              margin="normal"
              label="Login"
              variant="outlined"
              value={userData.userLogin}
              onChange={(e) => handleChange('userLogin', e.target.value)}
              error={!!errors.userLogin}
              helperText={errors.userLogin}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}} 
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              variant="outlined"
              value={userData.userRole}
              disabled
            />
             <Button variant="outlined" onClick={handleChangePassword}>Сменить пароль</Button>
          </Box>
        </Box>
        </Box>
    )
}


export default UserCard;