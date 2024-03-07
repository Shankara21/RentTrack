<?php

namespace App\Helpers;

trait ApiResponse
{
    public function successResponse($data = null, $message, $code = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message
        ], $code);
    }

    public function errorResponse($message, $code)
    {
        return response()->json([
            'message' => $message,
        ], $code);
    }
}
