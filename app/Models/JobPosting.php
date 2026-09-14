<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    protected $fillable = [
        'title',
        'employment_type',
        'pensum',
        'location',
        'start_text',
        'lead',
        'tasks',
        'profile_items',
        'benefits',
        'application_info',
        'hero_image',
        'hero_image_alt',
        'status',
        'order',
    ];

    protected $casts = [
        'tasks' => 'array',
        'profile_items' => 'array',
        'benefits' => 'array',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
