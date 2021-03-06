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

    Route::get('profile', 'api\UserController@userProfile')->middleware('jwt.verify'); //READ Detail User [R] [Admin, Customer]

    Route::get('profile/detail', 'api\UserController@profileDetail')->middleware('jwt.verify'); //READ Detail User [R] [Admin, Customer, Staff, Bendahara, Pengepul]

    Route::post('customer/profile/image', 'api\CustomerController@uploadImage'); //POST Image [All]
    Route::post('customer/profile/update', 'api\CustomerController@update'); //POST profile [All]
    Route::post('logout', 'api\AdminController@logout'); //Logout api [Admin, Staff1, Pengepul, Bendahara, Customer]

});

### Admin Area->
Route::group([
    'middleware' => ['jwt.verify', 'role:admin']
], function () {

    // CRUD User management

    // OK 1 [Admin /endpoint API OK]
    Route::get('get/user', 'api\AdminController@getAllUser')->middleware('jwt.verify'); //READ All User [Admin, Bendahara]
    // OK 2 [Admin /endpoint API OK]
    Route::get('get/profile/{id}', 'api\AdminController@profileDetail')->middleware('jwt.verify'); //READ Detail User [R] [Admin, Customer]

    // CRUD Bendahara, Staff 1 & Pengepul
    // OK 1 [User Management /endpoint API OK]
    Route::post('register/staff', 'api\AdminController@registerStaff'); //CREATE User [Admin]

    // OK 1 [Admin /endpoint API OK]
    Route::post('upload/image/{id}', 'api\AdminController@uploadImage'); //POST Image [Admin]
    //OK 3 [User Management /endpoint API OK]
    Route::post('profile/update/{id}', 'api\AdminController@update'); //UPDATE Data Profile all Staff [Admin, Customer]
    // OK 4 [User Management /endpoint API OK]
    Route::delete('profile/delete/{id}', 'api\AdminController@destroy'); //DELETE All User [Admin]

    // OK 1 [Authentication /endpoint API OK]
    Route::post('logout', 'api\AdminController@logout'); //Logout api [Admin, Staff1, Pengepul, Bendahara, Customer]

    // CRUD Jenis Sampah & @KG
    // OK 2 [Sampah Management /endpoint API OK]
    Route::get('jenisSampah', 'api\AdminController@getAllSampah')->middleware('jwt.verify'); //READ Semua data jenis sampah [Admin, Staff1]
    // OK 3 [Sampah Management /endpoint API OK]
    Route::get('jenisSampah/detail/{id}', 'api\AdminController@getDetailSampah')->middleware('jwt.verify'); //READ detail jenis sampah [Admin, Staff1]
    // OK 1 [Sampah Management /endpoint API OK]
    Route::post('jenisSampah', 'api\AdminController@storeJenisSampah'); //CREATE jenis sampah [Admin]
    // OK 4 [Sampah Management /endpoint API OK]
    Route::post('jenisSampah/update/{id}', 'api\AdminController@updateJenisSampah'); //UPDATE jenis sampah [Admin]
    // OK 5 [Sampah Management /endpoint API OK]
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
    Route::post('staff/orderan/{id}/diselesaikan', 'api\StaffController@orderanSelesai'); //Update status ke Selesai agar tidak ditampilkan di all orderan
    #3
    Route::get('staff/detail/orderan/{id}', 'api\StaffController@detailOrderanKu');
    #4
    Route::post('staff/find/orderan', 'api\StaffController@search');

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

    //Notification
    Route::get('bendahara/all/tarikanKu', 'api\BendaharaController@listsRequestTarikan'); //Notification
    Route::get('bendahara/tarikanKu/{id}', 'api\BendaharaController@detailTarikan'); //Detail
    Route::post('bendahara/{id}/accepted/tarikanKu', 'api\BendaharaController@checkout'); //Acc
    Route::post('bendahara/{id}/rejected/tarikanKu', 'api\BendaharaController@checkoutReject'); //Reject

    //setoran user
    Route::get('bendahara/all/setoran', 'api\BendaharaController@readAllSetoran'); //Bendahara ->cek semua sampah yg sudah di input [Bendahara, Pengepul, Staff1]
    Route::get('bendahara/customer/{id}/setoran', 'api\BendaharaController@readAllSetoranCustomer');
    Route::get('bendahara/{id}/setoran', 'api\BendaharaController@readAllSetoranPengepul');

    //buku tabungan user
    Route::get('bendahara/all/passbookKu', 'api\BendaharaController@readAllPassbooks');
    Route::get('bendahara/customer/{id}/passbookKu/detail', 'api\BendaharaController@detailPassbooks');
    Route::delete('bendahara/customer/{id}/passbookKu/delete', 'api\BendaharaController@deletePassbooks');
    Route::get('bendahara/customer/{id}/passbook', 'api\BendaharaController@readPassbookCustomers');
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

    Route::get('customer/setoran', 'api\CustomerController@index');
    Route::post('customer/setoran/dijemput', 'api\CustomerController@formSetorDijemput');
    Route::post('customer/setoran/diantar', 'api\CustomerController@formSetorDiantar');
    Route::post('customer/setoran/dibatalin', 'api\CustomerController@batalSetor');

    Route::get('customer/tarikanKu', 'api\CustomerController@tarikanKu');
    Route::post('customer/tarikanKu', 'api\CustomerController@formRequestTarikan');

    Route::get('customer/leaderboards', 'api\CustomerController@leaderboards');

});


### Chats Area
Route::group([
    'middleware' => ['jwt.verify', 'role:admin|staff|pengepul|bendahara|customer']
], function () {

    Route::get('chats/contact', 'api\ChatsController@index'); //contact
    Route::get('chats/some/messages', 'api\ChatsController@fetchMessages');
    Route::get('chats/message/{id}', 'api\ChatsController@getMessage'); //message from & to
    Route::post('chats/message', 'api\ChatsController@sendMessage'); //send message

});
