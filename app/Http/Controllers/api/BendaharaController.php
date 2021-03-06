<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\User;
use App\PassbookUsers;
use App\PassbookBendahara;
use App\PassbookCustomer;
use App\PassbookHistory;
use App\FormRequestTarikan;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Passbook;
use Illuminate\Http\Request;

class BendaharaController extends Controller
{
    public function readAllSetoran(){
        $setoran = PassbookHistory::all();

        return response()->json(compact('setoran'), 200);
    }

    public function readAllPassbooks(){
        $passbooks = PassbookUsers::all();

        return response()->json(compact('passbooks'), 200);
    }

    public function detailPassbooks($id){
        $passbook_details = PassbookUsers::where('id', $id)->get();

        return response()->json(compact('passbook_details'), 200);
    }

    public function deletePassbooks(PassbookUsers $id){
        // dd($id->id);
        PassbookCustomer::where('user_id', $id->id)->delete();
        $id->delete();

        return response()->json(["msg" => "Passbook berhasil dihapus"], 200);
    }

    public function readAllSetoranCustomer($id){
        $setoran_customer = PassbookHistory::where("user_id", $id)->get();

        return response()->json(compact('setoran_customer'), 200);
    }

    public function readPassbookCustomers($id){
        $passbook_customer = PassbookCustomer::where("user_id", $id)->get();

        return response()->json(compact('passbook_customer'), 200);
    }

    public function readAllSetoranPengepul(){
        $id = Auth::user()->id;
        $setoran_pengepul = PassbookHistory::where("user_id", $id)->get();

        return response()->json(compact('setoran_pengepul'), 200);
    }

    public function readPassbookBendaharas(){
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

        // dd($id);
        $listsTarikans = [];
        $listsTarikan = FormRequestTarikan::where("user_id", $id)->get();
        foreach ($listsTarikan as $listTarikan) {
            $listsTarikans[] = [
                "user_id" => $listTarikan["user_id"],
                "jumlah" => $listTarikan["jumlah"],
                "kode_pembayaran" => $listTarikan["kode_pembayaran"]
            ];
        }

        $latest = $listsTarikans[count($listsTarikans)-1];
        // dd($latest);

        return $latest;
    }

    public function checkout($id){
    $listsTarikan = $this->listTarikan($id);

    // dd($listsTarikan);
        $credit = $listsTarikan['jumlah'];
        // dd($credit);
        $payment_code = $listsTarikan['kode_pembayaran'];
        $usid = $listsTarikan['user_id'];
        // dd($usid);
        // $date = $listsTarikan['tanggal'];

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
        // "user_id" => $listsTarikan[0]["user_id"],
        "user_id" => $usid,
        "Tanggal" => date('Y-m-d'),
        "Keterangan" => $payment_code,
        "Berat" => $berat,
        "Credit" => $credit,
        "Saldo" => $saldo
        ]);


        ##Update status request menjadi di terima & penguran saldo di profile user nya!

        $passbook = User::find($id);
        // dd($passbook);
        $passbook->update([
            "sampah_terkumpul" => $berat,
            "saldo" => $saldo
            ]);

            FormRequestTarikan::where('kode_pembayaran', $payment_code)->update(["status" => "Accepted"]);

            ##end update status


            $duits = PassbookBendahara::where("user_id", 4)->get();

            $hasil = [];
            foreach ($duits as $duit){
                // dd($wkwk);
                // dd($wk);
                $hasil[] = [
                    "Saldo" => $duit["Saldo"]
                ];
            }

            // dd($hasil);
            $counting = $hasil[count($hasil)-1];

            // dd($counting);
            $keuangan_sekarang = $counting["Saldo"] -= $credit;

            // dd($keuangan_sekarang);
            ##Proses pembuatan History Transaction di buku tabungan bendahara, disini yang diisi credit, karena melakukan pemberian dana ke customer

            PassbookBendahara::create([
                "user_id" => $listsTarikan["user_id"],
                "Keterangan" => $payment_code,
                "Tanggal" => date('Y-m-d'),
                "Berat" => $berat,
                "Credit" => $credit,
                "Saldo" => $keuangan_sekarang
                ]);



                ##update saldo untuk dikurangi di akun bendahara
                $bendahara = "Bendahara";

                User::where('last_name', $bendahara)->update(["saldo" => $keuangan_sekarang ]);

                $bendahara_id = 4;
                PassbookUsers::where('user_id', $bendahara_id)->update([
                    "Tanggal" => date("Y-m-d"),
                    "Keterangan" => "BTS-ID/PassbookUsers/" . date('Y-m-d') . "/" . Str::random(6),
                    // "Berat" => $jee2,
                    "Saldo" => $keuangan_sekarang
                    ]);

                    PassbookUsers::where('user_id', $id)->update([
                        "Tanggal" => date("Y-m-d"),
                        "Keterangan" => "BTS-ID/PassbookUsers/" . date('Y-m-d') . "/" . Str::random(6),
                        // "Berat" => $jee2,
                        "Saldo" => $saldo
                        ]);

                        ##end pengurangan saldo

            ##end pembuatan history transaction
        // dd($passbook);
        return response()->json(["msg" => "Permintaan anda berhasil diproses.", "data" => $wkwk], 200);
    }

    public function checkoutReject($id){
        $listsTarikan = $this->listTarikan($id);

        // dd($listsTarikan);
        $payment_code = $listsTarikan['kode_pembayaran'];
        // dd($payment_code);

        FormRequestTarikan::where('kode_pembayaran', $payment_code)->update(["status" => "Rejected"]);

        return response()->json(["msg" => "Maaf! Permintaan anda kami reject dan tidak dapat di proses."], 202);
    }

    public function detailTarikan($id){
        $tarikanKu = FormRequestTarikan::where('id', $id)->get();
        // dd($tarikanKu);

        return response()->json(compact('tarikanKu'), 200);
    }

}
