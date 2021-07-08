<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('app');
// });

Route::get('/{path?}', [
  'uses' => 'ReactController@show',
  'as' => 'app',
  'where' => ['path' => '.*']
]);

Auth::routes();

// Route::get('react-message', function() {
//     return view('message');
//   });

// Route::get('/home', 'HomeController@index')->name('home');
