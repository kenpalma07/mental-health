<?php

namespace Modules\References\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\References\Models\Employee;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registered_at' => 'required|date',
            'emp_id' => 'required|string|max:100',
            'emp_fname' => 'required|string|max:100',
            'emp_mname' => 'required|string|max:100',
            'emp_lname' => 'required|string|max:100',
            'emp_position' => 'required|string|max:100',
            'emp_suffix' => 'required|string|max:100',
            'emp_sex' => 'required|string|max:2',
            'emp_birthdate' => 'required|date',
            'emp_hiredby' => 'required|string|max:100',
            'employment_status' => 'required|string|max:100',
            'emp_status' => 'required|string|max:2',
            'emp_prcno' => 'nullable|string|max:100',
            'emp_ptrno' => 'nullable|string|max:100',
            'emp_s2licno' => 'nullable|string|max:100',
            'emp_phicno' => 'nullable|string|max:100',
            'emp_phicaccreditno' => 'nullable|string|max:100',
            'emp_tin' => 'nullable|string|max:100',
        ]);

        $validated['registered_at'] = Carbon::parse($validated['registered_at'])->format('Y-m-d H:i:s');

        Employee::create($validated);

        return redirect()->route('employees')->with('success', 'Employee added succesfully!');
    }

    public function edit($id)
    {
        $employee = Employee::find($id);
        return response()->json($employee);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'registered_at' => 'required|date',
            'emp_id' => 'required|string|max:100',
            'emp_fname' => 'required|string|max:100',
            'emp_mname' => 'required|string|max:100',
            'emp_lname' => 'required|string|max:100',
            'emp_position' => 'required|string|max:100',
            'emp_suffix' => 'required|string|max:100',
            'emp_sex' => 'required|string|max:2',
            'emp_birthdate' => 'required|date',
            'emp_hiredby' => 'required|string|max:100',
            'employment_status' => 'required|string|max:100',
            'emp_status' => 'required|string|max:2',
            'emp_prcno' => 'nullable|string|max:100',
            'emp_ptrno' => 'nullable|string|max:100',
            'emp_s2licno' => 'nullable|string|max:100',
            'emp_phicno' => 'nullable|string|max:100',
            'emp_phicaccreditno' => 'nullable|string|max:100',
            'emp_tin' => 'nullable|string|max:100',
        ]);

        $employee = Employee::findOrFail($id);
        $employee->update($validated);

        return redirect()->route('employees')->with('success', 'Employee updated successfully!');
    }

    public function exportConsentPDF(Employee $employee)
    {
        $pdf = Pdf::loadView('references::pdfs.employee-consent', ['employee' => $employee]);
        return $pdf->stream("employee-consent-{$employee->emp_id}.pdf");
    }

    public function streamConsentPDF(Employee $employee)
    {
        $pdf = Pdf::loadView('references::pdfs.employee-consent', ['employee' => $employee]);
        return $pdf->stream("employee-consent-{$employee->emp_id}.pdf");
    }
}
