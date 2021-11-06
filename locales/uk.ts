export default {
   title: 'Інтернет-магазин Евік',
   auth: [{
      login: [{
         title: 'Вхід',
         name: 'Електронна пошта або телефон',
         password: 'Пароль',
         rememberme: 'Запам\'ятати',
         enter: 'Увійти',
         enter_google: 'Увійти через Google',
         profile: [{
            title: 'Профіль',
            exit: 'Вихід'
         }]
      }],
      register: [{
         title: 'Реєстрація',
         name: 'Ім\'я',
         phone: 'Номер телефону',
         email: 'Ел. пошта',
         password: 'Пароль',
         register: 'Зареєструватися'
      }],
      messages: [{
         required: 'Поле повинно бути заповнено',
         phone: 'Введіть коректний номер телефону',
         email: 'Введіть коректну електронну адресу',
         password: 'Пароль повинен бути не менше 6 символів',
         password_eq: 'Пароль повинен співпадати',
         login: 'Ім\'я має бути більше 1 символа не враховуючи пробілів',
         login_cyr: 'Введіть своє ім\'я кирилицею',
         gender: 'Вкажіть свою стать'
      }]
   }],
   profile: [{
      title: 'Профіль',
      exit: 'Вихід',
      tabs: [{
         title: [{
            name: 'Профіль',
            password: 'Зміна паролю',
            photo: 'Фото'
         }],
         panels: [{
            pib: 'П.І.Б.',
            gender: [{
               name: 'Стать',
               male: 'Чоловіча',
               famale: 'Жіноча'
            }],
            phone: 'Номер телефону',
            email: 'Ел. пошта',
            newpassword: 'Новий пароль',
            reppassword: 'Повторіть пароль',
            selectfile: 'Виберіть файл...',
            save: 'Зберегти'
         }]
      }]
   }],
   greeting: 'Вітаємо,',
   categories: [{
      title: 'Категорії'
   }],
   group: [{
      title: 'Смартфони, мобільні телефони, аксесуари'
   }],
   filter: [{
      group: [{
         title: "Смартфони",
      }],
   }],
   cart: [{
      title: 'Кошик',
      empty: 'Ваш кошик порожній',
      total: 'Всього:',
      place_order: 'Оформити замовлення'
   }],
   bay: 'Придбати',
   footer: [{
      title: '© Інтернет-магазин Евік 2020-2021'
   }],
   support: 'Служба підтримки:',
   locality: 'Місто:',
   goods: [{
      title: 'Нові надходження',
   }],
   404: [{
      not_found: 'Сторінка не знайдена',
   }],
}