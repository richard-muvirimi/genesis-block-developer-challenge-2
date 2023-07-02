<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Viewify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:viewify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy main view file into views directory';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        @copy(public_path('build/index.blade.php'), resource_path('views/index.blade.php'));
    }
}
