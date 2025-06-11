const express = require("express")
const CocktailController = require("../controllers/CocktailController")

const router = express.Router()
const cocktailController = new CocktailController()

router.get("/cocktails", (req, res) => cocktailController.index(req, res))

router.get("/cocktails/new", (req, res) => cocktailController.create(req, res))

router.get("/cocktails/:id", (req, res) => cocktailController.show(req, res))

router.get("/cocktails/:id/edit", (req, res) => cocktailController.edit(req, res))

router.post("/cocktails", (req, res) => cocktailController.store(req, res))

router.post("/cocktails/:id/update", (req, res) => cocktailController.update(req, res))

router.post("/cocktails/:id/rate", (req, res) => cocktailController.rate(req, res))

router.post("/cocktails/:id/delete", (req, res) => cocktailController.destroy(req, res))

module.exports = router
