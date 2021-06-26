<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Passbook extends Model
{

    // public $timestamps = false;

    protected $fillable = [
        'Tanggal', 'Keterangan', 'Jenis', 'Berat', '@KG', 'Debit', 'Credit', 'Subtotal', 'user_id'
    ];

    public function users(){
        return $this->belongsTo(Passbook::class);
    }

}
