<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Projekte';

    protected static ?string $navigationLabel = 'Projekte';

    protected static ?string $modelLabel = 'Projekt';

    protected static ?string $pluralModelLabel = 'Projekte';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Project')
                    ->columnSpanFull()
                    ->tabs([

                        Forms\Components\Tabs\Tab::make('Allgemein')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Projektname')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', \Illuminate\Support\Str::slug($state)) : null),
                                Forms\Components\TextInput::make('slug')
                                    ->label('URL-Slug')
                                    ->helperText('Erscheint in der Adresse: /projekte/dieser-slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('location')
                                    ->label('Ort')
                                    ->maxLength(255),
                                Forms\Components\Select::make('project_category_id')
                                    ->label('Kategorie')
                                    ->relationship('category', 'name')
                                    ->searchable()
                                    ->preload(),
                                Forms\Components\TextInput::make('type')
                                    ->label('Projekttyp')
                                    ->helperText('z. B. Wohnbau, Geschäftsliegenschaft')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('year')
                                    ->label('Jahr / Zeitraum')
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('short_description')
                                    ->label('Kurzbeschreibung')
                                    ->helperText('Wird auf der Projektübersicht angezeigt.')
                                    ->rows(2)
                                    ->maxLength(500),
                                Forms\Components\Select::make('status')
                                    ->label('Status')
                                    ->options(['draft' => 'Entwurf', 'published' => 'Veröffentlicht'])
                                    ->default('draft')
                                    ->required(),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Projektdaten')
                            ->schema([
                                Forms\Components\TextInput::make('realisation')
                                    ->label('Realisation')
                                    ->helperText('z. B. 2022–2024')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('bauherrschaft')
                                    ->label('Bauherrschaft')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('objekt')
                                    ->label('Objekt')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('leistungen')
                                    ->label('Leistungen Cityplan')
                                    ->maxLength(255),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Inhalt')
                            ->schema([
                                Forms\Components\Textarea::make('description')
                                    ->label('Projektbeschreibung')
                                    ->rows(6),
                                Forms\Components\TextInput::make('projektgedanke_heading')
                                    ->label('Projektgedanke — Überschrift')
                                    ->helperText('Optionaler hervorgehobener Textblock. Leer lassen, um ihn auszublenden.')
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('projektgedanke_text')
                                    ->label('Projektgedanke — Text')
                                    ->rows(3),
                            ]),

                        Forms\Components\Tabs\Tab::make('Bilder')
                            ->schema([
                                Forms\Components\FileUpload::make('main_image')
                                    ->label('Hauptbild')
                                    ->image()
                                    ->directory('projects')
                                    ->imageEditor()
                                    ->required(),
                                Forms\Components\TextInput::make('main_image_alt')
                                    ->label('Alt-Text Hauptbild')
                                    ->maxLength(255),
                                Forms\Components\Select::make('focus_point')
                                    ->label('Bildfokus')
                                    ->options([
                                        'center' => 'Mitte',
                                        'top' => 'Oben',
                                        'bottom' => 'Unten',
                                        'left' => 'Links',
                                        'right' => 'Rechts',
                                    ])
                                    ->default('center'),
                                Forms\Components\Repeater::make('images')
                                    ->relationship('images')
                                    ->label('Galerie (Projektdetailseite)')
                                    ->helperText('Ca. 3–4 weitere Bilder für die Detailseite. Reihenfolge per Drag & Drop.')
                                    ->reorderable()
                                    ->orderColumn('order')
                                    ->schema([
                                        Forms\Components\FileUpload::make('image')
                                            ->label('Bild')
                                            ->image()
                                            ->directory('projects/gallery')
                                            ->imageEditor()
                                            ->required(),
                                        Forms\Components\TextInput::make('alt')
                                            ->label('Alt-Text')
                                            ->maxLength(255),
                                        Forms\Components\Select::make('focus_point')
                                            ->label('Bildfokus')
                                            ->options([
                                                'center' => 'Mitte',
                                                'top' => 'Oben',
                                                'bottom' => 'Unten',
                                                'left' => 'Links',
                                                'right' => 'Rechts',
                                            ])
                                            ->default('center'),
                                    ])
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['alt'] ?? 'Bild'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Darstellung')
                            ->schema([
                                Forms\Components\Select::make('layout_type')
                                    ->label('Layouttyp in der Übersicht')
                                    ->options([
                                        'feature' => 'Feature (grosses Projekt, volle Breite)',
                                        'two' => 'Nebeneinander (zwei Projekte)',
                                        'wide' => 'Breites Projekt',
                                        'gallery' => 'Bildpaar',
                                        'final_grid' => 'Normales Projekt (kleiner)',
                                    ])
                                    ->default('two')
                                    ->required(),
                                Forms\Components\TextInput::make('order')
                                    ->label('Reihenfolge')
                                    ->numeric()
                                    ->default(0),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('SEO')
                            ->schema([
                                Forms\Components\TextInput::make('seo_title')
                                    ->label('SEO Title')
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('seo_description')
                                    ->label('Meta Description')
                                    ->rows(2)
                                    ->maxLength(255),
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('order')
            ->columns([
                Tables\Columns\ImageColumn::make('main_image')->label('Bild'),
                Tables\Columns\TextColumn::make('name')->label('Projektname')->searchable(),
                Tables\Columns\TextColumn::make('category.name')->label('Kategorie'),
                Tables\Columns\TextColumn::make('location')->label('Ort'),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->formatStateUsing(fn (string $state) => $state === 'published' ? 'Veröffentlicht' : 'Entwurf')
                    ->colors(['success' => 'published', 'gray' => 'draft']),
                Tables\Columns\TextColumn::make('order')->label('Reihenfolge')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options(['draft' => 'Entwurf', 'published' => 'Veröffentlicht']),
                Tables\Filters\SelectFilter::make('project_category_id')
                    ->label('Kategorie')
                    ->relationship('category', 'name'),
            ])
            ->reorderable('order')
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
