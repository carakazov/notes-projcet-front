import React from 'react'

import * as adminEn from 'AdminApp/adminEn'

export const TRANSLATION_EN = {
    ...adminEn.TRANSLATION_EN,
    labels: {
        userNotAuthorized: "User not authorized",
        login: "Login",
        password: "Password",
        createNote: "+ Create note",
        createFolder: "+ Create folder",
        next: 'Next',
        prev: 'Prev',
        move: 'move',
        currentNote: 'Note',
        folder: 'Folder',
        name: 'Name',
        surname: 'Surname',
        middleName: 'Middle name',
        email: 'Email',
        dateOfBirth: 'Birthdate',
        favoriteBook: 'Favorite book',
        favoriteFilm: 'Favorite film',
        aboutYourself: 'Say something about yourself :)',
        noAdditionalInfo: 'User did not add info about himself yet',
        aboutMe: 'About me',
        read: 'Read',
        write: 'Read and write',
        accessors: 'accessors',
        loading: 'Loading...',
        grantFor: 'Grant access for',
        accessGranted: 'Access successfully granted',
        showAccess: 'accessors',
        onlyYouHaveAccess: 'Only you have access to this note',
        oldPassword: 'Old password',
        newPassword: 'New password',
        checkEmail: 'Check your email'
    },
    messages: {
        itIsRequiredField: "Required",
        canNotDeleteLocalFolder: "Can not delete local folder!",
        maxLength: 'Max length - ',
        pickCorrectDate: 'Pick correct date',
        inputCorrectEmail: 'Input correct email',
        lengthFrom5to255: 'From 5 to 255 symbols',
        lessThan3000Symbols: 'Less than 3000 symbols',
        loginTaken: 'Such login already exists',
        fatalError: 'Unexpected server error occurred. Sorry :(',
        checkInputData: 'Check input data'
    },
    buttons: {
        adminPanel: 'Admin panel',
        login: "Log In",
        logout: "Log Out",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        cancel: "Cancel",
        registration: "Registration",
        toMain: 'toMain',
        homePage: 'My page',
        change: 'Change info',
        toPage: 'To page',
        toList: 'All users',
        grantAccess: 'Grant access',
        denyAccess: 'Deny access',
        toAccessedNotes: 'To accessed notes',
        changePassword: 'Change password',
        restorePassword: 'Restore password',
        aboutSystem: 'About system'
    },
    errors: {
        auth: "Authorization error. Check your data",
        server: "Server error. Try later"
    },
    placeholders: {
        title: 'title',
        content: 'content',
        search: 'search'
    }
}