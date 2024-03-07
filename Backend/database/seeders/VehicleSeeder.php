<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Uid\Ulid;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vehicles')->insert([
            [
                'id' => Ulid::generate(),
                'location_id' => 1,
                'rental_company_id' => 1,
                'name' => 'Innova',
                'number' => 'AB 1234 CD',
                'type' => 'Angkutan Orang',
                'is_owned' => false,
                'fuel_consumption' => '20L',
                'last_service' => '2023-10-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Ulid::generate(),
                'location_id' => 2,
                'rental_company_id' => 2,
                'name' => 'Avanza',
                'number' => 'EF 5678 GH',
                'type' => 'Angkutan Orang',
                'is_owned' => false,
                'fuel_consumption' => '15L',
                'last_service' => '2023-11-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Ulid::generate(),
                'location_id' => 3,
                'rental_company_id' => null,
                'name' => 'Truck',
                'number' => 'IJ 9101 KL',
                'type' => 'Angkutan Barang',
                'is_owned' => true,
                'fuel_consumption' => '30L',
                'last_service' => '2023-12-01',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
