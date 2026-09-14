@props(['setting'])

<footer class="site-footer">
    <div class="site-footer__inner">
        <div class="site-footer__brand">
            <strong>{{ $setting->company_name }}</strong>
            <p>{{ $setting->tagline ?: 'Architektur & Generalunternehmung' }}</p>
            <p>{{ $setting->city }}</p>
        </div>

        <div>
            <h3>Kontakt</h3>
            <ul class="site-footer__links">
                @if($setting->address)<li>{{ $setting->address }}</li>@endif
                @if($setting->phone)<li><a href="tel:{{ preg_replace('/\s+/', '', $setting->phone) }}">{{ $setting->phone }}</a></li>@endif
                @if($setting->email)<li><a href="mailto:{{ $setting->email }}">{{ $setting->email }}</a></li>@endif
            </ul>
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
    </div>

    <div class="site-footer__bottom">
        <span>&copy; {{ now()->year }} {{ $setting->company_name }}</span>
        <span>
            <a href="{{ route('impressum') }}">Impressum</a>
            &nbsp;·&nbsp;
            <a href="{{ route('datenschutz') }}">Datenschutz</a>
        </span>
    </div>
</footer>
