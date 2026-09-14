# Cityplan AG Zürich — Website

Laravel application (Blade views, Filament admin panel, SQLite/MySQL) for the
Cityplan AG Zürich company website. The uploaded HTML design mockups are the
visual "design master" for all pages — layout, spacing, typography and colors
must match them closely. Content (text, images, projects, jobs, contact info,
and selected global design values such as fonts/sizes/colors) is editable via
the Filament admin at `/admin`. Page layout/structure is protected in Blade
views and is not editable through the admin.

## Structure

- `app/Models` — Eloquent models (Project, ProjectCategory, ProjectImage,
  JobPosting, SiteSetting, DesignSetting, HomeContent, ProfileContent,
  ContactContent, UmbauContent)
- `app/Filament/Resources` and `app/Filament/Pages` — admin panel
- `resources/views` — Blade layouts, components (header/footer), and pages
- `resources/css/app.css` — design-master CSS, consuming CSS custom
  properties supplied by `DesignSetting` (see
  `resources/views/partials/design-tokens.blade.php`)

## Commands

- `php artisan serve` — run dev server
- `php artisan migrate --seed` — set up database with placeholder content
- `npm run dev` / `npm run build` — Vite asset pipeline
