import { Box, Typography, List, ListItemText, ListItem} from '@mui/material';

//это потом будем тянуть из бд
const entities = [
    { id: 1, name: 'Дисменорея, бесплодие' },
    { id: 2, name: 'Миома ' },
    { id: 3, name: 'Эндометриоз ' },
    { id: 4, name: 'Кисты яичников' },
    { id: 5, name: 'Мужское бесплодие' },
    { id: 6, name: 'Простатит' },
    { id: 7, name: 'Мастопатия' },
    { id: 8, name: 'Аденома предстательной железы' },
    { id: 9, name: 'Диагноз тестовый' },
    
  ];


function DiagnosList (): JSX.Element {
    return (
<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Диагнозы
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        {entities.map((entity) => (
          <ListItem key={entity.id}>
            <ListItemText primary={entity.name} />
          </ListItem>
        ))}
      </List>
    </Box>
    )
}

export default DiagnosList