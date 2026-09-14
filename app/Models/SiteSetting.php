<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'company_name', 'tagline', 'address', 'city', 'phone', 'email', 'website', 'logo', 'map_link',
        'footer_leistungen', 'social_links',
        'seo_default_title', 'seo_default_description',
    ];

    protected $casts = [
        'footer_leistungen' => 'array',
        'social_links' => 'array',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }
}
