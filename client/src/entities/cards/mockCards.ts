// src/entities/cards/mockCards.ts
import type { Card } from "./types";

export const mockCards: Card[] = [
  {
    cardUser_Id: 1,
    cardClientNumber: "AP-00012",
    cardPhoto:
      "https://upload.wikimedia.org/wikipedia/ru/b/b9/Princess_Fiona.png",
    cardFullName: "Фиона Гарольдовна Принцессовна",
    cardPhone: "8-900-888-88-88",
    cardBasicDiagnosis: "сонливость весь день",
    cardHealthComplaints: "ничего не хочу",
    cardDeliveryAddress: "Тестовая обл. с.Тестово, ул.Тестовых, д.8",
    cardFinalDiagnosis: "3",
    cardOilFromList: "2",
    cardRecepi: "32",
    card_IsChecked: true,
  },
  {
    cardUser_Id: 2,
    cardClientNumber: "AP-00035",
    cardPhoto:
      "https://upload.wikimedia.org/wikipedia/ru/4/4d/Shrek_%28character%29.png",
    cardFullName: "Шрек Болотович Оггр",
    cardPhone: "8-800-000-00-00",
    cardBasicDiagnosis: "приступ лени",
    cardHealthComplaints: "компьютерные игры",
    cardDeliveryAddress: "село Проверово, ул.Проверялкиных, д.3",
    cardFinalDiagnosis: "1",
    cardOilFromList: "4",
    cardRecepi: "14",
    card_IsChecked: true,
  },
  {
    cardUser_Id: 2,
    cardClientNumber: "AP-00041",
    cardPhoto:
      "https://upload.wikimedia.org/wikipedia/ru/thumb/3/38/%D0%9E%D1%81%D1%91%D0%BB_%28%D0%A8%D1%80%D0%B5%D0%BA%29.png/250px-%D0%9E%D1%81%D1%91%D0%BB_%28%D0%A8%D1%80%D0%B5%D0%BA%29.png",
    cardFullName: "Осел Драконович Серый",
    cardPhone: "8-800-000-00-55",
    cardBasicDiagnosis: "постоянно косячит",
    cardHealthComplaints: "невнимательный",
    cardDeliveryAddress: "г.Ошибаево, Ошибаевская обл, ул.Ошибкина, д.10",
    cardFinalDiagnosis: null,
    cardOilFromList: null,
    cardRecepi: null,
    card_IsChecked: false,
  },
];
