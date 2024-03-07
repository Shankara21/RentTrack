<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locations')->insert([
            [
                'name' => 'KPST',
                'region' => 'Jawa Timur',
                'type' => 'Kantor Pusat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'KCBG',
                'region' => 'Bojonegoro',
                'type' => 'Kantor Cabang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'TMBG',
                'region' => 'Cepu',
                'type' => 'Tambang',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
