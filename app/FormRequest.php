<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormRequest extends Model
{
    //

    protected $fillable = ['user_id', 'kode_book', 'tanggal', 'name', 'address', 'geolocation', 'nohape', 'jam', 'keterangan', 'status'];

    public function users(){
        return $this->belongsTo(FormRequest::class);
    }

}
