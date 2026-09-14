@php
    $__seoTitle = 'Jobs — ' . \App\Models\SiteSetting::current()->company_name;
    $setting = \App\Models\SiteSetting::current();
    $hero = $pageContent;
@endphp
@extends('layouts.app')

@section('content')

    <div class="jobs-page">

        <section class="jobs-hero">
            <div class="jobs-hero-copy">
                @if($hero->hero_kicker)
                    <p class="jobs-hero-kicker">{{ $hero->hero_kicker }}</p>
                @endif
                <h1 class="jobs-hero-slogan">
                    <span>{{ $hero->hero_slogan_line1 }}</span>
                    <span>{{ $hero->hero_slogan_line2 }}</span>
                    <span class="red">{{ $hero->hero_slogan_line3 }}</span>
                </h1>
                <p class="jobs-hero-intro">{{ $hero->hero_intro }}</p>
            </div>
            <div class="jobs-hero-image"
                 style="background-image:url('{{ $hero->hero_image ? asset('storage/' . $hero->hero_image) : asset('storage/seed/jobs/bauleiter-hochhaus.png') }}')"
                 role="img" aria-label="{{ $hero->hero_image_alt }}"></div>
        </section>

        @forelse($jobs as $job)
            <article class="job-card">
                <h2 class="job-card-title">{{ $job->title }}</h2>
                @if($job->employment_type || $job->pensum)
                    <div class="job-card-subtitle">{{ collect([$job->employment_type, $job->pensum])->filter()->implode(' – ') }}</div>
                @endif

                <div class="job-card-meta">
                    <div class="job-card-meta__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        <div><span class="job-card-meta__label">Arbeitsort</span><span class="job-card-meta__value">{{ $job->location ?: '—' }}</span></div>
                    </div>
                    <div class="job-card-meta__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>
                        <div><span class="job-card-meta__label">Eintritt</span><span class="job-card-meta__value">{{ $job->start_text ?: '—' }}</span></div>
                    </div>
                    <div class="job-card-meta__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <div><span class="job-card-meta__label">Anstellung</span><span class="job-card-meta__value">{{ $job->employment_type ?: '—' }}</span></div>
                    </div>
                    <div class="job-card-meta__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>
                        <div><span class="job-card-meta__label">Pensum</span><span class="job-card-meta__value">{{ $job->pensum ?: '—' }}</span></div>
                    </div>
                </div>

                @if($job->lead)
                    <p class="job-card-lead">{{ $job->lead }}</p>
                @endif

                @if(!empty($job->tasks) || !empty($job->profile_items))
                    <div class="job-card-columns">
                        @if(!empty($job->tasks))
                            <div class="job-card-panel">
                                <h3 class="job-card-section-title">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 3h6v3H9zM8 10h8M8 14h8M8 18h5"/></svg>
                                    Ihre Aufgaben
                                </h3>
                                <ul class="job-card-list">
                                    @foreach($job->tasks as $task)
                                        <li>{{ is_array($task) ? ($task['item'] ?? '') : $task }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        @if(!empty($job->profile_items))
                            <div class="job-card-panel">
                                <h3 class="job-card-section-title">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>
                                    Ihr Profil
                                </h3>
                                <ul class="job-card-list">
                                    @foreach($job->profile_items as $item)
                                        <li>{{ is_array($item) ? ($item['item'] ?? '') : $item }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    </div>
                @endif

                @if(!empty($job->benefits))
                    <div class="job-card-benefits-wrap">
                        <h3 class="job-card-section-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3.1L6.1 20l1.1-6.5L2.5 8.9 9 8z"/></svg>
                            Wir bieten Ihnen
                        </h3>
                        <div class="job-card-benefits">
                            @foreach($job->benefits as $benefit)
                                <div class="job-card-benefit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 21h18M5 21V9l5-4v16M10 21V3h9v18M13 7h2M13 11h2M13 15h2"/></svg>
                                    <strong>{{ $benefit['title'] ?? '' }}</strong>
                                    <span>{{ $benefit['text'] ?? '' }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif

                <div class="job-card-cta">
                    <div class="job-card-cta__left">
                        <h3>Interesse?</h3>
                        <p>{{ $job->application_info ?: 'Wir freuen uns auf Ihre vollständigen Bewerbungsunterlagen.' }}</p>
                    </div>
                    <div class="job-card-cta__right">
                        <span class="job-card-cta__contact mail"><a href="mailto:{{ $setting->email }}">{{ $setting->email }}</a></span>
                        @if($setting->website)
                            <span class="job-card-cta__contact"><a href="https://{{ preg_replace('#^https?://#', '', $setting->website) }}" target="_blank" rel="noopener">{{ $setting->website }}</a></span>
                        @endif
                        <a class="btn" style="margin-top:16px;" href="mailto:{{ $setting->email }}?subject=Bewerbung%20{{ urlencode($job->title) }}">Jetzt bewerben</a>
                    </div>
                </div>
            </article>
        @empty
            <p style="padding:40px 0;color:var(--color-muted);">{{ $hero->empty_state_text ?: 'Aktuell sind keine offenen Stellen ausgeschrieben. Interessierte dürfen sich gerne initiativ bewerben.' }}</p>
            <a class="btn" href="mailto:{{ $setting->email }}?subject=Initiativbewerbung">Initiativbewerbung senden</a>
        @endforelse

    </div>

@endsection
