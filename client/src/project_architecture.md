├──  (ветка)
└──  (последний элемент)
│    (вертикальная линия) 
 _________________________________

 src/
 ├── app/
 ├── pages/
 ├── entities/
 ├── features/
 ├── widgets/
 └── shared/

 _________________________________


 src/
 ├── app/
 │    ├── providers/ (store, router)
 │    └── routes/
 │
 ├── pages/
 │    ├── LoginPage
 │    ├── CardsPage
 │    └── CardDetailsPage
 │
 ├── widgets/
 │    ├── Header
 │    └── CardList
 │
 ├── features/
 │    ├── auth/
 │    ├── edit-card/
 │    └── view-card/
 │
 ├── entities/
 │    └── card/
 │         ├── model/
 │         ├── api/
 │         └── ui/
 │
 └── shared/
       ├── ui/
       ├── lib/
       └── types/