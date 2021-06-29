<?php

namespace App\Http\Controllers\api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\PassbookCustomer;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Spatie\Permission\Contracts\Role;
use Tymon\JWTAuth\Exceptions\JWTException;
// use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{

    ##### Decode Cookies #####

        private function getLoginData(){

            $cookies = json_decode(request()->cookie('token'), true);
            $cookies = $cookies != '' ? $cookies:[];

            return $cookies;
        }

    ##### End of Decode Cookies #####

    public function login(Request $request){
        $logged_in = "true";
        $credentials = $request->only('username', 'password');
            $username = $credentials['username'];

        try{
            if (! $token = JWTAuth::attempt($credentials)){
                // dd($token);
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e){

            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // $role = Auth::user()->roles->pluck('name', 'id');

        $role = Auth::user()->role_names[0];
        // $role = Auth::user();
        // dd($role);


        ##### Cookies #####
        $cookies = [
        //     'logged_in' => $logged_in,
        //     'credentials' => $credentials,
            'token' => $token,
            // 'role' => $role
        ];
        $cookie = cookie('token', json_encode($cookies), 1440);
        // dd(Cookie::get());

        return response()->json(compact('logged_in', 'username', 'token', 'role'), 200)->cookie($cookie);
    }


    ##### List Data #####

        public function getToken(){
            $token = $this->getLoginData();
            $jwt = $token['token'];
            // dd($jwt);
            // dd($token[0]);

            return $jwt;
        }

    ##### End of List Data #####

    ##### Customer Area #####

    public function registerCustomer(Request $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
        'first_name' => 'required|string|max:30',
        'last_name' => 'required|string|max:30',
        'username' => 'required|string|max:20|unique:users',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $customer = User::create([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'nohape' => '(0262) 69691',
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $customer->assignRole('customer');

        return response()->json(compact('customer'), 201);
    }

##### End of Customer Area #####

##### All User can access the feature ######

// Get Profile

public function profileDetail($id){
    $user = User::find($id);
    $wkwk = PassbookCustomer::where("user_id", $id)->get();
    // dd($wkwk);

    $result = [];
    foreach ($wkwk as $wk){
        // dd($wkwk);
        // dd($wk);
        $result[] = [
            "Berat" => $wk["Berat"],
            "Saldo" => $wk["Saldo"]
        ];
    }

    $awikwo = $result[count($result)-1];

    $saldo = $awikwo["Saldo"];
    $total_setoran = $awikwo["Berat"];

    // dd($total_setoran);

    $token = $this->getToken();

    if ($user == ! $token) {
        # code...
        return response()->json([
            'status' => 'failed',
            'message' => 'Something went wrong',
            'data1' => $user,
            // 'data2' => $padd,
            // 'data3' => $pavt,
        ], Response::HTTP_OK);
    } else{
    return response()->json([
        'status' => 'success',
        'message' => 'Profile Detail',
        'data' => $user,
        'saldo' => $saldo,
        'berat.sampah.terkumpul' => $total_setoran,
        ], Response::HTTP_OK);
        }
        // $padd = Address::find($id, ['address', 'user_id']); //Not Used
        // $pavt = DB::table('avatars')->where('user_id', $id)->get(['avatar', 'user_id']);
    }


}

##### End of Feature #####
