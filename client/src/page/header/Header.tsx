import { AppBar } from "@mui/material";

import HeaderAdmin from "./hearedAdmit/headerAdmin";
import HeaderModerator from "./headerModerator/headerModerator";

function Header() {
  const user = ["admin", "moderator"];

  if (user) {
    if (user[0]) {
      return (
        <AppBar position="sticky" sx={{ backgroundColor: "#ec407a" }}>
          <HeaderAdmin />
        </AppBar>
      );
    } else if (user[1]) {
      // console.log('Rendering HeaderModerator MMM');
      return (
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "#2e7d32",
          }}
        >
          <HeaderModerator />
        </AppBar>
      );
    } else {
      return <></>;
    }
  } else {
    return <> ERROR 401</>;
  }
}

export default Header;
