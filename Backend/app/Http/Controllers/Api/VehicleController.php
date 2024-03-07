<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Models\Vehicle;

class VehicleController extends Controller
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
                $vehicles = Vehicle::with(['rentalCompany:id,name', 'location:id,name'])->get();
            } else {
                $vehicles = Vehicle::with(['rentalCompany:id,name', 'location:id,name'])->limit(5)->get();
            }
            return $this->successResponse($vehicles, 'Vehicles retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving vehicles', 500);
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
     * @param  \App\Http\Requests\StoreVehicleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVehicleRequest $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'location_id' => 'required',
                'rental_company_id' => '',
                'number' => 'required',
                'type' => 'required',
                'is_owned' => 'required|boolean',
                'fuel_consumption' => 'required',
                'last_service' => 'required',
            ]);
            if ($validatedData['is_owned']) {
                $validatedData['rental_company_id'] = null;
            }
            Vehicle::create($validatedData);
            return $this->successResponse(null, 'Vehicle created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse([
                'error' => 'An error occurred while creating vehicle',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        try {
            $vehicle->load('rentalCompany', 'location');
            return $this->successResponse($vehicle, 'Vehicle retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving vehicle', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateVehicleRequest  $request
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'location_id' => 'required',
                'rental_company_id' => 'integer',
                'number' => 'required',
                'type' => 'required',
                'is_owned' => 'required|boolean',
                'fuel_consumption' => 'required',
                'last_service' => 'required',
            ]);
            if ($validatedData['is_owned']) {
                $validatedData['rental_company_id'] = null;
            }
            $vehicle->update($validatedData);
            return $this->successResponse(null, 'Vehicle updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse([
                'error' => 'An error occurred while updating vehicle',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        try {
            $vehicle->delete();
            return $this->successResponse(null, 'Vehicle deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while deleting vehicle', 500);
        }
    }
}
