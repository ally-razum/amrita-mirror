import type { User } from "./user"; // путь подставь свой

export const users: User[] = [
  {
    id: 1,
    userFullName: "Иванов Иван Иванович",
    userLogin: "admin",
    userRole: "admin",
  },
  {
    id: 2,
    userFullName: "Петров Петр Петрович",
    userLogin: "moderator",
    userRole: "moderator",
  },
  {
    id: 3,
    userFullName: "Сидорова Анна Сергеевна",
    userLogin: "anna",
    userRole: "user",
  },
  {
    id: 4,
    userFullName: "Кузнецов Алексей Дмитриевич",
    userLogin: "alex",
    userRole: "user",
  },
];
