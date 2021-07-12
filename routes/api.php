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

    Route::post('login', 'api\UserController@login'); //[All User]
    Route::get('token', 'api\UserController@getToken'); //[All User]
    Route::post('register', 'api\UserController@registerCustomer'); //[Customer]
    Route::post('password/reset/email', 'api\ForgotPasswordController@forgot');
    Route::post('password/reset', 'api\ForgotPasswordController@reset');

});

### Customer Area->
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|customer|staff|bendahara|pengepul']
], function () {

    Route::post('profile/update/{id}', 'api\AdminController@update'); //UPDATE Data Profile all Staff [Admin, Customer]
    Route::get('profile', 'api\UserController@userProfile')->middleware('jwt.verify'); //READ Detail User [R] [Admin, Customer]
    Route::get('profile/{id}', 'api\UserController@profileDetail')->middleware('jwt.verify'); //READ Detail User [R] [Admin, Customer]

});


### Admin Area->
Route::group([
    'middleware' => ['jwt.verify', 'role:admin']
], function () {

    // CRUD User management
    Route::get('get/user', 'api\AdminController@getAllUser')->middleware('jwt.verify'); //READ All User [Admin, Bendahara]

    // CRUD Bendahara, Staff 1 & Pengepul
    Route::post('register/staff', 'api\AdminController@registerStaff'); //CREATE User [Admin]
    Route::post('upload/image', 'api\AdminController@uploadImage'); //POST Image [Admin]

    Route::post('profile/update/{id}', 'api\AdminController@update'); //UPDATE Data Profile all Staff [Admin, Customer]
    Route::delete('profile/delete/{id}', 'api\AdminController@destroy'); //DELETE All User [Admin]
    Route::post('logout', 'api\AdminController@logout'); //Logout api [Admin, Staff1, Pengepul, Bendahara, Customer]

    // CRUD Jenis Sampah & @KG
    Route::get('jenisSampah', 'api\AdminController@getAllSampah')->middleware('jwt.verify'); //READ Semua data jenis sampah [Admin, Staff1]
    Route::get('jenisSampah/detail/{id}', 'api\AdminController@getDetailSampah')->middleware('jwt.verify'); //READ detail jenis sampah [Admin, Staff1]
    Route::post('jenisSampah', 'api\AdminController@storeJenisSampah'); //CREATE jenis sampah [Admin]
    Route::post('jenisSampah/update/{id}', 'api\AdminController@updateJenisSampah'); //UPDATE jenis sampah [Admin]
    Route::delete('jenisSampah/delete/{id}', 'api\AdminController@destroyJenisSampah'); //DELETE jenis sampahDelete [Admin]

});

### Staff_1 All
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|staff']
], function () {

    //Orderan masuk
    #1
    Route::get('staff/all/orderan', 'api\StaffController@orderanKu'); //Notifikasi orderan dari customer yang harus dijemput dan atau yang ditimbang di tempat
    #2
    Route::post('staff/orderan/diselesaikan', 'api\StaffController@orderanSelesai'); //Update status ke Selesai agar tidak ditampilkan di all orderan

    //Transaksi
    //#1
    Route::post('staff/{id}/addToTimbangan', 'api\StaffController@addToTimbangan'); //Staff1 ->add sampah ke cart

    //#2
    Route::get('staff/{id}/timbangan', 'api\StaffController@listTimbangan'); //Staff1 ->cek sampah  di cart yg sudah di input

    //#3
    Route::post('staff/{id}/checkout', 'api\StaffController@checkout'); //Staff1 ->Transaksi sampah yg sudah di input

    //#4 jika ada yg diedit
    Route::post('staff/timbangan/update/{id}', 'api\StaffController@updateTimbanganSampah'); //Staff1 ->update sampah yg masih di cart
    //#5 jika ada yg dihapus
    Route::delete('staff/delete/timbangan/{id}', 'api\StaffController@destroy'); //Staff1 ->delete sampah yg ada di cart


    //all setoran untuk bendahara
    Route::get('staff/all/passbooks', 'api\StaffController@index'); //Bendahara ->cek semua sampah yg sudah di input [Bendahara, Pengepul, Staff1]

});

