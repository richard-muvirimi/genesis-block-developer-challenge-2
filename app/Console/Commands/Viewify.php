<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

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
    public function handle()
    {
        Storage::copy('public/build/index.blade.php', 'resources/views/index.blade.php');
    }
}
