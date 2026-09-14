<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('design_settings', function (Blueprint $table) {
            $table->id();
            $table->string('font_family')->default('Inter');

            $table->unsignedInteger('h1_size_desktop')->default(58);
            $table->unsignedInteger('h1_size_mobile')->default(38);
            $table->unsignedInteger('h2_size_desktop')->default(38);
            $table->unsignedInteger('h2_size_mobile')->default(28);
            $table->unsignedInteger('h3_size_desktop')->default(23);
            $table->unsignedInteger('h3_size_mobile')->default(19);
            $table->unsignedInteger('body_size')->default(17);
            $table->unsignedInteger('nav_size')->default(16);
            $table->unsignedInteger('label_size')->default(12);
            $table->unsignedInteger('button_size')->default(14);

            $table->decimal('h1_line_height', 3, 2)->default(1.04);
            $table->decimal('h2_line_height', 3, 2)->default(1.14);
            $table->decimal('h3_line_height', 3, 2)->default(1.25);
            $table->decimal('body_line_height', 3, 2)->default(1.6);

            $table->unsignedInteger('font_weight_heading')->default(800);

            $table->string('color_red', 7)->default('#E30613');
            $table->string('color_green', 7)->default('#3F5548');
            $table->string('color_brown', 7)->default('#51463F');
            $table->string('color_text', 7)->default('#3F3F3F');
            $table->string('color_background', 7)->default('#FFFFFF');

            $table->unsignedInteger('content_width')->default(1180);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('design_settings');
    }
};
