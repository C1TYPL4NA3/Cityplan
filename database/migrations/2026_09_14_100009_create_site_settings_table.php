<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->default('Cityplan AG Zürich');
            $table->string('tagline')->nullable(); // "Architektur & Generalunternehmung"
            $table->string('address')->nullable();
            $table->string('city')->default('Zürich');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('logo')->nullable();
            $table->string('map_link')->nullable();

            $table->json('footer_leistungen')->nullable(); // list of {label}
            $table->json('social_links')->nullable();

            $table->string('seo_default_title')->nullable();
            $table->string('seo_default_description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
