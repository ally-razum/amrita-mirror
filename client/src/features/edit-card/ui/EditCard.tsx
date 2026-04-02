import CardForm from "../../../entities/card/ui/CardForm";
import useEditCard from "../model/useEditCard";
import { useParams } from "react-router-dom";

function EditCard() {
    const { cardId } = useParams<{ cardId: string }>();
    const {
      data,
      photoPreview,
      errors,
      errorMessage,
      handleChange,
      handlePhotoChange,
      handleSubmit,
    } = useEditCard(Number(cardId));

  return (
    <div className="card-page">
      <div className="card-page__container">
        <h2 className="card-page__title">Новая карточка</h2>
        <CardForm
          mode="edit"
          data={data}
          photoPreview={photoPreview}
          errors={errors}
          errorMessage={errorMessage}
          onChange={handleChange}
          onPhotoChange={handlePhotoChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default EditCard;
