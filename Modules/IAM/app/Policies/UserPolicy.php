<?php

namespace Modules\IAM\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Modules\IAM\Models\User;

class UserPolicy
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
        if ($user->can('view any user')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\User  $model
     * @return mixed
     */
    public function view(User $user, User $model)
    {
        if ($user->can('view user')) {
            return true;
        }

        return $user->id === $model->id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if ($user->can('create user')) {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\User  $model
     * @return mixed
     */
    public function update(User $user, User $model)
    {
        if ($user->can('update user')) {
            return true;
        }

        return $user->id === $model->id;
    }

    public function approve(User $user, User $model)
    {
        if ($user->can('approve user')) {
            return true;
        }
    }

    public function lock(User $user, User $model)
    {
        if ($user->can('lock user')) {
            return true;
        }
    }

    public function activate(User $user, User $model)
    {
        if ($user->can('activate user')) {
            return true;
        }
    }

    public function assignRole(User $user)
    {
        if ($user->can('assign role')) {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\User  $model
     * @return mixed
     */
    public function delete(User $user, User $model)
    {
        if ($user->can('delete user')) {
            return true;
        }

        return $user->id === $model->id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \Modules\IAM\Models\User  $user
     * @param  \Modules\IAM\Models\User  $model
     * @return mixed
     */
    public function restore(User $user, User $model)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \Modules\User\Models\User  $user
     * @param  \Modules\User\Models\User  $model
     * @return mixed
     */
    public function forceDelete(User $user, User $model)
    {
        //
    }
}
