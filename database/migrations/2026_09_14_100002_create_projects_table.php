<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_category_id')->nullable()->constrained('project_categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('location')->nullable();
            $table->string('type')->nullable();
            $table->string('year')->nullable();
            $table->text('short_description')->nullable();
            $table->string('main_image')->nullable();
            $table->string('main_image_alt')->nullable();
            $table->string('focus_point')->default('center'); // center, top, bottom, left, right
            $table->string('status')->default('draft'); // draft, published
            $table->unsignedInteger('order')->default(0);
            $table->string('layout_type')->default('two'); // feature, two, wide, gallery, final_grid

            // Detail page facts
            $table->string('realisation')->nullable();
            $table->string('bauherrschaft')->nullable();
            $table->string('objekt')->nullable();
            $table->string('leistungen')->nullable();
            $table->text('description')->nullable();

            // Optional highlighted "Projektgedanke" block
            $table->string('projektgedanke_heading')->nullable();
            $table->text('projektgedanke_text')->nullable();

            // SEO
            $table->string('seo_title')->nullable();
            $table->string('seo_description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
