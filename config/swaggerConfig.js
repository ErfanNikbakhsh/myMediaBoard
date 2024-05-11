const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger API Documentation',
      description: `Welcome to swagger api documentation To use this documentation please follow these steps:
      <ol> 
      <li>From auth section, use login endpoint and click on "Try it out" button.</li>
      <li>Fill request body with credentials you already have in order to grant token.</li>
      <li>After filling the request body with credentials, hit blue button called "Execute".</li>
      <li>If you have entered correct credentials, You receive a response in blow with a field called "token".</li>
      <li>Copy the value of token which is inside of double quotation and in the access field.</li>
      <li>At the top right corner, click on green text "Authorize" button and in the value field, paste the text you just copied in previous step.</li>
      <li>Hit on "Authorize" button.</li>
      <li>Congrats! You can now use all the endpoints.</li>
      </ol>
      `,
      contact: {
        name: '',
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./swagger/*.yaml'],
};

let options = {
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    tagsSorter: 'alpha',
    operationsSorter: 'method',
    tryItOutEnabled: true,
    persistAuthorization: true,
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, options };
