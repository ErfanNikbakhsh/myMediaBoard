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
          'array.base': '{{label}} must be an array.',
          'array.empty': '{{label}} array can not be empty',
          'object.unknown': 'The {{label}} key is not allowed.',
          'id.invalidData': 'The {{label}}Id is not valid.',
          'user.exists': 'User already exists',
          'auth.invalidCredentials': 'Invalid credential',
          'upload.unsupportedFile': "File's format must be pdf or image",
          'upload.fileTooLarge': 'File is too large to upload',
          'upload.fileMissing': 'The file has not been received',
          'upload.success': 'The file uploaded successfully',
          'media.notFound': 'Media not found',
          'media.delete': 'Media deleted Successfully',
          'display.create': 'Display created Successfully',
          'display.notFound': 'Display not found',
          'display.edit': 'Display edited successfully',
          'display.delete': 'Display deleted successfully',
        },
      },
      nl: {
        translation: {
          genericError: 'Er is een probleem, probeer het opnieuw!',
          'any.required': '{{label}} Is vereist.',
          'string.base': '{{label}} moet een string zijn.',
          'string.email': 'e-mail moet een geldig e-mailadres zijn.',
          'string.min': 'Het wachtwoord moet op zijn minst 6 tekens lang zijn.',
          'array.base': '{{label}} moet een array zijn.',
          'array.empty': '{{label}} array mag niet leeg zijn',
          'object.unknown': 'De {{label}} is niet toegestaan.',
          'id.invalidData': 'De {{label}} is niet geldig..',
          'user.exists': 'Gebruiker bestaat al',
          'auth.invalidCredentials': 'Ongeldige identificatie',
          'upload.unsupportedFile': 'Het bestandsformaat moet pdf of afbeelding zijn',
          'upload.fileTooLarge': 'Het bestand is te groot om te uploaden',
          'upload.fileMissing': 'Het bestand is niet ontvangen',
          'upload.success': 'Het bestand is succesvol geüpload',
          'media.notFound': 'Media niet gevonden',
          'media.delete': 'Media succesvol verwijderd',
          'display.create': 'Scherm succesvol aangemaakt',
          'display.notFound': 'Scherm niet gevonden',
          'display.edit': 'Weergave succesvol bewerkt',
          'display.delete': 'Weergave succesvol verwijderd',
        },
      },
    },
  })
  .then(() => {
    console.log('i18next initialized');
  });

module.exports = i18next;
