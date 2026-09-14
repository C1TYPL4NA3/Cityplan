@php($d = \App\Models\DesignSetting::current())
<style>
    :root {
        --font-family: '{{ $d->font_family }}', Arial, sans-serif;
        --font-weight-heading: {{ $d->font_weight_heading }};

        --h1-size: {{ $d->h1_size_desktop }}px;
        --h1-size-mobile: {{ $d->h1_size_mobile }}px;
        --h2-size: {{ $d->h2_size_desktop }}px;
        --h2-size-mobile: {{ $d->h2_size_mobile }}px;
        --h3-size: {{ $d->h3_size_desktop }}px;
        --h3-size-mobile: {{ $d->h3_size_mobile }}px;
        --body-size: {{ $d->body_size }}px;
        --nav-size: {{ $d->nav_size }}px;
        --label-size: {{ $d->label_size }}px;
        --button-size: {{ $d->button_size }}px;

        --h1-line-height: {{ $d->h1_line_height }};
        --h2-line-height: {{ $d->h2_line_height }};
        --h3-line-height: {{ $d->h3_line_height }};
        --body-line-height: {{ $d->body_line_height }};

        --color-red: {{ $d->color_red }};
        --color-green: {{ $d->color_green }};
        --color-brown: {{ $d->color_brown }};
        --color-text: {{ $d->color_text }};
        --color-background: {{ $d->color_background }};

        --content-width: {{ $d->content_width }}px;
    }
</style>
