@php
    $__seoTitle = 'Profil — ' . \App\Models\SiteSetting::current()->company_name;
@endphp
@extends('layouts.app')

@section('content')

    <div class="profile-page">

        <section class="profile-overview">
            <div class="profile-overview__content">
                <h1>{{ $content->overview_heading }}</h1>
                <p class="profile-overview__lead">{{ $content->overview_lead }}</p>
                <p class="profile-overview__text">{{ $content->overview_text }}</p>
            </div>
            <div class="profile-overview__image"
                 style="background-image:url('{{ $content->overview_image ? asset('storage/' . $content->overview_image) : asset('storage/seed/profile/profil-overview-hero.png') }}')"
                 role="img" aria-label="{{ $content->overview_image_alt }}"></div>
        </section>

        @if(!empty($content->metrics))
            <section class="profile-metrics">
                @foreach($content->metrics as $metric)
                    <div class="profile-metric">
                        <small>{{ $metric['label'] ?? '' }}</small>
                        <strong>{{ $metric['title'] ?? '' }}</strong>
                        <span>{{ $metric['text'] ?? '' }}</span>
                    </div>
                @endforeach
            </section>
        @endif

        <section class="profile-section">
            <div class="profile-about-grid">
                <div class="profile-about-copy">
                    <div class="red-line"></div>
                    <h2>{{ $content->about_heading }}</h2>
                    @foreach($content->about_paragraphs ?? [] as $paragraph)
                        <p>{{ is_array($paragraph) ? ($paragraph['text'] ?? '') : $paragraph }}</p>
                    @endforeach
                    @if($content->quote_text)
                        <div class="profile-quote">{{ $content->quote_text }}</div>
                    @endif
                </div>

                <div class="profile-about-side">
                    @foreach($content->mini_cards ?? [] as $card)
                        <div class="profile-mini-card">
                            <h3>{{ $card['title'] ?? '' }}</h3>
                            <p>{{ $card['text'] ?? '' }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

        <section class="profile-section profile-section--light">
            <div class="profile-section-head">
                <div class="red-line"></div>
                <h2>Unsere Leistungen</h2>
            </div>

            <div class="profile-services">
                @foreach($content->services ?? [] as $service)
                    <div class="profile-service">
                        <div class="profile-service__number">{{ $service['number'] ?? '' }}</div>
                        <h3>{{ $service['title'] ?? '' }}</h3>
                        <ul>
                            @foreach($service['items'] ?? [] as $item)
                                <li>{{ is_array($item) ? ($item['item'] ?? '') : $item }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endforeach
            </div>
        </section>

        <section class="profile-feature">
            <div class="profile-feature__image"
                 style="background-image:url('{{ $content->feature_image ? asset('storage/' . $content->feature_image) : asset('storage/seed/profile/profil-feature-green.png') }}')"
                 role="img" aria-label="{{ $content->feature_image_alt }}"></div>
            <div class="profile-feature__content">
                <div class="eyebrow">Umbau &amp; Sanierung</div>
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

        @if(!empty($content->process_steps))
            <section class="profile-section" style="padding-bottom:36px;">
                <div class="profile-section-head">
                    <div class="red-line"></div>
                    <h2>Von der ersten Idee bis zur Übergabe</h2>
                </div>

                <div class="profile-process">
                    @foreach($content->process_steps as $step)
                        <div class="profile-step">
                            <div class="profile-step__num">{{ $step['num'] ?? '' }}</div>
                            <h3>{{ $step['title'] ?? '' }}</h3>
                            <p>{{ $step['text'] ?? '' }}</p>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        <section class="profile-section profile-section--light">
            <div class="profile-client-grid">
                <div>
                    <div class="red-line"></div>
                    <h2>{{ $content->clients_heading }}</h2>
                    <p>{{ $content->clients_text }}</p>
                </div>

                @if(!empty($content->clients_list))
                    <div class="profile-client-list">
                        @foreach($content->clients_list as $client)
                            <div class="profile-client"><span></span>{{ is_array($client) ? ($client['client'] ?? '') : $client }}</div>
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
                <a href="{{ 'https://' . preg_replace('#^https?://#', '', $setting->website) }}" target="_blank" rel="noopener">{{ $setting->website }}</a>
                <a class="btn" style="margin-top:12px;" href="mailto:{{ $setting->email }}?subject=Projektanfrage">Projekt besprechen</a>
            </div>
        </section>

    </div>

@endsection
