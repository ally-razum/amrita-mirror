import { useUser } from '../../userContext/userContext';
import ErrorPage401 from '../errorPage/errorPage401';

import ClientTable from './clientListAdminModerator/clientList';
// import ClientTableTorsunov from './clientListTorsunov/clientListTorsunov';
import ClientTableUnReadyTorsunov from './clientListTorsunov/clientListUnReadyTorsunov';



function ClientListViewRules (): JSX.Element {

    const { user } = useUser(); 
    if (user){
      if ((user?.userRole === "admin") || (user?.userRole === "moderator") ) {
      return (      
          <ClientTable/> //это общий список для всех
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
  
  export default ClientListViewRules;