
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';






const columnOptions = [
  { id: 'id', label: 'id' },
  { id: 'userFullName', label: 'ФИО' },
  { id: 'userEmail', label: 'Email' },
  { id: 'userLogin', label: 'Логин' },
//   { id: 'userPassword', label: 'Пароль' },
  { id: 'userRole', label: 'Роль' },
  { id: 'createdAt', label: 'Дата создания' },

];

function UserTable() {
  const navigate = useNavigate();   
  const [selectedColumns, setSelectedColumns] = useState(columnOptions.map(col => col.id));

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedColumns(prev =>
      checked ? [...prev, name] : prev.filter(col => col !== name)
    );
  };


  
//гетаем все карточки
  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       const response = await client.get('/users/list');
  //       setUsers(response.data); // Устанавливаем полученные данные в состояние
  //     } catch (error) {
  //       console.error('Ошибка при загрузке данных по запросу клиент листа:', error);
  //     }
  //   };

  //   fetchClients();
  // }, []);

   // Функция для удаления карточки 
  //  const handleDeleteUser = async (userId: number) => {
  //   try {
  //     // Отправляем запрос на сервер для удаления клиента по ID
  //     await client.delete(`/users/${userId}`);
  //     // После успешного удаления обновляем состояние, удаляя клиента с фронтенда
  //     setUsers(users.filter(user => user.id !== userId));
  //     // console.log(`Users с ID: ${userId} успешно удален`);
  //   } catch (error) {
  //     console.error(`Ошибка при удалении usera с ID: ${userId}`, error);
  //   }
  // };

 // Подтверждение удаления клиента
//  const confirmDelete = (programmUser: User) => {
//   const confirmMessage = `
//     Пользователь ${programmUser.userFullName} со следующими данными будет удален:
//     id: ${programmUser.id}
//     ФИО: ${programmUser.userFullName}
//     роль: ${programmUser.userRole}

//     Вы уверены, что хотите продолжить?
//   `;

//   if (window.confirm(confirmMessage)) {
//     handleDeleteUser(programmUser.id);
//   }
// };

   // Функция для просмотра карточки 
   const handleViewUser = async (userId: number) => {
    // console.log('VIEW CARD', userId);  
    navigate(`/users/${userId}`);   
  };

  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        Все зарегистрированные пользователи арома - кабинета
      </Typography>

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
                    {column.label}
                  </TableCell >
                )
              )}
              <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: "#e0e0e0", fontSize:"16px" }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={u.id}
              sx={{                
                '&:hover': {
                  backgroundColor: '#e1bee7', // цвет выделения при наведении
                  cursor: 'pointer', // указатель мыши
                  transition: 'background-color 0.2s ease-in-out', // плавный переход
                },
              }}>
                {selectedColumns.includes('id') && <TableCell>{u.id}</TableCell>}
                {selectedColumns.includes('userFullName') && <TableCell>{u.userFullName}</TableCell>}
                {selectedColumns.includes('userEmail') && <TableCell>{u.userEmail}</TableCell>}
                {selectedColumns.includes('userLogin') && <TableCell>{u.userLogin}</TableCell>}              
                {selectedColumns.includes('userRole') && <TableCell>{u.userRole}</TableCell>}
                {selectedColumns.includes('createdAt') && <TableCell>{
                  new Date(u.createdAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}</TableCell>}

                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Box display={'flex'} gap={2}>
                  {index >= 1 ? (
                    <Button 
                      variant="contained" 
                      onClick={() => handleViewUser(u.id)}
                      sx={{ textTransform: 'none', backgroundColor:"#ab47bc", borderRadius: 20  }}
                    >
                      <OpenInNewIcon/>
                    </Button>
                  ) : (
                    <Button 
                    variant="contained" 
                    sx={{ textTransform: 'none', backgroundColor:"#ab47bc", borderRadius: 20  }}>
                      <DoNotDisturbAltIcon />
                    </Button>
                  )}
                      {index >= 3 && (
                      <Button
                        variant="contained"
                        color="warning"
                        // Вызов confirmDelete для подтверждения удаления
                        sx={{ textTransform: 'none', borderRadius: 20 }}
                      >
                        <DeleteIcon />
                        
                      </Button>
                    )}
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

export default UserTable;
