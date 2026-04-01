//todo БЕЗ МЮИ
import { Link, useParams } from "react-router-dom";

function EditCard() {
  const { cardId } = useParams();
  console.log(cardId, "IIIDDDD");
  return (
    <div>
      <h1>Редактирование карточки № {cardId}</h1>
      <Link to="/dashboard/cards">Назад к таблице</Link>
    </div>
  );
}

export default EditCard;
