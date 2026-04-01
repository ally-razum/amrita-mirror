import {
  Box,
  
  TextField,
  InputLabel,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // для навигации

import { mockCards } from "../../../entities/cards/mockCards.ts";

console.log(mockCards);

function ClientCardAdminView() {
  const { cardId } = useParams<{ cardId: string }>();

  const card = mockCards.find((c) => c.id === Number(cardId));
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        maxWidth: "100vw",
        padding: 2,
        marginX: "auto",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Box
        flexDirection="column"
        width="95vw"
        padding={3}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginBlockStart: 5,
          }}
        ></Box>

        <Typography variant="h4" textAlign="center" color="#4a148c" gap={10}>
          Карточка клиента
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxWidth="50%"
            marginX="auto"
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
            ></Box>
            <Link to="/dashboard/cards">Назад к таблице</Link>
            <Box display="flex">
              <img className="image" src={card?.cardPhoto} alt="Photo" />
            </Box>
          </Box>

          <Box marginLeft={5}>
            <TextField
              fullWidth
              margin="normal"
              label="Номер клиента"
              variant="outlined"
              value={`AP-${card?.id}`}
              slotProps={{ input: { readOnly: true } }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="ФИО клиента"
              variant="outlined"
              value={card?.cardFullName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Телефон клиента"
              variant="outlined"
              value={card?.cardPhone}
            />

            <TextField
              fullWidth
              multiline
              margin="normal"
              label="Основные диагнозы"
              variant="outlined"
              placeholder="Основные диагнозы"
              value={card?.cardFinalDiagnosis}
            />
            <TextField
              fullWidth
              multiline
              margin="normal"
              label="Жалобы на здоровье"
              variant="outlined"
              placeholder="Жалобы на здоровье"
              value={card?.cardHealthComplaints}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Адрес доставки"
              variant="outlined"
              value={card?.cardDeliveryAddress}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="label">Диагнозы</InputLabel>
              <Select
                labelId="label"
                id="select"
                label="Диагнозы"
                value={card?.cardFinalDiagnosis}
              >
                <MenuItem value={"-"}>Не выбрано</MenuItem>

                <MenuItem value={1}>1 Дисменорея, бесплодие</MenuItem>
                <MenuItem value={2}>2 Миома</MenuItem>
                <MenuItem value={3}>3 Эндометриоз</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="label">Номер масла</InputLabel>
              <Select
                labelId="label"
                id="select"
                label="Номер масла"
                value={card?.cardOilFromList}
              >
                <MenuItem value={"-"}>Не выбрано</MenuItem>
                <MenuItem value={0}>Масло № 0</MenuItem>
                <MenuItem value={1}>Масло № 1</MenuItem>
                <MenuItem value={2}>Масло № 2</MenuItem>
                <MenuItem value={3}>Масло № 3</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h5" color="#4a148c" gap={10}>
              {" "}
              Номер рецепта:
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              value={card?.cardRecepi}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ClientCardAdminView;
