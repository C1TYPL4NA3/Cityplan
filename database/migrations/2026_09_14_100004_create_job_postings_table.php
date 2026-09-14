<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('employment_type')->nullable(); // "Festanstellung"
            $table->string('pensum')->nullable(); // "Teilzeit 60–80 %"
            $table->string('location')->nullable();
            $table->string('start_text')->nullable(); // "Eintritt"
            $table->text('lead')->nullable();
            $table->json('tasks')->nullable(); // "Ihre Aufgaben" — list of bullet strings
            $table->json('profile_items')->nullable(); // "Ihr Profil" — list of bullet strings
            $table->json('benefits')->nullable(); // "Wir bieten Ihnen" — list of {title, text}
            $table->text('application_info')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('hero_image_alt')->nullable();
            $table->string('status')->default('draft'); // draft, published
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
