<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePassbookHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passbook_histories', function (Blueprint $table) {
            $table->id();
            $table->string('Tanggal')->nullable();
            $table->string('Keterangan')->nullable();
            $table->string('Jenis')->nullable();
            $table->float('Berat')->nullable();
            $table->integer('@KG')->nullable();
            // $table->integer('Debit')->nullable()->default(0);
            // $table->integer('Credit')->nullable()->default(0);
            $table->integer('Subtotal')->nullable()->default(0);
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('passbook_histories');
    }
}
