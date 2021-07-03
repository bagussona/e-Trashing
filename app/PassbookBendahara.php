<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassbookBendahara extends Model
{
    // public $timestamps = false;

    protected $fillable = [
        'user_id', 'Tanggal', 'Keterangan', 'Jenis', 'Berat', 'Debit', 'Credit', 'Saldo'
    ];
}
