<?php

namespace Modules\IAM\Models;

use Modules\Permission\Filters\PermissionFilters;

use IndexZer0\EloquentFiltering\Contracts\IsFilterable;
use IndexZer0\EloquentFiltering\Filter\Traits\Filterable;
use IndexZer0\EloquentFiltering\Filter\Contracts\AllowedFilterList;
use IndexZer0\EloquentFiltering\Filter\Filterable\Filter;
use IndexZer0\EloquentFiltering\Filter\FilterType;

class Permission extends \Spatie\Permission\Models\Permission implements IsFilterable
{
    use Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'guard_name',
        'module',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'can',
    ];

    public function allowedFilters(): AllowedFilterList
    {
        return Filter::only(
            Filter::field('name', [FilterType::EQUAL]),
            Filter::field('guard_name', [FilterType::EQUAL]),
            Filter::field('modules', [FilterType::EQUAL]),
        );
    }

    public function getCanAttribute()
    {
        return [
            'update' => auth()->user()->can('update', $this),
            'delete' => auth()->user()->can('delete', $this),
        ];
    }
}
