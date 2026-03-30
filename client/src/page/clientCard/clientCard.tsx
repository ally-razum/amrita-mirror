import { useUser } from '../../userContext/userContext';
import ErrorPage401 from '../errorPage/errorPage401';
import ErrorPage403 from '../errorPage/errorPage403';
import ClientCardAdmin from "./clientCardAdmit/clientCardAdmin";
import ClientCardModerator from "./clientCardModerator/clientCardModerator";


function ClientCard (): JSX.Element {

  const { user, } = useUser(); 
  if (user){
    if ((user?.userRole === "admin") ) {
    return (      
        <ClientCardAdmin/>
      );
  } else if ((user?.userRole === "moderator")) {
    // console.log('Rendering Moderator ');
    return (      
        <ClientCardModerator/>
      );
  } else {
    // console.log('Rendering Torsunov ');
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

export default ClientCard;