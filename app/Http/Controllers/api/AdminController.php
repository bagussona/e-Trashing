<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\User;
use App\JenisSampah;
use App\PassbookBendahara;
use App\PassbookCustomer;
use App\PassbookUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{

##### Admin Permission #####

//Catatam Ini adlah pure murni buatan @bagus_sona

    // private function getUrlAvatar(){
    //     $avatar = json_decode(request()->cookie('avatar'), true);

    //     return $avatar;
    // }

    // public function uploadImage(){
    // $this->validate(request(), [
    //     'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
    // ]);

    // $response = cloudinary()->upload(request()->file('avatar')->getRealPath())->getSecurePath();

    // $cookie = cookie('avatar', json_encode($response), 180);

    //     return response()->json(["msg" => "gambar berhasil diupload"], 200)->cookie($cookie);
    // }

    public function uploadImage($id){
        $this->validate(request(), [
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $response = cloudinary()->upload(request()->file('avatar')->getRealPath())->getSecurePath();

        $user = User::find($id);
        $user->update([
            "avatar" => $response
            ]);

        return response()->json(["msg" => "gambar berhasil diubah"], 200);
    }

    public function profileDetail($id){
        $user = User::find($id);

        return response()->json(compact('user'), 200);
    }

    public function update(Request $request, $id){
        $this->validate($request, [
                    'first_name' => 'required|string|max:50',
                    'last_name' => 'required|string|max:50',
                    'nohape' => 'required|string|max:15',
                    'location' => 'nullable|string',
            ]);

            $user = User::find($id);
            $user->update([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'nohape' => $request->get('nohape'),
                'location' => $request->get('location'),
            ]);

            try {
                $user->save();
                return response()->json([
                    'status'        => 'success',
                    'message'       => 'Profile Updated Successfully',
                    'data'          => $user
                    ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                return response()->json([
                    'status'        => 'failed',
                    'message'       => 'Something went wrong',
                    'data'          => $th
                    ], Response::HTTP_BAD_REQUEST);
            }
    }

//Catatam Ini adlah pure murni buatan @bagus_sona

    // public function update(Request $request, $id){
    // $this->validate($request, [
    //         'first_name' => 'required|string|max:50',
    //         'last_name' => 'required|string|max:50',
    //         // 'email' => 'nullable|email|max:50',
    //         'nohape' => 'required|string|max:15',
    //         // 'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    //         'location' => 'nullable|string',
    // ]);

    // $avatar = $this->getUrlAvatar();

    // if ($avatar != []) {
    //     $user = User::find($id);
    //     $user->update([
    //         'first_name' => $request->first_name,
    //         'last_name' => $request->last_name,
    //         'nohape' => $request->nohape,
    //         'avatar' => $avatar,
    //         'location' => $request->location
    //     ]);

    //     return response()->json(["msg" => "Data Profile berhasil diupdate!"], 200);
    // } else{
    // $user = User::find($id);
    //     $user->update([
    //         'first_name' => $request->first_name,
    //         'last_name' => $request->last_name,
    //         'nohape' => $request->nohape,
    //         'location' => $request->location
    //     ]);

    //     return response()->json(["msg" => "Profile berhasil diupdate!"], 200);
    //     }
    // }

##### End of Update profile by admin #####

##### Registrasi Staff Area #####

    public function registerStaff(Request $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
        'first_name' => 'required|string|max:30',
        'last_name' => 'required|string|max:30',
        // 'username' => 'required|string|max:20|unique:users',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6|confirmed',
        'role' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $role = $request->get('role');
        // $random = Str::random(6);
        $username = $request->get('first_name');

        // print($staff->id);

        if ($role == "bendahara") {
            $staff = User::create([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'username' => $role.".".strtolower($username),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
                'nohape' => '082128796431',
                'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
                'location' => '-7.995573596215699, 110.29540549192244',
                'sampah_terkumpul' => 0,
                'saldo' => 1000000
            ]);

            $passbook_staff = PassbookBendahara::create([
                'user_id' => $staff->id,
                'Tanggal' => date("Y-m-d"),
                'Keterangan' => "Saldo Awal",
                'Berat' => 0,
                'Debit' => 0,
                'Credit' => 0,
                'Saldo' => 1000000
                ]);

            $passbook_users = PassbookUsers::create([
                    'user_id' => $staff->id,
                    'Tanggal' => date('Y-m-d'),
                    'Keterangan' => 'BTS-ID/PassbookUsers/' . date('Y-m-d') . '/' . Str::random(6),
                    'Berat' => 0,
                    'Saldo' => 1000000
                ]);
        } else {
            $staff = User::create([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'username' => $role.".".strtolower($username),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
                'nohape' => '082128796431',
                'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
                'location' => '-7.995573596215699, 110.29540549192244',
                'sampah_terkumpul' => 0,
                'saldo' => 0
            ]);

            $passbook_staff = PassbookCustomer::create([
                'user_id' => $staff->id,
                'Tanggal' => date("Y-m-d"),
                'Keterangan' => "saldo awal",
                'Berat' => 0,
                'Debit' => 0,
                'Credit' => 0,
                'Saldo' => 0
            ]);

            $passbook_users = PassbookUsers::create([
                'user_id' => $staff->id,
                'Tanggal' => date('Y-m-d'),
                'Keterangan' => 'BTS-ID/PassbookUsers/' . date('Y-m-d') . '/' . Str::random(6),
                'Berat' => 0,
                'Saldo' => 0
            ]);
        }

        $staff->assignRole($role);

        return response()->json(compact('staff'), 201);
    }

##### End of Registrasi Area #####

##### Delete Account by Admin #####

    public function destroy(User $id){
        $id->delete();
        return response()->json([
            'status'        => 'success',
            'message'       => 'Account Deleted Succesfully',
            'data'          => $id
        ], Response::HTTP_NO_CONTENT);
    }

##### End of Delete area #####

##### Logout Function #####

public function logout( Request $request ) {

    $token = $request->header( 'Authorization' );
    // dd($token);

    try {
        JWTAuth::parseToken()->invalidate( $token );

        return response()->json( [
            'error'   => false,
            'message' => trans( 'auth.logged_out' )
        ] );
    } catch ( TokenExpiredException $exception ) {
        return response()->json( [
            'error'   => true,
            'message' => trans( 'auth.token.expired' )

        ], 401 );
    } catch ( TokenInvalidException $exception ) {
        return response()->json( [
            'error'   => true,
            'message' => trans( 'auth.token.invalid' )
        ], 401 );

    } catch ( JWTException $exception ) {
        return response()->json( [
            'error'   => true,
            'message' => trans( 'auth.token.missing' )
        ], 500 );
    }

    // return response()->json(['Sukses' => 'Anda berhasil logout'], 200);
}

public function getAllUser(){

    $users = User::all();

    // $users = DB::table('users')->join('passbook_customers', 'users.id', '=', 'passbook_customers.user_id' )->select('users.*', 'passbook_customers.user_id', 'passbook_customers.Berat', 'passbook_customers.Saldo')->get();

    // dd($users);
    $values = [];
    foreach ($users as $user) {
    // dd($user->id);
    // dd($count);

        $values[] = [
            "uid" => $user->id,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "username" => $user->username,
            "email" => $user->email,
            "password" => $user->password,
            "nohape" => $user->nohape,
            "avatar" => $user->avatar,
            "location" => $user->location,
    //         "role_names" => $user["role_names"][0],
            "sampah_terkumpul" => $user->sampah_terkumpul . " KG",
            "saldo" => $user->saldo
        ];

    }

    // dd($uid);
    // dd($values);
    // $result = [];
    // foreach ($values as $value){
    //     // dd($value);
    //     // dd($wk);

    //     $result[] = [
    //         "uid" => $value["uid"],
    //         "First_name" => $value["first_name"],
    //         "Last_name" => $value["last_name"],
    //         "Username" => $value["username"],
    //         "Email" => $value["email"],
    //         "Password" => $value["password"],
    //         "No_Hape" => $value["nohape"],
    //         "Avatar" => $value["avatar"],
    //         "Location" => $value["location"],
    //         "Berat" => $value["berat"],
    //         "Saldo" => $value["saldo"]
    //     ];

    // }

    // // dd($result);

    // $all_result = [];
    // for ($i=0; $i < count($result); $i++) {
    //     # code...
    //     array_push($all_result, $result[$i]['uid']);
    // }

    // // $uid = DB::table('users')->select('users.id')->get();
    // // dd($all_result);
    // // dd($uid[2]->id);

    // // dd($all_result[8]); // ini berubah disini [8]
    // // dd($result[8]['uid']);
    // // dd($all_result[1][$result[1]['uid']]);
    // // $all_result[8]

    // // dd(count($result));
    // $test = [];
    // for ($i = 0; $i < count($result); $i++) {
    //     if ($result[$i]['uid'] == $all_result[$result[$i]['uid']-1]) {
    //     // if ($result[$i]['uid'] == $uid[$i]->id) {
    //         // dd($result[$i]['uid']);
    //         // dd($uid[9]->id);
    //         // dd($all_result[$result[$i]["uid"]-1]);
    //         // array_push($test, $result[$i]['uid']);
    //         $test[] = $result[$i];
    //     }
    // }

    // dd($test);;


    return response()->json(compact('values'), 200);
}

##### Admin CRUD Jenis Sampah @KG #####

    public function getAllSampah(){
        $jenisSampah = JenisSampah::all();
        // dd($user);

        return response()->json(compact('jenisSampah'), 200);
    }

    public function getDetailSampah($id){

        $detailJenisSampah = JenisSampah::find($id);

        return response()->json(compact('detailJenisSampah'), 200);
    }

    public function storeJenisSampah(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            '@KG' => 'required|integer'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $jenisSampah = JenisSampah::create([
            'name' => $request->get('name'),
            '@KG' => $request->get('@KG')
        ]);

        return response()->json(compact('jenisSampah'), 201);
    }

    public function updateJenisSampah(Request $request, $id){
        $this->validate($request, [
            'name' => 'required|string',
            '@KG' => 'required|integer'
        ]);

        $jenisSampah = JenisSampah::find($id);
        $jenisSampah->update([
            'name' => $request->get('name'),
            '@KG' => $request->get('@KG')
        ]);

        try {
            $jenisSampah->save();
            return response()->json([
                'status'        => 'success',
                'message'       => 'jenisSampah Updated Successfully',
                'data'          => $jenisSampah
                ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'status'        => 'failed',
                'message'       => 'Something went wrong',
                'data'          => $th
                ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroyJenisSampah(JenisSampah $id){
        $id->delete();
        return response()->json([
            'status'        => 'success',
            'message'       => 'Sampah Deleted Succesfully',
            'data'          => $id
        ], Response::HTTP_NO_CONTENT);
    }


##### End of Admin Delete Feature #####

}
