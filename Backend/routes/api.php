<?php

use App\Http\Controllers\Api\ApprovalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\RentalCompanyController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VehicleController;
use App\Models\Approval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth login
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {


    // Stats
    Route::get('/statistics', [OrderController::class, 'stats']);

    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::get('/', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });

    // Route for admin
    Route::middleware('role:Admin')->group(function () {

        // User routes
        Route::apiResource('users', UserController::class);

        // Driver routes
        Route::apiResource('drivers', DriverController::class);

        // Location routes
        Route::apiResource('locations', LocationController::class);

        // Rental companies routes
        Route::apiResource('rental-companies', RentalCompanyController::class);

        // Vehicle routes
        Route::apiResource('vehicles', VehicleController::class);

        // Order routes
        Route::apiResource('orders', OrderController::class);

        // Approval routes
        Route::get('/approvals/order/{orderId}', [ApprovalController::class, 'getByOrderId']);
        Route::apiResource('approvals', ApprovalController::class);

        // Role routes
        Route::get('/roles', [RoleController::class, 'index']);
    });

    // Approval routes
    Route::put('/approvals/{approval}', [ApprovalController::class, 'update']);
    Route::get('/approvals', [ApprovalController::class, 'index']);

    // Order routes
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::put('/orders/{order}/status', [OrderController::class, 'changeStatus']);

    // Master
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::get('/locations', [LocationController::class, 'index']);
    Route::get('/rental-companies', [RentalCompanyController::class, 'index']);


});
