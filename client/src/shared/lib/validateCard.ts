import type { Card } from "../../entities/card/model/types";

const fullNameRegex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
const phoneRegex = /^[\d\s\-+]*$/;
const addressRegex = /^[A-Za-zА-Яа-я0-9\s,.-]{10,}$/;

export function validateCard(
  data: Partial<Card>,
): Partial<Record<keyof Card, string>> {
  const errors: Partial<Record<keyof Card, string>> = {};

  if (!fullNameRegex.test(data.cardFullName ?? "")) {
    errors.cardFullName = "ФИО должно состоять из трёх слов";
  }
  if (!phoneRegex.test(data.cardPhone ?? "")) {
    errors.cardPhone = "Только цифры, пробелы, - или +";
  }
  if (!addressRegex.test(data.cardDeliveryAddress ?? "")) {
    errors.cardDeliveryAddress = "Минимум 10 символов";
  }

  return errors;
}
