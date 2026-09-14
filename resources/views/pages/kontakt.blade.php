@php
    $__seoTitle = 'Kontakt — ' . \App\Models\SiteSetting::current()->company_name;
    $setting = \App\Models\SiteSetting::current();
    $mapSrc = $setting->map_link ?: 'https://maps.google.com/maps?q=Z%C3%BCrich%2C%20Schweiz&t=&z=13&ie=UTF8&iwloc=&output=embed';
@endphp
@extends('layouts.app')

@section('content')

    <div class="contact-page">

        <section class="contact-hero">
            <div class="contact-hero__content">
                <div class="eyebrow">Kontakt</div>
                <h1>{{ $content->hero_heading ?: 'Kontakt.' }}</h1>
                <p class="contact-hero__lead">{{ $content->hero_lead }}</p>

                <div class="contact-data">
                    <div class="contact-row">
                        <small>Firma</small>
                        <strong>{{ $setting->company_name }}</strong>
                    </div>
                    <div class="contact-row">
                        <small>Standort</small>
                        <span>{{ $setting->city }}</span>
                    </div>
                    @if($setting->phone)
                        <div class="contact-row">
                            <small>Telefon</small>
                            <a href="tel:{{ preg_replace('/\s+/', '', $setting->phone) }}">{{ $setting->phone }}</a>
                        </div>
                    @endif
                    @if($setting->email)
                        <div class="contact-row">
                            <small>E-Mail</small>
                            <a href="mailto:{{ $setting->email }}">{{ $setting->email }}</a>
                        </div>
                    @endif
                    @if($setting->website)
                        <div class="contact-row">
                            <small>Web</small>
                            <a href="https://{{ preg_replace('#^https?://#', '', $setting->website) }}" target="_blank" rel="noopener">{{ $setting->website }}</a>
                        </div>
                    @endif
                </div>

                <div class="contact-actions">
                    <a class="btn" href="mailto:{{ $setting->email }}?subject=Projektanfrage">Projekt besprechen</a>
                    @if($setting->phone)
                        <a class="btn btn--secondary" href="tel:{{ preg_replace('/\s+/', '', $setting->phone) }}">Anrufen</a>
                    @endif
                </div>
            </div>

            <div class="contact-map">
                <iframe
                    title="Standort {{ $setting->company_name }}"
                    src="{{ $mapSrc }}"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen>
                </iframe>

                <div class="contact-map__label">
                    <small>Standort</small>
                    <strong>{{ $setting->city }}</strong>
                </div>
            </div>
        </section>

        @if(!empty($content->info_cards))
            <section class="contact-info">
                @foreach($content->info_cards as $card)
                    <div class="contact-info__item">
                        <div class="contact-info__num">{{ $card['number'] ?? '' }}</div>
                        <h3>{{ $card['title'] ?? '' }}</h3>
                        <p>{{ $card['text'] ?? '' }}</p>
                    </div>
                @endforeach
            </section>
        @endif

        <section class="contact-closing">
            <div>
                <h2>{{ $content->closing_heading }}</h2>
            </div>
            <a class="btn" href="mailto:{{ $setting->email }}?subject=Projektanfrage">Kontakt aufnehmen</a>
        </section>

    </div>

@endsection
