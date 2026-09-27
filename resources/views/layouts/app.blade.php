@php
    $siteSetting = \App\Models\SiteSetting::current();
    $pageTitle = trim(($__seoTitle ?? null) ?: $siteSetting->seo_default_title ?: $siteSetting->company_name);
    $pageDescription = ($__seoDescription ?? null) ?: $siteSetting->seo_default_description;

    $organizationSchema = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => $siteSetting->company_name,
        'url' => route('home'),
        'logo' => $siteSetting->logo ? asset('storage/' . $siteSetting->logo) : null,
        'email' => $siteSetting->email ?: null,
        'telephone' => $siteSetting->phone ?: null,
        'address' => ($siteSetting->address || $siteSetting->city) ? array_filter([
            '@type' => 'PostalAddress',
            'streetAddress' => $siteSetting->address ?: null,
            'addressLocality' => $siteSetting->city ?: null,
            'addressCountry' => 'CH',
        ]) : null,
    ]);
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

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    @if($pageDescription)
        <meta name="twitter:description" content="{{ $pageDescription }}">
    @endif
    @if(!empty($__ogImage))
        <meta name="twitter:image" content="{{ asset('storage/' . $__ogImage) }}">
    @endif

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicons/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicons/favicon-16x16.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicons/apple-touch-icon.png') }}">

    <script type="application/ld+json">{!! json_encode($organizationSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>

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
