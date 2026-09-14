<?php

namespace App\Filament\Pages;

use App\Models\HomeContent;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class HomeContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';

    protected static ?string $navigationLabel = 'Startseite';

    protected static ?string $title = 'Startseite bearbeiten';

    protected static ?string $navigationGroup = 'Inhalte';

    protected static ?int $navigationSort = 1;

    protected static string $view = 'filament.pages.home-content-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(HomeContent::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hero')
                    ->schema([
                        Forms\Components\TextInput::make('hero_eyebrow')->label('Kicker (klein, über der Überschrift)'),
                        Forms\Components\TextInput::make('hero_heading_line1')->label('Überschrift Zeile 1'),
                        Forms\Components\TextInput::make('hero_heading_line2')->label('Überschrift Zeile 2'),
                        Forms\Components\TextInput::make('hero_heading_line3')->label('Überschrift Zeile 3 (grau)'),
                        Forms\Components\Textarea::make('hero_text')->label('Text')->rows(3)->columnSpanFull(),
                        Forms\Components\FileUpload::make('hero_image')->label('Bild')->image()->directory('home')->imageEditor(),
                        Forms\Components\TextInput::make('hero_image_alt')->label('Alt-Text'),
                    ])->columns(2),

                Forms\Components\Section::make('Kennzahlen (4)')
                    ->schema([
                        Forms\Components\Repeater::make('stats')
                            ->label('')
                            ->schema([
                                Forms\Components\TextInput::make('value')->label('Wert')->required(),
                                Forms\Components\TextInput::make('label')->label('Beschriftung')->required(),
                            ])->columns(2)
                            ->maxItems(4)
                            ->addActionLabel('Kennzahl hinzufügen'),
                    ]),

                Forms\Components\Section::make('Leistungs-Bereich')
                    ->schema([
                        Forms\Components\TextInput::make('section_heading')->label('Überschrift')->columnSpanFull(),
                        Forms\Components\Textarea::make('section_lead')->label('Einleitungstext')->rows(2)->columnSpanFull(),
                        Forms\Components\Repeater::make('cards')
                            ->label('Karten (3)')
                            ->schema([
                                Forms\Components\TextInput::make('number')->label('Nummer / Kicker'),
                                Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                Forms\Components\Textarea::make('text')->label('Text')->rows(2)->required(),
                            ])->columns(3)
                            ->maxItems(3)
                            ->addActionLabel('Karte hinzufügen'),
                    ]),

                Forms\Components\Section::make('Bildbereich (Umbau & Sanierung)')
                    ->schema([
                        Forms\Components\TextInput::make('feature_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('feature_text')->label('Text')->rows(3),
                        Forms\Components\FileUpload::make('feature_image')->label('Bild')->image()->directory('home')->imageEditor(),
                        Forms\Components\TextInput::make('feature_image_alt')->label('Alt-Text'),
                    ])->columns(2),

                Forms\Components\Section::make('Call-to-Action')
                    ->schema([
                        Forms\Components\TextInput::make('cta_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('cta_text')->label('Text')->rows(2),
                        Forms\Components\TextInput::make('cta_button_label')->label('Button-Text'),
                        Forms\Components\TextInput::make('cta_button_link')->label('Button-Link'),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        HomeContent::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
