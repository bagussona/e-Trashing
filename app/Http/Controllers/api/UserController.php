<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('username', 'password');

        try{
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
                }
            } catch (JWTException $e){

            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('credentials', 'token'));
    }


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
