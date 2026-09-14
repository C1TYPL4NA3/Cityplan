<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $staticRoutes = [
            ['url' => route('home'), 'priority' => '1.0'],
            ['url' => route('profil'), 'priority' => '0.8'],
            ['url' => route('umbauen'), 'priority' => '0.6'],
            ['url' => route('projekte.index'), 'priority' => '0.9'],
            ['url' => route('jobs'), 'priority' => '0.5'],
            ['url' => route('kontakt'), 'priority' => '0.7'],
        ];

        $projects = Project::query()
            ->published()
            ->get()
            ->map(fn (Project $project) => [
                'url' => route('projekte.show', $project),
                'priority' => '0.7',
                'lastmod' => $project->updated_at?->toAtomString(),
            ]);

        $urls = collect($staticRoutes)->concat($projects);

        $xml = view('sitemap', compact('urls'))->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
