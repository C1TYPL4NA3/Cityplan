# Cityplan AG Zürich — Website

Laravel-Anwendung (Blade, Filament-Admin, MySQL/SQLite) für die Website der
Cityplan AG Zürich. Layout und Design sind in Blade/CSS fest verdrahtet;
Inhalte, Projekte, Jobs, Kontaktangaben sowie ausgewählte globale
Design-Einstellungen (Schriftart, Schriftgrössen, Farben) werden über den
Adminbereich unter `/admin` verwaltet.

## Setup

```bash
composer install
npm install

cp .env.example .env
php artisan key:generate

# SQLite ist der Standard (siehe .env: DB_CONNECTION=sqlite). Für MySQL/MariaDB
# stattdessen DB_CONNECTION, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD setzen.
touch database/database.sqlite

php artisan migrate --seed
php artisan storage:link

npm run build   # oder: npm run dev
php artisan serve
```

Admin-Login danach unter `/admin` mit dem per `php artisan make:filament-user`
angelegten Konto.

## Hinweis zu den Platzhalterdaten

Die mitgelieferten Beispielprojekte, Projekttexte und Bilder stammen 1:1 aus
den ursprünglich gelieferten HTML-Designvorlagen (dort teils bereits als
vorläufig gekennzeichnet, z. B. „20XX–20XX", „[Angabe Bauherrschaft]"). Sie
dienen als Startpunkt und sollten im Adminbereich durch echte Projektdaten
ersetzt werden. Es wurden keine Firmendaten, Bauherrschaften oder Jahreszahlen
frei erfunden.

## Struktur

- `app/Models` — Eloquent-Modelle
- `app/Filament/Resources`, `app/Filament/Pages` — Adminbereich
- `resources/views` — Blade-Layouts, Components, Seiten
- `resources/css/app.css` — Design-Master-Stylesheet (konsumiert CSS-Variablen
  aus den Design-Einstellungen, siehe `resources/views/partials/design-tokens.blade.php`)
- `database/seeders/DatabaseSeeder.php` — Platzhalterinhalte
