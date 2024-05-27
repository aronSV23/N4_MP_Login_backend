import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'MP_Login',
    description: 'Login full stack'
  },
  host: 'localhost:3000'
}

const outputFile = './swagger-output.json'
const routes = ['src/app.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc)
