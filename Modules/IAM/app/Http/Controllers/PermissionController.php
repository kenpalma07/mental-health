<?php

namespace Modules\IAM\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Core\Http\Controllers\CoreController as Controller;
use Modules\IAM\Models\Permission;
use Modules\IAM\Http\Requests\PermissionFormRequest;
use Illuminate\Http\RedirectResponse;
use Modules\IAM\Services\PermissionService;

class PermissionController extends Controller
{
    private PermissionService $permissionService;
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(PermissionService $permissionService)
    {
        $this->authorizeResource(Permission::class, 'permission');

        $this->permissionService = $permissionService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */
    public function index(Request $request)
    {
        $permissions = $this->permissionService->index();

        return inertia('IAM::Permission/index', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Inertia
     */
    public function create()
    {
        return Inertia::render('Permission::Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PermissionFormRequest  $request
     * @return Redirect
     */
    public function store(PermissionFormRequest $request): RedirectResponse
    {
        Permission::create($request->validated());

        return redirect(route('admin.permissions.index'))->with('success', 'Permission created.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Permission  $permission
     * @return Inertia
     */
    public function edit(Permission $permission)
    {
        return Inertia::render('Permission::Permission/Edit', [
            'permission' => $permission,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PermissionFormRequest  $request
     * @param  Permission  $permission
     * @return Redirect
     */
    public function update(PermissionFormRequest $request, Permission $permission): RedirectResponse
    {
        $permission->update($request->validated());

        return redirect(route('admin.permissions.index'))->with('success', 'Permission updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Permission  $permission
     * @return Redirect
     */
    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect(route('admin.permissions.index'))->with('success', 'Permission deleted.');
    }
}
