import React from 'react'

import * as adminRu from 'AdminApp/adminRu'

export const TRANSLATION_RU = {
    ...adminRu.TRANSLATION_RU,
    labels: {
        userNotAuthorized: "Пользователь не авторизован",
        login: "Логин",
        password: "Пароль",
        createNote: "+ Создать документ",
        createFolder: "+ Создать папку",
        next: 'След.',
        prev: 'Пред.',
        move: 'перенести',
        currentNote: 'Записка',
        folder: 'Папка',
        name: 'Имя',
        surname: 'Фамилия',
        middleName: 'Отчество',
        email: 'Email',
        dateOfBirth: 'Дата рождения',
        favoriteBook: 'Любимая книга',
        favoriteFilm: 'Любимый фильм',
        aboutYourself: 'Расскажите что-нибудь о себе :)',
        noAdditionalInfo: 'Пользователь пока о себе ничего не написал',
        aboutMe: 'Обо мне:',
        read: 'Чтение',
        write: 'Чтение и запись',
        loading: 'Загрузка...',
        grantFor: 'Доступ для',
        accessGranted: 'Доступ успешно предоставлен',
        accessors: 'доступы',
        onlyYouHaveAccess: 'Только у вас есть доступ к этой записке',
        oldPassword: 'Старый пароль',
        newPassword: 'Новый пароль',
        checkInputData: 'Проверьте введенные данные',
        checkEmail: 'Проверьте Вашу почту'
    },
    messages: {
        itIsRequiredField: "Обязательно",
        canNotDeleteLocalFolder: "Локальную папку удалить нельзя!",
        maxLength: 'Максимальная длина - ',
        pickCorrectDate: 'Выберите корректную дату',
        inputCorrectEmail: 'Введите email',
        lengthFrom5to255: 'От 5 до 255 символов',
        lessThan3000Symbols: 'Должно быть меньше 3000 символов',
        loginTaken: 'Такой логин уже занят',
        fatalError: 'Неизвестная ошибка на сервере. Простите :('
    },
    buttons: {
        adminPanel: 'Панель админа',
        login: "Вход",
        logout: "Выйти",
        save: "Сохранить",
        delete: "Удалить",
        edit: "Изменить",
        cancel: "Отмена",
        registration: "Регистрация",
        toMain: 'На главную',
        homePage: 'Моя страница',
        change: 'Изменить данные',
        toPage: 'Личная страница',
        toList: 'Все пользователи',
        grantAccess: 'Дать доступ',
        denyAccess: 'Отменить доступ',
        toAccessedNotes: 'К общим запискам',
        changePassword: 'Сменить пароль',
        restorePassword: 'Восстаноавить пароль',
        aboutSystem: 'О системе'
    },
    errors: {
        auth: "Ошибка авторизации. Проверьте введённые данные",
        server: "Ошибка на сервере. Попробуйте позже"
    },
    placeholders: {
        title: 'Название',
        content: 'Содержание',
        search: 'search'
    }
}