<?php

namespace App\Filament\Pages;

use App\Models\ProfileContent;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ProfileContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-identification';

    protected static ?string $navigationLabel = 'Profil';

    protected static ?string $title = 'Profil bearbeiten';

    protected static ?string $navigationGroup = 'Inhalte';

    protected static ?int $navigationSort = 2;

    protected static string $view = 'filament.pages.profile-content-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(ProfileContent::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('profile')->columnSpanFull()->tabs([

                    Forms\Components\Tabs\Tab::make('Hero & Leistungsfelder')->schema([
                        Forms\Components\TextInput::make('overview_heading')->label('Überschrift')->columnSpanFull(),
                        Forms\Components\Textarea::make('overview_lead')->label('Einleitungstext')->rows(2)->columnSpanFull(),
                        Forms\Components\Textarea::make('overview_text')->label('Fliesstext')->rows(4)->columnSpanFull(),
                        Forms\Components\FileUpload::make('overview_image')->label('Bild')->image()->directory('profile')->imageEditor(),
                        Forms\Components\TextInput::make('overview_image_alt')->label('Alt-Text'),
                        Forms\Components\Repeater::make('metrics')
                            ->label('Leistungsfelder (4)')
                            ->schema([
                                Forms\Components\TextInput::make('label')->label('Kicker')->required(),
                                Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                Forms\Components\Textarea::make('text')->label('Text')->rows(2)->required(),
                            ])->columns(3)->maxItems(4)->addActionLabel('Leistungsfeld hinzufügen'),
                    ]),

                    Forms\Components\Tabs\Tab::make('Über uns')->schema([
                        Forms\Components\TextInput::make('about_heading')->label('Überschrift')->columnSpanFull(),
                        Forms\Components\Repeater::make('about_paragraphs')
                            ->label('Textabsätze')
                            ->simple(Forms\Components\Textarea::make('text')->rows(3)->required())
                            ->addActionLabel('Absatz hinzufügen'),
                        Forms\Components\Textarea::make('quote_text')->label('Hervorgehobenes Zitat')->rows(2)->columnSpanFull(),
                        Forms\Components\Repeater::make('mini_cards')
                            ->label('Kleine Karten (3)')
                            ->schema([
                                Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                Forms\Components\Textarea::make('text')->label('Text')->rows(2)->required(),
                            ])->columns(2)->maxItems(3)->addActionLabel('Karte hinzufügen'),
                    ]),

                    Forms\Components\Tabs\Tab::make('Leistungen')->schema([
                        Forms\Components\Repeater::make('services')
                            ->label('Leistungsbereiche (3)')
                            ->schema([
                                Forms\Components\TextInput::make('number')->label('Nummer / Kicker')->required(),
                                Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                Forms\Components\Repeater::make('items')
                                    ->label('Stichpunkte')
                                    ->simple(Forms\Components\TextInput::make('item')->required())
                                    ->addActionLabel('Punkt hinzufügen'),
                            ])->maxItems(3)->addActionLabel('Leistungsbereich hinzufügen'),
                    ]),

                    Forms\Components\Tabs\Tab::make('Umbau & Sanierung')->schema([
                        Forms\Components\TextInput::make('feature_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('feature_text')->label('Text')->rows(3),
                        Forms\Components\FileUpload::make('feature_image')->label('Bild')->image()->directory('profile')->imageEditor(),
                        Forms\Components\TextInput::make('feature_image_alt')->label('Alt-Text'),
                        Forms\Components\Repeater::make('feature_points')
                            ->label('Stichpunkte')
                            ->simple(Forms\Components\TextInput::make('point')->required())
                            ->addActionLabel('Punkt hinzufügen'),
                    ])->columns(2),

                    Forms\Components\Tabs\Tab::make('Technische Projekte')->schema([
                        Forms\Components\TextInput::make('tech_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('tech_text')->label('Text')->rows(3),
                        Forms\Components\FileUpload::make('tech_image')->label('Bild')->image()->directory('profile')->imageEditor(),
                        Forms\Components\TextInput::make('tech_image_alt')->label('Alt-Text'),
                        Forms\Components\Repeater::make('tags')
                            ->label('Schlagworte')
                            ->simple(Forms\Components\TextInput::make('tag')->required())
                            ->addActionLabel('Schlagwort hinzufügen'),
                    ])->columns(2),

                    Forms\Components\Tabs\Tab::make('Bauherrschaften')->schema([
                        Forms\Components\TextInput::make('clients_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('clients_text')->label('Text')->rows(2),
                        Forms\Components\Repeater::make('clients_list')
                            ->label('Liste')
                            ->simple(Forms\Components\TextInput::make('client')->required())
                            ->addActionLabel('Eintrag hinzufügen'),
                    ]),

                    Forms\Components\Tabs\Tab::make('Prozess')->schema([
                        Forms\Components\Repeater::make('process_steps')
                            ->label('Schritte (5)')
                            ->schema([
                                Forms\Components\TextInput::make('num')->label('Nummer')->required(),
                                Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                Forms\Components\Textarea::make('text')->label('Text')->rows(2)->required(),
                            ])->columns(3)->maxItems(5)->addActionLabel('Schritt hinzufügen'),
                    ]),

                    Forms\Components\Tabs\Tab::make('Call-to-Action')->schema([
                        Forms\Components\TextInput::make('cta_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('cta_text')->label('Text')->rows(2),
                    ]),
                ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        ProfileContent::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
