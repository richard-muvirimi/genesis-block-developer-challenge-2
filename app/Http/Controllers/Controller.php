<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use ValidatesRequests;

    public function login(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            $permissions = $this->getPermissions($user);

            return response()->json(
                [
                    'status' => true,
                    "data" => $user->createToken("token", $permissions)->plainTextToken
                ],
                200
            );
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function getPermissions(User $user): array
    {
        $permissions = [
            "view:todo",
            "create:todo",
            "delete:todo",
            "update:todo",
            "view:account",
            "create:account",
            "delete:account",
            "update:account"
        ];

        if ($user->role === "administrator") {
            $permissions = array_merge($permissions, array_map(fn($perm) => str_replace(":", ":others:", $perm), $permissions));
        }

        return $permissions;
    }
}
