<?php

namespace App\Policies;

use App\Models\User;
use App\Models\todo;
use Illuminate\Auth\Access\Response;

class TodoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {

        return $user->tokenCan("view:todo") ||  $user->tokenCan("view:others:todo");
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Todo $todo): bool
    {
        return ($user->id === $todo->user_id && $user->tokenCan("view:todo")) || $user->tokenCan("view:others:todo");
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->tokenCan("create:todo") || $user->tokenCan("create:others:todo");
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Todo $todo): bool
    {
        return $user->id === $todo->user_id || $user->tokenCan("edit:others:todo");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Todo $todo): bool
    {
        return $user->id === $todo->user_id || $user->tokenCan("trash:others:todo");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Todo $todo): bool
    {
        return $user->id === $todo->user_id || $user->tokenCan("restore:others:todo");
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Todo $todo): bool
    {
        return $user->id === $todo->user_id || $user->tokenCan("delete:others:todo");
    }
}
