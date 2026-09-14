<?php

use App\Http\Controllers\ProjekteController;
use App\Http\Controllers\SitemapController;
use App\Models\ContactContent;
use App\Models\HomeContent;
use App\Models\JobPosting;
use App\Models\ProfileContent;
use App\Models\UmbauContent;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $content = HomeContent::current();

    return view('pages.home', compact('content'));
})->name('home');

Route::get('/profil', function () {
    $content = ProfileContent::current();

    return view('pages.profil', compact('content'));
})->name('profil');

Route::get('/umbauen', function () {
    $content = UmbauContent::current();

    return view('pages.umbauen', compact('content'));
})->name('umbauen');

Route::get('/projekte', [ProjekteController::class, 'index'])->name('projekte.index');
Route::get('/projekte/{project:slug}', [ProjekteController::class, 'show'])->name('projekte.show');

Route::get('/jobs', function () {
    $jobs = JobPosting::query()->published()->ordered()->get();

    return view('pages.jobs', compact('jobs'));
})->name('jobs');

Route::get('/kontakt', function () {
    $content = ContactContent::current();

    return view('pages.kontakt', compact('content'));
})->name('kontakt');

Route::get('/impressum', fn () => view('pages.impressum'))->name('impressum');
Route::get('/datenschutz', fn () => view('pages.datenschutz'))->name('datenschutz');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
