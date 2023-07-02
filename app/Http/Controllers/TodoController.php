<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Create the controller instance.
     */
    public function __construct()
    {
        $this->authorizeResource(Todo::class, 'todo');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {

        return response()->json([
            "status" => true,
            "data" => Todo::whereBelongsTo($request->user())->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'title' => 'required',
                'memo' => '',
                "remind_at" => "datetime"
            ]);

            Todo::create([
                "title" => $request->title,
                "memo" => $request->memo,
                "remind_at" => $request->remind_at
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Todo Created Successfully',
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
    public function show(Todo $todo): JsonResponse
    {

        return response()->json([
            "status" => true,
            "data" => $todo
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        try {
            $request->validate([
                'title' => 'required',
                'memo' => '',
                "remind_at" => "datetime",
                "completed_at" => "datetime",
            ]);

            $todo->title = $request->title;
            $todo->memo = $request->memo;
            $todo->remind_at = $request->remind_at;
            $todo->completed_at = $request->completed_at;

            $todo->save();

            return response()->json([
                'status' => true,
                'message' => 'Todo Updated Successfully',
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
    public function destroy(Todo $todo): JsonResponse
    {

        $todo->delete();

        return response()->json([
            'status' => true,
            'message' => 'User Deleted Successfully',
        ], 200);
    }
}
