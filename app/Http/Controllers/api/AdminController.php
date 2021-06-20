<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

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
}
