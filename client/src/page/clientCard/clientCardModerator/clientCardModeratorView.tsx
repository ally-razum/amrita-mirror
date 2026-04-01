import { Box, Button,  TextField,styled, Typography, FormControl, Select, MenuItem, Checkbox, FormControlLabel} from '@mui/material';
// import axios from 'axios'; 
import client from '../../../api/client.ts';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // для навигации

const PROD_URL = 'https://aroma-cabinet.amrita.center/api';
const LOCAL_URL = 'http://localhost:4200'
// Кастомный Input для загрузки файла
const CustomInput = styled('input')({
  display: 'none',
});

// Выбор базы URL на основе текущего хоста
const baseUrl = window.location.hostname === 'aroma-cabinet.amrita.center' ? PROD_URL : LOCAL_URL;

interface CardData {
  id:number;
  cardUser_Id: number;
  cardPhoto: string;
  cardFullName: string;
  cardPhone: string;
  cardBasicDiagnosis: string;
  cardHealthComplaints: string;
  cardDeliveryAddress: string;
  cardFinalDiagnosis: string | undefined;
  cardOilFromList: string | undefined;
  cardRecepi: string | undefined;
  card_IsChecked: boolean;
  createdAt: Date;
  cardClientNumber: string;
}


interface EarData {
  earCard_Id:number;
  earLeft_isDay: boolean;
  earRight_isDay: boolean;
  earLeft_isTop: boolean;
  earRight_isTop: boolean;
}

function ClientCardModeratorView (){
  const { clientId } = useParams<{ clientId: string }>(); // Получаем ID клиента из URL
  const [cardData, setCardData] = useState<CardData | null>(null); // Используем интерфейс
  const [loading, setLoading] = useState(true);
  

  //!для замены фото--------------------------------------------
  const [photoPreview, setPhotoPreview] = useState<string>(cardData?.cardPhoto || ''); // Для предварительного просмотра
  const [newPhoto, setNewPhoto] = useState<File  | string | Blob>(''); // Для хранения нового загруженного файла
  
  //!-----------------------------------------------------------
  
  const [earData, setEarData] = useState<EarData | null> (null) // Используем интерфейс ear
  const [leftPosition, setLeftPosition] = useState('лево-верх'); // где точка левая
  const [rightPosition, setRightPosition] = useState('право-верх'); // где точка правая
  const [leftMode, setLeftMode] = useState('день');
  const [rightMode, setRightMode] = useState('день');

  const [isEditing, setIsEditing] = useState(false); // Состояние редактирования
  const [errors, setErrors] = useState({
    cardFullName: '',
    cardPhone: '',
    cardDeliveryAddress: ''
  });

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await client.get<CardData>(`/client/${clientId}`);
        setCardData(response.data);
        setLoading(false);       
        // console.log('cardData fetchCardData',cardData );
      } catch (error) {
        console.error(`Ошибка при получении данных карточки с ID: ${clientId}`, error);
        setLoading(false);
      }
    };
    const fetchEarData = async () => {
      // console.log('запрос на гет данных уха ');
      
      try {
        const response = await client.get <EarData>(`/client/positions/${clientId}`)
        // console.log('response', response);
        
        setEarData(response.data);
        // Преобразуем булевые значения в текстовые для селекторов
        setLeftPosition(response.data.earLeft_isTop ? 'лево-верх' : 'лево-низ');
        setRightPosition(response.data.earRight_isTop ? 'право-верх' : 'право-низ');
        setLeftMode(response.data.earLeft_isDay ? 'день' : 'ночь');
        setRightMode(response.data.earRight_isDay ? 'день' : 'ночь');
        // console.log(response.data, 'это то что попало в response.data');
      } catch (error) {
        console.error(`Ошибка данных УХА карточки с ID: ${clientId}`, error);
      }
    }

    fetchCardData();
    fetchEarData();
  
  }, [clientId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!cardData) {
    return <div>Данные карточки не найдены</div>;
  }

  // Регулярные выражения
  const phoneRegex = /^[\d\s\-+]*$/;
  // const addressRegex = /^[A-Za-zА-Яа-я0-9\s,.-]{10,}$/;
  const fullNameRegex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;


  const validateForm = () => {
    const newErrors = {
      cardFullName: '',
      cardPhone: '',
      cardDeliveryAddress: ''
    };
    let isValid = true;

  
    if (!cardData!.cardFullName || !fullNameRegex.test(cardData!.cardFullName)) {
      newErrors.cardFullName = 'ФИО должно состоять из трёх слов';
      isValid = false;
    }
    if (!cardData!.cardPhone || !phoneRegex.test(cardData!.cardPhone)) {
      newErrors.cardPhone = 'Пожалуйста, вводите только цифры, пробелы, а также символы - или +';
      isValid = false;
    }
    // if (!cardData!.cardDeliveryAddress || !addressRegex.test(cardData!.cardDeliveryAddress)) {
    //   newErrors.cardDeliveryAddress = 'Адрес доставки должен содержать не менее 10 символов';
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };
//!-----------------------------------------------------------

