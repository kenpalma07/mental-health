<?php

namespace Modules\IAM\Models;

use Modules\Permission\Filters\RoleFilters;

use IndexZer0\EloquentFiltering\Contracts\IsFilterable;
use IndexZer0\EloquentFiltering\Filter\Traits\Filterable;
use IndexZer0\EloquentFiltering\Filter\Contracts\AllowedFilterList;
use IndexZer0\EloquentFiltering\Filter\Filterable\Filter;
use IndexZer0\EloquentFiltering\Filter\FilterType;

class Role extends \Spatie\Permission\Models\Role implements IsFilterable
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
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['pivot'];

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
