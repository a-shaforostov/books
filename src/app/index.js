import { Module } from "cerebral";
import * as sequences from "./sequences";
import FormsProvider from '@cerebral/forms';

import { hashProvider, longPromise } from "./providers";
import { authenticate } from './factories';
import router from './router';

import avatar from '../assets/avatar.jpg';
import avatar2 from '../assets/girl.jpg';

export default Module({
  state: {
    currentPage: null,
    isApplicationLoaded: false,
    user: {
      id: 'test@gmail.com',
      name: 'Тарас Шевченко',
      pass: 'e42776aa51230617b6ac2d4690d78771d26acd39',
      avatar: avatar,
    },
    loginError: false,
    env: {
      login: {
        edit: null,
      },
      libraries: {
        selected: null,
        edit: null,
      },
      books: {
        selected: null,
        edit: null,
      },
      published: {
        selected: null,
        edit: null,
      },
    },
    forms: {
      login: {
        name: {
          value: '',
          defaultValue: '',
        },
        pass: {
          value: '',
          defaultValue: '',
        },
      },
      libraries: {
        id: { value: '-1', defaultValue: '-1' },
        name: { value: '' },
        address: { value: '' },
        lat: { value: '' },
        lng: { value: '' },
      },
      published: {
        id: { defaultValue: ''  },
        author: { defaultValue: '' },
        name: { defaultValue: '' },
        year: { defaultValue: '' },
        image: { defaultValue: '' },
      },
      book: {
        id: { defaultValue: '' },
        isbn: { defaultValue: '' },
        timeout: { defaultValue: '' },
      },
    },
    delete: {
      entity: null,
      id: null,
      name: '',
    },
    users: {
      'test@gmail.com': {
        id: 'test@gmail.com',
        name: 'Тарас Шевченко',
        pass: 'e42776aa51230617b6ac2d4690d78771d26acd39',
        avatar: avatar,
      },
      'test2@gmail.com': {
        id: 'test2@gmail.com',
        name: 'Леся Українка',
        pass: 'e42776aa51230617b6ac2d4690d78771d26acd39',
        avatar: avatar2,
      },
    },
    data: {
      libraries: [
        {
          id: '1',
          name: 'Публічна бібліотека імені Лесі Українки',
          address: 'бульвар Ігоря Шамо, 2/7, Київ, 02000',
          lat: '50.435301',
          lng: '30.599626',
        },
        {
          id: '2',
          name: 'Центральна міська бібліотека імені Т. Г. Шевченка для дітей',
          address: 'проспект Перемоги, 25А, Київ, 02000',
          lat: '50.4500103',
          lng: '30.4704845',
        },
        {
          id: '3',
          name: 'Національна бібліотека України імені В. І. Вернадського',
          address: 'Голосіївський просп., 3, Київ, 03039',
          lat: '50.3975225',
          lng: '30.5150566',
        },
        {
          id: '4',
          name: 'Міська спеціалізована молодіжна бібліотека "Молода гвардія"',
          address: 'вулиця Льва Толстого, 49, Київ, 02000',
          lat: '50.4404744',
          lng: '30.4988414',
        },
        {
          id: '5',
          name: 'Бібліотека імені Анни Ахматової',
          address: 'вулиця Казанська, 20, Київ, 02000',
          lat: '50.4985287',
          lng: '30.457203',
        },
        {
          id: '11',
          name: 'Публічна бібліотека імені Лесі Українки',
          address: 'бульвар Ігоря Шамо, 2/7, Київ, 02000',
          lat: '50.435301',
          lng: '30.599626',
        },
        {
          id: '12',
          name: 'Центральна міська бібліотека імені Т. Г. Шевченка для дітей',
          address: 'проспект Перемоги, 25А, Київ, 02000',
          lat: '50.4500103',
          lng: '30.4704845',
        },
        {
          id: '13',
          name: 'Національна бібліотека України імені В. І. Вернадського',
          address: 'Голосіївський просп., 3, Київ, 03039',
          lat: '50.3975225',
          lng: '30.5150566',
        },
        {
          id: '14',
          name: 'Міська спеціалізована молодіжна бібліотека "Молода гвардія"',
          address: 'вулиця Льва Толстого, 49, Київ, 02000',
          lat: '50.4404744',
          lng: '30.4988414',
        },
        {
          id: '15',
          name: 'Бібліотека імені Анни Ахматової',
          address: 'вулиця Казанська, 20, Київ, 02000',
          lat: '50.4985287',
          lng: '30.457203',
        },
      ],
      published: [
        {
          id: '978-617-12-1552-8',
          author: 'Л. Гунель',
          name: 'Бог завжди подорожує інкогніто',
          year: 2016,
          image: 'https://www.bookclub.ua/images/db/goods/k/39843_60833_k.jpg',
        },
        {
          id: '978-617-12-4544-0',
          author: 'С. Дж. Тюдор',
          name: 'Крейдяна Людина',
          year: 2018,
          image: 'https://www.bookclub.ua/images/db/goods/k/47726_76411_k.jpg',
        },
        {
          id: '978-617-12-4563-1',
          author: 'Н. Нікалео та ін.',
          name: 'Львів. Пані. Панянки',
          year: 2018,
          image: 'https://www.bookclub.ua/images/db/goods/k/47992_77520_k.jpg',
        },
        {
          id: '978-617-12-4738-3',
          author: 'Дж. Метьюз',
          name: 'Червоний горобець',
          year: 2018,
          image: 'https://www.bookclub.ua/images/db/goods/k/47725_76463_k.jpg',
        },
        {
          id: '978-617-12-4676-8',
          author: 'М. Ткачівська',
          name: 'Голос перепілки',
          year: 2018,
          image: 'https://www.bookclub.ua/images/db/goods/k/47988_77181_k.jpg',
        },
      ],
      books: [
        {
          id: '1',
          isbn: '978-617-12-4676-8',
          library: '3',
          reserved: null,
        },
        {
          id: '2',
          isbn: '978-617-12-4738-3',
          library: '3',
          reserved: null,
        },
        {
          id: '3',
          isbn: '978-617-12-4563-1',
          library: '3',
          reserved: null,
        },
        {
          id: '11',
          isbn: '978-617-12-4676-8',
          library: '3',
          reserved: null,
        },
        {
          id: '12',
          isbn: '978-617-12-4738-3',
          library: '3',
          reserved: null,
        },
        {
          id: '13',
          isbn: '978-617-12-4563-1',
          library: '3',
          reserved: null,
        },
        {
          id: '111',
          isbn: '978-617-12-4676-8',
          library: '3',
          reserved: null,
        },
        {
          id: '112',
          isbn: '978-617-12-4738-3',
          library: '3',
          reserved: null,
        },
        {
          id: '113',
          isbn: '978-617-12-4563-1',
          library: '3',
          reserved: null,
        },
      ],
    }
  },
  signals: {
    rootRouted: sequences.rootRouted,
    adminRouted: authenticate(sequences.adminRouted),
    applicationLoaded: sequences.applicationLoaded,
    showModal: sequences.showModal,
    updateField: sequences.updateField,
    submitLogin: sequences.submitLogin,
    openLogin: sequences.openLogin,
    closeLogin: sequences.closeLogin,
    logout: sequences.logout,
    autologin: sequences.autologin,
    loadFile: sequences.loadFile,
    downloadFile: sequences.downloadFile,
    selectLibrary: sequences.selectLibrary,
    selectBook: sequences.selectBook,
    selectPublished: sequences.selectPublished,
    deleteEntity: sequences.deleteEntity,
    deleteEntityConfirm: sequences.deleteEntityConfirm,
    editEntity: sequences.editEntity,
    resetEditForm: sequences.resetEditForm,
    postEntity: sequences.postEntity,
    removeFromLibraries: sequences.removeFromLibraries,
  },
  providers: {
    hash: hashProvider,
    longPromise,
    form: FormsProvider({
      // Add additional rules
      rules: {
        myAddedRule(value, arg, get) {
          // value of the field
          value
          // arg passed to the rule
          arg
          // The "get" argument from computed. Use it to grab
          // state or props passed to component. The component
          // will track use of these dependencies for rerender
          get

          return true
        }
      },

      // errorMessage property added to field when invalid with the following rules
      errorMessages: {
        minLength(value, minLength) {
          return `The length is ${
            value.length
            }, should be equal or more than ${minLength}`
        }
      }
    }),
  },
  modules: { router },
});
