<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Set the default per-page value if not provided
        $perPage = $request->input('per_page', 10);

        $query = Employee::query();

        // Apply search filter if provided
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('emp_fname', 'like', "%{$search}%")
                    ->orWhere('emp_mname', 'like', "%{$search}%")
                    ->orWhere('emp_lname', 'like', "%{$search}%")
                    ->orWhere('emp_position', 'like', "%{$search}%")
                    ->orWhere('emp_status', 'like', "%{$search}%");
            });
        }

        // Apply pagination and return results
        $employees = $query->paginate($perPage)->appends($request->only(['search', 'per_page']));

        return inertia('References::Employees/index', [
            'employees' => $employees->items(),
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'last_page' => $employees->lastPage(),
                'per_page' => $perPage,
                'total' => $employees->total(),
            ],
            'filters' => $request->only(['search']),
        ]);
    }
}
