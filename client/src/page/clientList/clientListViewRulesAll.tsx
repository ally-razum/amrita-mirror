import { useUser } from '../../userContext/userContext';
import ErrorPage401 from '../errorPage/errorPage401';
import ErrorPage403 from '../errorPage/errorPage403';

// import ClientTable from './clientListAdminModerator/clientList';
import ClientTableTorsunov from './clientListTorsunov/clientListTorsunov';



function AllListViewRules (): JSX.Element {

    const { user } = useUser(); 
    if (user){
      if ((user?.userRole === "user") ) {
      return (      
          <ClientTableTorsunov/> //это общий список для всех
        );
    }  else {
      return (      
        <ErrorPage403/> // это только для ОГ
        );
    }
    }
     else { 
      return (
        <ErrorPage401/> //стр с переходом на авторизацию
      )
     
    }
  
  }
  
  export default AllListViewRules;