<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreRentalCompanyRequest;
use App\Http\Requests\UpdateRentalCompanyRequest;
use App\Models\RentalCompany;

class RentalCompanyController extends Controller
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
                $rentalCompanies = RentalCompany::select('id', 'name', 'address', 'phone')->get();
            } else {
                $rentalCompanies = RentalCompany::select('id', 'name', 'address', 'phone')->limit(5)->get();
            }
            return $this->successResponse($rentalCompanies, 'Rental companies retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving rental companies', 500);
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
     * @param  \App\Http\Requests\StoreRentalCompanyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRentalCompanyRequest $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string',
                'phone' => 'required|string|max:15',
            ]);
            RentalCompany::create($validatedData);
            return $this->successResponse(null, 'Rental company created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while creating rental company', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RentalCompany  $rentalCompany
     * @return \Illuminate\Http\Response
     */
    public function show(RentalCompany $rentalCompany)
    {
        try {
            return $this->successResponse($rentalCompany, 'Rental company retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving rental company', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RentalCompany  $rentalCompany
     * @return \Illuminate\Http\Response
     */
    public function edit(RentalCompany $rentalCompany)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRentalCompanyRequest  $request
     * @param  \App\Models\RentalCompany  $rentalCompany
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRentalCompanyRequest $request, RentalCompany $rentalCompany)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'address' => 'required|string',
                'phone' => 'required|string|max:15',
            ]);
            $rentalCompany->update($validatedData);
            return $this->successResponse(null, 'Rental company updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while updating rental company', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RentalCompany  $rentalCompany
     * @return \Illuminate\Http\Response
     */
    public function destroy(RentalCompany $rentalCompany)
    {
        try {
            $rentalCompany->delete();
            return $this->successResponse(null, 'Rental company deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while deleting rental company', 500);
        }
    }
}
