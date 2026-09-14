<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JobPostingResource\Pages;
use App\Filament\Resources\JobPostingResource\RelationManagers;
use App\Models\JobPosting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class JobPostingResource extends Resource
{
    protected static ?string $model = JobPosting::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Jobs';

    protected static ?string $modelLabel = 'Job';

    protected static ?string $pluralModelLabel = 'Jobs';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('job')
                    ->columnSpanFull()
                    ->tabs([

                        Forms\Components\Tabs\Tab::make('Allgemein')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('Stellenbezeichnung')
                                    ->required()
                                    ->columnSpanFull()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('employment_type')
                                    ->label('Anstellungsart')
                                    ->helperText('z. B. "Festanstellung"')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('pensum')
                                    ->label('Pensum')
                                    ->helperText('z. B. "Teilzeit 60–80 %"')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('location')
                                    ->label('Arbeitsort')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('start_text')
                                    ->label('Eintritt')
                                    ->helperText('z. B. "Nach Vereinbarung"')
                                    ->maxLength(255),
                                Forms\Components\Select::make('status')
                                    ->label('Status')
                                    ->options(['draft' => 'Entwurf', 'published' => 'Veröffentlicht'])
                                    ->default('draft')
                                    ->required(),
                                Forms\Components\Textarea::make('lead')
                                    ->label('Einleitungstext')
                                    ->columnSpanFull()
                                    ->rows(2),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Aufgaben & Profil')
                            ->schema([
                                Forms\Components\Repeater::make('tasks')
                                    ->label('Ihre Aufgaben')
                                    ->simple(Forms\Components\Textarea::make('item')->rows(2)->required())
                                    ->addActionLabel('Aufgabe hinzufügen'),
                                Forms\Components\Repeater::make('profile_items')
                                    ->label('Ihr Profil')
                                    ->simple(Forms\Components\Textarea::make('item')->rows(2)->required())
                                    ->addActionLabel('Punkt hinzufügen'),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Wir bieten')
                            ->schema([
                                Forms\Components\Repeater::make('benefits')
                                    ->label('Wir bieten Ihnen')
                                    ->schema([
                                        Forms\Components\TextInput::make('title')->label('Titel')->required(),
                                        Forms\Components\Textarea::make('text')->label('Text')->rows(2)->required(),
                                    ])->columns(2)
                                    ->addActionLabel('Punkt hinzufügen'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Bewerbung')
                            ->schema([
                                Forms\Components\Textarea::make('application_info')
                                    ->label('Text im Bewerbungs-Kasten')
                                    ->rows(3),
                            ]),

                        Forms\Components\Tabs\Tab::make('Bild')
                            ->schema([
                                Forms\Components\FileUpload::make('hero_image')
                                    ->label('Bild')
                                    ->helperText('Optional — wenn leer, wird das Standardbild der Jobs-Seite verwendet.')
                                    ->image()
                                    ->directory('jobs')
                                    ->imageEditor(),
                                Forms\Components\TextInput::make('hero_image_alt')
                                    ->label('Alt-Text'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Darstellung')
                            ->schema([
                                Forms\Components\TextInput::make('order')
                                    ->label('Reihenfolge')
                                    ->numeric()
                                    ->default(0),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('order')
            ->reorderable('order')
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('Stellenbezeichnung')->searchable(),
                Tables\Columns\TextColumn::make('pensum')->label('Pensum'),
                Tables\Columns\TextColumn::make('location')->label('Ort'),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->formatStateUsing(fn (string $state) => $state === 'published' ? 'Veröffentlicht' : 'Entwurf')
                    ->colors(['success' => 'published', 'gray' => 'draft']),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options(['draft' => 'Entwurf', 'published' => 'Veröffentlicht']),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageJobPostings::route('/'),
        ];
    }
}
