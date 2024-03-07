<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drivers')->insert([
            [
                'name' => 'John Doe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jane Doe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'John Smith',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
