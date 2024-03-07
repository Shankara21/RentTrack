<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Models\Location;

class LocationController extends Controller
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
            if (auth()->user()->role_id == 1) {
                $locations = Location::select('id', 'name', 'region', 'type')->get();
            } else {
                $locations = Location::select('id', 'name', 'region', 'type')->limit(5)->get();
            }
            return $this->successResponse($locations, 'Locations retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving locations', 500);
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
     * @param  \App\Http\Requests\StoreLocationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLocationRequest $request)
    {
        try {
            $validatedData = $request->validate(
                [
                    'name' => 'required|string|max:255',
                    'region' => 'required|string|max:255',
                    'type' => 'required|string|max:255',
                ]
            );
            Location::create($validatedData);
            return $this->successResponse(null, 'Location created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while creating location', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function show(Location $location)
    {
        try {
            return $this->successResponse($location, 'Location retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving location', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function edit(Location $location)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateLocationRequest  $request
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        try {
            $validatedData = $request->validate(
                [
                    'name' => 'required|string|max:255',
                    'region' => 'required|string|max:255',
                    'type' => 'required|string|max:255',
                ]
            );
            $location->update($validatedData);
            return $this->successResponse(null, 'Location updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while updating location', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Location  $location
     * @return \Illuminate\Http\Response
     */
    public function destroy(Location $location)
    {
        try {
            $location->delete();
            return $this->successResponse(null, 'Location deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while deleting location', 500);
        }
    }
}
