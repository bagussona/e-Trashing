<?php

namespace App\Http\Controllers\api;

use App\FormRequest;
use App\FormRequestTarikan;
use App\Http\Controllers\Controller;
use App\Passbook;
use App\PassbookCustomer;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    public function index($id){
        // $setoranKu = FormRequest::all();
        $id = Auth::user()->id;
        // dd($id);
        $setoranKu = FormRequest::where('user_id', $id)->get();
        // dd($setoranKu);

        return response()->json(compact('setoranKu'), 200);
    }

    public function formSetorDijemput(Request $request){
        $usid = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'tanggal' => 'required|string',
            'nohape' => 'required|string',
            'jam' => 'required|string',
            'address' => 'required|string',
            'geolocation' => 'required|string',
            'keterangan' => 'required|string'
        ]);

        // dd($usid);

        if ($validator->fails()) {
            # code...
            return response()->json($validator->errors()->toJson(), 400);
        }

        $setorJemput = FormRequest::create([
            'user_id' => $usid,
            'kode_book' => 'BTS-ID' . '/Pickedup/' . date('Y-m-d') . '/' . Str::random(6),
            'tanggal' => $request->get('tanggal'),
            'name' => $request->get('name'),
            'nohape' => $request->get('nohape'),
            'jam' => $request->get('jam'),
            'address' => $request->get('address'),
            'geolocation' => $request->get('geolocation'),
            // 'keterangan' => $request->get('keterangan'),
            'status' => 'Proses'
        ]);

        return response()->json([
            // "status" => "success",
            "msg" => "Terima kasih! Permintaan anda segera diproses.",
            "data" => $setorJemput
        ], 201);
    }

    public function formSetorDiantar(Request $request){
        $usid = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'tanggal' => 'required|string',
            'nohape' => 'required|string',
            'name' => 'required|string',
            'jam' => 'required|string'
        ]);

        if ($validator->fails()) {
            # code...
            return response()->json($validator->errors()->toJson(), 400);
        }

        $setorDiantar = FormRequest::create([
            'user_id' => $usid,
            'kode_book' => 'BTS-ID' . '/Delivered/' . date('Y-m-d') . '/' . Str::random(6),
            'tanggal' => $request->get('tanggal'),
            'name' => $request->get('name'),
            'nohape' => $request->get('nohape'),
            'jam' => $request->get('jam'),
            'keterangan' => $request->get('keterangan'),
            'status' => 'Proses'
        ]);

        return response()->json([
            // "status" => "success",
            "msg" => "Terima kasih! Jadwal anda berhasil dibuat",
            "data" => $setorDiantar
        ], 201);
    }

    public function batalSetor(Request $request){
        $this->validate($request, [
            'kode_book' => 'required|string'
        ]);


        $kode_book = $request->get('kode_book');
        $setorDibatalkan = FormRequest::where("kode_book", $kode_book)->get();
        // dd()
        $setorDibatalkan->update([
            'status' => "Batal"
        ]);

        return response()->json([
            "msg" => "Terima kasih! Request anda sudah dibatalkan",
        ], 200);
    }


    public function formRequestTarikan(Request $request){
        $usid = Auth::user()->id;
        $name = Auth::user()->first_name;
        // dd($name);
        $validator = Validator::make($request->all(), [
            // 'tanggal' => 'required|string',
            'jumlah' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $tarikDana = FormRequestTarikan::create([
            'user_id' => $usid,
            'tanggal' => date('Y-m-d'),
            'name' => $name,
            'jumlah' => $request->get('jumlah'),
            'status' => 'Proses',
            'kode_pembayaran' => 'BTS-ID' . '/Payment/' . date('Y-m-d') . '/' . Str::random(6),
        ]);

        return response()->json([
            "msg" => "Terima kasih! Pengajuan anda sedang kami proses.",
            "data" => $tarikDana
        ], 201);
    }

    public function tarikanKu(){
        $usid = Auth::user()->id;

        $tarikanKu = FormRequestTarikan::where('user_id', $usid)->get();

        return response()->json(compact('tarikanKu'), 200);
    }

    public function historyOrders(){
        $usid = Auth::user()->id;

        // $historyOrders = FormRequest::where('user_id', $usid)->get();
        $historyOrders = DB::table('form_requests')->select('*')->where('user_id','=',$usid)->orderBy('created_at')->limit(10)->get();

        return response()->json(compact('historyOrders'), 200);
    }

    public function historyTransactions(){
        $usid = Auth::user()->id;

        // $historyTransactions = FormRequestTarikan::where('user_id', $usid)->get();
        $historyTransactions = DB::table('form_request_tarikans')->select('*')->where('user_id','=',$usid)->orderBy('created_at')->limit(10)->get();

        return response()->json(compact('historyTransactions'), 200);
    }

    public function leaderboards(){
        $leaderboards = User::orderBy('sampah_terkumpul', 'desc')->get();

        // dd($leaderboards);
        return response()->json(compact('leaderboards'), 200);
    }
}
