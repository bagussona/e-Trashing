<?php

use App\PassbookCustomer;
use App\PassbookUsers;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class PassbookCustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ##Admin
        $raw = PassbookCustomer::create([
            "user_id" => 1,
            "Tanggal" => date("Y-m-d"),
            "Keterangan" => "Saldo Awal",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);

        $passbook_users = PassbookUsers::create([
            'user_id' => 1,
            'Tanggal' => date('Y-m-d'),
            'Keterangan' => 'BTS-ID/PassbookUsers/' . date('Y-m-d') . '/' . Str::random(6),
            'Berat' => 0,
            'Saldo' => 0
        ]);

        ##Staff_1
        $raw = PassbookCustomer::create([
            "user_id" => 2,
            "Tanggal" => date("Y-m-d"),
            "Keterangan" => "Saldo Awal",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);
 
        $passbook_users = PassbookUsers::create([
            'user_id' => 2,
            'Tanggal' => date('Y-m-d'),
            'Keterangan' => 'BTS-ID/PassbookUsers/' . date('Y-m-d') . '/' . Str::random(6),
            'Berat' => 0,
            'Saldo' => 0
        ]);

        ##Staff_2
        $raw = PassbookCustomer::create([
            "user_id" => 3,
            "Tanggal" => date("Y-m-d"),
            "Keterangan" => "Saldo Awal",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);

        $passbook_users = PassbookUsers::create([
            'user_id' => 3,
            'Tanggal' => date('Y-m-d'),
            'Keterangan' => 'BTS-ID/PassbookUsers/' . date('Y-m-d') . '/' . Str::random(6),
            'Berat' => 0,
            'Saldo' => 0
        ]);
    }
}
