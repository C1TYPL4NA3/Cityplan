<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_contents', function (Blueprint $table) {
            $table->id();

            $table->string('overview_heading')->nullable();
            $table->text('overview_lead')->nullable();
            $table->text('overview_text')->nullable();
            $table->string('overview_image')->nullable();
            $table->string('overview_image_alt')->nullable();
            $table->json('metrics')->nullable(); // [{label,title,text} x4] "Leistungsfeld"

            $table->string('about_heading')->nullable();
            $table->json('about_paragraphs')->nullable(); // [string, ...]
            $table->text('quote_text')->nullable();
            $table->json('mini_cards')->nullable(); // [{title,text} x3]

            $table->json('services')->nullable(); // [{number,title,items:[]} x3]

            $table->string('feature_heading')->nullable();
            $table->text('feature_text')->nullable();
            $table->string('feature_image')->nullable();
            $table->string('feature_image_alt')->nullable();
            $table->json('feature_points')->nullable(); // [string, ...]

            $table->string('tech_heading')->nullable();
            $table->text('tech_text')->nullable();
            $table->string('tech_image')->nullable();
            $table->string('tech_image_alt')->nullable();
            $table->json('tags')->nullable(); // [string, ...]

            $table->string('clients_heading')->nullable();
            $table->text('clients_text')->nullable();
            $table->json('clients_list')->nullable(); // [string, ...]

            $table->json('process_steps')->nullable(); // [{num,title,text} x5]

            $table->string('cta_heading')->nullable();
            $table->text('cta_text')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_contents');
    }
};
