<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Passbook extends Model
{
    protected $fillable = [
        'Tanggal', 'Keterangan', 'Jenis', 'Berat', '@KG', 'Debit', 'Credit', 'Saldo'
    ];
}
