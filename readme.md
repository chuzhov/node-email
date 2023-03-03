# GoIT Node.js Course Homework #4

Продовження створення REST API для роботи з колекцією контактів.

Користувачі:
| Method | Endpoint | |
| ------- | --------- | --- |
|`POST`| /users/signup \*\*| реєстрація нового користувача |
|`POST`| /users/login | доступ користувача до сервісу;
|`POST`| /users/logout | видалення токену поточного користувача, вихід із сервісу;

\*\* доступні пагінація та сортування за зростанням та спаданням

Робота користувача з контактами:
| Method | Service enpoint | |
| ------- | --------- | --- |
| `GET` | api/contacts | отримати перелік контактів поточного користувача;
| `GET` | api/contacts/{contact_id} | отримати інформацію про контакти поточного користувача;
| `POST` | api/contacts | додати до бази контакт поточного користувача;
| `PUT` | api/contacts/{contact_id} | оновити інформацію про контакти поточного користувача;
| `PATCH` | api/contacts/{contact_id}/favorite | оновити статус обраного для контакта користувача;
| `DELETE` | api/contacts/{contact_id} | видалити контакт

Робота адміністратора з користувачами:
| Method | Endpoint | |
| ------- | --------- | --- |
| `GET` | /users \*\*| отримання переліку користувачів
| `PATCH` | /users/{contactID}/subscription | заміна типу/підписки користувача |
| `DELETE` | /users/{contactID} | видалення користувача та всіх його контактів

\*\* доступні пагінація та сортування за зростанням та спаданням

> Додати роль адміністратора в цієї моделі можливо лише через інтерфейси MongoDB

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок