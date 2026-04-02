import { useState } from "react";
import type { Card } from "../../entities/card/model/types";

function useCardForm(initialData?: Partial<Card>) {
  const [data, setData] = useState<Partial<Card>>(
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
