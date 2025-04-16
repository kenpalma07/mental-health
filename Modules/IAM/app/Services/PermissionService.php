<?php

namespace Modules\IAM\Services;

use Modules\IAM\Http\Resources\PermissionResource;
use Modules\Core\Facades\DataTable;
use Modules\IAM\Models\Permission;

class PermissionService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $filters = str_replace(
            ['guard:web', 'guard:api',],
            ['guard_name:web', 'guard_name:api',],
            request()->query('filters') ?? []
        );
        $sort = str_replace(
            ['name', 'module'],
            ['name', 'module'],
            request()->query('col')
        );

        $result = DataTable::query(Permission::query())
            ->searchable(['name', 'module'])
            ->applyFilters($filters)
            ->allowedFilters(['guard_name:web', 'guard_name:api'])
            ->applySort($sort)
            ->allowedSorts(['name', 'module'])
            ->make();

        return PermissionResource::collection($result);
    }
}