### Staff_2 - Pengepul All
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|pengepul']
], function () {

    //Transaksi
    //#1
    Route::post('pengepul/{id}/addToTimbangan', 'api\PengepulController@addToTimbanganBendahara'); //Pengepul ->add sampah ke cart

    //#2
    Route::get('pengepul/{id}/timbangan', 'api\PengepulController@listTimbanganBendahara'); //Pengepul ->cek sampah  di cart yg sudah di input

    //#3
    Route::post('pengepul/{id}/checkout', 'api\PengepulController@checkoutBendahara'); //Pengepul ->Transaksi sampah yg sudah di input

    //#4 jika ada yg diedit
    Route::post('pengepul/timbangan/update/{id}', 'api\PengepulController@updateTimbanganSampahBendahara'); //Pengepul ->update sampah yg masih di cart

    //#5 jika ada yg dihapus
    Route::delete('pengepul/delete/timbangan/{id}', 'api\PengepulController@destroy'); //Pengepul ->delete sampah yg ada di cart


    //all setoran bendahara ke pengepul.
    Route::get('pengepul/{id}/passbooks', 'api\PengepulController@index'); //Bendahara ->cek semua sampah yg sudah di input [Bendahara, Pengepul, Staff1]

});

### Staff_3 - Bendahara All
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|bendahara']
], function () {

    Route::get('bendahara/all/tarikanKu', 'api\BendaharaController@listsRequestTarikan'); //Notification
    Route::get('bendahara/{id}/tarikanKu', 'api\BendaharaController@listTarikan');
    Route::post('bendahara/{id}/accepted/tarikanKu', 'api\BendaharaController@checkout'); //Acc
    Route::post('bendahara/{id}/rejected/tarikanKu', 'api\BendaharaController@checkoutReject'); //Reject

    Route::get('bendahara/all/setoran', 'api\BendaharaController@readAllSetoran'); //Bendahara ->cek semua sampah yg sudah di input [Bendahara, Pengepul, Staff1]
    Route::get('bendahara/customer/{id}/setoran', 'api\BendaharaController@readAllSetoranCustomer');
    Route::get('bendahara/customer/{id}/passbook', 'api\BendaharaController@readPassbookCustomers');
    Route::get('bendahara/{id}/setoran', 'api\BendaharaController@readAllSetoranPengepul');
    Route::get('bendahara/{id}/passbook', 'api\BendaharaController@readPassbookBendaharas');

});


### Customer Area
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|customer']
], function () {


    //history orders [form request jemput, dtg, form request tarik];
    Route::get('history/orders', 'api\CustomerController@historyOrders');
    //history transactions [setor, tarik];
    Route::get('history/transactions', 'api\CustomerController@historyTransactions');

    Route::get('customer/setoran/{id}', 'api\CustomerController@index');
    Route::post('customer/setoran/dijemput', 'api\CustomerController@formSetorDijemput');
    Route::post('customer/setoran/diantar', 'api\CustomerController@formSetorDiantar');
    Route::post('customer/setoran/dibatalin', 'api\CustomerController@batalSetor');

    Route::get('customer/tarikanKu', 'api\CustomerController@tarikanKu');
    Route::post('customer/tarikanKu', 'api\CustomerController@formRequestTarikan');

    Route::get('customer/leaderboards', 'api\CustomerController@leaderboards');

});


### Customer Area
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|staff|pengepul|bendahara|customer']
], function () {

    Route::get('chats/contact', 'ChatsController@index'); //contact
    Route::get('chats/some/messages', 'ChatsController@fetchMessages');
    Route::get('chats/message/{id}', 'ChatsController@getMessage'); //message from & to
    Route::post('chats/message', 'ChatsController@sendMessage'); //send message

});
