<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactContent extends Model
{
    protected $fillable = [
        'hero_heading', 'hero_lead', 'info_cards', 'closing_heading',
    ];

    protected $casts = [
        'info_cards' => 'array',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
