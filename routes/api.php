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


Route::middleware(['cors'])->group(function () {

    Route::post('register', 'api\UserController@registerCustomer');
    Route::post('register/pengepul', 'api\UserController@registerPengepul');
    Route::post('register/staff', 'api\UserController@registerStaff');
    Route::post('register/bendahara', 'api\AdminController@registerBendahara');

    Route::post('login', 'api\UserController@login');
    Route::get('token', 'api\UserController@getToken');

    Route::get('profile', 'api\UserController@userProfile')->middleware('jwt.verify');
    Route::post('profile/update/{id}', 'api\AdminController@update');
    Route::delete('profile/delete/{id}', 'api\AdminController@destroy');
    Route::post('logout/{id}', 'api\AdminController@logoutSession');
    Route::post('logout', 'api\AdminController@logout');

});


