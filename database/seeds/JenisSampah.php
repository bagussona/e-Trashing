<?php

use App\JenisSampah;
use Illuminate\Database\Seeder;

class JenisSampahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JenisSampah::create([
            'name' => 'Kertas HVS',
            '@KG' => 1000
        ]);

        JenisSampah::create([
            'name' => 'Isi Buku tulis (Buku cetak putih)',
            '@KG' => 1000
        ]);

        JenisSampah::create([
            'name' => 'Sampul Buku, Majalah, Karton berwarna',
            '@KG' => 500
        ]);

        JenisSampah::create([
            'name' => 'Tempat telur, kotak kemasan minuman(ex: susu, teh, dll)',
            '@KG' => 300
        ]);

        JenisSampah::create([
            'name' => 'Koran (LKS, Buram)',
            '@KG' => 850
        ]);

        JenisSampah::create([
            'name' => 'Koran Bagus (Bacaan)',
            '@KG' => 1000
        ]);

        JenisSampah::create([
            'name' => 'Karton coklat/ Kardus',
            '@KG' => 1200
        ]);

        JenisSampah::create([
            'name' => 'Botol Plastik Bersih',
            '@KG' => 2000
        ]);

        JenisSampah::create([
            'name' => 'Botol Plastik Kotor',
            '@KG' => 1000
        ]);

        JenisSampah::create([
            'name' => 'Gelas Mineral Plastik Bersih',
            '@KG' => 3000
        ]);

        JenisSampah::create([
            'name' => 'Gelas Mineral Plastik Kotor',
            '@KG' => 1000
        ]);

        JenisSampah::create([
            'name' => 'Karah botol plastik (Shampoo, Sabun, Body Lotion)',
            '@KG' => 200
        ]);

        JenisSampah::create([
            'name' => 'Galon/ Derigen',
            '@KG' => 2000
        ]);

        JenisSampah::create([
            'name' => 'Ember/ Pot bunga hitam/ Paralon',
            '@KG' => 500
        ]);

        JenisSampah::create([
            'name' => 'Kaleng Minuman',
            '@KG' => 8000
        ]);

        JenisSampah::create([
            'name' => 'Kaleng keras (ex: susu, kue, semprot nyamuk, etc)',
            '@KG' => 1000
        ]);
    }
}
