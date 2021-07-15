<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Passbook;
use App\PassbookCustomer;
use App\User;
use App\FormRequest;
use App\PassbookHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\VarDumper\Cloner\Data;

class StaffController extends Controller
{

    public function index(){
        //READ ALL
        $passbooks = PassbookHistory::all();

        return response()->json(compact('passbooks'), 200);

    }

    public function listTimbangan($id){

        $listsTimbangan = Passbook::where("user_id", $id)->get();
        return $listsTimbangan;

    }

    public function checkout($id){
        $listsTimbangan = $this->listTimbangan($id);

        // dd($id);
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

            $passbookCustomer = PassbookCustomer::create([
                "user_id" => $listsTimbangan[0]["user_id"],
                "Tanggal" => date("Y-m-d"),
                "Keterangan" => "Deposit",
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

            Passbook::where('user_id', $id)->delete();

            // dd($passbook);
        return response()->json(compact('passbookCustomer'), 200);
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
        $id->delete();
        return response()->json(["success" => "deleted successfully"], 204);
    }

    public function orderanKu(){
        $orderanKu = FormRequest::all();

        return response()->json(compact('orderanKu'), 200);
    }

    public function detailOrderanKu($id){

        // dd($kode_book);
        $details = FormRequest::where("id", $id)->get();

        return response()->json(compact('details'), 200);
    }

    public function orderanSelesai($id){

        FormRequest::where("id", $id)->update(["status" => "Selesai"]);

        return response()->json(["msg" => "Terima kasih! Request anda sudah diselesaikan"], 200);
    }

    public function search(Request $request){
        // dd($request);
        $keyword = $request->kode_book;
        // dd($keyword);

        $search = FormRequest::where('kode_book', 'like', "%" . $keyword . "%")->get();

        return response()->json(compact('search'), 200);

        // return $search;
    }

}
