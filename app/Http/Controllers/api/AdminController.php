<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\JenisSampah;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{

##### Admin Permission #####

    public function update(Request $request, $id){
        $this->validate($request, [
            'name' => 'required|string|max:50',
            'email' => 'nullable|email|max:50',
            'nohape' => 'required|string|max:15',
            'avatar' => 'nullable|image|mimes:png,jpg,jpeg',
            'location' => 'nullable|string',
        ]);

        $response = cloudinary()->upload($request->file('avatar')->getRealPath())->getSecurePath();
            // dd($response);

        $user = User::find($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'nohape' => $request->nohape,
            'avatar' => $response,
            'location' => $request->location
        ]);

        try {
            $user->save();
            return response()->json([
                'status'        => 'success',
                'message'       => 'User Updated Successfully',
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

##### Update profile by admin #####

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

##### End of Bendahara Area #####

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

public function logoutSession(Auth $id){

    // dd($id->id);
    // Auth::logout();
    $id->auth()->logout(true);

    // Pass true to force the token to be blacklisted "forever"
    // auth()->logout(true);

    return response()->json(['Sukses' => 'Anda berhasil logout'], 200);
}

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


##### Admin CRUD Jenis Sampah @KG #####

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




##### End of Admin Delete Feature #####

}
