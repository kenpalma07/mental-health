<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Patient Consent</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            line-height: 1.5;
            font-size: 12px;
        }

        .container {
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
        }

        .text-center {
            text-align: center;
        }

        .text-justify {
            text-align: justify;
        }

        .mb-2 {
            margin-bottom: 0.5rem;
        }

        .mb-4 {
            margin-bottom: 1rem;
        }

        .mb-6 {
            margin-bottom: 1.5rem;
        }

        .font-bold {
            font-weight: bold;
        }

        .font-semibold {
            font-weight: 600;
        }

        .italic {
            font-style: italic;
        }

        .separator {
            margin: 1rem 0;
            border-bottom: 1px solid #ccc;
        }

        /* Custom spacing reduction */
        .tight-header p {
            margin: 0;
            line-height: 1.2;
        }
    </style>
</head>

<body>
    <div class="container">
        {{-- Header --}}
        <div class="text-center tight-header">
            <p class="font-bold">Republic of the Philippines</p>
            <p>PROVINCE OF {{ $facility->provcode }}</p>
            <p class="font-semibold">MUNICIPALITY OF {{ $facility->citycode }}</p>
            <p class="text-sm">
                {{ $facility->facility_address }}, {{ $facility->bgycode }}, {{ $facility->citycode }}, {{ $facility->provcode }}
                <br>
                Email: {{ $facility->facility_email }}
            </p>
        </div>

        <h2 class="text-center mb-1 font-bold">{{ $facility->facility_name }}</h2>
        <p class="text-center italic mb-1">Transforming Lives, Building Healthy Communities</p>
        <h3 class="text-center mb-4 font-semibold">INFORMED CONSENT</h3>

        {{-- Body --}}
        <div class="text-justify">
            <p>
                I,
                <strong>{{ $patient->pat_fname }} {{ $patient->pat_lname }}</strong>,
                <strong>{{ $age }}</strong> years of age, hereby consent to the medical, nursing, laboratory, and radiology procedures to be
                conducted by the staff of the <strong>{{ $facility->facility_name }} of {{ $facility->citycode }}</strong>. I
                entrust myself/the patient to their care and authorize them to administer necessary medications and treatments as
                prescribed by my attending physician whom I have voluntarily chosen and accepted to treat me/the patient.
            </p>

            <p>
                I have been thoroughly explained on the treatment and procedures involved and have been provided with all necessary
                information. I understand that these may encompass various diagnostic tests, injections, and potentially invasive
                surgeries and procedures.
            </p>

            <p><em>(Please specify the surgery or procedure if any)</em></p>
            <div class="separator"></div>

            <p>
                Furthermore, I consent to the administration of anesthesia during the procedure as may then be considered necessary or
                desirable in the judgment of the medical staff. I also grant permission for the disposal of any tissues or parts by
                authorities of the Primary Care Facility (PCF) that may be deemed necessary to remove from me/the patient.
            </p>

            <p>I agree to the documentation of the treatment or operation through photography and/or videography.</p>

            <p>
                I am fully aware of and properly explained the <strong>No Balance Billing Policy</strong> for basic accommodation in the
                PCF. I am also informed on the pricing of various services and commodities offered by the facility such as the price of
                basic accommodation, fees of medical and surgical procedures, price of laboratory and professional fees, price of drugs
                and medicines and medical supplies, bundle/package price of health services, corresponding PhilHealth case rates and
                Z-package rates if applicable.
            </p>

            <p>
                I understand that personal and sensitive data may be collected, and it will be handled with utmost confidentiality.
                Additionally, I have been informed about how the information will be used, stored, and shared.
            </p>

            <p>
                This consent is given freely and voluntarily, without any external pressure or coercion. I acknowledge the potential risks
                and complications associated with the procedures, which may not always be foreseeable or avoidable.
            </p>

            <p>
                I understand that neither the attending physician(s) nor the PCF personnel will be held liable for any charges, provided
                there is no negligence on their part. 
            </p>

            <p>
                ______________________________ <br>
                Signature over Printed Name
            </p>
        </div>
    </div>
</body>

</html>