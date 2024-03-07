<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory, HasUlids;

    public function rentalCompany()
    {
        return $this->belongsTo(RentalCompany::class);
    }
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
