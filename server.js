const express = require('express')
const request = require('request')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    request('https://api.themoviedb.org/3/movie/popular?api_key=9ca82e55b4c7a68c0b98af0e8086af78&language=en-US&page=1', (err, response, body) => {
    const movies = JSON.parse(body).results
    res.render('index', { movies })
    })
})

app.get('/movie/:id', (req, res) => {
    const id = req.params.id
    request(`https://api.themoviedb.org/3/movie/${id}?api_key=9ca82e55b4c7a68c0b98af0e8086af78`, (err, response, body) => {
    const movie = JSON.parse(body)
    const data = {movie}
    res.render('movie', data)
    })
})

app.get('/search', (req, res) => {
    const q = req.query.q
    request(`https://api.themoviedb.org/3/search/movie?api_key=9ca82e55b4c7a68c0b98af0e8086af78&query=${q}`, (err, response, body) => {
    const movies = JSON.parse(body).results
    res.render('index', {movies})
    })
})

app.listen(8080)