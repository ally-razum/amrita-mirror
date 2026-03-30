import { Box, Typography, List, ListItemText, ListItem} from '@mui/material';

//это потом будем тянуть из бд
const entities = [
    { id: 1, name: 'Масло № 0' },
    { id: 2, name: 'Масло № 1' },
    { id: 3, name: 'Масло № 2' },
    { id: 4, name: 'Масло № 3' },
    { id: 5, name: 'Масло № 4' },
    { id: 6, name: 'Масло № 5' },
    { id: 7, name: 'Масло № 6' },
    { id: 8, name: 'Масло № 7' },
    
  ];


function OilList (): JSX.Element {
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
        МАСЛА
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

export default OilList