@php
    $__seoTitle = 'Datenschutz — ' . \App\Models\SiteSetting::current()->company_name;
@endphp
@extends('layouts.app')

@section('content')
    <div class="legal-page">
        <h1>Datenschutz</h1>
        <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten ernst und behandeln Ihre personenbezogenen Daten
            vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften.
        </p>
        <p style="margin-top:32px;color:var(--color-muted);font-size:14px;">
            Platzhalter — bitte durch eine vollständige, rechtsgeprüfte Datenschutzerklärung ersetzen.
        </p>
    </div>
@endsection
