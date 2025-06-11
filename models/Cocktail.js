const fs = require("fs")
const path = require("path")

class Cocktail {
  constructor() {
    this.dataPath = path.join(__dirname, "../data/cocktails.json")
    this.ensureDataFile()
  }

  ensureDataFile() {
    const dataDir = path.dirname(this.dataPath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    if (!fs.existsSync(this.dataPath)) {
      const initialData = [
        {
          id: 1,
          name: "Mojito",
          category: "Rum",
          ingredients: [
            "50ml białego rumu",
            "30ml soku z limonki",
            "20ml syropu cukrowego",
            "8-10 listków mięty",
            "Woda gazowana",
            "Lód",
          ],
          instructions:
            "1. Wmuraj miętę z syropem w szklance\n2. Dodaj sok z limonki i rum\n3. Wypełnij szklankę lodem\n4. Dolej wodą gazowaną\n5. Wymieszaj delikatnie",
          rating: 4.5,
          ratings: [5, 4, 5, 4],
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Cosmopolitan",
          category: "Vodka",
          ingredients: [
            "40ml wódki",
            "15ml triple sec",
            "30ml soku żurawinowego",
            "15ml soku z limonki",
            "Skórka pomarańczy",
          ],
          instructions:
            "1. Wszystkie składniki wstrząśnij z lodem w shakerze\n2. Przecedź do schłodzonej szklanki martini\n3. Udekoruj skórką pomarańczy",
          rating: 4.2,
          ratings: [4, 5, 4, 4],
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Piña Colada",
          category: "Rum",
          ingredients: [
            "60ml białego rumu",
            "90ml mleka kokosowego",
            "90ml soku ananasowego",
            "2 łyżki cukru",
            "Lód",
            "Plasterek ananasa do dekoracji",
          ],
          instructions:
            "1. Wszystkie składniki zmiksuj z lodem w blenderze\n2. Przelej do wysokiej szklanki\n3. Udekoruj plasterkiem ananasa\n4. Podawaj z słomką",
          rating: 4.7,
          ratings: [5, 5, 4, 5],
          createdAt: new Date().toISOString(),
        },
      ]
      fs.writeFileSync(this.dataPath, JSON.stringify(initialData, null, 2))
    }
  }

  getAllCocktails() {
    try {
      const data = fs.readFileSync(this.dataPath, "utf8")
      return JSON.parse(data)
    } catch (error) {
      console.error("Błąd odczytu danych:", error)
      return []
    }
  }

  getCocktailById(id) {
    const cocktails = this.getAllCocktails()
    return cocktails.find((cocktail) => cocktail.id === Number.parseInt(id))
  }

  addCocktail(cocktailData) {
    const cocktails = this.getAllCocktails()
    const newId = cocktails.length > 0 ? Math.max(...cocktails.map((c) => c.id)) + 1 : 1

    const newCocktail = {
      id: newId,
      name: cocktailData.name,
      category: cocktailData.category,
      ingredients: Array.isArray(cocktailData.ingredients)
        ? cocktailData.ingredients
        : cocktailData.ingredients.split("\n").filter((ing) => ing.trim()),
      instructions: cocktailData.instructions,
      rating: 0,
      ratings: [],
      createdAt: new Date().toISOString(),
    }

    cocktails.push(newCocktail)
    this.saveCocktails(cocktails)
    return newCocktail
  }

  updateCocktail(id, cocktailData) {
    const cocktails = this.getAllCocktails()
    const index = cocktails.findIndex((cocktail) => cocktail.id === Number.parseInt(id))

    if (index !== -1) {
      cocktails[index] = {
        ...cocktails[index],
        name: cocktailData.name,
        category: cocktailData.category,
        ingredients: Array.isArray(cocktailData.ingredients)
          ? cocktailData.ingredients
          : cocktailData.ingredients.split("\n").filter((ing) => ing.trim()),
        instructions: cocktailData.instructions,
        updatedAt: new Date().toISOString(),
      }
      this.saveCocktails(cocktails)
      return cocktails[index]
    }
    return null
  }

  rateCocktail(id, rating) {
    const cocktails = this.getAllCocktails()
    const index = cocktails.findIndex((cocktail) => cocktail.id === Number.parseInt(id))

    if (index !== -1) {
      cocktails[index].ratings.push(Number.parseInt(rating))
      const sum = cocktails[index].ratings.reduce((a, b) => a + b, 0)
      cocktails[index].rating = Math.round((sum / cocktails[index].ratings.length) * 10) / 10
      this.saveCocktails(cocktails)
      return cocktails[index]
    }
    return null
  }

  deleteCocktail(id) {
    const cocktails = this.getAllCocktails()
    const filteredCocktails = cocktails.filter((cocktail) => cocktail.id !== Number.parseInt(id))
    this.saveCocktails(filteredCocktails)
    return filteredCocktails.length < cocktails.length
  }

  getCocktailsByCategory(category) {
    const cocktails = this.getAllCocktails()
    return category ? cocktails.filter((cocktail) => cocktail.category === category) : cocktails
  }

  getCategories() {
    const cocktails = this.getAllCocktails()
    const categories = [...new Set(cocktails.map((cocktail) => cocktail.category))]
    return categories.sort()
  }

  saveCocktails(cocktails) {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(cocktails, null, 2))
    } catch (error) {
      console.error("Błąd zapisu danych:", error)
    }
  }
}

module.exports = Cocktail
