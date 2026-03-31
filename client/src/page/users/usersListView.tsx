import { useUser } from '../../userContext/userContext';
import ErrorPage401 from '../errorPage/errorPage401';
import ErrorPage403 from '../errorPage/errorPage403';
import UserTable from './usersList';



function UserListView (): JSX.Element {

  const { user, } = useUser(); 
  if (user){
    if ((user?.userRole === "admin") ) {
    return (     
        
        <UserTable/>
      );
  } else if ((user?.userRole === "moderator")) {
    // console.log('Rendering Moderator ');
    return (     
        
        <ErrorPage403/>
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

export default UserListView;