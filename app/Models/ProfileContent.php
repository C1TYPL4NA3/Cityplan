<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileContent extends Model
{
    protected $fillable = [
        'overview_heading', 'overview_lead', 'overview_text', 'overview_image', 'overview_image_alt', 'metrics',
        'about_heading', 'about_paragraphs', 'quote_text', 'mini_cards', 'about_visible',
        'services',
        'feature_heading', 'feature_text', 'feature_image', 'feature_image_alt', 'feature_points',
        'tech_heading', 'tech_text', 'tech_image', 'tech_image_alt', 'tags',
        'clients_heading', 'clients_text', 'clients_list',
        'process_steps',
        'cta_heading', 'cta_text',
    ];

    protected $casts = [
        'metrics' => 'array',
        'about_paragraphs' => 'array',
        'mini_cards' => 'array',
        'services' => 'array',
        'feature_points' => 'array',
        'tags' => 'array',
        'clients_list' => 'array',
        'process_steps' => 'array',
        'about_visible' => 'boolean',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
