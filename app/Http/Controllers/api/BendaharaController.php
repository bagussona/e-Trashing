<?php

namespace App\Http\Controllers\api;

use App\FormRequestTarikan;
use App\Http\Controllers\Controller;
use App\Passbook;
use App\User;
use App\PassbookBendahara;
use App\PassbookCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BendaharaController extends Controller
{
    public function readAllSetoran(){
        #code..
        $setoran = Passbook::all();

        return response()->json(compact('setoran'), 200);
    }

    public function readAllSetoranCustomer(){
        #code..
        $id = Auth::user()->id;
        $setoran_customer = Passbook::where("user_id", $id)->get();

        return response()->json(compact('setoran_customer'), 200);
    }

    public function readPassbookCustomers(){
        #code..
        $id = Auth::user()->id;
        $passbook_customer = PassbookCustomer::where("user_id", $id)->get();

        return response()->json(compact('passbook_customer'), 200);
    }

    public function readAllSetoranPengepul(){
        #code..
        $id = Auth::user()->id;
        $setoran_pengepul = Passbook::where("user_id", $id)->get();

        return response()->json(compact('setoran_pengepul'), 200);
    }

    public function readPassbookBendaharas(){
        #code..
        $id = Auth::user()->id;
        $passbook_bendahara = PassbookBendahara::where("user_id", $id)->get();

        return response()->json(compact('passbook_bendahara'), 200);
    }


//// akwokwo nyoba

    public function listsRequestTarikan(){
        $reqTarikan = FormRequestTarikan::all();

        return response()->json(compact('reqTarikan'), 200);
    }


    public function listTarikan($id){

        $listsTarikan = FormRequestTarikan::where("user_id", $id)->get();
        return $listsTarikan;

    }

    public function checkout($id){
    $listsTarikan = $this->listTarikan($id);

        $credit = $listsTarikan[0]['jumlah'];
        $payment_code = $listsTarikan[0]['kode_pembayaran'];

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

    $saldo = $awikwo["Saldo"] -= $credit;
    $berat = $awikwo["Berat"];
    // dd($awikwo["Saldo"]);
    // dd($jee);

        ##Proses pembuatan history transaction di buku tabungan customer, disini yang diisi credit. karena melakukan penarikan dana.

        $wkwk = PassbookCustomer::create([
        "user_id" => $listsTarikan[0]["user_id"],
        "Tanggal" => $listsTarikan[0]["tanggal"],
        "Keterangan" => $payment_code,
        "Berat" => $berat,
        "Credit" => $credit,
        "Saldo" => $saldo
        ]);

        ##end pembuatan history transaction

        ##Update status request menjadi di terima & penguran saldo di profile user nya!

        $passbook = User::find($id);
        // dd($passbook);
        $passbook->update([
            "sampah_terkumpul" => $berat,
            "saldo" => $saldo
        ]);

        $request_success = FormRequestTarikan::where('kode_pembayaran', $payment_code)->get();
        $request_success->update([
            "status" => "Accepted"
        ]);

        ##end update status


        $duits = PassbookBendahara::where("user_id", $id)->get();


        $hasil = [];
        foreach ($duits as $duit){
            // dd($wkwk);
            // dd($wk);
            $hasil[] = [
                "Saldo" => $duit["Saldo"]
            ];
        }

        $counting = $hasil[count($hasil)-1];

        $keuangan_sekarang = $counting["Saldo"] -= $credit;

        ##Proses pembuatan History Transaction di buku tabungan bendahara, disini yang diisi credit, karena melakukan pemberian dana ke customer

        $duit_bendahara = PassbookBendahara::create([
            "user_id" => $listsTarikan[0]["user_id"],
            "Keterangan" => $payment_code,
            "Tanggal" => $listsTarikan[0]["tanggal"],
            "Berat" => $berat,
            "Credit" => $credit,
            "Saldo" => $saldo
            ]);

        ##end pembuatan history transaction


        ##update saldo untuk dikurangi di akun bendahara
        $bendahara = "Bendahara";

        $keuangan_bendahara_diupdate = User::where('last_name', $bendahara)->get();
        // dd($passbook);
        $keuangan_bendahara_diupdate->update([
            // "sampah_terkumpul" => $berat,
            "saldo" => $keuangan_sekarang
        ]);

        ##end pengurangan saldo
        // dd($passbook);
    return response()->json([
        "msg" => "Permintaan anda berhasil diproses.",
        "data" => $wkwk
        ], 200);
    }

    public function checkoutReject($id){
        $listsTarikan = $this->listTarikan($id);

        $payment_code = $listsTarikan[0]['kode_pembayaran'];

        $request_success = FormRequestTarikan::where('kode_pembayaran', $payment_code)->get();
        $request_success->update([
            "status" => "Rejected"
        ]);

        return response()->json(["msg" => "Maaf! Permintaan anda tidak dapat di proses."], 202);
    }

}
