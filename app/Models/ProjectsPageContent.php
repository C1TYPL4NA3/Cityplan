<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectsPageContent extends Model
{
    protected $fillable = [
        'hero_eyebrow', 'hero_heading', 'hero_lead',
        'statement_small', 'statement_heading', 'statement_text',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
