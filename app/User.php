<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasRoles;

    // public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'username', 'email', 'password', 'nohape', 'avatar', 'location', 'sampah_terkumpul', 'saldo'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'roles'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //This will add 'role_names' to your 'User', when converted to JSON/Array/etc
    protected $appends = ['role_names'];

    //Accessible via '$user->role_names', or 'user.role_names' in JSON
    public function getRoleNamesAttribute(){
        return $this->roles->pluck('name');
    }

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }

    public function passbooks(){
        return $this->hasMany(User::class);
    }

    public function formrequests(){
        return $this->hasMany(User::class);
    }

    public function formrequesttarikans(){
        return $this->hasMany(User::class);
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }
}
