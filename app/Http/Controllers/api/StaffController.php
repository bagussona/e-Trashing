<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Passbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class StaffController extends Controller
{

    public function index(){
        //READ ALL
        $passbook = Passbook::all();

        return response()->json(compact('passbook'), 200);

    }

    public function detailSetoran($id){
        //READ ALL

    }

    public function timbanganSampah(Request $request){
        //CREATE

        $validator = Validator::make($request->all(), [
            'keterangan' => 'required|string',
            'jenis_sampah' => 'required|string',
            'berat_input' => 'required|numeric|between:0.00,99.99',
            '@KG' => 'required|integer'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        // $subtotal = "awkowakwoakd";

        $keterangan = $request->get('keterangan');
        $berat_input = $request->get('berat_input');
        $harga_tetap = $request->get('@KG');

        if ($keterangan == "dijemput" ) {

            $total_timbangan = ($berat_input * $harga_tetap);
            $pot_harga = ($total_timbangan * 20 / 100);
            $subtotal = $total_timbangan - $pot_harga;
            // dd($subtotal);
        } else{
            $subtotal = ($berat_input * $harga_tetap);
        }

        // dd($harga_tetap);

        $hasilJual = Passbook::create([
            'Tanggal' => date("d-m-Y"),
            'Keterangan' => $keterangan,
            'Jenis' => $request->get('jenis_sampah'),
            'Berat' => $berat_input,
            '@KG' => $harga_tetap,
            'Subtotal' => $subtotal,
            'user_id' => $request->id
        ]);

        return response()->json(compact('hasilJual'), 201);

    }

    public function updateTimbanganSampah(Request $request, $id){
        //UPDATE
        $this->validate($request, [
            'keterangan' => 'required|string',
            'jenis_sampah' => 'required|string',
            'berat_input' => 'required|numeric|between:0.00,99.99',
            '@KG' => 'required|integer'
        ]);

        $keterangan = $request->get('keterangan');
        $berat_input = $request->get('berat_input');
        $harga_tetap = $request->get('@KG');

        if ($keterangan == "dijemput" ) {

            $total_timbangan = ($berat_input * $harga_tetap);
            $pot_harga = ($total_timbangan * 20 / 100);
            $subtotal = $total_timbangan - $pot_harga;
            // dd($subtotal);
        } else{
            $subtotal = ($berat_input * $harga_tetap);
        }

        $passbook = Passbook::find($id);
        $passbook->update([
            'Keterangan' => $keterangan,
            'Jenis' => $request->get('jenis_sampah'),
            'Berat' => $berat_input,
            '@KG' => $harga_tetap,
            'Subtotal' => $subtotal,
        ]);
        try {
            $passbook->save();
            return response()->json([
                'status'        => 'success',
                'message'       => 'User Updated Successfully',
                'data'          => $passbook
                ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'status'        => 'failed',
                'message'       => 'Something went wrong',
                'data'          => $th
                ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy($id){
        //DELETE
    }
}
