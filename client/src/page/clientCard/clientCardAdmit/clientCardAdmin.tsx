import { Box, FormControlLabel, Checkbox, TextField, Typography, Button, 
        Select, MenuItem, FormControl, InputLabel, styled, Dialog, DialogActions, 
        DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import client from '../../../api/client.ts';


// Кастомный Input для загрузки файла
const CustomInput = styled('input')({
  display: 'none',
});


function ClientCardAdmin (){

  const navigate = useNavigate();   

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cardFullName, setCardFullName] = useState('');
  const [cardPhone, setCardPhone] = useState('');
  const [cardDeliveryAddress, setCardDeliveryAddress] = useState('');
  const [cardClientNumber, setcardClientNumber] = useState('');
  const [cardPhoto, setcardPhoto] = useState<File  | string | Blob>('');
  const [cardBasicDiagnosis,setcardBasicDiagnosis] = useState('');
  const [cardHealthComplaints, setcardHealthComplaints] = useState('');
  const [cardFinalDiagnosis, setcardFinalDiagnosis] = useState('');
  const [cardRecepi, setcardRecepi] = useState('');
  const [cardOilFromList, setcardOilFromList] = useState('')
  const [card_IsChecked, setcard_IsChecked] = useState(false)

  //!ухи
  const [isFormVisible, setIsFormVisible] = useState(false); // Управляет видимостью формы
  const initialLeftPosition = 'left-not';
  const initialRightPosition = 'right-not';
  const initialLeftMode = 'не-выбрано';
  const initialRightMode = 'не-выбрано';

  const [leftPosition, setLeftPosition] = useState(initialLeftPosition);
  const [rightPosition, setRightPosition] = useState(initialRightPosition);
  const [leftMode, setLeftMode] = useState(initialLeftMode);
  const [rightMode, setRightMode] = useState(initialRightMode);

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
    cardClientNumber: '',
    cardFullName: '',
    cardPhone: '',
    cardDeliveryAddress: ''
  });

  //! Функция для обновления значения поля "номер рецепта"
  const updateRecepi = (diagnosis: string, oil: string) => {
    const newRecepi = `${diagnosis}${oil}`;
    setcardRecepi(newRecepi);
  };

  const handleDiagnosisChange = (e: { target: { value: string; }; }) => {
    const newDiagnosis = e.target.value;
    setcardFinalDiagnosis(newDiagnosis);
    updateRecepi(newDiagnosis, cardOilFromList); // Обновляем "номер рецепта"
  };

  const handleOilChange = (e: { target: { value: string; }; }) => {
    const newOil = e.target.value;
    setcardOilFromList(newOil);
    updateRecepi(cardFinalDiagnosis, newOil); // Обновляем "номер рецепта"
  };
  
  
  // Регулярные выражения
  const phoneRegex = /^[\d\s\-+]*$/;
  // const addressRegex = /^[A-Za-zА-Яа-я0-9\s,.-]{10,}$/; // пример для адреса доставки, минимум 10 символов
  const fullNameRegex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/; // ФИО из 3 слов

  const validateForm = () => {
    const newErrors = {
      cardClientNumber: '',
      cardFullName: '',
      cardPhone: '',
      cardDeliveryAddress: ''
    };
    let isValid = true;

    if (!fullNameRegex.test(cardFullName)) {
      newErrors.cardFullName = 'ФИО должно состоять из трёх слов';
      isValid = false;
    }
    if (!phoneRegex.test(cardPhone)||"") {
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

  //! Функция для сброса значений по ушам
  const resetForm = () => {
    setLeftPosition(initialLeftPosition);
    setRightPosition(initialRightPosition);
    setLeftMode(initialLeftMode);
    setRightMode(initialRightMode);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setcardPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Создаем URL для отображения превью
    }
  };

// Функция для переключения видимости формы по ушам
  const toggleFormVisibility = () => {
    if (isFormVisible) {
      resetForm(); // Сбрасываем значения при закрытии формы
    }
    setIsFormVisible((prev) => !prev);
  };

//! ДОБАВЛЕНИЕ КАРТОЧКИ ------------------------------>
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('я слышу кнопку ДОБАВИТЬ');
    if (!validateForm()) {
      setErrorMessage('Форма не может быть отправлена! Проверьте данные по точкам на ушах или данные по карточке');
      return
    }

    else {
      setErrorMessage('');
    }


const isPositionModeChanged =
  leftPosition !== initialLeftPosition ||
  rightPosition !== initialRightPosition ||
  leftMode !== initialLeftMode ||
  rightMode !== initialRightMode;

    try {
      // console.log('ФРОНТ запрос на добавление карточки');
      
     // Создание FormData объекта
    const formData = new FormData();
    
   
    formData.append('cardFullName', cardFullName);
    formData.append('cardPhone', cardPhone);
    formData.append('cardBasicDiagnosis', cardBasicDiagnosis);
    formData.append('cardHealthComplaints', cardHealthComplaints);
    formData.append('cardDeliveryAddress', cardDeliveryAddress);
    formData.append('cardClientNumber',cardClientNumber);
    formData.append('cardFinalDiagnosis', cardFinalDiagnosis);
    formData.append('cardOilFromList', cardOilFromList);
    formData.append('cardRecepi', cardRecepi);
    formData.append('card_IsChecked', card_IsChecked.toString()); // Если это boolean, конвертируем в строку
    formData.append('cardPhoto', cardPhoto); // Добавляем файл (фото)
  
    // Отправка запроса на добавление карточки
    const response = await client.post('/card/newcard', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Указываем заголовок для multipart данных
      },
    });

    const cardId = response.data.id; // ID новой карточки из ответа сервера
    // console.log('cardId: ', cardId);
    // Если данные для `positionModeData` изменились, выполняем второй запрос   
    if (isPositionModeChanged) {

    // Второй запрос — данные для связанной таблицы (позиции и режимы)
    const positionModeData = {
      earCard_Id: cardId, // передаем cardId, полученный из первого запроса
      earLeft_isTop: leftPosition === 'лево-верх' ? 'true' : 'false',
      earRight_isTop: rightPosition === 'право-верх' ? 'true' : 'false',
      earLeft_isDay: leftMode === 'день' ? 'true' : 'false',
      earRight_isDay: rightMode === 'день' ? 'true' : 'false',
    };

    await client.post('/card/positions', positionModeData);
    // console.log('positionModeData: ', positionModeData);
    // console.log('Карточка и связанные данные успешно добавлены!');
    // console.log('Карточка добавлена! Инфо:', response.data);
    }
    // Показ диалога с информацией после успешного добавления карточки
     setDialogData({
      // cardid: response.data.id,
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
    // console.error('Ошибка добавления карточки:', error);
    alert(`Проверьте наличие фото или номер телефона клиента. ВАЖНО - телефон должен быть уникальным! (${error})`)
  }
};
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/clientlist'); // Переход на страницу clientlist после закрытия диалога
  };

  const handleLeftPositionChange = (value: string) => {
    setLeftPosition(value);
    //! Устанавливаем противоположное значение для rightPosition
    setRightPosition(value === 'лево-верх' ? 'право-верх' : 'право-низ'); 
  };

  const handleLeftModeChange = (value: string) => {
    setLeftMode(value);
    // Устанавливаем противоположное значение для rightMode
    setRightMode(value === 'день' ? 'ночь' : 'день');
  };

  const handleRightPositionChange = (value: string) => {
    setRightPosition(value);
    // Устанавливаем противоположное значение для leftPosition
    setLeftPosition(value === 'право-верх' ? 'лево-низ' : 'лево-верх');
  };
  
  const handleRightModeChange = (value: string) => {
    setRightMode(value);
    // Устанавливаем противоположное значение для leftMode
    setLeftMode(value === 'день' ? 'ночь' : 'день');
  };

  // Путь к изображениям в зависимости от выбранной позиции
  const getImageSrc = (position: string) => {
    switch (position) {
      case 'лево-верх':
        return '/images/left-top.png';
      case 'лево-низ':
        return '/images/left-bottom.png';
      case 'право-верх':
        return '/images/right-top.png';
      case 'право-низ':
        return '/images/right-bottom.png';
      case 'right-not':
        return '/images/right-not.png';
      case 'left-not':
        return '/images/left-not.png';
      default:
        return '';
    }}

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
          Карточка нового клиента (Admin-mode)</Typography>
          
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



            <FormControl fullWidth margin="normal">
                <InputLabel id="label">Диагнозы</InputLabel>
                <Select
                  labelId="label"
                  id="select"
                  label="Диагнозы"    
                  value={cardFinalDiagnosis}
                  onChange={handleDiagnosisChange} // Обновляем диагноз
                >
                <MenuItem value={1}>1 Дисменорея, бесплодие</MenuItem>
                <MenuItem value={2}>2 Миома</MenuItem>
                <MenuItem value={3}>3 Эндометриоз</MenuItem>

                <MenuItem value={4}>4 Кисты яичников</MenuItem>
                <MenuItem value={5}>5 Мужское бесплодие</MenuItem>
                <MenuItem value={6}>6 Простатит</MenuItem>

                <MenuItem value={7}>7 Мастопатия</MenuItem>
                <MenuItem value={8}>8 Аденома предстательной железы</MenuItem>
                <MenuItem value={9}>9 Диагноз тестовый</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="label">Номер масла</InputLabel>
                <Select
                  labelId="label"
                  id="select"
                  label="Номер масла"  
                  value={cardOilFromList}
                  onChange={handleOilChange} // Обновляем масло
                >
                <MenuItem value={0}>Масло № 0</MenuItem>
                <MenuItem value={1}>Масло № 1</MenuItem>
                <MenuItem value={2}>Масло № 2</MenuItem>
                <MenuItem value={3}>Масло № 3</MenuItem>
                <MenuItem value={4}>Масло № 4</MenuItem>
                <MenuItem value={5}>Масло № 5</MenuItem>
                <MenuItem value={6}>Масло № 6</MenuItem>
                <MenuItem value={7}>Масло № 7</MenuItem>
                <MenuItem value={8}>Масло № 8</MenuItem>
                <MenuItem value={9}>Масло № 9</MenuItem>
                <MenuItem value={"01"}>Масло № 01</MenuItem>
                </Select>
            </FormControl>
            <TextField
              fullWidth 
              margin="normal"
              label="номер рецепта"
              variant="outlined"              
              value = {cardRecepi}
              slotProps={{ input: { readOnly: true } }}
              onChange={(e) => setcardRecepi(e.target.value)}   
            />
          <FormControlLabel
              control={
                <Checkbox
                  checked={card_IsChecked}
                  onChange={(e) => setcard_IsChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="Заполнено"
            /> 
      {/* Кнопка для показа/скрытия формы */}

        <Button variant="contained" onClick={toggleFormVisibility}
        sx={{
          fontSize: 15,
          marginTop: 2,
          marginBottom: 2,
          marginRight:2,
          width: "20%",
          borderRadius: 20,
          backgroundColor: '#f44336'
        }}>
        {isFormVisible ? 'Скрыть данные по ушам' : 'Добавить данные по ушам'}
      </Button>

   {/* Форма отображается только при isFormVisible === true */}

   {isFormVisible && (
    <Box mt={2}>


            {/* тут должет быть компонент с картинками */}

            <Box display="flex" justifyContent="center" alignItems="center">
              <FormControl 
              margin="normal"
                sx={{
                  display: 'inline-block',  // Чтобы не растягивался на всю ширину
                  padding: '4px 12px',      // Размеры padding
                  with: "20px",                
                  color: '#fff'            // Маржин для отступов
                }}>             
              <Select
                value={leftPosition}
                onChange={(e) => handleLeftPositionChange(e.target.value)}
              >
                <MenuItem value="лево-верх">Верхняя точка</MenuItem>
                <MenuItem value="лево-низ">Нижняя точка</MenuItem>
                <MenuItem value="left-not"disabled>Не выбрано</MenuItem>
              </Select>
          </FormControl>
      {/* Левое изображение */}
      <Box textAlign="center" m={2}>
        <Typography>Правое ухо</Typography>
        <img src={getImageSrc(leftPosition)} alt="Левое изображение" width="300" />
        {/* <FormControl fullWidth margin="normal">
          
          <Select
            value={leftPosition}
            onChange={(e) => handleLeftPositionChange(e.target.value)}
          >
            <MenuItem value="лево-верх">Верхняя точка</MenuItem>
            <MenuItem value="лево-низ">Нижняя точка</MenuItem>
            <MenuItem value="left-not"disabled>Не выбрано</MenuItem>
          </Select>
        </FormControl> */}

        <FormControl fullWidth margin="normal">
          
          <Select
            value={leftMode}
            onChange={(e) => handleLeftModeChange(e.target.value)}
            sx={{
              backgroundColor: leftMode === 'день' ? '#b2dfdb' : '#6a1b9a',
              color: leftMode === 'день' ? 'black' : 'white',
            }}
          >
            <MenuItem value="день">День</MenuItem>
            <MenuItem value="ночь">Ночь</MenuItem>
            <MenuItem value="не-выбрано" disabled>Не выбрано</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Правое изображение */}
      <Box textAlign="center" m={2}>
        <Typography>Левое ухо</Typography>
        <img src={getImageSrc(rightPosition)} alt="Правое изображение" width="300" />
        <FormControl fullWidth margin="normal"
        sx={{ display: 'none' }}>
          
          <Select
            value={rightPosition}
            onChange={(e) => handleRightPositionChange(e.target.value)}
            
          >
            <MenuItem value="право-верх">Верхняя точка</MenuItem>
            <MenuItem value="право-низ">Нижняя точка</MenuItem>
            <MenuItem value="right-not" disabled>Не выбрано</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" >
          
          <Select
            value={rightMode}
            onChange={(e) => handleRightModeChange (e.target.value)}
            sx={{
              backgroundColor: rightMode === 'день' ? '#b2dfdb' : '#6a1b9a',
              color: rightMode === 'день' ? 'black' : 'white',
            }}
          >
            <MenuItem value="день">День</MenuItem>
            <MenuItem value="ночь">Ночь</MenuItem>
            <MenuItem value="не-выбрано"disabled >Не выбрано</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
    </Box>
      )}

        {/* тут должет быть компонент с картинками */}
                    
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}

            <Button
              type="submit" color="success" variant="contained"
              sx={{
                fontSize: 25,
                marginTop: 2,
                marginBottom: 2,
                width: "30%",
                borderRadius: 20,
                backgroundColor: '#689f38'
              }}
            >
              Добавить карточку
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

export default ClientCardAdmin;