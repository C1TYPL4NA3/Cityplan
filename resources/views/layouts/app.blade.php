@php
    $siteSetting = \App\Models\SiteSetting::current();
    $pageTitle = trim(($__seoTitle ?? null) ?: $siteSetting->seo_default_title ?: $siteSetting->company_name);
    $pageDescription = ($__seoDescription ?? null) ?: $siteSetting->seo_default_description;
@endphp
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $pageTitle }}</title>
    @if($pageDescription)
        <meta name="description" content="{{ $pageDescription }}">
    @endif
    <link rel="canonical" href="{{ url()->current() }}">

    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $pageTitle }}">
    @if($pageDescription)
        <meta property="og:description" content="{{ $pageDescription }}">
    @endif
    <meta property="og:url" content="{{ url()->current() }}">
    @if(!empty($__ogImage))
        <meta property="og:image" content="{{ asset('storage/' . $__ogImage) }}">
    @endif

    <link rel="icon" href="/favicon.ico" sizes="any">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @include('partials.design-tokens')
</head>
<body>
    <x-site-header :setting="$siteSetting" />

    <main>
        {{ $slot ?? '' }}
        @yield('content')
    </main>

    <x-site-footer :setting="$siteSetting" />
</body>
</html>
