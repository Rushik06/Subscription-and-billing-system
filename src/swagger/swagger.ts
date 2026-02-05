 import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Subscription & Billing System API',
      version: '1.0.0',
      description:
        'API documentation for Assignment 5 - Subscription & Billing System'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
      tags: [
      { name: 'Auth', description: 'Authentication APIs' },
      { name: 'Users', description: 'User management APIs' },
      { name: 'Plans', description: 'Subscription plans APIs' },
      { name: 'Subscriptions', description: 'User subscriptions APIs' },
      { name: 'Invoices', description: 'Billing & invoice APIs' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: [
    './src/routes/**/*.ts',
    './src/controller/**/*.ts'
  ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;