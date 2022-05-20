const axios = require('axios').default;

module.exports = class IndexController {
    static index(req, res) {
        axios.get(process.env.API_HOST + '/discover/movie?api_key=' + process.env.API_KEY + '&language=pt-BR')
            .then((response) => {
                let filmes = response.data.results
                //console.log(filmes)

                filmes.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1);

                res.render('index', {
                    filmes: filmes
                })
            })
    }

    static show(req, res) {
        const movieId = req.params.id

        Promise.all([
            axios.get(process.env.API_HOST + '/movie/' + movieId + '?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords'),
            axios.get(process.env.API_HOST + '/movie/' + movieId + '/credits?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords'),
            axios.get(process.env.API_HOST + '/movie/' + movieId + '/videos?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords'),
            axios.get(process.env.API_HOST + '/movie/' + movieId + '/recommendations?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords')
        ]).then( (response) => { 
            //console.log(response[0].data)
            //console.log(response[1].data.cast)
            //console.log(response[2].data.results)
            let actors =[] 
            let movie = response[0].data
            let credits = response[1].data.cast
            let recommendation = response[3].data.results
            console.log(recommendation)

            credits.forEach((element, index) => {
                if(index <8){
                    actors.push(element)
                }
            });
           
            let trailer = response[2].data.results
            
            res.render('movie', {
                movie: movie,
                credits: actors,
                trailer: trailer[0],
                recommendation: recommendation
            })            
        })
    }
}
