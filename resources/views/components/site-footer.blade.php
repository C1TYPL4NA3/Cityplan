@props(['setting'])

<footer class="site-footer">
    <div class="site-footer__inner">
        <div class="site-footer__grid">

            <div class="site-footer__col">
                <p>{{ $setting->tagline ?: 'Architektur & Generalunternehmung' }}</p>
                <p>{{ $setting->city }}</p>
                @if($setting->email)<a href="mailto:{{ $setting->email }}">{{ $setting->email }}</a>@endif
            </div>

            @if(!empty($setting->footer_leistungen))
                <div class="site-footer__col">
                    <h3>Leistungen</h3>
                    @foreach($setting->footer_leistungen as $item)
                        <a href="{{ route('profil') }}">{{ $item['label'] ?? $item }}</a>
                    @endforeach
                </div>
            @endif

            <div class="site-footer__col">
                <h3>Unternehmen</h3>
                <a href="{{ route('profil') }}">Profil</a>
                <a href="{{ route('projekte.index') }}">Projekte</a>
                <a href="{{ route('jobs') }}">Jobs</a>
                <a href="{{ route('kontakt') }}">Kontakt</a>
            </div>

            <div class="site-footer__col">
                <h3>Rechtliches</h3>
                <a href="{{ route('impressum') }}">Impressum</a>
                <a href="{{ route('datenschutz') }}">Datenschutz</a>
            </div>

        </div>

        <div class="site-footer__bottom">
            <span>&copy; <span class="site-footer__brand-name">{{ $setting->company_name }}</span></span>
            <span>{{ $setting->tagline ?: 'Architektur & Generalunternehmung' }} · {{ $setting->city }}</span>
        </div>
    </div>
</footer>
