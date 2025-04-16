<?php

namespace Modules\IAM\Services;

use Modules\Core\Facades\DataTable;
use Modules\IAM\Http\Resources\UserResource;
use Modules\IAM\Models\User;

class UserService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $filters = str_replace(
            [
                'status:verified', 'status:unverified',
                'roles:Administrator', 'roles:Author', 'roles:Moderator',
            ],
            [
                'email_verified_at:NOT NULL', 'email_verified_at:NULL',
                'roles.name:Administrator', 'roles.name:Author', 'roles.name:Moderator',
            ],
            request()->query('filters') ?? []
        );
        $sort = str_replace(
            ['full_name', 'created_at'],
            ['full_name', 'created_at'],
            request()->query('col')
        );

        $result = DataTable::query(User::query())
            ->with(['roles'])
            ->searchable(['name', 'email'])
            ->applyFilters($filters)
            ->allowedFilters([
                'email_verified_at:NOT NULL',
                'email_verified_at:NULL',
            ])
            ->applySort($sort)
            ->allowedSorts(['full_name', 'username', 'email', 'created_at'])
            ->make();

        return UserResource::collection($result);
    }
}
