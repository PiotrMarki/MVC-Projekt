# MVC-Projekt - Zadanie Nr.8 Kolekcja ulubionych przepisów do koktajli

## Opis projektu:
Aplikacja webowa "Kolekcja Koktaili" została stworzona przy użyciu architektóry MVC. Wykożystuje Node.js oraz Express.js. Jest to aplikacja do zarządzania bazą swoich ulubionych przepisów na koktaile. Dzięki niej nasze przepisy będą zebrane w jednym miejscu. Dzięki jej przejrzystości i prostej budowie wszytkie funckje znajdują się pod ręką, a sama aplikacja nie odrzuci użytkowników swoim skomplikowaniem.

## Lista funkcjonalności 
Możliwość dodania nowych przepisów z listą składnjików instrukcjami oraz kategorią - 
Na stronie głównej znajduje się przycisk "Dodaj koktail" który przenosi nas do okna w którym możemy: Dodać koktail, Przydzielić go do wybranej kategorii, Napisać listę składników oraz Napisać przepis na dany koktail. Po naciśnięciu dodaj koktail zostanie on dodany do naszej bazy koktail która znajduje się na stronie głównej.

Możliwość edytowania oraz oceniania przepisów - 
Będąc na stronie głównej możemy wejść w każdy wcześniej dodany koktail. Edycje możemy zacząć juz z strony tytułowej klikając "Edytuj" Lub po wejściu w okno koktailu naciskając "Edytuj przepis". Powyższe czynności przenoszą nas do formularza w którym możemy zmienić wcześniej zapisane informacje i naszym koktajlu. Po naciśnięciu "Zapisz zmiany" przepis zaostaanie zaktualizowany. Jest również możliwość oceny koktaili w zkali od 1 do 5. Przydatna funkcja zwłaszcze pośród znajomych. Każdy zaznacza swoją opinię o średnia ocen wyświetla się przy przepisie.

Możliwość filtrowania koktali za pomocą wybrania kategorii - 
Przy dodawaniu przepisu drugą czynnością jaką wykonujemy jest dodanie koktajlu do kategorii. Znajdując się na głównej stronie dostępna jest funkcja "FIltruj według kategorii". Kiedy wybierzemy naszą kategorię i naciśniemy "Filtruj" ukarzą się nam szukane koktaile.

## Wymagania systemowe
Node.js w wersji 14.0.0 lub nowszej
Node Package Manager w wersji 6.0.0 

## Sposób uruchomienia
Przejście do folderu MVC-Projekt za pomocą: cd MVC-Projekt
Instalacja: npm install
Uruchomienie aplikacji: npm start
Aplikacja uruchomi się na porcie 3000 dletego wpisujemy w przeglądarke: http://localhost:3000/cocktails

## Opis komponentów

### Modele (models/)
- **`Cocktail.js`** - odpowiada za:
  - Operacje CRUD na danych koktajli (Create, Read, Update, Delete)
  - Zarządzanie plikiem JSON jako bazą danych
  - Obliczanie średnich ocen i statystyk
  - Filtrowanie koktajli według kategorii
  - Walidację danych wejściowych

### Kontrolery (controllers/)
- **`CocktailController.js`** - obsługuje logikę biznesową:
  - `index()` - wyświetlanie listy koktajli z możliwością filtrowania
  - `show()` - wyświetlanie szczegółów pojedynczego koktajlu
  - `create()` - wyświetlanie formularza dodawania nowego koktajlu
  - `store()` - zapisywanie nowego koktajlu do bazy danych
  - `edit()` - wyświetlanie formularza edycji istniejącego koktajlu
  - `update()` - aktualizacja danych istniejącego koktajlu
  - `rate()` - obsługa oceniania koktajli przez AJAX
  - `destroy()` - usuwanie koktajlu z bazy danych

### Widoki (views/)
- **`partials/header.ejs`** - wspólny nagłówek zawierający nawigację, meta tagi i linki do stylów
- **`partials/footer.ejs`** - wspólna stopka z skryptami JavaScript i zamknięciem HTML
- **`cocktails/index.ejs`** - lista wszystkich koktajli z filtrowaniem i podstawowymi informacjami
- **`cocktails/show.ejs`** - szczegółowy widok koktajlu z formularzem oceniania i statystykami
- **`cocktails/create.ejs`** - formularz dodawania nowego koktajlu z walidacją
- **`cocktails/edit.ejs`** - formularz edycji istniejącego koktajlu
- **`404.ejs`** - strona błędu 404 dla nieistniejących zasobów
- **`error.ejs`** - strona błędów ogólnych z komunikatami dla użytkownika




