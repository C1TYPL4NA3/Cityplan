<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'project_category_id',
        'name',
        'slug',
        'location',
        'type',
        'year',
        'short_description',
        'main_image',
        'main_image_alt',
        'focus_point',
        'status',
        'order',
        'layout_type',
        'realisation',
        'bauherrschaft',
        'objekt',
        'leistungen',
        'description',
        'projektgedanke_heading',
        'projektgedanke_text',
        'seo_title',
        'seo_description',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class, 'project_category_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('order');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
