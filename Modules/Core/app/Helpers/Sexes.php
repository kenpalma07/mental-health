<?php

namespace Modules\Core\Helpers;

class Sexes
{
    public static function get_list()
    {
        return [
            [
                'key' => 'M',
                'value' => 'Male',
            ],
            [
                'key' => 'F',
                'value' => 'Female',
            ],
        ];
    }
}
