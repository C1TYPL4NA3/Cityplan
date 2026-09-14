<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('hero_kicker')->nullable();
            $table->string('hero_slogan_line1')->nullable();
            $table->string('hero_slogan_line2')->nullable();
            $table->string('hero_slogan_line3')->nullable(); // shown in red
            $table->text('hero_intro')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('hero_image_alt')->nullable();
            $table->string('empty_state_text')->nullable(); // shown when no jobs are published
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs_page_contents');
    }
};
