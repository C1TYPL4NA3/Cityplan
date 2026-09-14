<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobsPageContent extends Model
{
    protected $fillable = [
        'hero_kicker', 'hero_slogan_line1', 'hero_slogan_line2', 'hero_slogan_line3',
        'hero_intro', 'hero_image', 'hero_image_alt', 'empty_state_text',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
