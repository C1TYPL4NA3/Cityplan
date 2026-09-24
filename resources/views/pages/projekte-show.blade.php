@php
    $__seoTitle = $project->seo_title ?: ($project->name . ' — ' . \App\Models\SiteSetting::current()->company_name);
    $__seoDescription = $project->seo_description ?: $project->short_description;
    $__ogImage = $project->main_image;
    $gallery = $project->images;
@endphp
@extends('layouts.app')

@section('content')

    <div class="project-detail">

        <section class="project-detail-hero">
            <div>
                <div class="eyebrow">Projekt @if($project->category) · {{ $project->category->name }} @endif</div>
                <h1>{{ $project->name }}.</h1>
                <div class="project-detail-place">{{ $project->location }}</div>
            </div>
            <p class="project-detail-lead">{{ $project->short_description }}</p>
        </section>

        <div class="project-detail-image">
            <img src="{{ $project->main_image ? asset('storage/' . $project->main_image) : asset('storage/seed/projects/octavo-ii-hero.jpg') }}" alt="{{ $project->main_image_alt ?: $project->name }}">
        </div>

        <section class="project-detail-facts-block">
            <div>
                <div class="eyebrow">Das Projekt</div>
                <h2>{{ $project->objekt ?: 'Angaben zum Projekt' }}</h2>
            </div>
            <div>
                <div class="project-detail-facts">
                    <div class="project-detail-fact">
                        <div class="project-detail-fact-label">Realisation</div>
                        <div class="project-detail-fact-value">{{ $project->realisation ?: '—' }}</div>
                    </div>
                    <div class="project-detail-fact">
                        <div class="project-detail-fact-label">Bauherrschaft</div>
                        <div class="project-detail-fact-value">{{ $project->bauherrschaft ?: '—' }}</div>
                    </div>
                    <div class="project-detail-fact">
                        <div class="project-detail-fact-label">Objekt</div>
                        <div class="project-detail-fact-value">{{ $project->objekt ?: '—' }}</div>
                    </div>
                    <div class="project-detail-fact">
                        <div class="project-detail-fact-label">Leistungen</div>
                        <div class="project-detail-fact-value">{{ $project->leistungen ?: '—' }}</div>
                    </div>
                </div>

                @foreach(preg_split('/\n\s*\n+/', trim($project->description ?? '')) as $paragraph)
                    @continue(trim($paragraph) === '')
                    <p>{{ trim($paragraph) }}</p>
                @endforeach
            </div>
        </section>

        @if($gallery->count() > 0)
            <div class="project-detail-gallery-label">
                <strong>Einblicke</strong>
                <span>Ausgewählte Aufnahmen</span>
            </div>

            @php($firstTwo = $gallery->slice(0, 2))
            @if($firstTwo->count() > 0)
                <section class="project-detail-two">
                    @foreach($firstTwo as $image)
                        <div class="project-detail-photo">
                            <img src="{{ asset('storage/' . $image->image) }}" alt="{{ $image->alt ?: $project->name }}" loading="lazy">
                        </div>
                    @endforeach
                </section>
            @endif
        @endif

        @if($project->projektgedanke_heading)
            <section class="project-detail-statement">
                <div>
                    <div class="small">Projektgedanke</div>
                    <h2>{{ $project->projektgedanke_heading }}</h2>
                </div>
                <p>{{ $project->projektgedanke_text }}</p>
            </section>
        @endif

        @php($thirdImage = $gallery->slice(2, 1)->first())
        @if($thirdImage)
            <div class="project-detail-wide">
                <img src="{{ asset('storage/' . $thirdImage->image) }}" alt="{{ $thirdImage->alt ?: $project->name }}" loading="lazy">
            </div>
        @endif

        @php($nextTwo = $gallery->slice(3, 2))
        @if($nextTwo->count() > 0)
            <section class="project-detail-two">
                @foreach($nextTwo as $image)
                    <div class="project-detail-photo">
                        <img src="{{ asset('storage/' . $image->image) }}" alt="{{ $image->alt ?: $project->name }}" loading="lazy">
                    </div>
                @endforeach
            </section>
        @endif

        @php($sixthImage = $gallery->slice(5, 1)->first())
        @if($sixthImage)
            <div class="project-detail-wide">
                <img src="{{ asset('storage/' . $sixthImage->image) }}" alt="{{ $sixthImage->alt ?: $project->name }}" loading="lazy">
            </div>
        @endif

        <div class="project-detail-endnav">
            <a href="{{ route('projekte.index') }}">← Alle Projekte</a>
            @if($next && $next->id !== $project->id)
                <a href="{{ route('projekte.show', $next) }}">Nächstes Projekt →</a>
            @endif
        </div>

    </div>

@endsection
