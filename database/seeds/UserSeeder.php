<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@btsid.com',
            'password' => bcrypt('adminadmin'),
            'nohape' => '082128796431',
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $admin->assignRole('admin');

        $staff = User::create([
            'name' => 'Staff',
            'username' => 'staff',
            'email' => 'staff@btsid.com',
            'password' => bcrypt('staffstaff'),
            'nohape' => '082128796431',
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $staff->assignRole('staff');

        $pengepul = User::create([
            'name' => 'Pengepul',
            'username' => 'pengepul',
            'email' => 'pengepul@btsid.com',
            'password' => bcrypt('pengepulpengepul'),
            'nohape' => '082128796431',
            'avatar' => 'https://res.cloudinary.com/tookoo-dil/image/upload/v1623985010/BTS-ID/user.png',
            'location' => '-7.995573596215699, 110.29540549192244'
        ]);

        $pengepul->assignRole('pengepul');
    }
}
