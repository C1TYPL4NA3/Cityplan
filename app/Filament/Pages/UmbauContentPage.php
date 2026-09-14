<?php

namespace App\Filament\Pages;

use App\Models\UmbauContent;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class UmbauContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationLabel = 'Umbauen';

    protected static ?string $title = 'Umbauen-Seite bearbeiten';

    protected static ?string $navigationGroup = 'Inhalte';

    protected static ?int $navigationSort = 3;

    protected static string $view = 'filament.pages.umbau-content-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(UmbauContent::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hero')
                    ->schema([
                        Forms\Components\TextInput::make('hero_eyebrow')->label('Kicker'),
                        Forms\Components\TextInput::make('hero_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('hero_lead')->label('Text')->rows(3)->columnSpanFull(),
                        Forms\Components\FileUpload::make('hero_image')->label('Bild')->image()->directory('umbau')->imageEditor(),
                        Forms\Components\TextInput::make('hero_image_alt')->label('Alt-Text'),
                    ])->columns(2),

                Forms\Components\Section::make('Details')
                    ->schema([
                        Forms\Components\TextInput::make('feature_heading')->label('Überschrift')->columnSpanFull(),
                        Forms\Components\Textarea::make('feature_text')->label('Text')->rows(3)->columnSpanFull(),
                        Forms\Components\Repeater::make('feature_points')
                            ->label('Stichpunkte')
                            ->simple(Forms\Components\TextInput::make('point')->required())
                            ->addActionLabel('Punkt hinzufügen'),
                    ]),

                Forms\Components\Section::make('Call-to-Action')
                    ->schema([
                        Forms\Components\TextInput::make('cta_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('cta_text')->label('Text')->rows(2),
                    ])->columns(2),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        UmbauContent::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
