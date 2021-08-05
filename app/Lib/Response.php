<?php


namespace App\Lib;


class Response
{
    public function set_response($err_code, $param)
    {
        $err_data[200] = "Success";
        $err_data[400] = "Bad Request";
        $err_data[401] = "Unauthorized";
        $err_data[404] = "NOT FOUND";
        $err_data[500] = "SERVER ERROR";

        if ($err_code == 200 && $param != null) {
            $result['data'] = $param;
        }

        $result['resultCode'] = [
            "code" => $err_code,
            "message" => $err_data[$err_code],
        ];
        return $result;
    }
}
