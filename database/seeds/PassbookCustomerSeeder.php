<?php

use App\PassbookCustomer;
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
        $raw = PassbookCustomer::create([
            "user_id" => 1,
            "Tanggal" => date("Y-m-d"),
            "Keterangan" => "dijemput",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);

        $raw = PassbookCustomer::create([
            "user_id" => 2,
            "Tanggal" => date("Y-m-d"),
            "Keterangan" => "dijemput",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);

        $raw = PassbookCustomer::create([
            "user_id" => 3,
            "Tanggal" => date("Y-m-d"),
            "Keterangan" => "dijemput",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);
    }
}
