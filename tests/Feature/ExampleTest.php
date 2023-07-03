<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_that_index_file_exists(): void
    {
        $this->assertFileExists('resources/views/index.blade.php');
    }

    public function test_that_documentation_exists(): void
    {
        $this->assertFileExists('resources/views/documentation.blade.php');
    }

    public function test_that_app_url_is_set(): void
    {
        $this->assertNotEmpty(env('APP_URL'));
    }
    
}
