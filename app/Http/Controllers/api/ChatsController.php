<?php

namespace App\Http\Controllers\api;

use App\Events\MessageSent;
use App\Message;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Pusher\Pusher;

class ChatsController extends Controller
{
    //READ Contacts
    public function index(){
        // $chats = Message::all();
        $users = DB::select("select users.id, users.username, users.avatar, users.email, count(is_read) as unread from users LEFT JOIN messages ON users.id = messages.from and is_read = 0 and messages.to = " . Auth::id() . "
        where users.id != " . Auth::id() . "
        group by users.id, users.username, users.avatar, users.email");

        return response()->json(compact('users'), 200);
    }

    public function getMessage($user_id){
        // return $user_id;
        $my_id = Auth::id();
        // dd($my_id);
        // dd($user_id);

        Message::where(['from' => $user_id, 'to' => $my_id])->update(['is_read' => 1]);

        //getting all message for selected user
        //getting those message which is from = Auth::id() and to = user_id and to = Auth::id();
        $messages = Message::where(function ($query) use ($user_id, $my_id) {
            $query->where('from', $my_id)->where('to', $user_id);
        })->orWhere(function ($query) use ($user_id, $my_id){
            $query->where('from', $user_id)->where('to', $my_id);
            // dd($query);
        })->get();
        // dd($messages);

        return response()->json(compact('messages'), 200);
    }

    public function fetchMessage(){
        $message = Message::with('user')->get();

        return response()->json(compact('message'), 200);
    }

    //CREATE
    public function sendMessage(Request $request){
        $from = Auth::id();
        // dd($request);
        $to = $request->receiver_id;
        $message = $request->message;

        $data = Message::create([
            'from' => $from,
            'to' => $to,
            'message' => $message,
            'is_read' => 0
        ]);

        // dd($data);

        $options = array(
            'cluster' => 'ap1',
            'useTLS' => true
          );
          $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            $options
          );

        //   $data = ['from' => $from, 'to' => $to];
          $pusher->trigger('my-channel', 'my-event', $data);

          return response()->json(['status' => 'Pesan Terkirim!'], 201);
    }
}
