<?php

namespace App\Filament\Pages;

use App\Models\ContactContent;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ContactContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Kontakt';

    protected static ?string $title = 'Kontaktseite bearbeiten';

    protected static ?string $navigationGroup = 'Inhalte';

    protected static ?int $navigationSort = 4;

    protected static string $view = 'filament.pages.contact-content-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(ContactContent::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hero')
                    ->schema([
                        Forms\Components\TextInput::make('hero_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('hero_lead')->label('Einleitungstext')->rows(3),
                    ]),

                Forms\Components\Section::make('Info-Karten (3)')
                    ->schema([
                        Forms\Components\Repeater::make('info_cards')
                            ->label('')
                            ->schema([
                                Forms\Components\TextInput::make('number')->label('Nummer / Kicker')->required(),
                                Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                Forms\Components\Textarea::make('text')->label('Text')->rows(2)->required(),
                            ])->columns(3)->maxItems(3)->addActionLabel('Karte hinzufügen'),
                    ]),

                Forms\Components\Section::make('Abschluss')
                    ->schema([
                        Forms\Components\TextInput::make('closing_heading')->label('Überschrift'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        ContactContent::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
