const i18next = require('i18next');

i18next
  .init({
    fallbackLng: 'en', // Default language
    resources: {
      en: {
        translation: {
          genericError: 'There is a problem, Please try again!',
          'any.required': '{{label}} is required.',
          'string.base': '{{label}} must be a string.',
          'string.email': 'email must be a valid email address.',
          'string.min': 'password must be at least 6 characters long.',
          'user.exists': 'User already exists',
          'auth.invalidCredentials': 'Invalid credential',
        },
      },
      nl: {
        translation: {
          genericError: 'Er is een probleem, probeer het opnieuw!',
          'any.required': '{{label}} Is vereist.',
          'string.base': '{{label}} moet een string zijn.',
          'string.email': 'e-mail moet een geldig e-mailadres zijn.',
          'string.min': 'Het wachtwoord moet op zijn minst 6 tekens lang zijn.',
          'user.exists': 'Gebruiker bestaat al',
          'auth.invalidCredentials': 'Ongeldige identificatie',
        },
      },
    },
  })
  .then(() => {
    console.log('i18next initialized');
  });

module.exports = i18next;
