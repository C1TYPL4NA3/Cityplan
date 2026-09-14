@php
    $__seoTitle = 'Umbauen — ' . \App\Models\SiteSetting::current()->company_name;
@endphp
@extends('layouts.app')

@section('content')

    <section class="umbau-hero">
        <div class="umbau-hero__content">
            @if($content->hero_eyebrow)
                <div class="eyebrow">{{ $content->hero_eyebrow }}</div>
            @endif
            <h1>{{ $content->hero_heading }}</h1>
            <p class="umbau-hero__lead">{{ $content->hero_lead }}</p>
        </div>
        <div class="umbau-hero__image"
             style="background-image:url('{{ $content->hero_image ? asset('storage/' . $content->hero_image) : asset('storage/seed/projects/wohnliegenschaft-sanierung.jpg') }}')"
             role="img" aria-label="{{ $content->hero_image_alt }}"></div>
    </section>

    <section class="profile-feature" style="margin-top:18px;">
        <div class="profile-feature__image"
             style="background-image:url('{{ asset('storage/seed/projects/bahnhofstrasse-69-innenausbau.jpg') }}')"
             role="img" aria-label="Umbau Innenausbau"></div>
        <div class="profile-feature__content">
            <h2>{{ $content->feature_heading }}</h2>
            <p>{{ $content->feature_text }}</p>

            @if(!empty($content->feature_points))
                <div class="profile-feature-points">
                    @foreach($content->feature_points as $point)
                        <div class="profile-feature-point">{{ is_array($point) ? ($point['point'] ?? '') : $point }}</div>
                    @endforeach
                </div>
            @endif
        </div>
    </section>

    <section class="profile-cta">
        <div>
            <h2>{{ $content->cta_heading }}</h2>
            <p>{{ $content->cta_text }}</p>
        </div>

        @php($setting = \App\Models\SiteSetting::current())
        <div class="profile-cta__contact">
            <strong>{{ $setting->company_name }}</strong>
            <a class="profile-cta__mail" href="mailto:{{ $setting->email }}">{{ $setting->email }}</a>
            <a class="btn" style="margin-top:12px;" href="{{ route('kontakt') }}">Projekt besprechen</a>
        </div>
    </section>

@endsection
