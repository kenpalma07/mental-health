import React, { useState } from 'react';
import icd10Data from '../json/Mental_Health_icd_10_code.json'; // ICD-10 Codes Data
import mentalHealthMeds from '../json/mental_health_meds.json'; // Medicine Data
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { NotebookPen, Printer } from 'lucide-react';

const DiagMeds = ({
  selectedDiagnosis,
  setSelectedDiagnosis,
  selectedIcdCode,
  setSelectedIcdCode,
  selectedMedicine,
  setSelectedMedicine,
  intake,
  setIntake,
  intakeUnit,
  setIntakeUnit,
  frequency,
  setFrequency,
  frequencyUnit,
  setFrequencyUnit,
  duration,
  setDuration,
  durationUnit,
  setDurationUnit
}: {
  selectedDiagnosis: string;
  setSelectedDiagnosis: React.Dispatch<React.SetStateAction<string>>;
  selectedIcdCode: string;
  setSelectedIcdCode: React.Dispatch<React.SetStateAction<string>>;
  selectedMedicine: string;
  setSelectedMedicine: React.Dispatch<React.SetStateAction<string>>;
  intake: string;
  setIntake: React.Dispatch<React.SetStateAction<string>>;
  intakeUnit: string;
  setIntakeUnit: React.Dispatch<React.SetStateAction<string>>;
  frequency: string;
  setFrequency: React.Dispatch<React.SetStateAction<string>>;
  frequencyUnit: string;
  setFrequencyUnit: React.Dispatch<React.SetStateAction<string>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  durationUnit: string;
  setDurationUnit: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const diagnoses = [
    { label: 'Depression', icdKey: 'depression' },
    { label: 'Psychoses', icdKey: 'psychoses' },
    { label: 'Epilepsy', icdKey: 'epilepsy' },
    { label: 'Behavioural Disorders', icdKey: 'behavioral_disorder' },
    { label: 'Developmental Disorders', icdKey: 'developmental_disorder' },
    { label: 'Dementia', icdKey: 'dementia' },
    { label: 'Alcohol Use Disorder', icdKey: 'alcohol_use_disorder' },
    { label: 'Drug Use Disorder', icdKey: 'drug_use_disorder' },
    { label: 'Self-Harm/Suicide', icdKey: 'self_harm_suicide' },
  ];

  const medicines = selectedDiagnosis ? mentalHealthMeds[selectedDiagnosis as keyof typeof mentalHealthMeds] || [] : [];
  const icdCodes = icd10Data[selectedDiagnosis] || [];

  // Function to convert any unit to hours
  const convertToHours = (value: number, unit: string) => {
    switch (unit) {
      case 'hour':
        return value;
      case 'day':
        return value * 24;
      case 'week':
        return value * 7 * 24;
      case 'month':
        return value * 30 * 24; // approx
      default:
        return 0;
    }
  };

  // Calculate total quantity based on intake, frequency, and duration
  const calculateTotalQuantity = () => {
    const intakeNum = parseFloat(intake);
    const frequencyNum = parseFloat(frequency);
    const durationNum = parseFloat(duration);

    if (isNaN(intakeNum) || isNaN(frequencyNum) || isNaN(durationNum)) return 0;

    const frequencyInHours = convertToHours(frequencyNum, frequencyUnit);
    const durationInHours = convertToHours(durationNum, durationUnit);

    if (frequencyInHours === 0) return 0;

    const numDoses = Math.floor(durationInHours / frequencyInHours);
    return numDoses * intakeNum;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-48 p-4 rounded-lg border mt-2 space-y-3">
      {/* Diagnosis Section */}
      <div className="bg-blue-500 px-4 py-3 flex w-full items-center rounded-t-lg">
        <h6 className="text-lg font-semibold text-white w-full">
          III. Continuation of Manage MNS Assessment
          <span className="text-sm italic text-white">
            {' '}
            (refer to mhGAP-IG version 2.0 p.11)
          </span>
        </h6>
      </div>
      <h4 className="text-xl font-semibold text-gray-700">Diagnosis</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Diagnosis Field */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Diagnosis</Label>
            <Select
              value={selectedDiagnosis}
              onValueChange={(value) => setSelectedDiagnosis(value)}
              name="diagnosis_code"
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="-- Select Diagnosis --">
                  {selectedDiagnosis}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {diagnoses.map((d) => (
                  <SelectItem key={d.icdKey} value={d.icdKey}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ICD-10 Code Field */}
          <div>
            <Label className="text-sm font-medium text-gray-700">ICD-10 Code</Label>
            <Select
              value={selectedIcdCode}
              onValueChange={(value) => setSelectedIcdCode(value)}
              name="icd_code"
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue
                  placeholder="-- Select ICD-10 Code --"
                  defaultValue={selectedIcdCode}
                  aria-label={selectedIcdCode}
                >
                  {selectedIcdCode}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-[var(--radix-select-trigger-width)]">
                {(icd10Data[selectedDiagnosis as keyof typeof icd10Data] || []).map((item) => (
                  <SelectItem key={item.code} value={item.code}>
                    {item.code} - {item.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description Field */}
          <div>
            <Label className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              className="w-full mt-1 p-2 border rounded-md text-sm"
              rows={5}
              disabled
              value={
                icd10Data[selectedDiagnosis as keyof typeof icd10Data]?.find(
                  (item) => item.code === selectedIcdCode
                )?.description || ""
              }
            />
          </div>
        </div>


      {/* Medicine Section */}
      <div className="p-4 rounded-lg border mt-2 space-y-3">
        <h4 className="text-xl font-semibold text-gray-700">Medicine</h4>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Label className="text-sm font-medium text-gray-700">Recommended Medicine</Label>
            <Select value={selectedMedicine} onValueChange={setSelectedMedicine} name="recommended_medicine">
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="-- Select Medicine --" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((med, idx) => (
                  <SelectItem key={idx} value={med.name}>
                    {med.name} ({med.brand})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-80">
            <Label className="text-sm font-medium text-gray-700">Patient Medication List</Label>
            <Button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full p-2 rounded-md text-sm flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
            >
              <NotebookPen size={16} className="text-white" />
              Medication List
            </Button>
          </div>
        </div>

        {/* Intake, Frequency, Duration Inputs */}
        <div className="space-y-4">
          <div className="flex space-x-4">
          <div className="flex-1">
            <div className="flex space-x-2">
              <input
                type="number"
                value={intake}
                onChange={(e) => setIntake(e.target.value)}
                className="w-40 p-2 border rounded-md"
                placeholder="e.g. 1,2,3"
              />
              <Select value={intakeUnit} onValueChange={setIntakeUnit} className="w-full p-2 border rounded-md">
                <SelectTrigger className="w-full p-2 border rounded-md">
                  <SelectValue placeholder="Select Intake" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem disabled>Select Intake</SelectItem>  {/* This makes "Select Intake" not clickable */}
                  <SelectItem value="tablet">Tablet(s)</SelectItem>
                  <SelectItem value="ampule">Ampule(s)</SelectItem>
                  <SelectItem value="vial">Vial(s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


            <div className="flex-1">
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-40 p-2 border rounded-md"
                  placeholder="e.g. 1,2,3"
                />
                <Select value={frequencyUnit} onValueChange={setFrequencyUnit} className="mt-2 w-full ml-2">
                  <SelectTrigger className="w-full p-2 border rounded-md">
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem disabled>Select Frequency</SelectItem>
                    <SelectItem value="hour">Hour(s)</SelectItem>
                    <SelectItem value="day">Day(s)</SelectItem>
                    <SelectItem value="week">Week(s)</SelectItem>
                    <SelectItem value="month">Month(s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-40 p-2 border rounded-md"
                  placeholder="e.g. 1,2,3"
                />
                <Select value={durationUnit} onValueChange={setDurationUnit} className="mt-2 w-full ml-2">
                  <SelectTrigger className="w-full p-2 border rounded-md">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">Hour(s)</SelectItem>
                    <SelectItem value="day">Day(s)</SelectItem>
                    <SelectItem value="week">Week(s)</SelectItem>
                    <SelectItem value="month">Month(s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate and Display Total Quantity */}
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-700">Total Quantity</h5>
          <p className="text-lg font-bold">{calculateTotalQuantity()}</p>
        </div>
      </div>

      {/* Medication List Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Patient Medication List</h2>
              <Button size="icon" variant="ghost" onClick={() => setIsModalOpen(false)}>
                ✕
              </Button>
            </div>

            <div className="printable">
              <table className="w-full text-sm border mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Start Date</th>
                    <th className="border p-2 text-left">Medicine</th>
                    <th className="border p-2 text-left">Brand</th>
                    <th className="border p-2 text-left">Dosage</th>
                    <th className="border p-2 text-left">Instructions</th>
                    <th className="border p-2 text-left">Quantity</th>
                    <th className="border p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">01/01/2025</td>
                      <td className="border p-2">{med.name}</td>
                      <td className="border p-2">{med.brand}</td>
                      <td className="border p-2">1</td>
                      <td className="border p-2">Take 1 tablet daily</td>
                      <td className="border p-2">{calculateTotalQuantity()}</td>
                      <td className="border p-2">In Progress</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button
              className="w-full p-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 mt-4"
              onClick={() => window.print()}
            >
              <Printer size={16} className="mr-2" />
              Print Prescription
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagMeds;
