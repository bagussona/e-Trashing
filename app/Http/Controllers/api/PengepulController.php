<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\User;
use App\Passbook;
use App\PassbookBendahara;
use App\PassbookHistory;
use App\PassbookUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;
use App\PassbookCustomer;
use Illuminate\Support\Facades\DB;
use Symfony\Component\VarDumper\Cloner\Data;

class PengepulController extends Controller
{
    public function index($id){
        //READ ALL
        // $passbooks = Passbook::find($id)->get();
        $passbooks = PassbookHistory::where("user_id", $id)->get();

        return response()->json(compact('passbooks'), 200);

    }

    public function listTimbanganBendahara($id){

        $listsTimbangan = Passbook::where("user_id", $id)->get();
        return $listsTimbangan;

    }


    public function checkoutBendahara($id){
        $listsTimbangan = $this->listTimbanganBendahara($id);

        // dd($id);
        $berat = collect($listsTimbangan)->sum(function($q) {
            return $q["Berat"];
        });

        // dd($berat);
        $debit = collect($listsTimbangan)->sum(function($q) {
            return $q['Subtotal'];
        });

        $wkwk = PassbookBendahara::where("user_id", $id)->get();
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

            $passbookBendahara = PassbookBendahara::create([
                "user_id" => $listsTimbangan[0]["user_id"],
                "Tanggal" => date("Y-m-d"),
                "Keterangan" => $listsTimbangan[0]["Keterangan"],
                "Berat" => $jee2,
                "Debit" => $debit,
                "Saldo" => $saldo
            ]);

            $passbook = User::find($id);
            // dd($passbook);
            $passbook->update([
                "sampah_terkumpul" => $jee2,
                "saldo" => $saldo
            ]);

            $passbook_users = PassbookUsers::where('user_id', $id)->update([
                "Tanggal" => date("Y-m-d"),
                "Keterangan" => "BTS-ID/PassbookUsers/" . date('Y-m-d') . "/" . Str::random(6),
                "Berat" => $jee2,
                "Saldo" => $saldo
            ]);

            Passbook::where('user_id', $id)->delete();

            // dd($passbook);
        return response()->json(compact('passbookBendahara'), 200);
    }

    public function addToTimbanganBendahara(Request $request, $id){
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

        if ($keterangan == "bts-id" ) {

            $total_timbangan = ($berat_input * $harga_tetap);
            $fee = ($total_timbangan * 20 / 100);
            $subtotal = $total_timbangan + $fee;

        } else{

            return response()->json(["msg" => "Maaf, kamu bukan bendahara bts-id"], 403);
        }

        Passbook::create([
            'Tanggal' => date("Y-m-d"),
            'Keterangan' => $keterangan,
            'Jenis' => $request->get('jenis_sampah'),
            'Berat' => $berat_input,
            '@KG' => $harga_tetap,
            'Subtotal' => $subtotal,
            'user_id' => $id
        ]);

        PassbookHistory::create([
            'Tanggal' => date("Y-m-d"),
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

    public function updateTimbanganSampahBendahara(Request $request, $id){
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

        if ($keterangan == "bts-id" ) {

            $total_timbangan = ($berat_input * $harga_tetap);
            $fee = ($total_timbangan * 20 / 100);
            $subtotal = $total_timbangan + $fee;

        } else{
            return response()->json(["Maaf, kamu bukan staff bts-id"]);
        }

        $passbook = Passbook::find($id);
        $passbook->update([
            'Keterangan' => $keterangan,
            'Jenis' => $request->get('jenis_sampah'),
            'Berat' => $berat_input,
            '@KG' => $harga_tetap,
            'Subtotal' => $subtotal
        ]);

        $passbook_history = PassbookHistory::where('created_at', $passbook->created_at);
        // dd($passbook_history);
        $passbook_history->update([
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
                'message'       => 'Passbook Updated Successfully',
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
        $created_at = $id->created_at;
        $id->delete();
        PassbookHistory::where('created_at', $created_at)->delete();

        return response()->json(["success" => "deleted successfully"], 204);
    }

}
