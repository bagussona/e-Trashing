<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::post('logout/{id}', 'api\AdminController@logoutSession');

### Authentication All
Route::middleware(['cors'])->group(function () {

    Route::post('login', 'api\UserController@login');
    Route::get('token', 'api\UserController@getToken');

});

### Customer Area->
Route::middleware(['cors'])->group(function () {

    Route::post('register', 'api\UserController@registerCustomer');

    Route::get('profile', 'api\UserController@userProfile')->middleware('jwt.verify'); //READ Detail User [R]
    Route::get('profile/{id}', 'api\UserController@profileDetail')->middleware('jwt.verify'); //READ Detail User [R]


});


### Admin Area->
Route::middleware(['cors'])->group(function () {

    // CRUD User management
    Route::get('get/user', 'api\AdminController@getAllUser')->middleware('jwt.verify'); //READ All User [R]

    // CRUD Bendahara, Staff 1 & Pengepul
    Route::post('register/staff', 'api\AdminController@registerStaff'); //CREATE User [C]

    Route::post('profile/update/{id}', 'api\AdminController@update'); //UPDATE Data Profile all Staff [U]
    Route::delete('profile/delete/{id}', 'api\AdminController@destroy'); //DELETE All User [D]
    Route::post('logout', 'api\AdminController@logout'); //Logout api

    // CRUD Jenis Sampah & @KG
    Route::get('jenisSampah', 'api\AdminController@getAllSampah')->middleware('jwt.verify'); //READ Semua data jenis sampah
    Route::get('jenisSampah/detail/{id}', 'api\AdminController@getDetailSampah')->middleware('jwt.verify'); //READ detail jenis sampah
    Route::post('jenisSampah', 'api\AdminController@storeJenisSampah'); //CREATE jenis sampah
    Route::post('jenisSampah/update/{id}', 'api\AdminController@updateJenisSampah'); //UPDATE jenis sampah
    Route::delete('jenisSampah/delete/{id}', 'api\AdminController@destroyJenisSampah'); //DELETE jenis sampahDelete

});

### Authentication All
Route::middleware(['cors'])->group(function () {

    Route::post('{id}/timbanganSampah', 'api\StaffController@timbanganSampah');

});
