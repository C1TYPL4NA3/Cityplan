@props(['setting'])

<header class="site-header" id="site-header">
    <div class="site-header__inner">
        <a class="site-header__logo" href="{{ url('/') }}" aria-label="{{ $setting->company_name }} – Startseite">
            @if($setting->logo)
                <img src="{{ asset('storage/' . $setting->logo) }}" alt="{{ $setting->company_name }}">
            @else
                <img src="{{ asset('storage/seed/logo/cityplan-logo.png') }}" alt="{{ $setting->company_name }}">
            @endif
        </a>

        <nav class="site-nav" aria-label="Hauptnavigation">
            <a href="{{ route('projekte.index') }}" @class(['is-active' => request()->routeIs('projekte.*')])>Projekte</a>
            <a href="{{ route('umbauen') }}" @class(['is-active' => request()->routeIs('umbauen')])>Umbauen</a>
            <a href="{{ route('profil') }}" @class(['is-active' => request()->routeIs('profil')])>Profil</a>
            <a href="{{ route('jobs') }}" @class(['is-active' => request()->routeIs('jobs')])>Jobs</a>
            <a href="{{ route('kontakt') }}" @class(['is-active' => request()->routeIs('kontakt')])>Kontakt</a>
        </nav>

        <button class="menu-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false" data-menu-toggle>
            <span></span><span></span><span></span>
        </button>
    </div>

    <nav class="mobile-nav" aria-label="Mobile Navigation" data-mobile-nav>
        <a href="{{ route('projekte.index') }}" @class(['is-active' => request()->routeIs('projekte.*')])>Projekte</a>
        <a href="{{ route('umbauen') }}" @class(['is-active' => request()->routeIs('umbauen')])>Umbauen</a>
        <a href="{{ route('profil') }}" @class(['is-active' => request()->routeIs('profil')])>Profil</a>
        <a href="{{ route('jobs') }}" @class(['is-active' => request()->routeIs('jobs')])>Jobs</a>
        <a href="{{ route('kontakt') }}" @class(['is-active' => request()->routeIs('kontakt')])>Kontakt</a>
    </nav>
</header>
