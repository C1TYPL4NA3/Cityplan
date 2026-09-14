<?php

namespace App\Filament\Pages;

use App\Models\ProjectsPageContent;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ProjectsPageContentPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Projekte-Seite';

    protected static ?string $title = 'Projekte-Übersicht bearbeiten';

    protected static ?string $navigationGroup = 'Inhalte';

    protected static ?int $navigationSort = 5;

    protected static string $view = 'filament.pages.projects-page-content-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(ProjectsPageContent::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Hero')
                    ->schema([
                        Forms\Components\TextInput::make('hero_eyebrow')->label('Kicker'),
                        Forms\Components\TextInput::make('hero_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('hero_lead')->label('Text')->rows(3),
                    ]),
                Forms\Components\Section::make('Redaktioneller Zwischenblock (dunkelgrün)')
                    ->schema([
                        Forms\Components\TextInput::make('statement_small')->label('Kleiner Kicker'),
                        Forms\Components\TextInput::make('statement_heading')->label('Überschrift'),
                        Forms\Components\Textarea::make('statement_text')->label('Text')->rows(3),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        ProjectsPageContent::current()->update($this->form->getState());

        Notification::make()->title('Gespeichert')->success()->send();
    }
}
