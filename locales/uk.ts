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
   goods: [{
      title: 'Нові надходження',
   }],
   404: [{
      not_found: 'Сторінка не знайдена',
   }],
   server: [{
      profile: [{
         update_error: 'Не вдалося поновити профіль',
      }],
      messages: [{
         user_not_activated: 'Користувач не активований',
         user_not_verified: 'Користувач не верифікований',
         user_not_found: 'Користувача не знайдено',
         Role_not_found: 'Роль не знайдено',
         user_exists: 'Користувач вже існує',
         user_banned: 'Ваш акаунт заблоковано, зверніться в службу підтримки',
         login_password_not_corrected: 'Не коректний логін або пароль',
         create_user_error: 'Не вдалося створити користувача',
         activate_user_error: 'Не вдалося активувати користувача',
         phone_change_error: 'Не вдалося змінити телефон',
         password_change_error: 'Не вдалося змінити пароль',
      }],
      mail: [{
         activation_on: 'Активація акаунта на ',
         activation_ref: 'Для активації перейдіть за посиланням '
      }],
      file: [{
         write_error: 'Помилка при запису файла',
         delete_error: 'Помилка при видаленні файла'
      }],
   }],
}