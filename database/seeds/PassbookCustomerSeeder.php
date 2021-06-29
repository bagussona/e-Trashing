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
            "Tanggal" => date("d-m-Y"),
            "Keterangan" => "dijemput",
            "Berat" => 0,
            "Debit" => 0,
            "Credit" => 0,
            "Saldo" => 0
        ]);
    }
}
