import { useUser } from '../../../userContext/userContext';
import ErrorPage401 from '../../errorPage/errorPage401';
import ErrorPage403 from '../../errorPage/errorPage403';
import ClientTableUnReady from '../clientListAdminModerator/clientListUnReady';

function ClientListUnReadyView (): JSX.Element {

    const { user, } = useUser(); 
    if (user){
      if ((user?.userRole === "admin") || (user?.userRole === "moderator") || (user?.userRole === "user") ) {
      return (      
          <ClientTableUnReady/>
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
  
  export default ClientListUnReadyView;