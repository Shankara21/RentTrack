<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApprovalRequest;
use App\Http\Requests\UpdateApprovalRequest;
use App\Models\Approval;
use App\Models\Order;

class ApprovalController extends Controller
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
                $approvals = Approval::with(['user:id,name,role_id', 'user.role:id,name', 'order:id,vehicle_id,driver_id,start_date,end_date,description,status,user_id', 'order.vehicle:id,number', 'order.driver:id,name', 'order.user:id,name'])
                    ->get();
            } else {
                $approvals = Approval::where('user_id', auth()->user()->id)->with(['user:id,name,role_id', 'user.role:id,name', 'order:id,vehicle_id,driver_id,start_date,end_date,description,status,user_id', 'order.vehicle:id,number', 'order.driver:id,name', 'order.user:id,name'])
                    ->get();
            }
            return $this->successResponse($approvals, 'Approvals retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving approvals', 500);
        }
    }

    public function getByOrderId($orderId)
    {
        try {
            $approvals = Approval::where('order_id', $orderId)->with('user')->get();
            return $this->successResponse($approvals, 'Approvals retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('An error occurred while retrieving approvals', 500);
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
     * @param  \App\Http\Requests\StoreApprovalRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreApprovalRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function show(Approval $approval)
    {
        $approval->load('user');
        return $this->successResponse($approval, 'Approval retrieved successfully');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function edit(Approval $approval)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateApprovalRequest  $request
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateApprovalRequest $request, Approval $approval)
    {
        if ($approval->user_id !== auth()->user()->id) {
            return $this->errorResponse('You are not authorized to approve this order', 403);
        }
        $validatedData = $request->validate([
            'status' => 'required|string|max:255',
        ]);
        $validatedData['approved_at'] = now();
        $approval->update($validatedData);

        if (auth()->user()->role_id != 2) {
            if ($validatedData['status'] === 'Rejected') {
                Order::where('id', $approval->order_id)->update(['status' => 'Rejected']);
                $pendingApprovals = Approval::where('order_id', $approval->order_id)->where('status', 'Pending')->get();
                foreach ($pendingApprovals as $pendingApproval) {
                    $pendingApproval->update(['status' => 'Rejected']);
                }
            }
        }


        $approvals = Approval::where('order_id', $approval->order_id)->get();
        $isAllApproved = true;
        foreach ($approvals as $approval) {
            if ($approval->status !== 'Approved') {
                $isAllApproved = false;
                break;
            }
        }
        if ($isAllApproved) {
            $approval->order->update(['status' => 'Loaned']);
        }

        return $this->successResponse(null, 'Approval updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function destroy(Approval $approval)
    {
        $approval->delete();
        return $this->successResponse(null, 'Approval deleted successfully');
    }
}
