<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Employee Consent</title>
    <style>
        body { font-family: sans-serif; }
    </style>
</head>
<body>
    <h2>Employee Consent Form</h2>

    <p>
        I, <strong>{{ $employee->emp_fname }} {{ $employee->emp_mname }} {{ $employee->emp_lname }}</strong>,
        working as a <strong>{{ $employee->emp_position }}</strong>, hereby acknowledge that...
    </p>

    <p>Status: <strong>{{ $employee->emp_status }}</strong></p>

    <br><br><br>
    <p>Signature: ______________________</p>
</body>
</html>
