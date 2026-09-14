<?php

namespace App\Filament\Pages;

use App\Models\JobsPageContent;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class JobsPageContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Jobs-Seite';

    protected static ?string $title = 'Jobs-Übersicht bearbeiten';

    protected static ?string $navigationGroup = 'Inhalte';

    protected static ?int $navigationSort = 6;

    protected static string $view = 'filament.pages.jobs-page-content-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(JobsPageContent::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hero')
                    ->description('Wird oberhalb der Stellenangebote angezeigt.')
                    ->schema([
                        Forms\Components\TextInput::make('hero_kicker')->label('Kicker')->columnSpanFull(),
                        Forms\Components\TextInput::make('hero_slogan_line1')->label('Slogan Zeile 1'),
                        Forms\Components\TextInput::make('hero_slogan_line2')->label('Slogan Zeile 2'),
                        Forms\Components\TextInput::make('hero_slogan_line3')->label('Slogan Zeile 3 (rot)'),
                        Forms\Components\Textarea::make('hero_intro')->label('Einleitungstext')->rows(3)->columnSpanFull(),
                        Forms\Components\FileUpload::make('hero_image')->label('Bild')->image()->directory('jobs')->imageEditor(),
                        Forms\Components\TextInput::make('hero_image_alt')->label('Alt-Text'),
                    ])->columns(2),

                Forms\Components\Section::make('Wenn keine Stellen offen sind')
                    ->schema([
                        Forms\Components\TextInput::make('empty_state_text')->label('Hinweistext')->columnSpanFull(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        JobsPageContent::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
