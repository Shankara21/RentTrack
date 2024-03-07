<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'name' => 'Admin',
                'level' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Manager',
                'level' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Supervisor',
                'level' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Staff',
                'level' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
