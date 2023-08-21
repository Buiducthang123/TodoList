<?php

namespace App\Http\Controllers;

use App\Models\todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $todos = todo::latest()->get();
        return response()->json([
            'todos' => $todos
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $todo = new todo;
        $todo->fill($request->all());
        $todo->save();
        return response()->json(["message" => 'thêm thành công'], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, todo $todo)
    {
        //
        
        if ($todo) {
            $todo->update($request->all());
            return response()->json(["message"=>"Update thành công"], 200);
        }
        return response()->json(["message"=>"Update không thành công"], 404);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(todo $todo)
    {
        //
        if ($todo) {
            $todo->delete();
            return response()->json(["message" => 'xóa thành công'], 200);
        }
        return response()->json(["message" => 'xóa không thành công'], 404);
    }
}