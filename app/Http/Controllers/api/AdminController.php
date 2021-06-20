<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class AdminController extends Controller
{
    public function updateStaff(Request $request, $id){
        $this->validate($request, [
            'name' => 'required|string|max:50',
            'nohape' => 'required|string|max:15',
            'avatar' => 'nullable|image|mimes:png,jpg,jpeg',
            'location' => 'nullable|string',
        ]);

        $staff = User::find($id);
        $staff->update([
            'name' => $request->name,
            'nohape' => $request->nohape,
        ]);
    }

    ##### Bendahara Area #####

    public function registerBendahara(Request $request){
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

        $bendahara = User::create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $bendahara->assignRole('bendahara');

        return response()->json(compact('bendahara'), 201);
    }

##### End of Pengepul Area #####
}