const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setNewPhoto(file);
    setPhotoPreview(URL.createObjectURL(file)); // Для предварительного просмотра
  }
};


const handleSubmitNewPhoto = async (event: React.FormEvent) => {
  event.preventDefault();  
  if (!clientId) {
    console.error('ID клиента отсутствует');
    return; // Прерываем выполнение, если clientId отсутствует
  }
  try {
    // console.log('обновление ФОТКЭ');
     // Создание FormData объекта
  const formData = new FormData();
  formData.append('photo', newPhoto);
  formData.append('cardId', clientId); // ID карточки
  // Отправка запроса на добавление карточки
 await client.post('/card/newphoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Указываем заголовок для multipart данных
    },
  });
  window.location.reload();
  // console.log("response.data фотки", response.data);
} catch (error) {
  console.error('Ошибка добавления карточки:', error);
}
};


const handleSaveChanges = async () => {
  if (!validateForm()) return; // Если форма не валидна, не отправляем данные

  try {
    await client.put(`/card/${clientId}`, cardData);
    alert('Карточка успешно сохранена');
    setIsEditing(false); // Выходим из режима редактирования после сохранения
    window.location.reload();
  } catch (error) {
    console.error('Ошибка при сохранении карточки', error);
  }
};

//!-----------------------------------------------------------

  const handleChange = (field: keyof CardData, value: string | boolean) => {
    setCardData((prevData) => ({
      ...prevData!,
      [field]: value
    }));
  };

  //!это для смены фотки


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
        
        {/* это новое!! */}
        <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{    
          marginBlockStart: 5         
        }}
        >
        <Button sx={{backgroundColor: "#ab47bc", borderRadius: 20, fontSize:30 }} variant="contained">
            <Link to="/clientlist" style={{ textDecoration: "none", color: "inherit" }}>
              Все карточки
            </Link>
          </Button>
          <Button sx={{ marginLeft: 70, backgroundColor: "#ab47bc", borderRadius: 20, fontSize:30 }} variant="contained" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Отмена' : 'Редактировать карточку'}
          </Button>
          {isEditing && (
            <Button sx={{ marginLeft: 2, backgroundColor: "#4caf50", borderRadius: 20, fontSize:30 }} variant="contained" onClick={handleSaveChanges}>
              ГОТОВО
            </Button>
          )}

        </Box> 

        <Typography variant="h4" textAlign="center" color="#4a148c">
          Карточка клиента 
          <FormControlLabel sx={{marginLeft:10}}
              control={
                <Checkbox
                checked={cardData.card_IsChecked}
                onChange={(e) => handleChange('card_IsChecked', e.target.checked)}
                  disabled
                  sx={{
                    width: 30,  // Ширина чекбокса
                    height: 30, // Высота чекбокса
                    color: '#212121',
                    
                    '& .MuiSvgIcon-root': {
                      fontSize: 35, // Размер иконки внутри чекбокса
                      // color: "#00c853"
                    },
                  }}
                />
              }
              label=" "
            />
        </Typography>

        <Box 
        display="flex"         
        justifyContent="space-between"  
        alignItems="flex-start">

          {/* Левый блок с изображением */}
          
          <Box 
              display="flex" 
              flexDirection="column"
              justifyContent="center" 
              alignItems= "center"
              maxWidth="50%" 
              marginX= 'auto'
            >
        
              <Box 
                display="flex" 
                flexDirection="column"
                justifyContent="center" 
                alignItems="center" 
                textAlign="center" 
                marginBottom={2}
                marginRight={2}
                width="100%"
                height="100%"
              > 

              {isEditing ? (
                <>   
                <div><h3>Предыдущее фото:</h3> </div>
                <img 
                 src={`${baseUrl}${cardData.cardPhoto}`} 
                 alt={`Фото клиента ${cardData.cardFullName}`} 
                 style={{
                   width: '50%', 
                   height: 'auto', 
                   maxWidth: '100%', 
                   maxHeight: '100%', 
                   objectFit: 'contain'
                 }} 
               />
              </>                
              
              ) : (
                <img 
                src={`${baseUrl}${cardData.cardPhoto}`} 
                alt={`Фото клиента ${cardData.cardFullName}`} 
                style={{
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain'
                }} 
              />
              ) }



              
              
          </Box> 
            <Box 
            display="flex" 
          
            >
    {isEditing && (
      <form onSubmit={handleSubmitNewPhoto}> 

            <Box width={800} marginLeft={50}>
              <Box 
              display="flex" 
               flexDirection="column"
              justifyContent="center" 
              alignItems="center" 
              textAlign="center"              
              width="50%"               
              marginBottom={2}
              >
                {/* Предпросмотр фото */}
                {photoPreview && (
                  <Box mt={2}>
                    <div><h3>Новое фото: </h3> </div>
                   
                    <img 
                    src={photoPreview} 
                    style={{
                      width: '100%', 
                      height: 'auto', 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain'
                    }} 
                    alt="Предпросмотр фото" 
                  
                    />
                  </Box>
                )}
                {/* Поле для загрузки нового фото */}
                {isEditing && (
                  <Box width="40%" textAlign="center" marginBottom={2}>
                  <FormControl fullWidth margin="normal">                   
                    <label htmlFor="photo-upload">
                      <CustomInput
                        id="photo-upload"
                        type="file"
                        onChange={handlePhotoChange}
                        accept="image/*" // Только изображения
                      />
                      <Button
                        variant="contained"
                        component="span"
                        
                        sx={{
                          width:'300px',
                          fontSize: '16px',
                          backgroundColor: '#ba68c8',
                          color: '#fff',
                          marginTop: 2,
                          borderRadius: 20,
                        }}
                      >                       
                        {cardData.cardPhoto ? 'Загрузить новое фото' : 'Добавить фото'}
                      </Button>
                      <Button
                          type="submit" color="success" variant="contained"
                          sx={{
                            fontSize: 20,
                            marginTop: 2,
                            marginBottom: 2,
                            width: "300px",
                            borderRadius: 20,
                            backgroundColor: '#8bc34a'
                          }}    
                               
                        >              
                          Обновить фото
                        </Button>
                    </label>
                  </FormControl>
                  </Box>
                ) }
              </Box>
            </Box>
            </form>
         )}
        </Box>
            


          </Box>

    {/* Правый блок с TextField */}

          <Box width="50%">
            <TextField
              fullWidth
              margin="normal"
              label="Номер клиента"
              variant="outlined"
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: true}}}
              value={`AP-${clientId}`}
              
            />
            <TextField
              fullWidth
              margin="normal"
              label="ФИО клиента"
              variant="outlined"
              value={cardData.cardFullName}
              onChange={(e) => handleChange('cardFullName', e.target.value)}
              error={!!errors.cardFullName}
              helperText={errors.cardFullName}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Телефон клиента"
              variant="outlined"
              value={cardData.cardPhone}
              onChange={(e) => handleChange('cardPhone', e.target.value)}
              error={!!errors.cardPhone}
              helperText={errors.cardPhone}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}}
            />

            <TextField
              fullWidth multiline
              margin="normal"
              label="Основные диагнозы"
              variant="outlined"
              placeholder="Основные диагнозы"
              value = {cardData.cardBasicDiagnosis}
              onChange={(e) => handleChange ('cardBasicDiagnosis', e.target.value)}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}}
            />
            <TextField
              fullWidth multiline
              margin="normal"
              label="Жалобы на здоровье"
              variant="outlined"
              placeholder="Жалобы на здоровье"
              value = {cardData.cardHealthComplaints}              
              onChange={(e) => handleChange ('cardHealthComplaints', e.target.value)}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Адрес доставки"
              variant="outlined"
              value={cardData.cardDeliveryAddress}
              onChange={(e) => handleChange('cardDeliveryAddress', e.target.value)}
              error={!!errors.cardDeliveryAddress}
              helperText={errors.cardDeliveryAddress}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{input: {readOnly: !isEditing}}}
            />

            {/*======> Удобный месенджер" */}

            <TextField
             fullWidth
             margin="normal"
             label="Удобный мессенджер "
             variant="outlined"
             value={cardData.cardClientNumber}
             onChange={(e) => handleChange ('cardClientNumber', e.target.value)}
             sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
             slotProps={{input: {readOnly: !isEditing}}}            
             
            />



             <FormControl fullWidth margin="normal">
            <Select         
              value={ cardData.cardFinalDiagnosis }               
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{ input: { readOnly: true } }}
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
            <Select           
              value={ cardData.cardOilFromList} 
              // Если новое значение выбрано, оно будет отображаться
             
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{ input: { readOnly: true } }}
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
                {/* <MenuItem value={"не выбрано"}>не выбрано</MenuItem> */}
              </Select>
            </FormControl>
            <Typography variant="h5"  color="#4a148c" gap={10}> Номер рецепта:</Typography>
            <TextField
              fullWidth 
              margin="normal"              
              variant="outlined"              
              value = {cardData.cardRecepi}
              slotProps={{ input: { readOnly: true } }}              
            />

            {/* тут должет быть компонент с картинками */}

        <Box display="flex" justifyContent="center" alignItems="center">
          {/* Левое изображение и селекторы, отображаются только если earData существует */}
          {earData && (
            <Box textAlign="center" m={2}>
              <Typography>Правое ухо</Typography>
              <img src={getImageSrc(leftPosition)} alt="Левое изображение" width="300" />
              <FormControl fullWidth margin="normal">
                <Select
                  value={leftPosition || earData.earLeft_isTop}
                  slotProps={{ input: { readOnly: true } }}  
                >
                  <MenuItem value="лево-верх">Верхняя точка</MenuItem>
                  <MenuItem value="лево-низ">Нижняя точка</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Select
                  value={leftMode || earData.earLeft_isDay}
                  slotProps={{ input: { readOnly: true } }}  
                  sx={{
                    backgroundColor: leftMode === 'день' ? '#b2dfdb' : '#6a1b9a',
                    color: leftMode === 'день' ? 'black' : 'white',
                  }}
                >
                  <MenuItem value="день">День</MenuItem>
                  <MenuItem value="ночь">Ночь</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          
          

          {/* Правое изображение и селекторы, отображаются только если earData существует */}
          {earData && (
            <Box textAlign="center" m={2}>
              <Typography>Левое ухо</Typography>
              <img src={getImageSrc(rightPosition)} alt="Правое изображение" width="300" />
              <FormControl fullWidth margin="normal">
                <Select
                  value={rightPosition || earData.earRight_isTop}
                  slotProps={{ input: { readOnly: true } }}  
                >
                  <MenuItem value="право-верх">Верхняя точка</MenuItem>
                  <MenuItem value="право-низ">Нижняя точка</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Select
                  value={rightMode || earData.earRight_isDay}
                  slotProps={{ input: { readOnly: true } }}  
                  sx={{
                    backgroundColor: rightMode === 'день' ? '#b2dfdb' : '#6a1b9a',
                    color: rightMode === 'день' ? 'black' : 'white',
                  }}
                >
                  <MenuItem value="день">День</MenuItem>
                  <MenuItem value="ночь">Ночь</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
          </Box>
        </Box>      
      </Box>
    </Box>
  );
};

export default ClientCardModeratorView;
