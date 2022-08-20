const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather website',
        name: 'Meloi'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'Meloi'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        name: 'Meloi',
        helpText: 'Some Help text!'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/sample', (req, res)=>{
    res.send({
        sample: 'This is a sample text!'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errorMessage: 'Specific Help page not found!'
        
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage: '404 Not found!'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

