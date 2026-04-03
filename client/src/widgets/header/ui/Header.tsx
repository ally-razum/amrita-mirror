import { useNavigate } from "react-router-dom";
import useHeaderMenu from "../model/useHeaderMenu";
import { adminMenu, cardsMenu } from "../config/menuItems";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { menu1, menu2, openMenu1, closeMenu1, openMenu2, closeMenu2 } =
    useHeaderMenu();

  const go = (path: string) => {
    navigate(path);
  };

  return (
    <div className="header">
      <div className="header__left">
        <button onClick={() => go("/dashboard")} className="header__btn">
          AROMA cabinet
        </button>

        <div className="header__dropdown">
          <button onClick={openMenu1} className="header__btn">
            admin panel
          </button>

          {menu1 && (
            <div className="header__menu">
              {adminMenu.map((item) => (
                <div
                  key={item.path}
                  onClick={() => {
                    go(item.path);
                    closeMenu1();
                  }}
                  className="header__menu-item"
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header__dropdown">
          <button onClick={openMenu2} className="header__btn">
            Карточки
          </button>

          {menu2 && (
            <div className="header__menu">
              {cardsMenu.map((item) => (
                <div
                  key={item.path}
                  onClick={() => {
                    go(item.path);
                    closeMenu2();
                  }}
                  className="header__menu-item"
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="header__logout" onClick={() => go("/")}>
        выход
      </button>
    </div>
  );
}

export default Header;
