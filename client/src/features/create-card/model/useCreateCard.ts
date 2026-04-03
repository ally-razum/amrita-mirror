import { useNavigate } from "react-router-dom";
import type { Card } from "../../../entities/card/model/types";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../../../entities/card/model/cardsSlice";
import type { AppDispatch, RootState } from "../../../app/store/store";
import { validateCard } from "../../../shared/lib/validateCard";
import useCardForm from "../../../shared/lib/useCardForm";

function useCreateCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useCardForm();
  const cards = useSelector((state: RootState) => state.cards);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = validateCard(form.data);
    const isValid = Object.keys(newErrors).length === 0;
    const maxId = cards.reduce((max, c) => (c.id > max ? c.id : max), 0);
    form.setErrors(newErrors);

    if (!isValid) {
      form.setErrorMessage("Проверьте данные карточки");
      return;
    }

    form.setErrorMessage("");
    dispatch(addCard({ ...(form.data as Card), id: maxId + 1 }));
    navigate("/dashboard/cards");
  };

  return { ...form, handleSubmit };
}

export default useCreateCard;
