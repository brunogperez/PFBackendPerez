import express from 'express'
import cors from 'cors'

//BASE DE DATOS
import { mongoDBConnection } from './database/mongoConfig.js'

//ROUTERS
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import sessionRouter from './routes/session.router.js'

//UTLIDADES
import __dirname from './utils.js'
// import swaggerJSDoc from 'swagger-jsdoc'
// import SwaggerUiExpress from 'swagger-ui-express'
import { logger } from './utils/logger.js'
import { PORT } from './config/config.js'
import { requestUrl } from './middlewares/logger.middlewares.js'


const app = express()

app.use(cors())
app.use(requestUrl)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//ENDPOINTS
app.use('/api/session', sessionRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



await mongoDBConnection()

app.listen(PORT, () => logger.info(`Listening on port: ${PORT}`))