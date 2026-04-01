import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';

import client from '../../../api/client.ts';

import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { useNavigate } from 'react-router-dom';

interface Client {
  id: number;
  cardUser_Id: string;
  cardClientNumber: string;
  cardFullName: string;
  cardPhone: string;
  cardBasicDiagnosis: string;
  cardHealthComplaints: string;
  cardDeliveryAddress: string;
  cardFinalDiagnosis: string | undefined;
  cardOilFromList: string | undefined;
  cardRecepi: string | undefined;
  card_IsChecked: boolean;
  createdAt: string;
}

const columnOptions = [
  { id: 'cardClientNumber', label: 'Номер' },
  { id: 'cardFullName', label: 'ФИО' },
  { id: 'cardPhone', label: 'Телефон' },
  { id: 'cardBasicDiagnosis', label: 'Основные диагнозы' },
  { id: 'cardHealthComplaints', label: 'Жалобы' },
  { id: 'cardDeliveryAddress', label: 'Адрес доставки' },
  { id: 'cardFinalDiagnosis', label: 'Диагноз' },
  { id: 'cardOilFromList', label: 'Масло №' },
  { id: 'cardRecepi', label: 'Код рецепта' }, 
  { id: 'createdAt', label: 'Дата создания' },
];

const diagnosListItems = [
  {id: "1", dName: "1. Дисменорея, бесплодие"},
  {id: "2", dName: "2. Миома"},
  {id: "3", dName: "3. Эндометриоз"},
  {id: "4", dName: "4. Кисты яичников"},
  {id: "5", dName: "5. Мужское бесплодие"},
  {id: "6", dName: "6. Простатит"},
  {id: "7", dName: "7. Мастопатия"},
  {id: "8", dName: "8. Аденома предстательной железы"},
  {id: "9", dName: "9. Диагноз тестовый"},
]

const oilListItems = [
  {id: "0", oilName: "№ 0"},
  {id: "1", oilName: "№ 1"},
  {id: "2", oilName: "№ 2"},
  {id: "3", oilName: "№ 3"},
  {id: "4", oilName: "№ 4"},
  {id: "5", oilName: "№ 5"},
  {id: "6", oilName: "№ 6"},
  {id: "7", oilName: "№ 7"},
  {id: "8", oilName: "№ 8"},
  {id: "9", oilName: "№ 9"},
  {id: "01", oilName: "№ 01"},
]

function ClientTableDone() {
  const navigate = useNavigate();   
  const [selectedColumns, setSelectedColumns] = useState(columnOptions.map(col => col.id));

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedColumns(prev =>
      checked ? [...prev, name] : prev.filter(col => col !== name)
    );
  };

  const [clients, setClients] = useState<Client[]>([]);
  
//гетаем все карточки
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await client.get('/client/list/done');
        setClients(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных по запросу клиент листа:', error);
      }
    };

    fetchClients();
  }, []);

   // Функция для удаления карточки 
   const handleDeleteClient = async (clientId: number) => {
    try {
      // Отправляем запрос на сервер для удаления клиента по ID
      await client.delete(`/client/${clientId}`);
      // После успешного удаления обновляем состояние, удаляя клиента с фронтенда
      setClients(clients.filter(client => client.id !== clientId));
      // console.log(`Клиент с ID: ${clientId} успешно удален`);
    } catch (error) {
      console.error(`Ошибка при удалении клиента с ID: ${clientId}`, error);
    }
  };

 // Подтверждение удаления клиента
 const confirmDelete = (client: Client) => {
  const confirmMessage = `
    Карточка клиента с следующими данными будет удалена:
    - Номер: ${client.cardClientNumber}
    - ФИО: ${client.cardFullName}
    - Телефон: ${client.cardPhone}
    Вы уверены, что хотите продолжить?
  `;

  if (window.confirm(confirmMessage)) {
    handleDeleteClient(client.id);
  }
};

   // Функция для просмотра карточки 
   const handleViewClient = async (clientId: number) => {
    // console.log('VIEW CARD', clientId);  
    navigate(`/viewcard/${clientId}`);   
  };

  return (
    <>
      <FormGroup row sx={{ justifyContent: 'center', marginBottom: '20px' }}>
        {columnOptions.map((column) => (
          <FormControlLabel
            key={column.id}
            control={
              <Checkbox
                checked={selectedColumns.includes(column.id)}
                onChange={handleColumnChange}
                name={column.id}
              />
            }
            label={column.label}
          />
        ))}
      </FormGroup>

      <TableContainer component={Paper} sx={{ 
        maxWidth: '95%', 
        margin: '16px auto', 
        padding: '16px', 
        overflowX: 'auto'  // Включаем горизонтальный скролл при необходимости
      }}>
        <Table stickyHeader sx={{ minWidth: '80%' }}> {/* Устанавливаем минимальную ширину */}
          <TableHead>
            <TableRow>
              {columnOptions.map((column) =>
                selectedColumns.includes(column.id) && (
                  <TableCell  key={column.id} sx={{ whiteSpace: 'nowrap', backgroundColor: "#e0e0e0", fontSize:"16px" }}>
                    <b>{column.label}</b>
                  </TableCell >
                )
              )}
              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: "#e0e0e0", fontSize:"16px" }}>
                <b>Действия</b>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.cardUser_Id}
                sx={{
                  backgroundColor: client.card_IsChecked ? 'white' : '#FFCDF0',
                  '&:hover': {
                    backgroundColor: '#e1bee7', // цвет выделения при наведении
                    cursor: 'pointer', // указатель мыши
                    transition: 'background-color 0.2s ease-in-out', // плавный переход
                   
                  },
                }}
              >
                {selectedColumns.includes('cardClientNumber') && <TableCell>{`AP-${client.id}`}</TableCell>}
                {selectedColumns.includes('cardFullName') && <TableCell>{client.cardFullName}</TableCell>}
                {selectedColumns.includes('cardPhone') && <TableCell>{client.cardPhone}</TableCell>}
                {selectedColumns.includes('cardBasicDiagnosis') && <TableCell>{client.cardBasicDiagnosis}</TableCell>}
                {selectedColumns.includes('cardHealthComplaints') && <TableCell>{client.cardHealthComplaints}</TableCell>}
                {selectedColumns.includes('cardDeliveryAddress') && <TableCell>{client.cardDeliveryAddress}</TableCell>}
                {selectedColumns.includes('cardFinalDiagnosis') && <TableCell>
                  {
                    diagnosListItems.find((diagnosListItems) => 
                    diagnosListItems.id === client.cardFinalDiagnosis)?.dName || '-'
                    }
                  </TableCell>}
                {selectedColumns.includes('cardOilFromList') && <TableCell>
                  {
                      oilListItems.find((oilListItems) =>
                      oilListItems.id ===client.cardOilFromList)?.oilName || '-'
                    }
                  </TableCell>}
                {selectedColumns.includes('cardRecepi') && <TableCell>{client.cardRecepi}</TableCell>}
                {selectedColumns.includes('createdAt') && <TableCell>{
                  new Date(client.createdAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}</TableCell>}

                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Box display={'flex'} gap={2}>
                    <Button 
                      variant="contained" 
                      onClick={() => handleViewClient(client.id)}
                      sx={{ textTransform: 'none', backgroundColor:"#ab47bc", borderRadius: 20  }}
                    >
                      <OpenInNewIcon/>
                    </Button>
                    <Button 
                      variant="contained" 
                      color="warning"                    
                      onClick={() => confirmDelete(client)} // Вызов confirmDelete для подтверждения удаления карточки                                  
                      sx={{ textTransform: 'none' , borderRadius: 20  }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ClientTableDone;
