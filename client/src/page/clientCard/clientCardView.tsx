import { useUser } from '../../userContext/userContext';
import ErrorPage401 from '../errorPage/errorPage401';
import ClientCardAdminView from "./clientCardAdmit/clientCardAdminView";
import ClientCardModeratorView from "./clientCardModerator/clientCardModeratorView";
import ClientCardTorsunovView from './clientCardTorsunov/clientCardTorsunovView';


function ClientCardView (): JSX.Element {

  const { user, } = useUser(); 
  if (user){
    if ((user?.userRole === "admin") ) {
    return (     
        
        <ClientCardAdminView/>
      );
  } else if ((user?.userRole === "moderator")) {
    // console.log('Rendering Moderator ');
    return (     
        
        <ClientCardModeratorView/>
      );
  } else {
    // console.log('Rendering Torsunov ');
    return (      
      <ClientCardTorsunovView/>
      );
  }
  }
   else { 
    return (
      <ErrorPage401/>
    )
   
  }

}

export default ClientCardView;