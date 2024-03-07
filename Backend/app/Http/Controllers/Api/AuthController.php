<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email', $validated['email'])->first();
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return $this->errorResponse('Invalid credentials', 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return $this->successResponse(['token' => $token], 'User logged in successfully');
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $user->role;
        return $this->successResponse($user, 'User retrieved successfully');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->successResponse(null, 'User logged out successfully');
    }
}
