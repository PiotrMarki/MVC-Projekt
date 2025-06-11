const Cocktail = require("../models/Cocktail")

class CocktailController {
  constructor() {
    this.cocktailModel = new Cocktail()
  }

  index(req, res) {
    try {
      const category = req.query.category
      const cocktails = this.cocktailModel.getCocktailsByCategory(category)
      const categories = this.cocktailModel.getCategories()

      res.render("cocktails/index", {
        title: "Kolekcja Koktajli",
        cocktails,
        categories,
        selectedCategory: category || "",
        message: req.query.message || null,
      })
    } catch (error) {
      console.error("Błąd w index:", error)
      res.status(500).render("error", {
        title: "Błąd serwera",
        message: "Wystąpił błąd podczas ładowania koktajli",
      })
    }
  }

  show(req, res) {
    try {
      const cocktail = this.cocktailModel.getCocktailById(req.params.id)
      if (!cocktail) {
        return res.status(404).render("404", { title: "Koktajl nie znaleziony" })
      }

      res.render("cocktails/show", {
        title: cocktail.name,
        cocktail,
        message: req.query.message || null,
      })
    } catch (error) {
      console.error("Błąd w show:", error)
      res.status(500).render("error", {
        title: "Błąd serwera",
        message: "Wystąpił błąd podczas ładowania koktajlu",
      })
    }
  }

  create(req, res) {
    const categories = this.cocktailModel.getCategories()
    res.render("cocktails/create", {
      title: "Dodaj Nowy Koktajl",
      categories,
    })
  }

  store(req, res) {
    try {
      const { name, category, ingredients, instructions } = req.body

      if (!name || !category || !ingredients || !instructions) {
        return res.status(400).render("cocktails/create", {
          title: "Dodaj Nowy Koktajl",
          categories: this.cocktailModel.getCategories(),
          error: "Wszystkie pola są wymagane",
          formData: req.body,
        })
      }

      this.cocktailModel.addCocktail(req.body)
      res.redirect("/cocktails?message=Koktajl został dodany pomyślnie")
    } catch (error) {
      console.error("Błąd w store:", error)
      res.status(500).render("cocktails/create", {
        title: "Dodaj Nowy Koktajl",
        categories: this.cocktailModel.getCategories(),
        error: "Wystąpił błąd podczas dodawania koktajlu",
        formData: req.body,
      })
    }
  }

  edit(req, res) {
    try {
      const cocktail = this.cocktailModel.getCocktailById(req.params.id)
      if (!cocktail) {
        return res.status(404).render("404", { title: "Koktajl nie znaleziony" })
      }

      const categories = this.cocktailModel.getCategories()
      res.render("cocktails/edit", {
        title: `Edytuj ${cocktail.name}`,
        cocktail,
        categories,
      })
    } catch (error) {
      console.error("Błąd w edit:", error)
      res.status(500).render("error", {
        title: "Błąd serwera",
        message: "Wystąpił błąd podczas ładowania formularza edycji",
      })
    }
  }

  update(req, res) {
    try {
      const { name, category, ingredients, instructions } = req.body

      if (!name || !category || !ingredients || !instructions) {
        const cocktail = this.cocktailModel.getCocktailById(req.params.id)
        return res.status(400).render("cocktails/edit", {
          title: `Edytuj ${cocktail.name}`,
          cocktail,
          categories: this.cocktailModel.getCategories(),
          error: "Wszystkie pola są wymagane",
        })
      }

      const updatedCocktail = this.cocktailModel.updateCocktail(req.params.id, req.body)
      if (!updatedCocktail) {
        return res.status(404).render("404", { title: "Koktajl nie znaleziony" })
      }

      res.redirect(`/cocktails/${req.params.id}?message=Koktajl został zaktualizowany`)
    } catch (error) {
      console.error("Błąd w update:", error)
      const cocktail = this.cocktailModel.getCocktailById(req.params.id)
      res.status(500).render("cocktails/edit", {
        title: `Edytuj ${cocktail.name}`,
        cocktail,
        categories: this.cocktailModel.getCategories(),
        error: "Wystąpił błąd podczas aktualizacji koktajlu",
      })
    }
  }

  rate(req, res) {
    try {
      const { rating } = req.body

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Ocena musi być między 1 a 5" })
      }

      const updatedCocktail = this.cocktailModel.rateCocktail(req.params.id, rating)
      if (!updatedCocktail) {
        return res.status(404).json({ error: "Koktajl nie znaleziony" })
      }

      res.json({
        success: true,
        newRating: updatedCocktail.rating,
        message: "Dziękujemy za ocenę!",
      })
    } catch (error) {
      console.error("Błąd w rate:", error)
      res.status(500).json({ error: "Wystąpił błąd podczas oceniania" })
    }
  }

  destroy(req, res) {
    try {
      const deleted = this.cocktailModel.deleteCocktail(req.params.id)
      if (!deleted) {
        return res.status(404).render("404", { title: "Koktajl nie znaleziony" })
      }

      res.redirect("/cocktails?message=Koktajl został usunięty")
    } catch (error) {
      console.error("Błąd w destroy:", error)
      res.status(500).render("error", {
        title: "Błąd serwera",
        message: "Wystąpił błąd podczas usuwania koktajlu",
      })
    }
  }
}

module.exports = CocktailController
