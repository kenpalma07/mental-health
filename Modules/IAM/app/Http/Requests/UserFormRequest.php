<?php

namespace Modules\IAM\Http\Requests;

use Modules\IAM\Rules\CipherUserUnique;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'prefix' => ['nullable'],
            'username' => ['required', Rule::unique('users', 'username')->ignore($this->user)],
            //'slug' => ['required', Rule::unique('users', 'slug')->ignore($this->user)],
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'name_extension' => ['nullable'],
            'name_suffix' => ['nullable'],
            'sex' => ['nullable'],
            //'gender' => ['nullable'],
            'birthdate' => ['nullable'],
            'email' => ['required', new CipherUserUnique($this->user)], //Rule::unique('users', 'email')->ignore($this->user)
            'mobile_number' => ['required'],
            //'phone_number' => ['nullable'],
            'photo' => ['nullable', 'image'],
            //'profile_photo_path' => ['nullable', 'image'],
            'password' => [
                'filled',
                'string',
                Password::min(10)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols(),
                'confirmed',
            ],
            //'is_superuser' => ['nullable'],
            //'is_staff' => ['nullable'],
            'is_active' => ['nullable'],
            //'roles' => ['nullable'],
        ];
    }

    public function validated($key = null, $default = null)
    {
        return Arr::except(parent::validated(), [
            'photo',
            'roles',
        ]);
    }
}
