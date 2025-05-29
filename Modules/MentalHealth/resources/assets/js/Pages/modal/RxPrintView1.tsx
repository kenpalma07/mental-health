import React from 'react';

interface RxPrintProps {
  patient: {
    full_name: string;
    birthdate: string;
    sex: string;
    address: string;
    age: string;
  };
  date: string;
  medicine: {
    name: string;
    quantity: number;
    frequency: string;
    dose: string;
    remarks?: string;
  };
}

const RxPrintView = React<HTMLDivElement, RxPrintProps>(
  () => {
    return (
      <div className="p-8 text-black font-sans bg-white w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="text-6xl font-bold leading-none">℞</div>
          <div className="text-center w-full -ml-16">
            <h1 className="font-bold text-xl uppercase">Tagbina Rural Health Unit and Family Planning Center</h1>
            <h2 className="font-semibold text-md uppercase">Poblacion Tagbina Surigao Del Sur</h2>
          </div>
          <div className="w-24 h-24">
            <img
              src="/path/to/doh-logo.png" 
              alt="DOH Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-2 text-sm mb-4 gap-y-2">
          <div>
            <span className="font-semibold">Patient:</span> sample patient
          </div>
          <div>
            <span className="font-semibold">Date:</span> 01/01/2025
          </div>
          <div>
            <span className="font-semibold">Address:</span> sample address
          </div>
          <div>
            <span className="font-semibold">Age:</span> 25
          </div>
        </div>

        {/* Table */}
        <table className="w-full border border-black text-sm text-center mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-2 py-1">Medicine</th>
              <th className="border border-black px-2 py-1">Quantity</th>
              <th className="border border-black px-2 py-1">Frequency</th>
              <th className="border border-black px-2 py-1">Dose Regimen</th>
              <th className="border border-black px-2 py-1">Medication/Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 font-semibold">data med here</td>
              <td className="border border-black px-2 py-1">quantity</td>
              <td className="border border-black px-2 py-1">freq ghee</td>
              <td className="border border-black px-2 py-1">dose het</td>
              <td className="border border-black px-2 py-1">remarks here</td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div className="text-right text-sm mt-12 leading-tight">
          <p><span className="font-semibold">Prescribed By:</span> <u>Dr. ITSAMPLE N/A CASIPONG</u></p>
          <p><span className="font-semibold">License No:</span> <u>4852632</u></p>
          <p><span className="font-semibold">PTR No:</span> ______________________</p>
        </div>
      </div>
    );
  }
);

RxPrintView.displayName = 'RxPrintView';

export default RxPrintView;
