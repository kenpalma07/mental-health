<?php

namespace Modules\IAM\Models;

use App\Models\User as Model;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Modules\Core\Models\UserSetting;
use Modules\Core\Helpers\CivilStatuses;
use Modules\Core\Helpers\Sexes;
use ParagonIE\CipherSweet\BlindIndex;
use ParagonIE\CipherSweet\EncryptedRow;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\LaravelCipherSweet\Concerns\UsesCipherSweet;
use Spatie\LaravelCipherSweet\Contracts\CipherSweetEncrypted;
use Spatie\Permission\Traits\HasRoles;

use IndexZer0\EloquentFiltering\Contracts\IsFilterable;
use IndexZer0\EloquentFiltering\Filter\Traits\Filterable;
use IndexZer0\EloquentFiltering\Filter\Contracts\AllowedFilterList;
use IndexZer0\EloquentFiltering\Filter\Filterable\Filter;
use IndexZer0\EloquentFiltering\Filter\FilterType;

class User extends Model implements CipherSweetEncrypted, IsFilterable
{
    use SoftDeletes;
    use HasRoles;
    use LogsActivity;
    use UsesCipherSweet;
    use Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'prefix',
        'username',
        'user_id',
        'name',
        'first_name',
        'middle_name',
        'last_name',
        'name_suffix',
        'name_extension',
        'email',
        'password',
        'sex',
        'civil_status',
        'birthdate',
        'mobile_number',
        'is_active',
        'profile_photo_path',
        'is_approve',
        'approved_at',
        'is_lock',
        'type',
        'last_activity',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
        'can',
        'full_name',
        'sex_description',
        'is_online',
    ];

    protected $with = [
        //
    ];

    public function allowedFilters(): AllowedFilterList
    {
        return Filter::only(
            Filter::field('first_name', [FilterType::EQUAL]),
        );
    }

    public static function configureCipherSweet(EncryptedRow $encryptedRow): void
    {
        $encryptedRow
            ->addOptionalTextField('email')
            ->addBlindIndex('email', new BlindIndex('email_index'))
            ->addOptionalTextField('name')
            ->addBlindIndex('name', new BlindIndex('name_index'))
            ->addField('first_name')
            ->addBlindIndex('first_name', new BlindIndex('first_name_index'))
            ->addOptionalTextField('middle_name')
            ->addBlindIndex('middle_name', new BlindIndex('middle_name_index'))
            ->addField('last_name')
            ->addBlindIndex('last_name', new BlindIndex('last_name_index'))
            ->addOptionalTextField('name_suffix')
            ->addBlindIndex('name_suffix', new BlindIndex('name_suffix_index'))
            ->addOptionalTextField('birthdate')
            ->addBlindIndex('birthdate', new BlindIndex('birthdate_index'))
            ->addOptionalTextField('sex')
            ->addBlindIndex('sex', new BlindIndex('sex_index'))
            ->addOptionalTextField('civil_status')
            ->addBlindIndex('civil_status', new BlindIndex('civil_status_index'))
            ->addOptionalTextField('mobile_number')
            ->addBlindIndex('mobile_number', new BlindIndex('mobile_number_index'));
    }

    /* public function settings()
    {
        return $this->hasMany(UserSetting::class, 'user_id');
    } */

    /* public function passwordSecurity()
    {
        return $this->hasOne('Modules\User\Models\PasswordSecurity');
    } */

    /**
     * Access the full name of the user
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        // Prefix
        $prefix = (!empty($this->prefix) && empty($this->name_suffix)) ? $this->prefix . '. ' : '';

        $full_name = $prefix . ucfirst($this->first_name);

        if ($this->middle_name) {
            $full_name .= ' ' . ucfirst($this->middle_name);
        }

        $full_name .= ' ' . ucfirst($this->last_name);

        if ($this->name_extension) {
            $full_name .= ' ' . strtoupper($this->name_extension);
        }

        if ($this->name_suffix) {
            $full_name .= ', ' . strtoupper($this->name_suffix);
        }

        return $full_name;
    }

    public function isOnline(): Attribute
    {
        $windowTime = config('telemedicine.time_window');

        return Attribute::make(
            get: fn ($value) => !empty($this->last_activity) && (Carbon::parse($this->last_activity)->diffInMinutes(now()) <= $windowTime) ? true : false,
        );
    }

    public function getCanAttribute()
    {
        if (auth()->check()) {
            return [
                'update' => auth()->user()->can('update', $this),
                'delete' => auth()->user()->can('delete', $this),
                'approve' => auth()->user()->can('approve', $this),
                'lock' => auth()->user()->can('lock', $this),
                'activate' => auth()->user()->can('activate', $this),
            ];
        }
    }

    public function getSexDescriptionAttribute()
    {
        if (empty($this->attributes['sex'])) {
            return null;
        }

        $sexValue = $this->attributes['sex'];

        $sex = Arr::first(Sexes::get_list(), function ($value, $key) use ($sexValue) {
            return $value['key'] == $sexValue;
        });

        return $sex ? $sex['value'] : null;
    }

    public function getCivilStatusDescriptionAttribute()
    {
        if (empty($this->attributes['civil_status'])) {
            return null;
        }

        $civilStatusValue = $this->attributes['civil_status'];

        $civilStatus = Arr::first(CivilStatuses::get_list(), function ($value, $key) use ($civilStatusValue) {
            return $value['key'] == $civilStatusValue;
        });

        return $civilStatus ? $civilStatus['value'] : null;
    }

    /**
     * User order by last_name and first_name
     *
     * @param [type] $query
     * @return void
     */
    public function scopeOrderByName($query)
    {
        $query->orderBy('last_name')->orderBy('first_name');
    }

    public function setSettings($settings)
    {
        foreach ($settings as $key => $value) {
            $this->settings()->updateOrCreate(
                [
                    'key' => $key,
                ],
                [
                    'key' => $key,
                    'value' => $value,
                ]
            );
        }
    }

    public function getSettings($settings)
    {
        $settings = $this->settings()->whereIn('key', $settings)->get();
        $companySettings = [];

        foreach ($settings as $setting) {
            $companySettings[$setting->key] = $setting->value;
        }

        return $companySettings;
    }

    /**
     * Create a new factory instance for the model.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    protected static function newFactory()
    {
        return UserFactory::new();
    }

    protected function defaultProfilePhotoUrl()
    {
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->first_name . ' ' . $this->last_name) . '&color=7F9CF5&background=EBF4FF';
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logUnguarded()
            ->logOnlyDirty();
    }

    public function profilePhotoUrl(): Attribute
    {
        return Attribute::get(function (): string {
            if ($this->profile_photo_path) {
                if ($this->profilePhotoDisk() == 'minio') {
                    return Storage::disk($this->profilePhotoDisk())->temporaryUrl(
                        $this->profile_photo_path,
                        now()->addMinutes(15)
                    );
                }

                return Storage::disk($this->profilePhotoDisk())->url($this->profile_photo_path);
            } else {
                return $this->defaultProfilePhotoUrl();
            }
        });
    }
}
