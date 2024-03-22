import express from 'express'
import { mongoDBConnection } from './database/mongoConfig.js'


//ROUTERS
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionRouter from './routes/session.router.js'


//UTLIDADES
import cors from 'cors'
import __dirname from './utils.js'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import SwaggerUiExpress from 'swagger-ui-express'
import { addLogger, logger } from './utils/logger.js'
import { PORT } from './config/config.js'





const app = express()

app.use(addLogger)

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Coderhouse Ecommerce Documentacion',
      description: 'Este es un proyecto educativo que sirve como api para un simple ecommerce.'
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))

app.use(cors())
app.use(cookieParser())


//ENDPOINTS
app.use('/api/session', sessionRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



await mongoDBConnection()

app.listen(PORT, () => logger.info(`Listening on port: ${PORT}`))