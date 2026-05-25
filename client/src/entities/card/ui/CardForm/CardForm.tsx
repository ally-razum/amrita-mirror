import { FormField } from "../../../../shared/ui/FormField/FormField";
import { diagnosis } from "../../model/mocks/diagnosis";
import { oils } from "../../model/mocks/oils";
import { ClientInfoFields, type CardFormProps } from "./CardForm";
import "./CardForm.css";

function CardForm({
  mode,
  data,
  errors = {},
  onChange,
  onPhotoChange,
  photoPreview,
  errorMessage,
  onSubmit,
}: CardFormProps) {
  const isView = mode === "view";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoChange) onPhotoChange(file);
  };

  return (
    <div className="card-page">
      <div className="card-page__container">
        <div className="card-page__content">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="card-page__content"
          >
            {/* ФОТО */}
            <div className="card-page__left">
              <img
                className="card-page__image"
                src={photoPreview ?? (data.cardPhoto as string) ?? ""}
                alt="photo"
              />
              {!isView && (
                <>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="photo-upload">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
                    >
                      Добавить фото
                    </button>
                  </label>
                </>
              )}
            </div>
            <div className="card-page__right">
              {isView && (
                <FormField label="Номер клиента">
                  <input value={`AP-${data.id}`} readOnly />
                </FormField>
              )}
              {ClientInfoFields.map(({ key, label, isTextArea }) => (
                <FormField key={key} label={label} error={errors[key]}>
                  {isTextArea ? (
                    <textarea
                      value={(data[key] as string) ?? ""}
                      readOnly={isView}
                      onChange={(e) => onChange?.(key, e.target.value)}
                    />
                  ) : (
                    <input
                      value={(data[key] as string) ?? ""}
                      readOnly={isView}
                      onChange={(e) => onChange?.(key, e.target.value)}
                    />
                  )}
                </FormField>
              ))}
              <FormField label="Диагноз">
                {isView ? (
                  <input
                    value={
                      diagnosis.find((d) => d.id === data.cardFinalDiagnosis)
                        ?.dName ?? "—"
                    }
                    readOnly
                  />
                ) : (
                  <select
                    value={data.cardFinalDiagnosis ?? ""}
                    onChange={(e) =>
                      onChange?.("cardFinalDiagnosis", e.target.value)
                    }
                  >
                    <option value="">Не выбрано</option>
                    {diagnosis.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.dName}
                      </option>
                    ))}
                  </select>
                )}
              </FormField>
              <FormField label="Масло">
                <select
                  value={data.cardOilFromList ?? ""}
                  disabled={isView}
                  onChange={(e) =>
                    onChange?.("cardOilFromList", e.target.value)
                  }
                >
                  <option value="">Не выбрано</option>
                  {oils.map((oil) => (
                    <option key={oil.id} value={oil.id}>
                      {oil.oilName}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Номер рецепта">
                <input value={data.cardRecepi ?? ""} readOnly />
              </FormField>

              {!isView && (
                <div className="card-page__field">
                  <label>
                    <input
                      type="checkbox"
                      checked={data.card_IsChecked ?? false}
                      onChange={(e) =>
                        onChange?.("card_IsChecked", e.target.checked)
                      }
                    />{" "}
                    Заполнено
                  </label>
                </div>
              )}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {!isView && (
                <button type="submit" onClick={onSubmit}>
                  {mode === "edit" ? "Сохранить" : "Добавить карточку"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
