import { useNavigate } from "react-router-dom";
import type { Card } from "../../../entities/card/model/types";
import { useDispatch, useSelector } from "react-redux";
import { updateCard } from "../../../entities/card/model/cardsSlice";
import type { AppDispatch, RootState } from "../../../app/store/store";
import { validateCard } from "../../../shared/lib/validateCard";
import useCardForm from "../../../shared/lib/useCardForm";

function useEditCard(id: number) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector((state: RootState) =>
    state.cards.find((c) => c.id === id),
  );
  const form = useCardForm(card);
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
    dispatch(updateCard(form.data as Card));
    navigate(`/dashboard/cards/${id}`);
  };

  return {
    ...form,
    handleSubmit,
  };
}

export default useEditCard;
