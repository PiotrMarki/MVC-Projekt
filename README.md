# MVC-Projekt - Zadanie nr 8: Kolekcja ulubionych przepisów na koktajle

## Opis projektu:
Aplikacja webowa „Kolekcja Koktajli” została stworzona przy użyciu architektury MVC. Wykorzystuje Node.js oraz Express.js. Jest to aplikacja do zarządzania bazą swoich ulubionych przepisów na koktajle. Dzięki niej nasze przepisy będą zebrane w jednym miejscu. Dzięki swojej przejrzystości i prostej budowie wszystkie funkcje znajdują się pod ręką, a sama aplikacja nie odrzuci użytkowników swoim skomplikowaniem.

## Lista funkcjonalności

### Możliwość dodania nowych przepisów z listą składników, instrukcjami oraz kategorią:
Na stronie głównej znajduje się przycisk „Dodaj koktajl”, który przenosi nas do okna, w którym możemy:
- dodać koktajl,
- przypisać go do wybranej kategorii,
- napisać listę składników,
- oraz dodać przepis na dany koktajl.

Po naciśnięciu „Dodaj koktajl” zostanie on dodany do naszej bazy, która znajduje się na stronie głównej.

#### Dodawanie nowego koktajlu:
- **Nazwa** (wymagane): tekst, 3–100 znaków  
- **Kategoria** (wymagane): wybór z listy lub własna kategoria  
- **Składniki** (wymagane): tekst wieloliniowy, każdy składnik w nowej linii  
- **Instrukcje** (wymagane): tekst wieloliniowy z krokami przygotowania  

### Możliwość edytowania oraz oceniania przepisów:
Będąc na stronie głównej, możemy wejść w każdy wcześniej dodany koktajl. Edycję możemy zacząć już z poziomu strony głównej, klikając „Edytuj”, lub po wejściu w okno koktajlu, naciskając „Edytuj przepis”. Powyższe czynności przenoszą nas do formularza, w którym możemy zmienić wcześniej zapisane informacje o naszym koktajlu. Po naciśnięciu „Zapisz zmiany” przepis zostanie zaktualizowany.

Jest również możliwość oceniania koktajli w skali od 1 do 5 – przydatna funkcja, zwłaszcza wśród znajomych. Każdy zaznacza swoją opinię, a średnia ocen wyświetla się przy przepisie.

### Możliwość filtrowania koktajli za pomocą wybranej kategorii:
Przy dodawaniu przepisu drugą czynnością, jaką wykonujemy, jest przypisanie koktajlu do kategorii. Na stronie głównej dostępna jest funkcja „Filtruj według kategorii”. Kiedy wybierzemy naszą kategorię i naciśniemy „Filtruj”, ukażą się nam szukane koktajle.

## Wymagania systemowe:
- Node.js w wersji 14.0.0 lub nowszej  
- Node Package Manager w wersji 6.0.0  

## Sposób uruchomienia:
- Przejście do folderu MVC-Projekt za pomocą: `cd MVC-Projekt`  
- Instalacja: `npm install`  
- Uruchomienie aplikacji: `npm start`  
- Aplikacja uruchomi się na porcie 3000, dlatego wpisujemy w przeglądarkę: `http://localhost:3000/cocktails`  

## Opis komponentów:

### Modele (`models/`)
- **`Cocktail.js`** – odpowiada za:
  - operacje CRUD na danych koktajli (Create, Read, Update, Delete),
  - zarządzanie plikiem JSON jako bazą danych,
  - obliczanie średnich ocen i statystyk,
  - filtrowanie koktajli według kategorii,
  - walidację danych wejściowych.

### Kontrolery (`controllers/`)
- **`CocktailController.js`** – obsługuje logikę biznesową:
  - `index()` – wyświetlanie listy koktajli z możliwością filtrowania,  
  - `show()` – wyświetlanie szczegółów pojedynczego koktajlu,  
  - `create()` – wyświetlanie formularza dodawania nowego koktajlu,  
  - `store()` – zapisywanie nowego koktajlu do bazy danych,  
  - `edit()` – wyświetlanie formularza edycji istniejącego koktajlu,  
  - `update()` – aktualizacja danych istniejącego koktajlu,  
  - `rate()` – obsługa oceniania koktajli przez AJAX,  
  - `destroy()` – usuwanie koktajlu z bazy danych.

### Widoki (`views/`)
- **`partials/header.ejs`** – wspólny nagłówek zawierający nawigację, meta tagi i linki do stylów  
- **`partials/footer.ejs`** – wspólna stopka ze skryptami JavaScript i zamknięciem HTML  
- **`cocktails/index.ejs`** – lista wszystkich koktajli z filtrowaniem i podstawowymi informacjami  
- **`cocktails/show.ejs`** – szczegółowy widok koktajlu z formularzem oceniania i statystykami  
- **`cocktails/create.ejs`** – formularz dodawania nowego koktajlu z walidacją  
- **`cocktails/edit.ejs`** – formularz edycji istniejącego koktajlu  
- **`404.ejs`** – strona błędu 404 dla nieistniejących zasobów  
- **`error.ejs`** – strona błędów ogólnych z komunikatami dla użytkownika  

## Przykładowe dane wejściowe:

### Koktajl 1: Mojito
- **Nazwa:** Mojito  
- **Kategoria:** Rum  
- **Składniki:**  
  50 ml białego rumu  
  30 ml soku z limonki  
  20 ml syropu cukrowego  
  8–10 listków świeżej mięty  
  Woda gazowana  
  Kostki lodu  

- **Instrukcje:**  
  1. Ugnieć delikatnie miętę z syropem w wysokiej szklance  
  2. Dodaj sok z limonki i biały rum  
  3. Wypełnij szklankę kostkami lodu  
  4. Dolej wodę gazowaną do pełna  
  5. Wymieszaj delikatnie łyżką  
  6. Udekoruj gałązką mięty  
