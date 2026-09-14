@php
    $__seoTitle = 'Impressum — ' . \App\Models\SiteSetting::current()->company_name;
    $setting = \App\Models\SiteSetting::current();
@endphp
@extends('layouts.app')

@section('content')
    <div class="legal-page">
        <h1>Impressum</h1>
        <p><strong>{{ $setting->company_name }}</strong></p>
        @if($setting->address)<p>{{ $setting->address }}, {{ $setting->city }}</p>@endif
        @if($setting->phone)<p>Telefon: {{ $setting->phone }}</p>@endif
        @if($setting->email)<p>E-Mail: {{ $setting->email }}</p>@endif
        <p style="margin-top:32px;color:var(--color-muted);font-size:14px;">
            Platzhalter — bitte durch die rechtsverbindlichen Angaben (Handelsregister, UID, vertretungsberechtigte Person etc.) ersetzen.
        </p>
    </div>
@endsection
