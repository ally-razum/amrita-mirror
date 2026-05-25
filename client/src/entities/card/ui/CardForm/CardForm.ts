import type { Card } from "../../model/types";

export const ClientInfoFields: {
  key: keyof Card;
  label: string;
  isTextArea?: boolean;
}[] = [
  { key: "cardFullName", label: "ФИО клиента" },
  { key: "cardPhone", label: "Телефон" },
  {
    key: "cardHealthComplaints",
    label: "Жалобы на здоровье",
    isTextArea: true,
  },
  { key: "cardDeliveryAddress", label: "Адрес доставки" },
];

export interface CardFormProps {
  mode: "view" | "create" | "edit";
  data: Partial<Card>;
  errors?: Partial<Record<keyof Card, string>>;
  onChange?: (field: keyof Card, value: string | boolean) => void;
  onPhotoChange?: (file: File) => void;
  photoPreview?: string | null;
  errorMessage?: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}