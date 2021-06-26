<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassbookCustomer extends Model
{
    protected $fillable = [
        'user_id', 'Tanggal', 'Keterangan', 'Jenis', 'Berat', 'Debit', 'Credit', 'Saldo'
    ];

}
