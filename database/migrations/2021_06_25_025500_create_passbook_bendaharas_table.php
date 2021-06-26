<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePassbookBendaharasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passbook_bendaharas', function (Blueprint $table) {
            $table->id();
            $table->string('Tanggal')->nullable();
            $table->string('Keterangan')->nullable();
            $table->string('Jenis')->nullable();
            $table->integer('Berat')->nullable();
            $table->integer('@KG')->nullable();
            $table->integer('Debit')->nullable()->default(0);
            $table->integer('Credit')->nullable()->default(0);
            $table->integer('Saldo')->nullable()->default(0);
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('passbook_bendaharas');
    }
}
