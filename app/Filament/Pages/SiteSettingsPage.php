<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class SiteSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';

    protected static ?string $navigationLabel = 'Firmenangaben';

    protected static ?string $title = 'Firmenangaben & Kontakt';

    protected static ?string $navigationGroup = 'Einstellungen';

    protected static ?int $navigationSort = 1;

    protected static string $view = 'filament.pages.site-settings-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(SiteSetting::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Firma')
                    ->schema([
                        Forms\Components\TextInput::make('company_name')->label('Firmenname')->required(),
                        Forms\Components\TextInput::make('tagline')->label('Zusatz')->helperText('z. B. "Architektur & Generalunternehmung"'),
                        Forms\Components\FileUpload::make('logo')->label('Logo')->image()->directory('site'),
                    ])->columns(2),

                Forms\Components\Section::make('Adresse & Kontakt')
                    ->schema([
                        Forms\Components\TextInput::make('address')->label('Adresse'),
                        Forms\Components\TextInput::make('city')->label('Ort'),
                        Forms\Components\TextInput::make('phone')->label('Telefonnummer'),
                        Forms\Components\TextInput::make('email')->label('E-Mail')->email(),
                        Forms\Components\TextInput::make('website')->label('Website'),
                        Forms\Components\TextInput::make('map_link')->label('Google-Maps-Link'),
                    ])->columns(2),

                Forms\Components\Section::make('Footer')
                    ->description('Die Spalte "Unternehmen" im Footer verlinkt automatisch auf Profil, Projekte, Jobs und Kontakt.')
                    ->schema([
                        Forms\Components\Repeater::make('footer_leistungen')
                            ->label('Footer — Leistungen')
                            ->simple(Forms\Components\TextInput::make('label')->required())
                            ->addActionLabel('Eintrag hinzufügen'),
                    ]),

                Forms\Components\Section::make('SEO (Standardwerte)')
                    ->schema([
                        Forms\Components\TextInput::make('seo_default_title')->label('Standard SEO Title'),
                        Forms\Components\Textarea::make('seo_default_description')->label('Standard Meta Description')->rows(2),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        SiteSetting::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
