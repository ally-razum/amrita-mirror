import { diagnosis } from "../../../shared/mocks/diagnosis";
import { oils } from "../../../shared/mocks/oils";
import type { Card } from "../../../entities/card/model/types";
import "./CardForm.css";

interface Props {
  mode: "view" | "create" | "edit";
  data: Partial<Card>;
  errors?: Partial<Record<keyof Card, string>>;
  onChange?: (field: keyof Card, value: string | boolean) => void;
  onPhotoChange?: (file: File) => void;
  photoPreview?: string | null;
  errorMessage?: string;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function CardForm({
  mode,
  data,
  errors = {},
  onChange,
  onPhotoChange,
  photoPreview,
  errorMessage,
  onSubmit,
}: Props) {
  const isView = mode === "view";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoChange) onPhotoChange(file);
  };

  return (
    <div className="card-page">
      <div className="card-page__container">
        <div className="card-page__content">
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

          {/* ПОЛЯ */}
          <div className="card-page__right">
            {isView && (
              <div className="card-page__field">
                <label>Номер клиента</label>
                <input value={`AP-${data.id}`} readOnly />
              </div>
            )}

            <div className="card-page__field">
              <label>ФИО клиента</label>
              <input
                value={data.cardFullName ?? ""}
                readOnly={isView}
                onChange={(e) => onChange?.("cardFullName", e.target.value)}
              />
              {errors.cardFullName && (
                <span className="card-page__error">{errors.cardFullName}</span>
              )}
            </div>

            <div className="card-page__field">
              <label>Телефон</label>
              <input
                value={data.cardPhone ?? ""}
                readOnly={isView}
                onChange={(e) => onChange?.("cardPhone", e.target.value)}
              />
              {errors.cardPhone && (
                <span className="card-page__error">{errors.cardPhone}</span>
              )}
            </div>

            <div className="card-page__field">
              <label>Жалобы на здоровье</label>
              <textarea
                value={data.cardHealthComplaints ?? ""}
                readOnly={isView}
                onChange={(e) =>
                  onChange?.("cardHealthComplaints", e.target.value)
                }
              />
            </div>

            <div className="card-page__field">
              <label>Адрес доставки</label>
              <input
                value={data.cardDeliveryAddress ?? ""}
                readOnly={isView}
                onChange={(e) =>
                  onChange?.("cardDeliveryAddress", e.target.value)
                }
              />
              {errors.cardDeliveryAddress && (
                <span className="card-page__error">
                  {errors.cardDeliveryAddress}
                </span>
              )}
            </div>

            <div className="card-page__field">
              <label>Диагноз</label>
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
            </div>

            <div className="card-page__field">
              <label>Масло</label>
              <select
                value={data.cardOilFromList ?? ""}
                disabled={isView}
                onChange={(e) => onChange?.("cardOilFromList", e.target.value)}
              >
                <option value="">Не выбрано</option>
                {oils.map((oil) => (
                  <option key={oil.id} value={oil.id}>
                    {oil.oilName}
                  </option>
                ))}
              </select>
            </div>

            <div className="card-page__field">
              <label>Номер рецепта</label>
              <input value={data.cardRecepi ?? ""} readOnly />
            </div>

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
        </div>
      </div>
    </div>
  );
}

export default CardForm;
