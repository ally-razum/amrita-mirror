import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store/store";
import  CardForm  from "../../entities/card/ui/CardForm";
import ErrorPage404 from "../../page/errorPage/errorPage404";

function ViewCard() {
  const { cardId } = useParams<{ cardId: string }>();
  const card = useSelector((state:RootState) => state.cards.find((card) => card.id === Number(cardId)));

  if (!card) return <ErrorPage404 />;

  return (
    <div className="card-page">
      <div className="card-page__container">
        <h2 className="card-page__title">Карточка клиента № {cardId}</h2>
        <div className="card-page__actions">
          <Link to={`/dashboard/cards/${cardId}/edit`}>✏️ Редактировать</Link>
          <Link to="/dashboard/cards">← Назад к таблице</Link>
        </div>
        <CardForm mode="view" data={card} />
      </div>
    </div>
  );
}
export default ViewCard;
