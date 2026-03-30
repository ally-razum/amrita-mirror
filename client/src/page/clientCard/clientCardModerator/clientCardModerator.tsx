import { Box,  TextField, Typography, Button,  
        FormControl, InputLabel, styled, Dialog, DialogActions, 
        DialogContent, DialogTitle, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import { useUser } from '../../../userContext/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import client from '../../../api/client.ts';

// Кастомный Input для загрузки файла
const CustomInput = styled('input')({
  display: 'none',
});


function ClientCardModerator (): JSX.Element {
  const { user } = useUser();
  const navigate = useNavigate();   

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cardFullName, setCardFullName] = useState('');
  const [cardPhone, setCardPhone] = useState('');
  const [cardDeliveryAddress, setCardDeliveryAddress] = useState('');
  const [cardClientNumber, setcardClientNumber] = useState('');
  const [cardPhoto, setcardPhoto] = useState<File  | string | Blob>('');
  const [cardBasicDiagnosis,setcardBasicDiagnosis] = useState('');
  const [cardHealthComplaints, setcardHealthComplaints] = useState('');
  const [card_IsChecked, setcard_IsChecked] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false); // Состояние для показа диалога
  const [dialogData, setDialogData] = useState<{
    cardFullName: string;
    cardPhone: string;
    cardBasicDiagnosis: string;
    cardHealthComplaints: string;
    cardDeliveryAddress: string;
    cardClientNumber: string;
    
  }>({
     cardFullName: '',
     cardPhone: '',
     cardBasicDiagnosis: '',
     cardHealthComplaints: '',
     cardDeliveryAddress: '',
     cardClientNumber: ''
    }); // Состояние для данных карточки


  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({
 
    cardFullName: '',
    cardPhone: '',
    cardDeliveryAddress: ''
  });

  // Регулярные выражения
  const phoneRegex = /^[\d\s\-+]*$/;
  // const addressRegex = /^[A-Za-zА-Яа-я0-9\s,.-]{10,}$/; // пример для адреса доставки, минимум 10 символов
  const fullNameRegex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/; // ФИО из 3 слов


  const validateForm = () => {
    const newErrors = {
      cardFullName: '',
      cardPhone: '',
      cardDeliveryAddress: ''
    };
    let isValid = true;

    if (!fullNameRegex.test(cardFullName)) {
      newErrors.cardFullName = 'ФИО должно состоять из трёх слов';
      isValid = false;
    }
    if (!phoneRegex.test(cardPhone)) {
      newErrors.cardPhone = 'Пожалуйста, вводите только цифры, пробелы, а также символы - или +';
      isValid = false;
    }
    // if (!addressRegex.test(cardDeliveryAddress)) {
    //   newErrors.cardDeliveryAddress = 'Адрес доставки должен содержать не менее 10 символов';
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setcardPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Создаем URL для отображения превью
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('я слышу кнопку ДОБАВИТЬ');
    if (!validateForm()) {
      setErrorMessage('Форма не может быть отправлена! Внимательно заполните поля.');
      return
    } else {
      setErrorMessage('');
    }
    try {
      // console.log('ФРОНТ запрос на добавление карточки');
       // Создание FormData объекта
    const formData = new FormData();
    formData.append('cardUser_Id', (user?.id !== undefined) ? String(user?.id) : ''); // Добавляем id пользователя
    formData.append('cardFullName', cardFullName);
    formData.append('cardPhone', cardPhone);
    formData.append('cardBasicDiagnosis', cardBasicDiagnosis);
    formData.append('cardHealthComplaints', cardHealthComplaints);
    formData.append('cardDeliveryAddress', cardDeliveryAddress);
    formData.append('cardPhoto', cardPhoto); // Добавляем файл (фото)
    formData.append('card_IsChecked', card_IsChecked.toString());
    formData.append('cardClientNumber', cardClientNumber); 

    // Отправка запроса на добавление карточки
    const response = await client.post('/card/newcard', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Указываем заголовок для multipart данных
      },
    });

    // console.log('Карточка добавлена! Инфо:', response.data);

    // Показ диалога с информацией после успешного добавления карточки
     setDialogData({
      cardFullName: response.data.cardFullName,      
      cardPhone: response.data.cardPhone,
      cardBasicDiagnosis: response.data.cardBasicDiagnosis,
      cardHealthComplaints: response.data.cardHealthComplaints,
      cardDeliveryAddress: response.data.cardDeliveryAddress,
      cardClientNumber: response.data.cardClientNumber
      // Добавьте другие поля по мере необходимости
    });
      setDialogOpen(true);

  } catch (error) {
    console.error('Ошибка добавления карточки:', error);
    alert(`Проверьте наличие фото или номер телефона клиента. ВАЖНО - телефон должен быть уникальным! (${error})`)
  }
};
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/clientlist'); // Переход на страницу clientlist после закрытия диалога
  };

  
    return (
        <Box
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
    
        sx={{
          minHeight: '100vh',
          maxWidth: '100vw',
          padding: 2,
          marginX: 'auto',
          boxSizing: 'border-box',
          overflow: 'hidden',
          
        }}
        
      > 
        <Box
          flexDirection="column" 
          width="95vw" // Устанавливаем ширину чуть меньше полной, чтобы не было прокрутки
          padding={3} 
          borderRadius={5} 
          boxShadow={"5px 5px 10px #ccc"}
        > 
          <form onSubmit={handleSubmit}> 
          <Typography variant="h4"  textAlign="center" color="#4a148c">      
          Карточка нового клиента 
          <FormControlLabel
          sx={{marginLeft:2}}
              control={
                <Checkbox
                  checked={card_IsChecked}
                  onChange={(e) => setcard_IsChecked(e.target.checked)}
                  color="primary"
                  disabled
                />
              }
              label=""
            /> 
            </Typography>

          
          <Box display="flex" >{/* общий бокс с карточкой */}
            
            <Box width={800} marginLeft={10}>{/* левый блок с фото */}
            <Box width="40%" textAlign="center" marginBottom={2}>
            {photoPreview && (
              <Box mt={2}>
                <img src={photoPreview} alt="Предпросмотр фото" width="600" />
              </Box>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel shrink htmlFor="photo-upload" sx={{ fontSize: '20px' }}>
              
                {` фото ${cardPhoto}`}
              </InputLabel>
              <label htmlFor="photo-upload">
                <CustomInput
                  id="photo-upload"
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*" // только изображения
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{ fontSize: '16px', backgroundColor: '#ba68c8', color: '#fff', marginTop: 2, borderRadius:20 }}
                >
                  Добавить фото
                </Button>
              </label>
            </FormControl>
            
          </Box>
          </Box>
          {/* правый блок */}
          <Box marginLeft={5}> 
            <TextField
              fullWidth
              margin="normal"
              label="ФИО клиента"
              variant="outlined"
              placeholder="ФИО клиента"
              value={cardFullName}
              onChange={(e) => setCardFullName(e.target.value)}
              error={Boolean(errors.cardFullName)}
              helperText={errors.cardFullName}
            />
            <TextField
             fullWidth
             margin="normal"
             label="Телефон клиента"
             variant="outlined"
             placeholder="только цифры и -/+"
             value={cardPhone}
             onChange={(e) => setCardPhone(e.target.value)}
             error={Boolean(errors.cardPhone)}
             helperText={errors.cardPhone}
            />
             <TextField
              fullWidth multiline
              margin="normal"
              label="Основные диагнозы"
              variant="outlined"
              placeholder="Основные диагнозы"
              value = {cardBasicDiagnosis}
              onChange={(e) => setcardBasicDiagnosis(e.target.value)}
            />
            <TextField
              fullWidth multiline
              margin="normal"
              label="Жалобы на здоровье"
              variant="outlined"
              placeholder="Жалобы на здоровье"
              value = {cardHealthComplaints}              
              onChange={(e) => setcardHealthComplaints(e.target.value)}
            />
            <TextField
             fullWidth
             margin="normal"
             label="Адрес доставки"
             variant="outlined"
             placeholder="Адрес доставки"
             value={cardDeliveryAddress}
             onChange={(e) => setCardDeliveryAddress(e.target.value)}
             error={Boolean(errors.cardDeliveryAddress)}
             helperText={errors.cardDeliveryAddress}
            />
      
      {/*======> Удобный месенджер" */}

            <TextField
             fullWidth
             margin="normal"
             label="Удобный мессенджер"
             variant="outlined"
             placeholder="Удобный мессенджер"
             value={cardClientNumber}
             onChange={(e) => setcardClientNumber(e.target.value)}        
            />



            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

            <Button
              type="submit" color="success" variant="contained"
              sx={{
                fontSize: 20,
                marginTop: 2,
                marginBottom: 2,
                width: "100%",
                borderRadius: 20,
                backgroundColor: '#ba68c8'
              }}              
            >              
              Добавить
            </Button>
            </Box>
            </Box>
          </form>
        </Box>
        {/* Диалог с информацией */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Карточка успешно добавлена!</DialogTitle>
        <DialogContent>
          <Typography>Информация о клиенте:</Typography>
          {/* <Typography>Номер : {dialogData.cardClientNumber}</Typography> */}
          <Typography>ФИО : {dialogData.cardFullName}</Typography>
          <Typography>Тел : {dialogData.cardPhone}</Typography>
          <Typography>Адрес : {dialogData.cardDeliveryAddress}</Typography>
          <Typography>Диагнозы : {dialogData.cardBasicDiagnosis}</Typography>
          <Typography>Жалобы : {dialogData.cardHealthComplaints}</Typography>
          {/* Добавьте другую информацию по мере необходимости */}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose}  
            sx={{ backgroundColor:"#ab47bc", borderRadius: 20  }}
            variant="contained">
              к списку заявок
          </Button>
          <Button 
            
            sx={{ backgroundColor:"#ab47bc", borderRadius: 20  }}
            variant="contained"
            onClick={() => {
              window.location.reload();
            }}>              
              <Link to="/newcard" style={{ textDecoration: "none", color: "inherit" }}>
                  <b>добавить еще карточку </b>
                </Link>
          </Button>
        </DialogActions>
      </Dialog>
      </Box>


    )

}


export default ClientCardModerator;