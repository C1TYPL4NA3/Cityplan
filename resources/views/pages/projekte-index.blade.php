@php
    $__seoTitle = ($pageContent->hero_heading ?: 'Projekte') . ' — ' . \App\Models\SiteSetting::current()->company_name;

    $tileTemplate = function (\App\Models\Project $project, string $wrapperClass) {
        $bg = $project->main_image ? asset('storage/' . $project->main_image) : asset('storage/seed/projects/wohnanlage.jpg');
        $categories = $project->category ? $project->category->slug : '';

        return [
            'project' => $project,
            'wrapperClass' => $wrapperClass,
            'bg' => $bg,
            'categories' => $categories,
        ];
    };
@endphp
@extends('layouts.app')

@section('content')

    <div class="projects-page">

        <section class="projects-hero">
            <div>
                @if($pageContent->hero_eyebrow)
                    <div class="eyebrow">{{ $pageContent->hero_eyebrow }}</div>
                @endif
                <h1>{{ $pageContent->hero_heading ?: 'Projekte.' }}</h1>
            </div>
            <p>{{ $pageContent->hero_lead }}</p>
        </section>

        @if($categories->isNotEmpty())
            <nav class="projects-filters" data-project-filters>
                <a class="is-active" data-filter="all">Alle</a>
                @foreach($categories as $category)
                    <a data-filter="{{ $category->slug }}">{{ $category->name }}</a>
                @endforeach
            </nav>
        @endif

        @php($blockIndex = 0)
        @foreach($blocks as $block)
            @php($blockIndex++)

            @if($block['type'] === 'feature')
                @php($p = $block['projects'][0])
                <a class="project-tile project-tile--feature" data-project-item data-categories="{{ $p->category?->slug }}" href="{{ route('projekte.show', $p) }}">
                    <img src="{{ $p->main_image ? asset('storage/' . $p->main_image) : asset('storage/seed/projects/bahnhofstrasse-44-hero.jpg') }}" alt="{{ $p->main_image_alt ?: $p->name }}" loading="lazy">
                    <div class="project-tile__caption">
                        <div class="project-tile__type">{{ $p->type }}</div>
                        <h2>{{ $p->name }}</h2>
                        <div class="project-tile__meta"><span>{{ $p->short_description }}</span><span>·</span><span>{{ $p->location }}</span><span class="arrow">→</span></div>
                    </div>
                </a>
            @elseif($block['type'] === 'wide')
                @php($p = $block['projects'][0])
                <a class="project-tile project-tile--wide" data-project-item data-categories="{{ $p->category?->slug }}" href="{{ route('projekte.show', $p) }}">
                    <img src="{{ $p->main_image ? asset('storage/' . $p->main_image) : asset('storage/seed/projects/octavo-ii-hero-overview.jpg') }}" alt="{{ $p->main_image_alt ?: $p->name }}" loading="lazy">
                    <div class="project-tile__caption">
                        <div class="project-tile__type">{{ $p->type }}</div>
                        <h2>{{ $p->name }}</h2>
                        <div class="project-tile__meta"><span>{{ $p->short_description }}</span><span>·</span><span>{{ $p->location }}</span><span class="arrow">→</span></div>
                    </div>
                </a>
            @else
                @php($rowClass = match($block['type']) { 'gallery' => 'project-row-gallery', 'final_grid' => 'project-row-final', default => 'project-row-two' })
                <div class="{{ $rowClass }}">
                    @foreach($block['projects'] as $p)
                        <a class="project-tile" data-project-item data-categories="{{ $p->category?->slug }}" href="{{ route('projekte.show', $p) }}">
                            <img src="{{ $p->main_image ? asset('storage/' . $p->main_image) : asset('storage/seed/projects/wohnanlage.jpg') }}" alt="{{ $p->main_image_alt ?: $p->name }}" loading="lazy">
                            <div class="project-tile__caption">
                                <div class="project-tile__type">{{ $p->type }}</div>
                                <h2>{{ $p->name }}</h2>
                                <div class="project-tile__meta"><span>{{ $p->short_description }}</span><span class="arrow">→</span></div>
                            </div>
                        </a>
                    @endforeach
                </div>
            @endif

            @if($blockIndex === 2 && $pageContent->statement_heading)
                <section class="projects-statement">
                    <div>
                        <div class="small">{{ $pageContent->statement_small }}</div>
                        <h2>{{ $pageContent->statement_heading }}</h2>
                    </div>
                    <p>{{ $pageContent->statement_text }}</p>
                </section>
            @endif
        @endforeach

        @if($projects->isEmpty())
            <p style="padding:60px 0;color:var(--color-muted);">Es sind noch keine veröffentlichten Projekte vorhanden. Bitte im Adminbereich unter „Projekte" welche anlegen.</p>
        @endif

    </div>

@endsection
