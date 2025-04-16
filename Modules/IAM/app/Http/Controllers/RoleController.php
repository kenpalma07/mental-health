<?php

namespace Modules\IAM\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Modules\IAM\Models\Permission;
use Modules\IAM\Models\Role;
use Modules\IAM\Http\Requests\RoleFormRequest;
use Modules\Core\Http\Controllers\CoreController as Controller;
use Modules\IAM\Services\RoleService;

class RoleController extends Controller
{
    private RoleService $roleService;

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(RoleService $roleService)
    {
        $this->authorizeResource(Role::class, 'role');

        $this->roleService = $roleService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */
    public function index(Request $request)
    {
        $roles = $this->roleService->index();

        return inertia('IAM::Role/index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Inertia
     */
    public function create()
    {
        /* return Inertia::render('Permission::Role/Create', [
            'permissions' => Permission::all('id', 'name'),
        ]); */
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  RoleFormRequest  $request
     * @return Redirect
     */
    public function store(RoleFormRequest $request)
    {
        $role = Role::create($request->validated());

        // Attach permissions
        if (! empty($request->permissions)) {
            $role->syncPermissions($request->permissions);
        }

        return back()->with('success', 'Role created.');
        //return redirect(route('admin.roles.index'))->with('success', 'Role created.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Role  $role
     * @return Inertia
     */
    public function edit(Role $role)
    {
        $permissions = Permission::all('id', 'name', 'guard_name');

        $rolePermissions = DB::table('role_has_permissions')
            //->select('permission_id as id')
            ->where('role_has_permissions.role_id', $role->id)
            //->get();
            ->pluck('role_has_permissions.permission_id', 'role_has_permissions.permission_id')
            ->all();

        return Inertia::render('Permission::Role/Edit', [
            'role' => $role,
            'rolePermissions' => $permissions->whereIn('id', $rolePermissions)->pluck('id'),
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  RoleFormRequest  $request
     * @param  Role  $role
     * @return Redirect
     */
    public function update(RoleFormRequest $request, Role $role)
    {
        $role->update($request->validated());

        // Attach permissions
        if (! empty($request->permissions)) {
            $role->syncPermissions($request->permissions);
        }

        return redirect(route('admin.roles.index'))->with('success', 'Role updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Role  $role
     * @return Redirect
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return back()->with('success', 'Role deleted.');
        //return redirect(route('admin.roles.index'))->with('success', 'Role deleted.');
    }
}
