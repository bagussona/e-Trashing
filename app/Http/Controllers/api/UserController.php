<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Spatie\Permission\Contracts\Role;
use Tymon\JWTAuth\Exceptions\JWTException;
// use Symfony\Component\HttpFoundation\Cookie;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{

    ##### Decode Cookies #####

        // private function getLoginData(){
        //     // $credentials = $request->only('username', 'password');
        //     // // $token = auth()->attempt($credentials);
        //     // $token = JWTAuth::attempt($credentials);

        //     // return response()->json(compact('token'));

        //     $login_data = json_decode(request()->cookie('form_login'), false);
        //     $login_data = $login_data != '' ? $login_data:[];

        //     return $login_data;
        // }

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
        // $login_data = [
        //     'logged_in' => $logged_in,
        //     'credentials' => $credentials,
        //     'token' => $token,
        //     'role' => $role
        // ];
        // $cookie = cookie('form_login', json_encode($login_data), 1440);
        // dd(Cookie::get());

        ##### end of Cookies #####
        return response()->json(compact('logged_in', 'username', 'token', 'role'), 200);
    }


    ##### List Data #####

        // public function listData(){
        //     $list_data = $this->getLoginData();
        //     // dd($list_data);

        //     return response()->json(compact('list_data'));
        // }

    ##### End of List Data #####

    ##### Customer Area #####

    public function registerCustomer(Request $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'username' => 'required|string|max:20|unique:users',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $customer = User::create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $customer->assignRole('customer');

        return response()->json(compact('customer'), 201);
    }

##### End of Customer Area #####

##### Staff Area #####

    public function registerStaff(Request $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:100',
        'username' => 'required|string|max:20|unique:users',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $staff = User::create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $staff->assignRole('staff');

        return response()->json(compact('staff'), 201);
    }

##### End of Staff Area #####


##### Pengepul Area #####

    public function registerPengepul(Request $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:100',
        'username' => 'required|string|max:20|unique:users',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $pengepul = User::create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $pengepul->assignRole('pengepul');

        return response()->json(compact('pengepul'), 201);
    }

##### End of Pengepul Area #####


##### All User can access the feature ######

    public function userProfile()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json(compact('user'));
    }
}

##### End of Feature #####
