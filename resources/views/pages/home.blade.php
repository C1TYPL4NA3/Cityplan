@php
    $__seoTitle = $content->hero_heading_line1 ? \App\Models\SiteSetting::current()->company_name : null;
@endphp
@extends('layouts.app')

@section('content')

    <section class="home-hero">
        <div class="home-hero-grid">
            <div class="home-hero-copy">
                @if($content->hero_eyebrow)
                    <div class="home-eyebrow-plain">{{ $content->hero_eyebrow }}</div>
                @endif
                <h1>
                    {{ $content->hero_heading_line1 }}<br>
                    {{ $content->hero_heading_line2 }}<br>
                    <span class="grey">{{ $content->hero_heading_line3 }}</span>
                </h1>
                <p>{{ $content->hero_text }}</p>
            </div>
            <div class="home-hero-image"
                 style="background-image:url('{{ $content->hero_image ? asset('storage/' . $content->hero_image) : asset('storage/seed/projects/wohnanlage.jpg') }}')"
                 role="img" aria-label="{{ $content->hero_image_alt }}"></div>
        </div>
    </section>

    @if(!empty($content->stats))
        <section class="home-stats">
            <div class="home-stats-grid">
                @foreach($content->stats as $stat)
                    <div class="home-stat">
                        <strong>{{ $stat['value'] ?? '' }}</strong>
                        <span>{{ $stat['label'] ?? '' }}</span>
                    </div>
                @endforeach
            </div>
        </section>
    @endif

    <section class="home-section">
        <div class="red-line"></div>
        <h2>{{ $content->section_heading }}</h2>
        <p class="lead">{{ $content->section_lead }}</p>

        @if(!empty($content->cards))
            <div class="home-cards">
                @foreach($content->cards as $card)
                    <article class="home-card">
                        <small>{{ $card['number'] ?? '' }}</small>
                        <h3>{{ $card['title'] ?? '' }}</h3>
                        <p>{{ $card['text'] ?? '' }}</p>
                    </article>
                @endforeach
            </div>
        @endif
    </section>

    <section class="home-feature">
        <div class="home-feature-inner">
            <div class="home-feature-photo"
                 style="background-image:url('{{ $content->feature_image ? asset('storage/' . $content->feature_image) : asset('storage/seed/projects/wohnliegenschaft-sanierung.jpg') }}')"
                 role="img" aria-label="{{ $content->feature_image_alt }}"></div>
            <div class="home-feature-copy">
                <div class="red-line"></div>
                <h2>{{ $content->feature_heading }}</h2>
                <p>{{ $content->feature_text }}</p>
            </div>
        </div>
    </section>

    <section class="home-cta">
        <div class="home-cta-box">
            <div>
                <h2>{{ $content->cta_heading }}</h2>
                <p>{{ $content->cta_text }}</p>
            </div>
            <div class="home-cta-right">
                <strong>{{ \App\Models\SiteSetting::current()->company_name }}</strong>
                <a class="email" href="mailto:{{ \App\Models\SiteSetting::current()->email }}">{{ \App\Models\SiteSetting::current()->email }}</a>
                <a class="btn" href="{{ $content->cta_button_link ?: route('kontakt') }}">{{ $content->cta_button_label ?: 'Projekt besprechen' }}</a>
            </div>
        </div>
    </section>

@endsection
