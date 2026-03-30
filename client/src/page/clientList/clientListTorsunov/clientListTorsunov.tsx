import client from '@/api/client.ts';
import React, { useState, useEffect } from 'react';
import {
   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, FormControlLabel, FormGroup, Box
} from '@mui/material';

// import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
  { id: 'cardBasicDiagnosis', label: 'Основные диагнозы' },
  { id: 'cardHealthComplaints', label: 'Жалобы' },
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

function ClientTableTorsunov(): JSX.Element {
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState(columnOptions.map(col => col.id));
  const [clients, setClients] = useState<Client[]>([]);

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedColumns(prev => checked ? [...prev, name] : prev.filter(col => col !== name));
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await client.get('/client/list');
        setClients(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных по запросу клиент листа:', error);
      }
    };
    fetchClients();
  }, []);



  const handleViewClient = (clientId: number) => {
    navigate(`/viewcard/${clientId}`);
  };

  return (
    <>
      
      {/* Фиксированный блок с выбором колонок */}
      <Box sx={{
        position: 'sticky',
        top: 65,
        zIndex: 10,
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        <FormGroup row sx={{ justifyContent: 'center', marginBottom: '10px' }}>
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
      </Box>


      {/* Контейнер для таблицы с прокруткой только данных */}
      <TableContainer component={Paper} sx={{ maxWidth: '95%', margin: '16px auto', padding: '16px' }}>
        <Box sx={{ maxHeight: '1000px', overflowY: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: '80%' }}>
            <TableHead>
              <TableRow>
                {columnOptions.map((column) =>
                  selectedColumns.includes(column.id) && (
                    <TableCell key={column.id} sx={{ whiteSpace: 'nowrap', backgroundColor: "#e0e0e0", fontSize: "16px" }}>
                      <b>{column.label}</b>
                    </TableCell>
                  )
                )}
                
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.cardUser_Id} 
                sx={{
                  backgroundColor: client.card_IsChecked ? 'white' : '#FFCDF0',
                  '&:hover': {
                    backgroundColor: '#e1bee7', // цвет выделения при наведении
                    cursor: 'pointer', // указатель мыши
                    transition: 'background-color 0.2s ease-in-out', // плавный переход
                   
                  },
                }}
                onClick={() => handleViewClient(client.id)}
                >

                  
                  {selectedColumns.includes('cardClientNumber') && <TableCell>{`AP-${client.id}`}</TableCell>}
                  {selectedColumns.includes('cardFullName') && <TableCell>{client.cardFullName}</TableCell>}
                 
                  {selectedColumns.includes('cardBasicDiagnosis') && <TableCell>{client.cardBasicDiagnosis}</TableCell>}
                  {selectedColumns.includes('cardHealthComplaints') && <TableCell>{client.cardHealthComplaints}</TableCell>}
                  
                  {selectedColumns.includes('cardFinalDiagnosis') && 
                  <TableCell>
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
                  {selectedColumns.includes('createdAt') && (
                    <TableCell>{new Date(client.createdAt).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                  )}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
}

export default ClientTableTorsunov;
