<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Models\Driver;

class DriverController extends Controller
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
            $drivers = Driver::select('id', 'name')->get();
            return $this->successResponse($drivers, 'Drivers retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving drivers', 500);
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
     * @param  \App\Http\Requests\StoreDriverRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDriverRequest $request)
    {
        try {
            $validatedData = $request->validate(
                [
                    'name' => 'required|string|max:255',
                ]
            );
            Driver::create($validatedData);
            return $this->successResponse(null, 'Driver created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while creating driver', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function show(Driver $driver)
    {
        try {
            return $this->successResponse($driver, 'Driver retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving driver', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function edit(Driver $driver)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDriverRequest  $request
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDriverRequest $request, Driver $driver)
    {
        try {
            $validatedData = $request->validate(
                [
                    'name' => 'required|string|max:255',
                ]
            );
            $driver->update($validatedData);
            return $this->successResponse(null, 'Driver updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while updating driver', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function destroy(Driver $driver)
    {
        try {
            $driver->delete();
            return $this->successResponse(null, 'Driver deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while deleting driver', 500);
        }
    }
}
