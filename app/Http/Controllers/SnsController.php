<?php

namespace App\Http\Controllers;

use App\Lib\Response;
use App\Models\Article;
use Illuminate\Http\Request;

class SnsController extends Controller
{
    protected $wifi;
    protected $response;
    protected $place;

    public function __construct(Article $article, Response $response)
    {
        $this->article = $article;
        $this->response = $response;
    }

    public function instagramList(Request $request)
    {
        if (!$request->header('Authorization')) {
            return $this->response->set_response(401, null);
        }
        $data = $this->article->where('platform', 'instagram')->orderByDesc('created_at')->paginate(20);
        if (count($data) === 0) {
            return $this->response->set_response(404, null);
        }
        return $this->response->set_response(200, $data);
    }

    public function youtubeList(Request $request)
    {
        if (!$request->header('Authorization')) {
            return $this->response->set_response(401, null);
        }
        $data = $this->article->where('platform', 'youtube')->orderByDesc('created_at')->paginate(20);
        if (count($data) === 0) {
            return $this->response->set_response(404, null);
        }
        return $this->response->set_response(200, $data);
    }

    public function stateUpdate(Request $request, $id)
    {
        $request->validate([
            'state' => 'required'
        ]);

        $this->article::where('id', $id)
            ->update([
                'state' => $request->state
            ]);

        return $this->response->set_response(200, null);
    }
}
