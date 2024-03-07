<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RentalCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rental_companies')->insert([
            [
                'name' => 'Rental Mobil A',
                'address' => 'Jl. Raya Kebon Jeruk No. 123',
                'phone' => '081234567890',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rental Mobil B',
                'address' => 'Jl. Raya Kebon Jeruk No. 456',
                'phone' => '081234567891',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rental Mobil C',
                'address' => 'Jl. Raya Kebon Jeruk No. 789',
                'phone' => '081234567892',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
