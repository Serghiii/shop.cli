export default {
   title: 'Интернет-магазин Эвик',
   auth: [{
      login: [{
         title: 'Вход',
         name: 'Електронная почта или телефон',
         password: 'Пароль',
         rememberme: 'Запомнить',
         enter: 'Войти',
         enter_google: 'Войти через Google',
         profile: [{
            title: 'Профиль',
            exit: 'Выход'
         }]
      }],
      register: [{
         title: 'Регистрация',
         name: 'Имя',
         phone: 'Номер телефона',
         email: 'Эл. почта',
         password: 'Пароль',
         register: 'Зарегистрироваться'
      }],
      messages: [{
         required: 'Поле должно быть заполнено',
         phone: 'Введите корректный номер телефона',
         email: 'Введите корректный электронный адрес',
         password: 'Пароль должен быть не менее 6 символов',
         password_eq: 'Пароль должен совпадать',
         login: 'Имя должно быть больше 1 символа не считая пробелов',
         login_cyr: 'Введите свое имя кирилицей',
         gender: 'Вкажіть свою стать'
      }]
   }],
   profile: [{
      title: 'Профиль',
      exit: 'Выход',
      tabs: [{
         title: [{
            name: 'Профиль',
            password: 'Смена пароля',
            photo: 'Фото'
         }],
         panels: [{
            pib: 'Ф.И.О.',
            gender: [{
               name: 'Пол',
               male: 'Мужской',
               famale: 'Женский'
            }],
            phone: 'Номер телефона',
            email: 'Ел. почта',
            newpassword: 'Новый пароль',
            reppassword: 'Повторите пароль',
            selectfile: 'Выберите файл...',
            save: 'Сохранить'
         }]
      }]
   }],
   greeting: 'Приветствуем,',
   categories: [{
      title: 'Категории'
   }],
   group: [{
      title: 'Смартфоны, мобильные телефоны, аксесуары'
   }],
   filter: [{
      group: [{
         title: "Смартфоны",
      }],
   }],
   cart: [{
      title: 'Корзина',
      empty: 'Ваша корзина пуста',
      total: 'Всего:',
      place_order: 'Оформить заказ'
   }],
   bay: 'Купить',
   footer: [{
      title: '© Интернет-магазин Эвик 2020-2021'
   }],
   support: 'Служба поддержки:',
   locality: 'Город:',
   goods: [{
      title: 'Новые поступления',
   }],
   404: [{
      not_found: 'Страница не найдена',
   }],
}