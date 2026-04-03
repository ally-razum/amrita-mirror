import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../../entities/card/model/cardsSlice";
import type { AppDispatch, RootState } from "../../../app/store/store";
import { cadrColumn } from "../../../shared/mocks/cardColumn";

function useClientList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.cards);

  const [selectedColumns, setSelectedColumns] = useState(
    cadrColumn.map((col) => col.id),
  );
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedColumns((prev) =>
      checked ? [...prev, name] : prev.filter((col) => col !== name),
    );
  };

  const handleViewClient = (id: number) => navigate(`/dashboard/cards/${id}`);

  const handleDeleteClient = (id: number) => {
     const confirmed = window.confirm(
       "Вы уверены что хотите удалить карточку?",
     );
     if (!confirmed) return;
    dispatch(deleteCard(id));
    setNotification({ open: true, message: "Карточка удалена!" });
  };

  const handleCloseNotification = () =>
    setNotification({ open: false, message: "" });

  return {
    cards,
    selectedColumns,
    notification,
    handleColumnChange,
    handleViewClient,
    handleDeleteClient,
    handleCloseNotification,
  };
}

export default useClientList;