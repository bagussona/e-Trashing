<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassbookBendahara extends Model
{
    protected $fillable = [
        'Tanggal', 'Keterangan', 'Jenis', 'Berat', 'Debit', 'Credit', 'Saldo'
    ];
}
