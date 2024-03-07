<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\Uid\Ulid;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                // 'id' => Ulid::generate(),
                'role_id' => 1,
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                // 'id' => Ulid::generate(),
                'role_id' => 2,
                'name' => 'Manager',
                'email' => 'manager@mail.com',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                // 'id' => Ulid::generate(),
                'role_id' => 3,
                'name' => 'Supervisor 1',
                'email' => 'supervisor@mail.com',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                // 'id' => Ulid::generate(),
                'role_id' => 3,
                'name' => 'Supervisor 2',
                'email' => 'supervisor2@mail.com',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                // 'id' => Ulid::generate(),
                'role_id' => 4,
                'name' => 'Staff',
                'email' => 'staff@mail.com',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
