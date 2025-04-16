<?php

namespace Modules\IAM\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'full_name'    => $this->full_name,
            'username'      => $this->username,
            'first_name'       => $this->first_name,
            'middle_name'    => $this->middle_name,
            'last_name'    => $this->last_name,
            'email'     => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'roles'             => $this->whenLoaded('roles', function () {
                return RoleResource::collection($this->roles);
            }),
        ];
    }
}
