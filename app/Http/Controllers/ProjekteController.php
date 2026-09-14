<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\ProjectsPageContent;
use Illuminate\View\View;

class ProjekteController extends Controller
{
    public function index(): View
    {
        $projects = Project::query()
            ->published()
            ->ordered()
            ->with('category')
            ->get();

        $categories = ProjectCategory::query()
            ->orderBy('order')
            ->get();

        $blocks = $this->groupIntoBlocks($projects);

        $pageContent = ProjectsPageContent::current();

        return view('pages.projekte-index', compact('projects', 'categories', 'blocks', 'pageContent'));
    }

    /**
     * Group the flat project list into visual blocks, pairing up projects
     * whose layout_type is meant to sit side by side (two / gallery / final_grid),
     * while feature/wide projects always render full width on their own.
     */
    private function groupIntoBlocks($projects): array
    {
        $pairable = ['two', 'gallery', 'final_grid'];
        $blocks = [];
        $buffer = [];
        $bufferType = null;

        $flushBuffer = function () use (&$buffer, &$bufferType, &$blocks) {
            foreach (array_chunk($buffer, 2) as $pair) {
                $blocks[] = ['type' => $bufferType, 'projects' => $pair];
            }
            $buffer = [];
            $bufferType = null;
        };

        foreach ($projects as $project) {
            if (in_array($project->layout_type, $pairable, true)) {
                if ($bufferType !== null && $bufferType !== $project->layout_type) {
                    $flushBuffer();
                }
                $bufferType = $project->layout_type;
                $buffer[] = $project;
            } else {
                $flushBuffer();
                $blocks[] = ['type' => $project->layout_type, 'projects' => [$project]];
            }
        }
        $flushBuffer();

        return $blocks;
    }

    public function show(Project $project): View
    {
        abort_unless($project->status === 'published', 404);

        $project->load('images');

        $next = Project::query()
            ->published()
            ->ordered()
            ->where('order', '>', $project->order)
            ->first()
            ?? Project::query()->published()->ordered()->first();

        return view('pages.projekte-show', compact('project', 'next'));
    }
}
