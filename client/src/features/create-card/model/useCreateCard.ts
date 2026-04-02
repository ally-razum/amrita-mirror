import { useNavigate } from "react-router-dom";
import type { Card } from "../../../entities/card/model/types";
import { useDispatch } from "react-redux";
import { addCard } from "../../../entities/card/model/cardsSlice";
import type { AppDispatch } from "../../../app/store/store";
import { validateCard } from "../../../shared/lib/validateCard";
import useCardForm from "../../../shared/lib/useCardForm";

function useCreateCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useCardForm();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = validateCard(form.data);
    const isValid = Object.keys(newErrors).length === 0;
    form.setErrors(newErrors);

    if (!isValid) {
      form.setErrorMessage("Проверьте данные карточки");
      return;
    }

    form.setErrorMessage("");
    dispatch(addCard(form.data as Card));
    navigate("/dashboard/cards");
  };

  return { ...form, handleSubmit };
}

export default useCreateCard;
