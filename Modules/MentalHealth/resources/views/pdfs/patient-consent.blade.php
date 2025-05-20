<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Patient Consent</title>
    <style>
        body { font-family: sans-serif; }
        h5 { text-align: center; }
    </style>
</head>
<body>

    <h5>Republic of the Philippines</h5>
    <h5>Province of {{ $patient->facility_name ?? 'N/A' }}</h5>

    <p><strong>Facility Code:</strong> {{ $facility->fhudcode ?? 'N/A' }}</p>
    <p><strong>Facility Name:</strong> {{ $facility->facility_name ?? 'N/A' }}</p>
    <p>Facility Name: {{ $patient?->facility_name ?? 'N/A' }}</p>

    <p>
        I, <strong>{{ $patient->pat_fname }}</strong>, hereby acknowledge that...
    </p>

    <br><br><br>
    <p>Signature: ______________________</p>

</body>
</html>
