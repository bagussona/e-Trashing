<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassbookUsers extends Model
{

    protected $fillable = [
        'user_id', 'Tanggal', 'Keterangan', 'Berat', 'Saldo'
    ];

}
