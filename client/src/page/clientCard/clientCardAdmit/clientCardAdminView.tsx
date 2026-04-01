import { Box, Button, TextField, InputLabel, styled, Typography, FormControl, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // для навигации
import client from '../../../api/client.ts';




const PROD_URL = 'https://aroma-cabinet.amrita.center/api';
const LOCAL_URL = 'http://localhost:4200'
// Кастомный Input для загрузки файла
const CustomInput = styled('input')({
  display: 'none',
});

// Выбор базы URL на основе текущего хоста
const baseUrl = window.location.hostname === 'aroma-cabinet.amrita.center' ? PROD_URL : LOCAL_URL;

interface CardData {
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

function ClientCardAdminView(){
  const { user } = useUser();
  const { clientId } = useParams<{ clientId: string }>(); // Получаем ID клиента из URL
  const [cardData, setCardData] = useState<CardData | null>(null); // Используем интерфейс card
  const [loading, setLoading] = useState(true);

  const [cardRecepi, setcardRecepi] = useState('');// Итоговый номер рецепта
  const [cardFinalDiagnosis, setcardFinalDiagnosis] = useState('');
  const [cardOilFromList, setcardOilFromList] = useState('')

    //!для замены фото--------------------------------------------
    const [photoPreview, setPhotoPreview] = useState<string>(cardData?.cardPhoto || ''); // Для предварительного просмотра
    const [newPhoto, setNewPhoto] = useState<File  | string | Blob>(''); // Для хранения нового загруженного файла
    
    //!-----------------------------------------------------------
  
  //УШИ!!!!!
  const [earData, setEarData] = useState<EarData | null> (null) // Используем интерфейс ear  
 
  const [leftPosition, setLeftPosition] = useState('left-not'); // где точка левая
  const [rightPosition, setRightPosition] = useState('right-not'); // где точка правая
  const [leftMode, setLeftMode] = useState('не-выбрано');
  const [rightMode, setRightMode] = useState('не-выбрано');


  const [isEditing, setIsEditing] = useState(false); // Состояние редактирования
  const [errors, setErrors] = useState({
    cardFullName: '',
    cardPhone: '',
    cardDeliveryAddress: '',
    cardRecepi: ''
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

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await client.get<CardData>(`/client/${clientId}`);
        setCardData(response.data);
        setcardFinalDiagnosis(response.data.cardFinalDiagnosis || ''); // Инициализируем состояние
        setcardOilFromList(response.data.cardOilFromList || '');
        // console.log(response.data, 'это то что попало в response.data');
        
        setLoading(false);
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
      cardDeliveryAddress: '',
      cardRecepi: ''
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

  const handleSaveChanges = async () => {
    if (!validateForm()) return; // Если форма не валидна, не отправляем данные
    const updatedCardData = {
      ...cardData,
      cardRecepi: cardRecepi, // Добавляем номер рецепта в cardData
      cardFinalDiagnosis: cardFinalDiagnosis || cardData?.cardFinalDiagnosis,
      cardOilFromList: cardOilFromList || cardData?.cardOilFromList,
      card_IsChecked: user?.userRole === 'user' ? true : cardData.card_IsChecked, // Устанавливаем true, если роль 'user'
    };
    
    const positionModeData = {
      earCard_Id: clientId, // передаем cardId, полученный из первого запроса
      earLeft_isTop: leftPosition === 'лево-верх', // передаем как boolean
      earRight_isTop: rightPosition === 'право-верх', // передаем как boolean
      earLeft_isDay: leftMode === 'день', // передаем как boolean
      earRight_isDay: rightMode === 'день', // передаем как boolean
    };

    try {
      await client.put(`/card/${clientId}`, updatedCardData); // Запрос на обновление основной информации о карточке
      await client.put(`/card/positions/${clientId}`, positionModeData)  // Запрос на обновление данных ушных позиций
      alert('Карточка успешно сохранена');
      // console.log(cardData, 'это что мы отправили после обновления');
      // console.log({ updatedCardData, positionModeData }, 'отправленные данные после обновления');

      setIsEditing(false); // Выходим из режима редактирования после сохранения
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при сохранении карточки', error);
    }
  };

  const handleChange = (field: keyof CardData, value: string | boolean) => {
    setCardData((prevData) => ({
      ...prevData!,
      [field]: value
    }));
  };

  const handleLeftPositionChange = (value: string) => {
    setLeftPosition(value);
    // Устанавливаем противоположное значение для rightPosition
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

        <Typography variant="h4" textAlign="center" color="#4a148c" gap={10} >
          Карточка клиента 
          <FormControlLabel sx={{marginLeft:10}}
              control={
                <Checkbox
                checked={cardData.card_IsChecked}
                onChange={(e) => handleChange('card_IsChecked', e.target.checked)}
                disabled={!isEditing}                 
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
      display="flex">
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
          <Box marginLeft={5}>
            <TextField
              fullWidth
              margin="normal"
              label="Номер клиента"
              variant="outlined"
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              value={`AP-${clientId}`}
              slotProps={{ input: { readOnly: true } }}

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
            <InputLabel id="label">Диагнозы</InputLabel>
            <Select  
            labelId="label"
            id="select"
            label="Диагнозы"        
              value={cardFinalDiagnosis|| cardData.cardFinalDiagnosis } 
              // Отображение значения с бэка или текущего выбранного значения
              onChange={(e) => {
                const newDiagnos = e.target.value
                handleChange('cardFinalDiagnosis', newDiagnos)
                setcardFinalDiagnosis(newDiagnos); // Обновляем локальное состояние
                handleDiagnosisChange(e); // Вызываем функцию для обновления рецепта
              }}
              // displayEmpty
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{ input: { readOnly: !isEditing } }}
            >
                <MenuItem value={"-"}>Не выбрано</MenuItem>
                
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
              value={cardOilFromList || cardData.cardOilFromList} 
              // Если новое значение выбрано, оно будет отображаться
              onChange={(e) => {
                const newOil = e.target.value;
                handleChange('cardOilFromList', newOil)
                setcardOilFromList(newOil); // Обновляем локальное состояние
                handleOilChange(e); // Вызываем функцию для обновления рецепта
              }}
              sx={{ input: { color: isEditing ? 'black' : '#4a148c' } }} 
              slotProps={{ input: { readOnly: !isEditing } }}
            >
                <MenuItem value={"-"}>Не выбрано</MenuItem>
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
            
            <Typography variant="h5"  color="#4a148c" gap={10}> Номер рецепта:</Typography>
            <TextField 
              fullWidth 
              margin="normal"             
              variant="outlined"                     
              value = {cardRecepi || cardData.cardRecepi}
              error={!!errors.cardPhone}
              helperText={errors.cardPhone}
              slotProps={{ input: { readOnly: true } }}
              onChange={(e) => {
                const newRec = e.target.value
                handleChange('cardRecepi', newRec)
                setcardRecepi(newRec)}   
              }
            />

            {/* тут должет быть компонент с картинками */}

            <Box display="flex" justifyContent="center" alignItems="center">
          {/* Левое изображение и селекторы, отображаются только если earData существует */}
          {(earData || isEditing) && (
            <>
            <FormControl 
             margin="normal"
            sx={{
              display: 'inline-block',  // Чтобы не растягивался на всю ширину
              padding: '4px 12px',      // Размеры padding
              with: "20px",
              
             
              color: '#fff'            // Маржин для отступов
            }}>
                <Select
                
                  value={leftPosition || earData?.earLeft_isTop}
                  onChange={(e) => handleLeftPositionChange(e.target.value as string)}
                  disabled={!isEditing}
                >
                  <MenuItem value="лево-верх"><b>Верхняя точка</b></MenuItem>
                  <MenuItem value="лево-низ"><b>Нижняя точка</b></MenuItem>
                  <MenuItem value="left-not" disabled><b>Не выбрано</b></MenuItem>
                </Select> 
              </FormControl>
            <Box textAlign="center" m={2}>
              <Typography 
                  variant="h5" 
                  marginLeft={10} 
                  sx={{color:"#4a148c"}}>
                    Правое ухо
              </Typography>
              
              <img src={getImageSrc(leftPosition)} alt="Левое изображение" width="300" />
              
              <FormControl fullWidth margin="normal">
                <Select
                  value={leftMode || earData?.earLeft_isDay}
                  onChange={(e) => handleLeftModeChange(e.target.value as string)}
                  disabled={!isEditing}
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
            </>
            
          )}
          {/* Правое изображение и селекторы, отображаются только если earData существует */}
          {(earData || isEditing)  && (
            <Box textAlign="center" m={2}>
              <Typography 
                  variant="h5" 
                  marginLeft={10} 
                  sx={{color:"#4a148c"}}>
                    Левое ухо
              </Typography>
              <img src={getImageSrc(rightPosition)} alt="Правое изображение" width="300" />
              <FormControl fullWidth margin="normal"
               sx={{ display: 'none' }}>
                <Select
                  value={rightPosition || earData?.earRight_isTop}
                  onChange={(e) => handleRightPositionChange(e.target.value as string)}
                  disabled={!isEditing}
                >
                  <MenuItem value="право-верх">Верхняя точка</MenuItem>
                  <MenuItem value="право-низ">Нижняя точка</MenuItem>
                  <MenuItem value="right-not">Не выбрано</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Select
                  value={rightMode || earData?.earRight_isDay}
                  onChange={(e) => handleRightModeChange(e.target.value as string)}
                  disabled={!isEditing}
                  sx={{
                    backgroundColor: rightMode === 'день' ? '#b2dfdb' : '#6a1b9a',
                    color: rightMode === 'день' ? 'black' : 'white',
                  }}
                >
                  <MenuItem value="день">День</MenuItem>
                  <MenuItem value="ночь">Ночь</MenuItem>
                  <MenuItem value="не-выбрано" disabled>Не выбрано</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
          </Box>
        </Box>
        {/* тут должет быть компонент с картинками */} 



      </Box>
      </Box>
    
  );
};

export default ClientCardAdminView;
