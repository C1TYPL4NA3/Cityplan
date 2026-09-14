<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeContent extends Model
{
    protected $fillable = [
        'hero_eyebrow', 'hero_heading_line1', 'hero_heading_line2', 'hero_heading_line3',
        'hero_text', 'hero_image', 'hero_image_alt',
        'stats',
        'section_heading', 'section_lead', 'cards',
        'feature_heading', 'feature_text', 'feature_image', 'feature_image_alt',
        'cta_heading', 'cta_text', 'cta_button_label', 'cta_button_link',
    ];

    protected $casts = [
        'stats' => 'array',
        'cards' => 'array',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
