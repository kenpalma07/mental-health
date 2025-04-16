<?php

namespace Modules\Core\Helpers;

class CivilStatuses
{
    public static function get_list()
    {
        return [
            [
                'key' => 'S',
                'value' => 'Single',
            ],
            [
                'key' => 'M',
                'value' => 'Married',
            ],
            [
                'key' => 'W',
                'value' => 'Widow',
            ],
            [
                'key' => 'X',
                'value' => 'Separated Legally',
            ],
            [
                'key' => 'Y',
                'value' => 'Separated In Fact',
            ],
            [
                'key' => 'C',
                'value' => 'Co-Habitation/Live-in/Common Law Spouse',
            ],
            [
                'key' => 'A',
                'value' => 'Annulled',
            ],
            [
                'key' => 'D',
                'value' => 'Divorced',
            ],
        ];
    }
}
