<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, HasUlids;

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function approval()
    {
        return $this->hasMany(Approval::class);
    }
}
