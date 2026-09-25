<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profile_contents', function (Blueprint $table) {
            $table->boolean('about_visible')->default(true)->after('mini_cards');
        });
    }

    public function down(): void
    {
        Schema::table('profile_contents', function (Blueprint $table) {
            $table->dropColumn('about_visible');
        });
    }
};
