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
                Forms\Components\TextInput::make('title')
                    ->label('Stellenbezeichnung')
                    ->required()
                    ->columnSpanFull()
                    ->maxLength(255),
                Forms\Components\TextInput::make('pensum')
                    ->label('Pensum')
                    ->helperText('z. B. 80–100%')
                    ->maxLength(255),
                Forms\Components\TextInput::make('location')
                    ->label('Ort')
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
                Forms\Components\Textarea::make('description')
                    ->label('Beschreibung')
                    ->columnSpanFull()
                    ->rows(4),
                Forms\Components\Textarea::make('requirements')
                    ->label('Anforderungen')
                    ->columnSpanFull()
                    ->rows(4),
                Forms\Components\Textarea::make('benefits')
                    ->label('Leistungen / Benefits')
                    ->columnSpanFull()
                    ->rows(4),
                Forms\Components\Textarea::make('application_info')
                    ->label('Bewerbungsinformationen')
                    ->columnSpanFull()
                    ->rows(3),
                Forms\Components\TextInput::make('order')
                    ->label('Reihenfolge')
                    ->numeric()
                    ->default(0),
            ])->columns(2);
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
