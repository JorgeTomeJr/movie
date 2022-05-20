const axios = require('axios').default;

module.exports = class SeriesController {
    static index(req, res) {
        axios.get(process.env.API_HOST + '/discover/tv?api_key=' + process.env.API_KEY + '&language=pt-BR&sort_by=vote_average.desc')
            .then((response) => {
                let series = response.data.results
                console.log(series)

                series.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1);

                res.render('series', {
                    series: series
                })
            })
    }
    static show(req, res){
        const serieId = req.params.id
        Promise.all([
            axios.get(process.env.API_HOST + '/tv/' + serieId + '?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords'),
            axios.get(process.env.API_HOST + '/tv/' + serieId + '/credits?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords'),
            axios.get(process.env.API_HOST + '/tv/' + serieId + '/videos?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords'),
            axios.get(process.env.API_HOST + '/tv/' + serieId + '/recommendations?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords')
        ]).then( (response) =>{
            let actors =[] 
            let series = response[0].data
            console.log(series)
            let credits = response[1].data.cast
            let trailer = response[2].data.results
            let recommendation = response[3].data.results
            //console.log(credits)

            credits.forEach((element, index) => {
                if(index <8){
                    actors.push(element)
                }
            });
            res.render('seriedestaque', {
                series: series,
                credits: actors,
                trailer: trailer[0],
                recommendation: recommendation
            })
        })
    }

}

    /*static show(req, res) {
        const serieId = req.params.id
        axios.get(process.env.API_HOST + '/tv/' + serieId + '?api_key=' + process.env.API_KEY + '&language=pt-BR&append_to_response=keywords')
            .then((response) => {
                console.log(response.data)
                let serie = response.data
                res.render('seriedestaque', {
                    serie: serie
                })
            })
    }*/
