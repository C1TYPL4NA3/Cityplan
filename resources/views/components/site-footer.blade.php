@props(['setting'])

<footer class="site-footer">
    <div class="site-footer__inner">
        <div class="site-footer__brand">
            <strong>{{ $setting->company_name }}</strong>
            <p>{{ $setting->tagline ?: 'Architektur & Generalunternehmung' }}</p>
            <p>{{ $setting->city }}</p>
            @if($setting->email)<p><a href="mailto:{{ $setting->email }}">{{ $setting->email }}</a></p>@endif
            @if($setting->website)<p><a href="https://{{ preg_replace('#^https?://#', '', $setting->website) }}" target="_blank" rel="noopener">{{ $setting->website }}</a></p>@endif
        </div>

        @if(!empty($setting->footer_leistungen))
            <div>
                <h3>Leistungen</h3>
                <ul class="site-footer__links">
                    @foreach($setting->footer_leistungen as $item)
                        <li>{{ $item['label'] ?? $item }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div>
            <h3>Unternehmen</h3>
            <ul class="site-footer__links">
                <li><a href="{{ route('profil') }}">Profil</a></li>
                <li><a href="{{ route('projekte.index') }}">Projekte</a></li>
                <li><a href="{{ route('jobs') }}">Jobs</a></li>
                <li><a href="{{ route('kontakt') }}">Kontakt</a></li>
            </ul>
        </div>

        <div>
            <h3>Rechtliches</h3>
            <ul class="site-footer__links">
                <li><a href="{{ route('impressum') }}">Impressum</a></li>
                <li><a href="{{ route('datenschutz') }}">Datenschutz</a></li>
            </ul>
        </div>
    </div>

    <div class="site-footer__bottom">
        <span>&copy; <span class="site-footer__brand-name">{{ $setting->company_name }}</span></span>
        <span>{{ $setting->tagline ?: 'Architektur & Generalunternehmung' }} · {{ $setting->city }}</span>
    </div>
</footer>
