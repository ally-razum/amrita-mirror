import { useState } from "react";

export default function useHeaderMenu() {
  const [menu1, setMenu1] = useState<null | HTMLElement>(null);
  const [menu2, setMenu2] = useState<null | HTMLElement>(null);

  return {
    menu1,
    openMenu1: (e: React.MouseEvent<HTMLElement>) => setMenu1(e.currentTarget),
    closeMenu1: () => setMenu1(null),

    menu2,
    openMenu2: (e: React.MouseEvent<HTMLElement>) => setMenu2(e.currentTarget),
    closeMenu2: () => setMenu2(null),
  };
}
