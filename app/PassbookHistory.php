<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassbookHistory extends Model
{
    protected $fillable = [
        'Tanggal', 'Keterangan', 'Jenis', 'Berat', '@KG', 'Debit', 'Credit', 'Subtotal', 'user_id'
    ];

    public function users(){
        return $this->belongsTo(PassbookHistory::class);
    }
}
