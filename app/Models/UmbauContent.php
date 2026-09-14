<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UmbauContent extends Model
{
    protected $fillable = [
        'hero_eyebrow', 'hero_heading', 'hero_lead', 'hero_image', 'hero_image_alt',
        'feature_heading', 'feature_text', 'feature_points',
        'cta_heading', 'cta_text',
    ];

    protected $casts = [
        'feature_points' => 'array',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
