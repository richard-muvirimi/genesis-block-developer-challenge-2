<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/account', function (Request $request) {
    return response()->json([
        "status" => true,
        "data" => $request->user()
    ]);
});

Route::middleware('auth:sanctum')->get('/revoke/tokens', function (Request $request) {

    $user = $request->user();
    $user->tokens()->delete();

    return response()->json([
        "status" => true,
    ]);
});

Route::post('/login', [Controller::class, "login"]);
Route::post('/register', [UserController::class, "store"]);

Route::middleware('auth:sanctum')->resource('user', UserController::class);
Route::middleware('auth:sanctum')->resource('todo', TodoController::class);
