<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Passbook;
use App\PassbookCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\VarDumper\Cloner\Data;

class StaffController extends Controller
{

    public function index(){
        //READ ALL
        $passbooks = Passbook::all();

        return response()->json(compact('passbooks'), 200);

    }

    public function listTimbangan($id){

        $listsTimbangan = Passbook::where("user_id", $id)->get();
        return $listsTimbangan;
        // dd($listsTimbangan);

        // $value = [];
        // foreach ($listsTimbangan as $listTimbangan) {
        //     # code...
        //     // dd($listTimbangan);
        //     $value[] = [
        //         "Tanggal" => $listTimbangan["Tanggal"],
        //         "Keterangan" => $listTimbangan["Keterangan"],
        //         "Berat" => $listTimbangan["Berat"],
        //         "Saldo" => $listTimbangan["Subtotal"],
        //         "user_id" => $listTimbangan["user_id"]
        //     ];
        // }
        // $ak = json_decode($listsTimbangan, true);

        // return response()->json(compact('listsTimbangan'), 200);
    }

    // public function detailSetoran(){

    //     $listsTimbangan = Passbook::all();
    //     // dd($listsTimbangan);
    //     $value = [];
    //     foreach ($listsTimbangan as $listTimbangan) {
    //         # code...
    //         // dd($listTimbangan);
    //         $value[] = [
    //             "Tanggal" => $listTimbangan["Tanggal"],
    //             "Jenis Sampah" => $listTimbangan["Jenis"],
    //             "Keterangan" => $listTimbangan["Keterangan"],
    //             "Berat" => $listTimbangan["Berat"],
    //             "@KG" => $listTimbangan["@KG"],
    //             "Subtotal" => $listTimbangan["Subtotal"],
    //             "user_id" => $listTimbangan["user_id"]
    //         ];
    //     }

    //     return response()->json(compact('value'), 200);
    // }

    public function checkout($id){
        $listsTimbangan = $this->listTimbangan($id);

        $berat = collect($listsTimbangan)->sum(function($q) {
            return $q["Berat"];
        });

        // dd($berat);
        $debit = collect($listsTimbangan)->sum(function($q) {
            return $q['Subtotal'];
        });

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

        $saldo = $awikwo["Saldo"] += $debit;
        $jee2 = $awikwo["Berat"] += $berat;
        // dd($awikwo["Saldo"]);
        // dd($jee);

            $wkwk = PassbookCustomer::create([
                "user_id" => $listsTimbangan[0]["user_id"],
                "Tanggal" => $listsTimbangan[0]["Tanggal"],
                "Keterangan" => $listsTimbangan[0]["Keterangan"],
                "Berat" => $jee2,
                "Debit" => $debit,
                "Saldo" => $saldo
            ]);

        return response()->json(compact('wkwk'), 200);
    }

    public function addToTimbangan(Request $request, $id){
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
            'user_id' => $id
        ]);

        // $this->passbookCustomer($hasilJual);

        return response()->json(["success" => "Product ditambahkan ke timbangan"], 201);

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

    public function destroy(Passbook $id){
        //DELETE
        $id->delete();
        return response()->json(["success" => "deleted successfully"], 204);
    }


//Catatan
// public function passbookCustomer($hasilJual){

    // $cs_passbooks = [];
    // foreach ($passbooks as $passbook) {
    //     # code...
    //     dd($passbook);
    //     $cs_passbooks[] = [
    //         "Tanggal" => $passbook["Tanggal"],
    //         "Keterangan" => $passbook["Keterangan"],
    //         "Berat" => $passbook["Berat"],
    //         "@KG" => $passbook["@KG"],
    //         "Saldo" => $passbook["Subtotal"],
    //         "user_id" => $passbook["user_id"]
    //     ];
    // }

    // dd($cs_passbooks);
// }

    // public function passbookCustomer($hasilJual){

    //     // dd($hasilJual['user_id']);

    //     $passbooks = PassbookCustomer::all();
    //     // $passbooks = DB::table('passbooks')->where('user_id', $hasilJual['id'])->get(['Tanggal', 'Keterangan', 'Berat', 'Subtotal', 'user_id']);

    //     // dd($passbooks);
    //     $user_id = $hasilJual['user_id'];
    //     $keterangan = "";
    //     $debit = 0;
    //     $berat = 0;
    //     $kredit = 0;

    //     $saldo = 0;
    //     foreach ($passbooks as $cs_passbook){
    //         // dd($cs_passbook);
    //         $user_id = $passbooks["user_id"];
    //         $keterangan = $passbooks["Keterangan"];
    //         $berat = $berat + $passbooks["Berat"];
    //         $debit = $debit + $passbooks["Subtotal"];
    //         $passbookCustomer = PassbookCustomer::create([
    //             "user_id" => $user_id,
    //             "Tanggal" => date("d-m-Y"),
    //             "Keterangan" => $keterangan,
    //             "Berat" => $berat,
    //             "Debit" => $debit,
    //             "Kredit" => $kredit,
    //             "Saldo" => $saldo += $debit
    //         ]);
        // }



        // dd($passbookCustomer);

    // }

}
