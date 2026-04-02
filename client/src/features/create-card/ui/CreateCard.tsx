import CardForm from "../../../entities/card/ui/CardForm";
import useCreateCard from "../model/useCreateCard";

function CreateCard() {
  const {
    data,
    photoPreview,
    errors,
    errorMessage,
    handleChange,
    handlePhotoChange,
    handleSubmit,
  } = useCreateCard();

  return (
    <div className="card-page">
      <div className="card-page__container">
        <h2 className="card-page__title">Новая карточка</h2>
        <CardForm
          mode="create"
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

export default CreateCard;
