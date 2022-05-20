const helpers = {
    renderizaEstrelas(quantidade) {
        quantidadeInt = parseInt(quantidade)
        string = ""
        for (let x = 0; x < quantidadeInt; x++) {
            string += '<i class="fa-solid fa-star"></i>'
        }
        return string + " " + quantidade
    },
    renderizaGenero(genres){
        string = "";
        genres.forEach(element => {
            string += `<a href="/movies/${element.id}">${element.name}</a> `
        });
        return string;
    },
    renderizaElenco(credits){
        string = "";
        credits.forEach((element, index) =>{
            if(index < 10){
                string += `
                    <img id="elenco" src="https://image.tmdb.org/t/p/w500/${element.profile_path}">
                    <span>${element.name}  ${element.character}</span>
                `
            }
        })
        return string;
    },
    renderizaImagem(image){
        if(image){
            return `<img src="https://image.tmdb.org/t/p/w500${image}" class="w-100"/>`;
        }else{
            return `<img src="/img/x.png" class="w-100" />`;
        }
    },
    testaFilmeOuSerie(tipo, id){
        return `<a href="/${tipo === 'tv' ? "serie" : "filme"}/${id}" />`;
    }
}

module.exports = helpers