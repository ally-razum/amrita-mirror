import client from '../api/client.ts';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from '../userContext/userContext';
import { useState, useEffect } from 'react';
import { useUser } from '../userContext/userContext'; // импортируем контекст

import ClientCard from "../page/clientCard/clientCard";
import MainPageAroma from "../page/mainPageAroma/mainPageAroma";

import Header from "../page/header/Header";
import StartPage from "../page/startPage/StartPage";
import ClientCardView from "../page/clientCard/clientCardView";
import ErrorPage401 from '../page/errorPage/errorPage401';

import RegNewUser from '../page/auth/regBoxView';


import ClientListViewRules from '../page/clientList/clientListViewRules';
import ClientListDoneViewRules from '../page/clientList/clientListDoneViewRules';
import ClientListUnReadyViewRules from '../page/clientList/clientListUnReadyViewRules';
import ErrorPage501 from '../page/errorPage/errorPage501';

import Footer from '../page/Footer/Footer';



import LoadingPage from '../page/loading/Loading';
import AllListViewRules from '../page/clientList/clientListViewRulesAll';



const AppContent = () => {
  const location = useLocation(); // Получаем текущий маршрут
  client.defaults.withCredentials = true; //нужно добиться чтобы юзер не вылетал

  const {  setUser } = useUser();
  const [isSessionLoading, setIsSessionLoading] = useState(true); // Новое состояние для загрузки сессии

  useEffect(() => {
    // console.log('это проверка сессии с Арр');
    
    const checkSession = async () => {
      try {
        const response = await client.get('/amrita-check-session',
        { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data); // сохраняем пользователя в контексте, если сессия активна
          console.log('session OK');
          
        }
      } catch (error) {
        // console.log('Сессия не найдена или истекла', error);
        alert(error)
      } finally {
        setIsSessionLoading(false); // Завершаем проверку
      }
    };

    checkSession();
  }, [setUser]);
  if (isSessionLoading) {
    // Отображаем заглушку во время проверки сессии
    return <div><LoadingPage/> </div>;
  }
 
  return (
    <>
    {/* условный рендеринг Header: отображаем его только если путь на не StartPage */}
    {location.pathname !== '/' && <Header />} 

    <Routes>
      <Route path="/" element={<StartPage />} /> 
      <Route path="/cabinet" element={<MainPageAroma />} />

      <Route path="/clientlist" element={<ClientListViewRules />} />
      <Route path="/all_list_og" element={<AllListViewRules />} />
      <Route path="/done" element={<ClientListDoneViewRules />} />
      <Route path="/unready" element={<ClientListUnReadyViewRules />} />
      
      <Route path="/newcard" element={<ClientCard />} />
      <Route path="/viewcard/:clientId" element={<ClientCardView />} />


      <Route path="/newuser" element={<RegNewUser />} />
     

      <Route path="/error" element={<ErrorPage401 />} />
      <Route path="/diagnoslist" element={<ErrorPage501 />} />
      <Route path="/oillist" element={<ErrorPage501 />} />        

     
     


    </Routes>
  </>
  );
};

function App(): JSX.Element {

  return (
    <UserProvider>
      <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppContent />
      <Footer />
    </div>
      </Router>
    </UserProvider>
  );
}

export default App;
