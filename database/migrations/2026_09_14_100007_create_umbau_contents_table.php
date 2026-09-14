<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('umbau_contents', function (Blueprint $table) {
            $table->id();
            $table->string('hero_eyebrow')->nullable();
            $table->string('hero_heading')->nullable();
            $table->text('hero_lead')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('hero_image_alt')->nullable();

            $table->string('feature_heading')->nullable();
            $table->text('feature_text')->nullable();
            $table->json('feature_points')->nullable();

            $table->string('cta_heading')->nullable();
            $table->text('cta_text')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('umbau_contents');
    }
};
