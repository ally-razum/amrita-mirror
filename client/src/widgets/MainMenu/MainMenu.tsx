import { Link } from "react-router-dom";
import "./MainMenu.css";

// 1. Выносим описание ссылок в компактный массив
const MENU_ITEMS = [
  { to: "/dashboard/cards", label: "Таблица клиентов", icon: "👥" },
  { to: "/dashboard/cards/new", label: "Создать карточку", icon: "➕" },
  { to: "/diagnoslist", label: "Диагнозы", icon: "📋" },
  { to: "/oillist", label: "Масла", icon: "🌿" },
];

export function MainMenu() {
  return (
    <div className="main-menu">
      <div className="main-menu__logo-wrapper">
        <img
          className="main-menu__image"
          src="/images/stastPage.png"
          alt="logo"
        />
      </div>

      <nav className="main-menu__nav">
        {MENU_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} className="main-menu__btn">
            <span className="main-menu__icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
