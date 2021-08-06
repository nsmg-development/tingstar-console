<?php

namespace App\Http\Controllers;

use App\Lib\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    protected $user;
    protected $response;

    public function __construct(User $user, Response $response)
    {
        $this->user = $user;
        $this->response = $response;
    }

    public function login(Request $request)
    {
        if ($request->input('error')) {
            header('Location: ' . env('APP_URL'));
            exit;
        }
        $credentials = $request->only('email', 'password');
        $user = $this->user->where('email', $request->email)->first();
        if (!$user) {
            return $this->response->set_response(404, null);
        }
        if (Auth::attempt($credentials)) {
            $user->update([
                'login_ip' => $request->getClientIp(),
                'login_at' => Carbon::now()->timezone('Asia/Seoul')->toDateTimeString(),
            ]);

            $data = $user->createToken($user->email)->accessToken;

            return response()->json([
                'data' => $data,
                'user_id' => $user->id,
                "message" => "Success"
            ]);

        } else if (!Hash::check($user->password, $request->password)) {
            return response()->json(['resultCode' => 400, 'message'=>'ID PW ERROR']);
        } else {
            return $this->response->set_response(401, null);
        }
    }

    public function logout()
    {
        Session::flush();
        Auth::logout();
        return $this->response->set_response(200, null);
    }
}
