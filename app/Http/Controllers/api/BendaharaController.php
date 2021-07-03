<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Passbook;
use App\PassbookBendahara;
use App\PassbookCustomer;
use Illuminate\Http\Request;

class BendaharaController extends Controller
{
    public function readAllSetoran(){
        #code..
        $setoran = Passbook::all();

        return response()->json(compact('setoran'), 200);
    }

    public function readAllSetoranCustomer($id){
        #code..
        $setoran_customer = Passbook::where("user_id", $id)->get();

        return response()->json(compact('setoran_customer'), 200);
    }

    public function readPassbookCustomers($id){
        #code..
        $passbook_customer = PassbookCustomer::where("user_id", $id)->get();

        return response()->json(compact('passbook_customer'), 200);
    }

    public function readAllSetoranPengepul($id){
        #code..
        $setoran_pengepul = Passbook::where("user_id", $id)->get();

        return response()->json(compact('setoran_pengepul'), 200);
    }

    public function readPassbookBendaharas($id){
        #code..
        $passbook_bendahara = PassbookBendahara::where("user_id", $id)->get();

        return response()->json(compact('passbook_bendahara'), 200);
    }
}
