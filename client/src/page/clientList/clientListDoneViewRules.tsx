import { useUser } from '../../userContext/userContext';
import ErrorPage401 from '../errorPage/errorPage401';
import ClientTableDone from './clientListAdminModerator/clientListDone';
import ClientTableDoneTorsunov from './clientListTorsunov/clientListDoneTorsunov';

function ClientListDoneViewRules (): JSX.Element {

  const { user } = useUser(); 
  if (user){
    if ((user?.userRole === "admin") || (user?.userRole === "moderator") ) {
    return (      
        <ClientTableDone/> //это общий список для всех
      );
  }  else {
    return (      
      <ClientTableDoneTorsunov/> // это только для ОГ
      );
  }
  }
   else { 
    return (
      <ErrorPage401/> //стр с переходом на авторизацию
    )
   
  }

}
  
  export default ClientListDoneViewRules;