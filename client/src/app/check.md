
"/"                 Просто логин, старт проекта.
✅ "/cabinet"       dashboard кабинетная” страница, где админ/модератор видит список карточек
                    +   вложенные маршруты, например /dashboard/cards или /dashboard/users

"/clientlist"       /dashboard/cards → CardListPage
                    +   фильтры: /dashboard/cards/done, /dashboard/cards/pending.

✅"/newcard"        /dashboard/cards/new. Если нужно создавать новую карточку: 

"/viewcard/:clientId"  /dashboard/cards/:cardId → CardViewPage просмотра деталей одной карточки.
"/error"  
                    /dashboard/cards/:cardId/edit → CardEditPage
                   
