import ErrorPage401 from "../errorPage/errorPage401";
import { useUser } from '../../userContext/userContext';
import ClientTableUnReady from "./clientListAdminModerator/clientListUnReady";
import ClientTableUnReadyTorsunov from "./clientListTorsunov/clientListUnReadyTorsunov";

function ClientListUnReadyViewRules (): JSX.Element {

  const { user } = useUser(); 
  if (user){
    if ((user?.userRole === "admin") || (user?.userRole === "moderator") ) {
    return (      
        <ClientTableUnReady/> //это общий список для всех
      );
  }  else {
    return (      
      <ClientTableUnReadyTorsunov/> // это только для ОГ
      );
  }
  }
   else { 
    return (
      <ErrorPage401/> //стр с переходом на авторизацию
    )
   
  }
}
  
  export default ClientListUnReadyViewRules;