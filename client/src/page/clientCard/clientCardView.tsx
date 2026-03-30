import ErrorPage401 from '../errorPage/errorPage401';
import ClientCardAdminView from "./clientCardAdmit/clientCardAdminView";
import ClientCardModeratorView from "./clientCardModerator/clientCardModeratorView";


function ClientCardView (){

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
      <>1</>
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