//todo БЕЗ МЮИ
import { useParams, Link } from "react-router-dom";
import { mockCards } from "../../entities/cards/mockCards";
import ErrorPage404 from "../errorPage/errorPage404";
import "./Card.css";

function Card() {
  const { cardId } = useParams<{ cardId: string }>();
  const card = mockCards.find((c) => c.id === Number(cardId));

  if (!card) return <ErrorPage404 />;

  return (
    <div className="card-page">
      <div className="card-page__container">
        <h2 className="card-page__title">Карточка клиента № {cardId}</h2>

        <div className="card-page__actions">
          <Link to={`/dashboard/cards/${cardId}/edit`}>✏️ Редактировать</Link>
          <Link to="/dashboard/cards">← Назад к таблице</Link>
        </div>

        <div className="card-page__content">
          <div className="card-page__left">
            <img
              className="card-page__image"
              src={card.cardPhoto}
              alt="photo"
            />
          </div>

          <div className="card-page__right">
            <div className="card-page__field">
              <label>Номер клиента</label>
              <input value={`AP-${card.id}`} readOnly />
            </div>

            <div className="card-page__field">
              <label>ФИО клиента</label>
              <input value={card.cardFullName} readOnly />
            </div>

            <div className="card-page__field">
              <label>Телефон</label>
              <input value={card.cardPhone} readOnly />
            </div>

            <div className="card-page__field">
              <label>Диагноз</label>
              <textarea value={card.cardFinalDiagnosis ?? ""} readOnly />
            </div>

            <div className="card-page__field">
              <label>Жалобы</label>
              <textarea value={card.cardHealthComplaints} readOnly />
            </div>

            <div className="card-page__field">
              <label>Адрес доставки</label>
              <input value={card.cardDeliveryAddress} readOnly />
            </div>

            <div className="card-page__field">
              <label>Масло</label>
              <select value={card.cardOilFromList ?? ""} disabled>
                <option value="">Не выбрано</option>
                <option value="0">Масло № 0</option>
                <option value="1">Масло № 1</option>
                <option value="2">Масло № 2</option>
                <option value="3">Масло № 3</option>
              </select>
            </div>

            <div className="card-page__field">
              <label>Номер рецепта</label>
              <input value={card.cardRecepi ?? ""} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
