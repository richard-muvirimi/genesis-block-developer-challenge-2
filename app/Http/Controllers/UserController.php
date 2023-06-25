<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  /**
     * Create the controller instance.
     */
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            "status" => true,
            "data" => User::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => $request->password,
                "role" => "user",
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'data' => $user->createToken(config('app.key'))->plainTextToken
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {

        $user->todo = Todo::whereBelongsTo($user)->get();

        return response()->json([
            "status" => true,
            "data" => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                "role" => ""
            ]);

            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);

            if ($request->user()->tokenCan("update:others:account")) {
                $user->role = $request->role;
            }

            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'User Updated Successfully',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User Deleted Successfully',
        ], 200);
    }
}
