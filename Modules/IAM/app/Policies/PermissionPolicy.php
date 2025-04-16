<?php

namespace Modules\IAM\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\IAM\Models\Permission;
use Modules\IAM\Models\User;

class PermissionPolicy
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
        if ($user->can('view any permission')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Permission  $permission
     * @return mixed
     */
    public function view(User $user, Permission $permission)
    {
        if ($user->can('view permission')) {
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
        if ($user->can('create permission')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Permission  $permission
     * @return mixed
     */
    public function update(User $user, Permission $permission)
    {
        if ($user->can('update permission')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Permission  $permission
     * @return mixed
     */
    public function delete(User $user, Permission $permission)
    {
        if ($user->can('delete permission')) {
            return true;
        }
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Permission  $permission
     * @return mixed
     */
    public function restore(User $user, Permission $permission)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\Permission  $permission
     * @return mixed
     */
    public function forceDelete(User $user, Permission $permission)
    {
        //
    }
}
