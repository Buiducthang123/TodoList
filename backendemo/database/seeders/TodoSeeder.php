<?php

namespace Database\Seeders;

use App\Models\todo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 5) as $index) {
            todo::create([
                'name' => $faker->sentence(),
                'status' => $faker->boolean(),
            ]);
        }
        
    }
}
