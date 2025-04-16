<?php

namespace Modules\IAM\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\IAM\Models\Permission;
use Modules\IAM\Models\Role;
use Modules\IAM\Models\User;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Permission
        $permissions = [
            [
                'name' => 'view any user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'approve user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'lock user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'activate user',
                'guard_name' => 'web',
                "module" => "user",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'view any permission',
                'guard_name' => 'web',
                "module" => "permission",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view permission',
                'guard_name' => 'web',
                "module" => "permission",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update permission',
                'guard_name' => 'web',
                "module" => "permission",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create permission',
                'guard_name' => 'web',
                "module" => "permission",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete permission',
                'guard_name' => 'web',
                "module" => "permission",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'view any role',
                'guard_name' => 'web',
                "module" => "role",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view role',
                'guard_name' => 'web',
                "module" => "role",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update role',
                'guard_name' => 'web',
                "module" => "role",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create role',
                'guard_name' => 'web',
                "module" => "role",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete role',
                'guard_name' => 'web',
                "module" => "role",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'assign role',
                'guard_name' => 'web',
                "module" => "role",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // System Settings
            [
                'name' => 'view system setting',
                'guard_name' => 'web',
                "module" => "systemSetting",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create system setting',
                'guard_name' => 'web',
                "module" => "systemSetting",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update system setting',
                'guard_name' => 'web',
                "module" => "systemSetting",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // logs
            [
                'name' => 'view any log',
                'guard_name' => 'web',
                "module" => "log",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view log',
                'guard_name' => 'web',
                "module" => "log",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'download log',
                'guard_name' => 'web',
                "module" => "log",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'delete log',
                'guard_name' => 'web',
                "module" => "log",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // activity logs
            [
                'name' => 'view any activity log',
                'guard_name' => 'web',
                "module" => "activityLog",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view activity log',
                'guard_name' => 'web',
                "module" => "activityLog",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'download activity log',
                'guard_name' => 'web',
                "module" => "activityLog",
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'delete activity log',
                'guard_name' => 'web',
                "module" => "activityLog",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::transaction(function () use ($permissions) {
            Permission::insert($permissions);

            // Roles
            $adminRole = Role::create(['name' => 'Administrator']);
            $userRole = Role::create(['name' => 'User']);

            //
            $adminRole->givePermissionTo('view any user');
            $adminRole->givePermissionTo('view user');
            $adminRole->givePermissionTo('update user');
            $adminRole->givePermissionTo('create user');
            $adminRole->givePermissionTo('delete user');
            $adminRole->givePermissionTo('approve user');
            $adminRole->givePermissionTo('lock user');
            $adminRole->givePermissionTo('activate user');

            $adminRole->givePermissionTo('view any permission');
            $adminRole->givePermissionTo('view permission');
            $adminRole->givePermissionTo('update permission');
            $adminRole->givePermissionTo('create permission');
            $adminRole->givePermissionTo('delete permission');

            $adminRole->givePermissionTo('view any role');
            $adminRole->givePermissionTo('view role');
            $adminRole->givePermissionTo('update role');
            $adminRole->givePermissionTo('create role');
            $adminRole->givePermissionTo('delete role');
            $adminRole->givePermissionTo('assign role');

            $adminRole->givePermissionTo('view system setting');
            $adminRole->givePermissionTo('create system setting');
            $adminRole->givePermissionTo('update system setting');

            $adminRole->givePermissionTo('view any log');
            $adminRole->givePermissionTo('view log');
            $adminRole->givePermissionTo('download log');
            $adminRole->givePermissionTo('delete log');

            $adminRole->givePermissionTo('view any activity log');
            $adminRole->givePermissionTo('view activity log');
            $adminRole->givePermissionTo('delete activity log');

            // Admin

            $admin = User::create([
                'username' => 'admin',
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('4dm1n1str4t0r'),
                'email_verified_at' => now(),
                'sex' => 'M',
                'civil_status' => 'S',
                'is_active' => true,
                'is_approve' => true,
                'approved_at' => now(),
            ]);

            $admin->assignRole($adminRole);

            // Settings
            //$admin->setSettings(['language' => 'en']);
        });
    }
}
