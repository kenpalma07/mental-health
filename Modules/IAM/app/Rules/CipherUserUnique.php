<?php

namespace Modules\IAM\Rules;

use Illuminate\Contracts\Validation\Rule;
use Modules\IAM\Models\User;

class CipherUserUnique implements Rule
{
    protected $id;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($id = null)
    {
        $this->id = $id;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $users = User::whereBlind($attribute, $attribute.'_index', $value);

        if ($this->id) {
            $users->whereNot('id', $this->id);
        }

        return $users->count() > 0 ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute already exists.';
    }
}
