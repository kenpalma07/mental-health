<?php

namespace Modules\Core\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @mixin \App\DataTable\DataTable
 */
class DataTable extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'Modules\Core\DataTable\DataTable';
    }
}
