<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Employee Consent</title>
    <style>
        body {
            font-family: sans-serif;
        }

        h1,
        h2,
        h3,
        h5,
        h6 {
            text-align: center;
        }
    </style>
</head>

<body>
    <div></div>
    <h5>Republic of the Philippines</h5>
    <h5>Province of {{ $patient->facility_name }}</h5>
    <p>Facility Name: {{ $fhudFacility->facility_name }}</p>
    <p>Facility Code: {{ $fhudFacility->code ?? 'N/A' }}</p>

    <p>
        I, <strong>{{ $patient->pat_fname }}</strong>,
        working as a , hereby acknowledge that...
    </p>

    <p>Status: </p>

    <br><br><br>
    <p>Signature: ______________________</p>
</body>

</html>