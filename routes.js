const { Router } = require('express')
const router = Router()
const IndexController = require('./controllers/IndexController')
const SeriesController = require('./controllers/SeriesController')//importa do controler
const SearchController = require('./controllers/SearchController')

router.get('/', IndexController.index)
router.get('/filme/:id', IndexController.show)
router.get('/series', SeriesController.index)//cria rota e passa o nome da classe do controler e 
router.get('/serie/:id', SeriesController.show)
router.get("/search", SearchController.index)


module.exports = router//exportando as rotas