import { useUser } from '../../../userContext/userContext';
import ErrorPage401 from '../../errorPage/errorPage401';
import ErrorPage403 from '../../errorPage/errorPage403';
import ClientTableDone from '../clientListAdminModerator/clientListDone';

function ClientListDoneView (): JSX.Element {

    const { user, } = useUser(); 
    if (user){
      if ((user?.userRole === "admin") || (user?.userRole === "moderator") || (user?.userRole === "user") ) {
      return (      
          <ClientTableDone/>
        );
    }  else {
      return (      
        <ErrorPage403/>
        );
    }
    }
     else { 
      return (
        <ErrorPage401/>
      )
     
    }
  
  }
  
  export default ClientListDoneView;