<?php

namespace App\Http\Controllers\api;

use App\Events\MessageSent;
use App\Message;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
    //READ
    public function index(){
        $chats = Message::all();
        return response()->json(compact('chats'), 200);
    }

    public function fetchMessage(){
        $message = Message::with('user')->get();

        return response()->json(compact('message'), 200);
    }

    //CREATE
    public function sendMessage(Request $request){
        $user = Auth::user();

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        broadcast(new MessageSent($user, $message))->toOthers();

        return response()->json(['status' => 'Pesan Terkirim!'], 201);
    }
}
