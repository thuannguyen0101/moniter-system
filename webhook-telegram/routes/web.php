<?php

use App\Http\Controllers\AlertController;
use App\Http\Controllers\GenerateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/webhook', [AlertController::class, 'webhook']);
Route::get('/generate', [GenerateController::class, 'generate']);
