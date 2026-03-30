/* eslint-disable no-constant-condition */

import { AppBar, } from '@mui/material';
import { useUser } from '../../userContext/userContext';
import { useState, useEffect } from 'react';
import HeaderAdmin from './hearedAdmit/headerAdmin';
import HeaderModerator from './headerModerator/headerModerator';
import HeaderTorsunov from './headerTorsunov/headerTorsunov';



const Header = () => {
  const { user, } = useUser(); // Получаем функцию для очистки пользователя из контекста и самого юзера
  // console.log(useUser,'userName из хедера');
  //  {/* проверка роли по которой отображаем конкретный сайдбар */}

  const [isHolidaySeason, setIsHolidaySeason] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 11, 15); // 15 декабря
    const end = new Date(now.getFullYear() + 1, 0, 15); // 15 января
    setIsHolidaySeason(now >= start && now <= end);
  }, []);

  if (user){
    if ((user?.userRole === "admin") ) {
    return (
      <AppBar position="sticky"  
      sx={{ backgroundColor: '#6a1b9a', backgroundImage: isHolidaySeason ?  'url(/images/snow.png)' : 'none',  }}>  
        <HeaderAdmin/>
      </AppBar>);
  } else if ((user?.userRole === "moderator")) {
    // console.log('Rendering HeaderModerator MMM');
    return (
      <AppBar position="sticky"  
      sx={{ backgroundColor: '#6a1b9a', backgroundImage: isHolidaySeason ?  'url(/images/snow.png)' : 'none', }}>  
        <HeaderModerator/>
      </AppBar>);
  } else {
    // console.log('Rendering HeaderTorsunov TTT');
    return (
      <AppBar position="sticky"  sx={{ backgroundColor: '#6a1b9a' }}>  
        <HeaderTorsunov/>
      </AppBar>);
  }
  }
   else { 
    return (
       <> ERROR 401</>
    )
   
  }
   
};

export default Header;
