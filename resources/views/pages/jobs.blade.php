@php
    $__seoTitle = 'Jobs — ' . \App\Models\SiteSetting::current()->company_name;
    $setting = \App\Models\SiteSetting::current();
@endphp
@extends('layouts.app')

@section('content')

    <div class="jobs-page">

        <section class="jobs-hero">
            <div class="eyebrow">Karriere</div>
            <h1>Jobs.</h1>
            <p>Wir sind laufend auf der Suche nach engagierten Mitarbeitenden, die unser Team in Zürich verstärken möchten.</p>
        </section>

        @forelse($jobs as $job)
            <article class="job-card">
                <h2>{{ $job->title }}</h2>

                <div class="job-card-meta">
                    @if($job->pensum)
                        <div><small>Pensum</small><strong>{{ $job->pensum }}</strong></div>
                    @endif
                    @if($job->location)
                        <div><small>Ort</small><strong>{{ $job->location }}</strong></div>
                    @endif
                    @if($job->start_text)
                        <div><small>Eintritt</small><strong>{{ $job->start_text }}</strong></div>
                    @endif
                </div>

                @if($job->description)
                    <div class="job-card-section">
                        <h3>Beschreibung</h3>
                        <p>{{ $job->description }}</p>
                    </div>
                @endif

                @if($job->requirements)
                    <div class="job-card-section">
                        <h3>Anforderungen</h3>
                        <p>{{ $job->requirements }}</p>
                    </div>
                @endif

                @if($job->benefits)
                    <div class="job-card-section">
                        <h3>Wir bieten</h3>
                        <p>{{ $job->benefits }}</p>
                    </div>
                @endif

                @if($job->application_info)
                    <div class="job-card-section">
                        <h3>Bewerbung</h3>
                        <p>{{ $job->application_info }}</p>
                    </div>
                @endif

                <a class="btn" href="mailto:{{ $setting->email }}?subject=Bewerbung%20{{ urlencode($job->title) }}">Jetzt bewerben</a>
            </article>
        @empty
            <p style="padding:40px 0;color:var(--color-muted);">Aktuell sind keine offenen Stellen ausgeschrieben. Interessierte dürfen sich gerne initiativ bewerben.</p>
            <a class="btn" href="mailto:{{ $setting->email }}?subject=Initiativbewerbung">Initiativbewerbung senden</a>
        @endforelse

    </div>

@endsection
