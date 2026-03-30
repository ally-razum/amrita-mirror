import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userContext/userContext'; // Используем ваш контекст

import client from '../api/client.ts';

function CheckSession() {
  const { setUser } = useUser(); // Из вашего контекста берем setUser
  const [loading, setLoading] = useState(true); // Чтобы показать загрузку
  const [error, setError] = useState<string | null>(null); // Для обработки ошибок
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await client.get('/amrita-check-session', {
          withCredentials: true, // Важно для передачи сессионных куки
        });

        if (response.status === 200 && response.data) {
          // Если сессия есть, сохраняем данные пользователя в контекст
          setUser(response.data);
          setLoading(false); // Останавливаем индикатор загрузки
        } else {
          setError('Пользователь не авторизован');
          navigate('/login'); // Перенаправляем на страницу входа
        }
      } catch (err) {
        setError('Ошибка при проверке сессии');
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUserSession(); // Проверяем сессию при монтировании компонента
  }, [navigate, setUser]);

  if (loading) {
    return <div>Проверка сессии...</div>; // Индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // Сообщение об ошибке
  }

  return <div>Вы авторизованы!</div>; // Или интерфейс, если сессия есть
}

export default CheckSession;
