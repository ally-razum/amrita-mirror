import ErrorPage401 from "../errorPage/errorPage401";

import ClientTable from "./clientListAdminModerator/clientList";

function ClientListViewRules() {
  console.log("ClientListViewRules");
  const user = true;
  if (user) {
    return (
      <ClientTable /> //это общий список для всех
    );
  } else {
    return (
      <ErrorPage401 /> //стр с переходом на авторизацию
    );
  }
}

export default ClientListViewRules;
