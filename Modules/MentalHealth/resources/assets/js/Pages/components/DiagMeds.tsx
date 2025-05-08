import React, { useState, useEffect } from 'react';
import icd10Data from '../json/Mental_Health_icd_10_code.json'; // ICD-10 Codes Data
import mentalHealthMeds from '../json/mental_health_meds.json'; // Medicine Data
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { NotebookPen, Send } from 'lucide-react';
import { Input } from '@headlessui/react';
import ModalRXDiagMeds from '../modal/ModalRXDiagMeds';
import ModalDiagMedsEnc from '../modal/ModalDiagMedsEnc';

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

  useEffect(() => {
    console.log("Diagnosis selected:", selectedDiagnosis);
  }, [selectedDiagnosis]);

  useEffect(() => {
    console.log("ICD Code selected:", selectedIcdCode);
  }, [selectedIcdCode]);

  useEffect(() => {
    const description = icd10Data[selectedDiagnosis as keyof typeof icd10Data]?.find(
      (item) => item.code === selectedIcdCode
    )?.description;
    if (description) {
      console.log("ICD-10 Description:", description);
    }
  }, [selectedDiagnosis, selectedIcdCode]);

  const [dateIssued, setDateIssued] = useState('');
  useEffect(() => {
    if (dateIssued) console.log("Date Issued:", dateIssued);
  }, [dateIssued]);

  const doctors = [
    { id: "doc1", name: "Dr. Sample V. Quak" },
    { id: "doc2", name: "Dr. Jane Doe" },
    { id: "doc3", name: "Dr. John Smith" },
  ];
  
  const [selectedDoctor, setSelectedDoctor] = useState("");
  
  useEffect(() => {
    const doctor = doctors.find((doc) => doc.id === selectedDoctor);
    if (doctor) {
      console.log("Selected Doctor:", doctor);
    }
  }, [selectedDoctor]);

  const [remarks, setRemarks] = useState('');
  useEffect(() => {
    if (remarks) console.log("Remarks:", remarks);
  }, [remarks]);
  

  useEffect(() => {
    console.log("Medicine selected:", selectedMedicine);
  }, [selectedMedicine]);

  useEffect(() => {
    console.log("Intake:", intake, intakeUnit);
  }, [intake, intakeUnit]);

  useEffect(() => {
    console.log("Frequency:", frequency, frequencyUnit);
  }, [frequency, frequencyUnit]);

  useEffect(() => {
    console.log("Duration:", duration, durationUnit);
  }, [duration, durationUnit]);

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

  useEffect(() => {
    const totalQuantity = calculateTotalQuantity();
    console.log("Total Quantity:", totalQuantity);
  }, [intake, frequency, duration, frequencyUnit, durationUnit]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isrxModalOpen, setRxIsModalOpen] = useState(false);



  return (
    <div className="bg-gray-48 p-4 rounded-lg border mt-2 space-y-3">
        <div className="bg-blue-500 px-4 py-3 flex w-full items-center rounded-t-lg">
          <h6 className="text-lg font-semibold text-white w-full">
            III. Continuation of Manage MNS Assessment
            <span className="text-sm italic text-white">
              {' '}
              (refer to mhGAP-IG version 2.0 p.11)
            </span>
          </h6>
        </div>
      {/* Diagnosis Section */}
      <div className="p-4 rounded-lg border mt-2 space-y-3">

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
        </div>


      {/* Medicine Section */}
      <div className="p-4 rounded-lg border mt-2 space-y-3">
        <h4 className="text-xl font-semibold text-gray-700">Medicine</h4>
        <div className="flex items-end gap-4">
          {/* Date Issued */}
          <div className="flex-1">
            <h5 className="text-sm font-medium text-gray-700">Date Issued</h5>
            <Input
              type="date"
              id="date_issue"
              name="date_issue"
              className="w-full p-2 border rounded-md"
              value={dateIssued}
              onChange={(e) => setDateIssued(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label className="text-sm font-medium text-gray-700">Recommended Medicine</Label>
            <Select value={selectedMedicine} onValueChange={setSelectedMedicine} name="recommended_medicine">
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="-- Select Medicine --" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((med, idx) => (
                  <SelectItem key={idx} value={med.name}>
                    {med.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-80">
            <Label className="text-sm font-medium text-gray-700">Rx Prescription List</Label>
            <Button
              type="button"
              onClick={() => setRxIsModalOpen(true)}
              className="w-full p-2 rounded-md text-sm flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
            >
              <NotebookPen size={16} className="text-white" />
              Rx List
            </Button>
          </div>
          <div className="w-80">
            <Label className="text-sm font-medium text-gray-700">Patient Medication History</Label>
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
              <Select value={intakeUnit} onValueChange={setIntakeUnit}>
                <SelectTrigger className="w-full p-2 border rounded-md">
                  <SelectValue placeholder="Select Intake" />
                </SelectTrigger>
                <SelectContent>
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
                <Select value={frequencyUnit} onValueChange={setFrequencyUnit}>
                  <SelectTrigger className="w-full p-2 border rounded-md">
                    <SelectValue placeholder="Select Frequency" />
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

            <div className="flex-1">
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-40 p-2 border rounded-md"
                  placeholder="e.g. 1,2,3"
                />
                <Select value={durationUnit} onValueChange={setDurationUnit}>
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

        <div className="mt-4 flex gap-4">
          {/* Total Quantity */}
          <div className="flex-1">
            <h5 className="text-sm font-medium text-gray-700">Total Quantity</h5>
            <Input
                className="w-full p-2 border rounded-md"
                value={calculateTotalQuantity()}
                readOnly
              />
          </div>
          {/* Doctor */}
          <div className="flex-1">
              <h5 className="text-sm font-medium text-gray-700">Issued By</h5>
              <Select onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-full p-2 border rounded-md">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          {/* Remarks */}
          <div className="flex-1">
            <h5 className="text-sm font-medium text-gray-700">Remarks</h5>
              <Textarea
                rows={3}
                className="w-full p-2 border rounded-md"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
          </div>
        </div>

        <Button>
          <Send size={16} className="mr-2" />
          Save Meds
          </Button>
      </div>


      {/* Rx List Modal */}
      {isrxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Rx Prescription List</h2>
              <Button size="icon" variant="ghost" onClick={() => setRxIsModalOpen(false)}>
                ✕
              </Button>
            </div>

              <ModalRXDiagMeds/>

          </div>
        </div>
      )}


      {/* Medication List Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <ModalDiagMedsEnc setIsModalOpen={setIsModalOpen} />

        </div>
      )}
    </div>
  );
};

export default DiagMeds;
