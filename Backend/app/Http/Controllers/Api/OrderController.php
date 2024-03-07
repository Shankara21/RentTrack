<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Approval;
use App\Models\Order;

class OrderController extends Controller
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
            $orders = Order::with([
                'vehicle:id,name',
                'driver:id,name',
                'user:id,name',
            ])->select(
                'id',
                'vehicle_id',
                'driver_id',
                'user_id',
                'start_date',
                'end_date',
                'description',
                'status'
            )->orderBy('created_at', 'desc')->get();
            return $this->successResponse($orders, 'Orders retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving orders', 500);
        }
    }

    public function stats()
    {
        try {
            $order = Order::with('vehicle')->get();
            $vehicleName = [];
            $orderCount = [];
            // hitung jumlah order berdasarkan vehicle kemudian masukkan ke dalam variable berisi jumlah order berdasarkan vehicle dan juga nama vehicle
            foreach ($order as $o) {
                if (array_key_exists($o->vehicle->name, $vehicleName)) {
                    $vehicleName[$o->vehicle->name] += 1;
                } else {
                    $vehicleName[$o->vehicle->name] = 1;
                }
            }



            return $this->successResponse([
                'vehicleName' => array_keys($vehicleName),
                'orderCount' => array_values($vehicleName),
            
            ], 'Orders stats retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving orders stats', 500);
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
     * @param  \App\Http\Requests\StoreOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            $validatedData = $request->validate([
                'vehicle_id' => 'required',
                'driver_id' => 'required',
                'start_date' => 'required',
                'end_date' => 'date',
                'description' => 'string',
            ]);
            $validatedData['user_id'] = auth()->user()->id;
            $order =  Order::create($validatedData);
            foreach ($request->approvals as $approval) {
                Approval::create([
                    'order_id' => $order->id,
                    'user_id' => $approval,
                ]);
            }
            return $this->successResponse(null, 'Order created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse([
                'error' => 'An error occurred while creating order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        try {
            $order = Order::with([
                'vehicle:id,location_id,rental_company_id,number,type,is_owned,fuel_consumption,last_service,name',
                'vehicle.location:id,name,type',
                'driver:id,name',
                'user:id,role_id,name,email,email_verified_at',
                'approval:id,user_id,order_id,status,approved_at',
                'approval.user:id,name,email,email_verified_at,role_id',
                'approval.user.role:id,name',
            ])->find($order->id);
            return $this->successResponse($order, 'Order retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving order', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        try {
            $validatedData = $request->validate([
                'vehicle_id' => 'required',
                'driver_id' => 'required',
                'start_date' => 'required',
                'end_date' => 'date',
                'description' => 'string',
            ]);
            $order->update($validatedData);
            return $this->successResponse(null, 'Order updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while updating order', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        try {
            $order->approval()->delete();
            $order->delete();
            return $this->successResponse(null, 'Order deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while deleting order', 500);
        }
    }

    public function changeStatus(UpdateOrderRequest $request, Order $order)
    {
        try {
            $validatedData = $request->validate([
                'status' => 'required|in:Pending,Rejected,Loaned,Returned',
            ]);
            $validatedData['end_date'] = now();
            $order->update($validatedData);
            return $this->successResponse(null, 'Order status updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while updating order status', 500);
        }
    }
}
