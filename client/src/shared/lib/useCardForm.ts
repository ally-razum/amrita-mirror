import { useState } from "react";
import type { Card } from "../../entities/card/model/types";

function useCardForm(initialData?: Partial<Card>) {
  const [data, setData] = useState<Partial<Card>>( // не все поля есть, форма в процессе заполнения
    initialData ?? {
      cardFullName: "",
      cardPhone: "",
      cardDeliveryAddress: "",
      cardHealthComplaints: "",
      cardFinalDiagnosis: "",
      cardOilFromList: "",
      cardRecepi: "",
      card_IsChecked: false,
    },
  );

  /*/форма сужествует в двух состояниях. заполнено и нет. 
  в момент создания не все поля известны поэтому использовать просто Card нельзя.
  Partial -выхот тк делает все поля необязательными*/
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Card, string>>>({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: keyof Card, value: string | boolean) => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "cardFinalDiagnosis" || field === "cardOilFromList") {
        updated.cardRecepi = `${updated.cardFinalDiagnosis ?? ""}${updated.cardOilFromList ?? ""}`;
      }
      return updated;
    });
  };

  const handlePhotoChange = (file: File) => {
    setPhotoPreview(URL.createObjectURL(file));
  };

  return {
    data,
    photoPreview,
    errors,
    errorMessage,
    setErrors,
    setErrorMessage,
    handleChange,
    handlePhotoChange,
  };
}

export default useCardForm;