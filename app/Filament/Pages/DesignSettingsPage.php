<?php

namespace App\Filament\Pages;

use App\Models\DesignSetting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class DesignSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-swatch';

    protected static ?string $navigationLabel = 'Design & Typografie';

    protected static ?string $title = 'Design & Darstellung';

    protected static ?string $navigationGroup = 'Einstellungen';

    protected static ?int $navigationSort = 2;

    protected static string $view = 'filament.pages.design-settings-page';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill(DesignSetting::current()->toArray());
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Schriftart')
                    ->description('Die Hauptschriftart der gesamten Website.')
                    ->schema([
                        Forms\Components\Select::make('font_family')
                            ->label('Schriftart')
                            ->options(DesignSetting::FONT_CHOICES)
                            ->required(),
                        Forms\Components\Select::make('font_weight_heading')
                            ->label('Schriftstärke Überschriften')
                            ->options([700 => 'Kräftig (700)', 800 => 'Sehr kräftig (800)', 900 => 'Extra kräftig (900)'])
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Schriftgrössen — Desktop')
                    ->description('Werte in Pixel. Grenzen verhindern, dass das Layout zerstört wird.')
                    ->schema([
                        Forms\Components\TextInput::make('h1_size_desktop')->label('H1')->numeric()->minValue(40)->maxValue(110)->suffix('px')->required(),
                        Forms\Components\TextInput::make('h2_size_desktop')->label('H2')->numeric()->minValue(24)->maxValue(64)->suffix('px')->required(),
                        Forms\Components\TextInput::make('h3_size_desktop')->label('H3')->numeric()->minValue(16)->maxValue(40)->suffix('px')->required(),
                        Forms\Components\TextInput::make('body_size')->label('Fliesstext')->numeric()->minValue(12)->maxValue(22)->suffix('px')->required(),
                        Forms\Components\TextInput::make('nav_size')->label('Navigation')->numeric()->minValue(12)->maxValue(20)->suffix('px')->required(),
                        Forms\Components\TextInput::make('label_size')->label('Kleine Labels / Kategorien')->numeric()->minValue(9)->maxValue(16)->suffix('px')->required(),
                        Forms\Components\TextInput::make('button_size')->label('Buttons / Links')->numeric()->minValue(11)->maxValue(18)->suffix('px')->required(),
                    ])->columns(3),

                Forms\Components\Section::make('Schriftgrössen — Mobile')
                    ->description('Damit die mobile Darstellung bei grossen Überschriften nicht zerstört wird.')
                    ->schema([
                        Forms\Components\TextInput::make('h1_size_mobile')->label('H1 Mobile')->numeric()->minValue(28)->maxValue(70)->suffix('px')->required(),
                        Forms\Components\TextInput::make('h2_size_mobile')->label('H2 Mobile')->numeric()->minValue(20)->maxValue(46)->suffix('px')->required(),
                        Forms\Components\TextInput::make('h3_size_mobile')->label('H3 Mobile')->numeric()->minValue(14)->maxValue(30)->suffix('px')->required(),
                    ])->columns(3),

                Forms\Components\Section::make('Zeilenhöhen')
                    ->schema([
                        Forms\Components\TextInput::make('h1_line_height')->label('Zeilenhöhe H1')->numeric()->step(0.01)->minValue(0.85)->maxValue(1.6)->required(),
                        Forms\Components\TextInput::make('h2_line_height')->label('Zeilenhöhe H2')->numeric()->step(0.01)->minValue(0.9)->maxValue(1.6)->required(),
                        Forms\Components\TextInput::make('h3_line_height')->label('Zeilenhöhe H3')->numeric()->step(0.01)->minValue(1.0)->maxValue(1.7)->required(),
                        Forms\Components\TextInput::make('body_line_height')->label('Zeilenhöhe Fliesstext')->numeric()->step(0.01)->minValue(1.2)->maxValue(2.0)->required(),
                    ])->columns(4),

                Forms\Components\Section::make('Farben')
                    ->schema([
                        Forms\Components\ColorPicker::make('color_red')->label('Hauptfarbe Rot')->required(),
                        Forms\Components\ColorPicker::make('color_green')->label('Hauptfarbe Dunkelgrün')->required(),
                        Forms\Components\ColorPicker::make('color_brown')->label('Hauptfarbe Dunkelbraun')->required(),
                        Forms\Components\ColorPicker::make('color_text')->label('Standard-Textfarbe')->required(),
                        Forms\Components\ColorPicker::make('color_background')->label('Hintergrundfarbe')->required(),
                    ])->columns(3),

                Forms\Components\Section::make('Layout')
                    ->schema([
                        Forms\Components\TextInput::make('content_width')
                            ->label('Maximale Inhaltsbreite')
                            ->numeric()
                            ->minValue(960)
                            ->maxValue(1400)
                            ->suffix('px')
                            ->required(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        DesignSetting::current()->update($this->form->getState());

        Notification::make()->title('Design-Einstellungen gespeichert')->success()->send();
    }

    public function resetToDefaults(): void
    {
        $setting = DesignSetting::current();
        $setting->resetToDefaults();
        $this->form->fill($setting->fresh()->toArray());

        Notification::make()->title('Auf Standardwerte zurückgesetzt')->success()->send();
    }
}
