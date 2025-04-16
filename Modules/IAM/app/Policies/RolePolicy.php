<?php

namespace Modules\IAM\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\IAM\Models\Role;
use Modules\IAM\Models\User;

class RolePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    public function before(User $user, $ability)
    {
        // visitors cannot view unpublished items
        if ($user === null) {
            return false;
        }
    }

    /**
     * Determine whether the user can view any models.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        if ($user->can('view any role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Role  $role
     * @return mixed
     */
    public function view(User $user, Role $role)
    {
        if ($user->can('view role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if ($user->can('create role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Role  $role
     * @return mixed
     */
    public function update(User $user, Role $role)
    {
        if ($user->can('update role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Role  $role
     * @return mixed
     */
    public function delete(User $user, Role $role)
    {
        if ($user->can('delete role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Role  $role
     * @return mixed
     */
    public function restore(User $user, Role $role)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Role  $role
     * @return mixed
     */
    public function forceDelete(User $user, Role $role)
    {
        //
    }
}
