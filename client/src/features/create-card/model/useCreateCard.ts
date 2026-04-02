import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Card } from "../../../entities/card/model/types";
import { useDispatch } from "react-redux";
import { addCard } from "../../../entities/card/model/cardsSlice";
import type { AppDispatch } from "../../../app/store/store";

function useCreateCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<Partial<Card>>({
    cardFullName: "",
    cardPhone: "",
    cardDeliveryAddress: "",
    cardHealthComplaints: "",
    cardFinalDiagnosis: "",
    cardOilFromList: "",
    cardRecepi: "",
    card_IsChecked: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Card, string>>>({});

  //обновление полей карточки
  const handleChange = (field: keyof Card, value: string | boolean) => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "cardFinalDiagnosis" || field === "cardOilFromList") {
        updated.cardRecepi = `${updated.cardFinalDiagnosis ?? ""}${updated.cardOilFromList ?? ""}`;
      }

      return updated;
    });
  };

  //загрузка фотки
  const handlePhotoChange = (file: File) => {
    setPhotoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof Card, string>> = {};
    let isValid = true;

    const fullNameRegex = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
    const phoneRegex = /^[\d\s\-+]*$/;
    const addressRegex = /^[A-Za-zА-Яа-я0-9\s,.-]{10,}$/;

    if (!fullNameRegex.test(data.cardFullName ?? "")) {
      newErrors.cardFullName = "ФИО должно состоять из трёх слов";
      isValid = false;
    }
    if (!phoneRegex.test(data.cardPhone ?? "")) {
      newErrors.cardPhone = "Только цифры, пробелы, - или +";
      isValid = false;
    }
    if (!addressRegex.test(data.cardDeliveryAddress ?? "")) {
      newErrors.cardDeliveryAddress = "Минимум 10 символов";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) {
      setErrorMessage("Проверьте данные карточки");
      return;
    }
    setErrorMessage("");
    dispatch(addCard(data as Card));
    navigate("/dashboard/cards");
  };

  return {
    data,
    photoPreview,
    errors,
    errorMessage,
    handleChange,
    handlePhotoChange,
    handleSubmit,
  };
}

export default useCreateCard;
