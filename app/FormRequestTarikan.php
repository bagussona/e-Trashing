<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormRequestTarikan extends Model
{
    protected $fillable = ['user_id', 'name', 'kode_pembayaran', 'tanggal', 'jumlah', 'status'];

    public function users(){
        return $this->belongsTo(FormRequestTarikan::class);
    }
}
