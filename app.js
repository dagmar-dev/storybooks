const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

//Load config
dotenv.config({ path: './config/config.env' })
connectDB()

const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({ 
    defaultLayout:'main',
    extname: '.hbs' ,
    })
)
app.set('view engine', '.hbs')

// Stat(ic folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes 
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8500

app.listen(
    PORT,
    console.log(
        `Server is running on ${process.env.NODE_ENV} mode on PORT ${PORT}`
    )
)
