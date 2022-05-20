const axios = require('axios').default;

module.exports = class SearchController {
    static index(req, res) {
        axios.get(process.env.API_HOST + '/search/multi?api_key=' + process.env.API_KEY + '&language=pt-BR&query='+req.query.search)
            .then((response) => {
                let colecao = response.data.results
                console.log(colecao)

                colecao.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1);

                res.render('search', {
                    results: colecao
                })
            })
    }

    static show(req, res) {
        const movieId = req.params.id
        
        axios.get(process.env.API_HOST + '/movie/' + movieId + '?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords')
            .then((response) => {
                console.log(response.data)
                let movie = response.data
                res.render('movie', {
                    movie: movie
                })
            })
    }
}