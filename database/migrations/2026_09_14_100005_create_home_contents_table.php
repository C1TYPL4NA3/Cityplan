<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_contents', function (Blueprint $table) {
            $table->id();
            $table->string('hero_eyebrow')->nullable();
            $table->string('hero_heading_line1')->nullable();
            $table->string('hero_heading_line2')->nullable();
            $table->string('hero_heading_line3')->nullable();
            $table->text('hero_text')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('hero_image_alt')->nullable();

            $table->json('stats')->nullable(); // [{value,label} x4]

            $table->string('section_heading')->nullable();
            $table->text('section_lead')->nullable();
            $table->json('cards')->nullable(); // [{number,title,text} x3]

            $table->string('feature_heading')->nullable();
            $table->text('feature_text')->nullable();
            $table->string('feature_image')->nullable();
            $table->string('feature_image_alt')->nullable();

            $table->string('cta_heading')->nullable();
            $table->text('cta_text')->nullable();
            $table->string('cta_button_label')->nullable();
            $table->string('cta_button_link')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_contents');
    }
};
