<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassbookCustomer extends Model
{
    // public $timestamps = false;

    protected $fillable = [
        'user_id', 'Tanggal', 'Keterangan', 'Jenis', 'Berat', 'Debit', 'Credit', 'Saldo'
    ];

}
