<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignSetting extends Model
{
    protected $fillable = [
        'font_family',
        'h1_size_desktop', 'h1_size_mobile',
        'h2_size_desktop', 'h2_size_mobile',
        'h3_size_desktop', 'h3_size_mobile',
        'body_size', 'nav_size', 'label_size', 'button_size',
        'h1_line_height', 'h2_line_height', 'h3_line_height', 'body_line_height',
        'font_weight_heading',
        'color_red', 'color_green', 'color_brown', 'color_text', 'color_background',
        'content_width',
    ];

    protected $casts = [
        'h1_line_height' => 'float',
        'h2_line_height' => 'float',
        'h3_line_height' => 'float',
        'body_line_height' => 'float',
    ];

    /** Mirrors migration column defaults — used by resetToDefaults(). */
    protected $attributes = [
        'font_family' => 'Inter',
        'h1_size_desktop' => 58,
        'h1_size_mobile' => 38,
        'h2_size_desktop' => 38,
        'h2_size_mobile' => 28,
        'h3_size_desktop' => 23,
        'h3_size_mobile' => 19,
        'body_size' => 17,
        'nav_size' => 16,
        'label_size' => 12,
        'button_size' => 14,
        'h1_line_height' => 1.04,
        'h2_line_height' => 1.14,
        'h3_line_height' => 1.25,
        'body_line_height' => 1.6,
        'font_weight_heading' => 800,
        'color_red' => '#E30613',
        'color_green' => '#3F5548',
        'color_brown' => '#51463F',
        'color_text' => '#3F3F3F',
        'color_background' => '#FFFFFF',
        'content_width' => 1180,
    ];

    /** Available, safe font choices — never arbitrary user input. */
    public const FONT_CHOICES = [
        'Inter' => 'Inter',
        'Helvetica, Arial' => 'Helvetica / Arial',
        'Manrope' => 'Manrope',
        'DM Sans' => 'DM Sans',
        'Source Sans 3' => 'Source Sans 3',
    ];

    public static function current(): self
    {
        return static::firstOrCreate(['id' => 1]);
    }

    public function resetToDefaults(): void
    {
        $defaults = (new self)->getAttributes();
        unset($defaults['id']);
        $this->fill($defaults);
        $this->save();
    }
}
