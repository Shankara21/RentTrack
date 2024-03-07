<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        try {
            $users = User::with('role')->get();
            return $this->successResponse($users, 'Users retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving users', 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'email' => 'required|unique:users,email',
                'password' => 'required|string',
                'password_confirmation' => 'required',
                'role_id' => 'required|exists:roles,id'
            ]);
            if ($validated['password'] !== $validated['password_confirmation']) {
                return $this->errorResponse('Password and password confirmation do not match', 400);
            }
            unset($validated['password_confirmation']);
            $validated['password'] = Hash::make($validated['password']);
            $user = User::create($validated);
            return $this->successResponse($user, 'User created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while creating user', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        try {
            $user->load('role');
            return $this->successResponse($user, 'User retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving user', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'name' => 'string',
                'email' => 'email|unique:users,email,' . $user->id,
                'role_id' => 'exists:roles,id',
                'password' => 'string',
                'old_password' => 'string',
                'password_confirmation' => 'string',
            ]);
            if ($validated['password'] !== $validated['password_confirmation']) {
                return $this->errorResponse('Password and password confirmation do not match', 400);
            }
            if (auth()->user()->id !== $user->id) {
                return $this->errorResponse('You can only update your profile', 403);
            }
            if (isset($validated['password'])) {
                if (!Hash::check($validated['old_password'], $user->password)) {
                    return $this->errorResponse('Invalid old password', 400);
                }
                $validated['password'] = Hash::make($validated['password']);
            }
            unset($validated['old_password'], $validated['password_confirmation']);
            $user->update($validated);
            return $this->successResponse($user, 'User updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while updating user', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return $this->successResponse(null, 'User deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while deleting user', 500);
        }
    }
}
