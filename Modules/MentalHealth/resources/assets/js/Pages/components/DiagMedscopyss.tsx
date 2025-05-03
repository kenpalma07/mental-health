import React from 'react';
import icd10Data from '../json/Mental_Health_icd_10_code.json';
import { Printer,
    Check,
    X,
    NotebookPen,
    Send} from 'lucide-react';

import { Select,
SelectTrigger,
SelectValue,
SelectContent,
SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


            <div className="bg-gray-48 p-4 rounded-lg border mt-2 space-y-3">
              <div className="mt-2 space-y-6">
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
                          <SelectValue placeholder="-- Select Diagnosis --" />
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
                          {icd10Data[selectedDiagnosis as keyof typeof icd10Data]?.map((item) => (
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
                
    
                  {selectedDiagnosis && (
                    <div className="p-4 rounded-lg border mt-2 space-y-3">
                      <h4 className="text-xl font-semibold text-gray-700">Medicine</h4>
                      <div className="flex items-end gap-4">
                        {/* Recommended Medicine Select */}
                        <div className="flex-1">
                          <Label className="text-sm font-medium text-gray-700">
                            Recommended Medicine
                          </Label>
                          <Select
                            value={selectedMedicine}
                            onValueChange={setSelectedMedicine}
                            name="recommended_medicine"
                          >
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
    
                        {/* Patient Medication List Button */}
                        <div className="w-80">
                          <Label className="text-sm font-medium text-gray-700">
                            Patient Medication List
                          </Label>
                          <Button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="w-full p-2 rounded-md text-sm flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                          >
                            <NotebookPen size={16} className="text-white" />
                            Medication List
                          </Button>
                        </div>
    
                        
                        {/* Total Input */}
                        <div className="w-80">
                          {/* <Label className="text-sm font-medium text-gray-700">Total</Label>
                          <Input
                            type="text"
                            className="w-full p-2 border rounded-md text-sm"
                            placeholder="Total"
                            onChange={(e) => setSelectedMedicine(e.target.value)}
                          /> */}
                        </div>
    
    
                      </div>
                        
    
                      {isModalOpen && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
                              <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Patient Medication List</h2>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => setIsModalOpen(false)}
                                >
                                  ✕
                                </Button>
                              </div>
    
                              {/* Printable table */}
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
                                        <td className="border p-2">paracetamol</td>
                                        <td className="border p-2">-</td>
                                        <td className="border p-2">4mg</td>
                                        <td className="border p-2">oral</td>
                                        <td className="border p-2">4</td>
                                        <td className="border p-2 text-center">
                                          <Check className="text-green-600 inline-block" size={16} />
                                          <X className="text-red-600 inline-block ml-1" size={16} />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
    
                              {/* Print Button */}
                              <div className="flex justify-end">
                                <Button
                                  onClick={() => window.print()}
                                  className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg shadow"
                                >
                                  <Printer size={18} />
                                  Print
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
    
                        {selectedMedicine && (
                            <div className="space-y-4">
                              <div className="flex space-x-4">
                                {/* Intake Field */}
                                <div className="flex-1">
                                  <Label htmlFor="intake" className="text-sm font-medium text-gray-700">Intake</Label>
                                  <div className="flex space-x-2">
                                    <input
                                      type="number"
                                      id="intake"
                                      value={intake}
                                      onChange={(e) => setIntake(e.target.value)}
                                      className="w-30 p-2 border rounded-md"
                                      placeholder="e.g., 1, 2, 3"
                                    />
                                    <select
                                      value={intakeUnit}
                                      className="w-full p-2 border rounded-md"
                                      onChange={(e) => setIntakeUnit(e.target.value)}
                                    >
                                      <option value="" disabled>Select Intake</option>
                                      <option value="tablet">Tablet</option>
                                      <option value="vial">Vial</option>
                                      <option value="ampule">Ampule</option>
                                    </select>
                                  </div>
                                </div>
    
                                {/* Frequency Field */}
                                <div className="flex-1">
                                  <Label htmlFor="frequency" className="text-sm font-medium text-gray-700">Frequency</Label>
                                  <div className="flex space-x-2">
                                    <Input
                                      type="number"
                                      id="frequency"
                                      value={frequency}
                                      onChange={(e) => setFrequency(e.target.value)}
                                      className="w-40 p-2 border rounded-md"
                                      placeholder="e.g., 1, 2, 3"
                                    />
                                    <Select
                                      value={frequencyUnit}
                                      onValueChange={(value) => setFrequencyUnit(value)}
                                    >
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
    
                                {/* Duration Field */}
                                <div className="flex-1">
                                  <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration</Label>
                                  <div className="flex space-x-2">
                                    <Input
                                      type="number"
                                      id="duration"
                                      value={duration}
                                      onChange={(e) => setDuration(e.target.value)}
                                      className="w-40 p-2 border rounded-md"
                                      placeholder="e.g., 1, 2, 3"
                                    />
                                    <Select
                                      value={durationUnit}
                                      onValueChange={(value) => setDurationUnit(value)}
                                    >
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
    
                              {/* Total Quantity Calculation */}
                              {(() => {
                                const intakeNum = parseFloat(intake);
                                const freqNum = parseFloat(frequency);
                                const durNum = parseFloat(duration);
    
                                // Return 0 if any value is missing or invalid
                                if (
                                  isNaN(intakeNum) ||
                                  isNaN(freqNum) ||
                                  isNaN(durNum) ||
                                  !frequencyUnit ||
                                  !durationUnit
                                ) {
                                  return (
                                    <div className="mt-4">
                                      <Label className="text-sm font-medium text-gray-700">Total Quantity</Label>
                                      <div className="p-2 border rounded-md">0</div>
                                    </div>
                                  );
                                }
    
                                // Convert duration to hours
                                let durationInHours = durNum;
                                switch (durationUnit) {
                                  case "day": durationInHours *= 24; break;
                                  case "week": durationInHours *= 24 * 7; break;
                                  case "month": durationInHours *= 24 * 30; break;
                                  case "hour": default: break;
                                }
    
                                // Convert frequency to hours
                                let frequencyInHours = freqNum;
                                switch (frequencyUnit) {
                                  case "day": frequencyInHours = freqNum * 24; break;
                                  case "week": frequencyInHours = freqNum * 24 * 7; break;
                                  case "month": frequencyInHours = freqNum * 24 * 30; break;
                                  case "hour": default: break;
                                }
    
                                // Avoid division by zero
                                if (frequencyInHours === 0) {
                                  return (
                                    <div className="mt-4">
                                      <Label className="text-sm font-medium text-gray-700">Total Quantity</Label>
                                      <div className="p-2 border rounded-md">0</div>
                                    </div>
                                  );
                                }
    
                                const totalIntakes = Math.floor(durationInHours / frequencyInHours);
                                const totalQuantity = totalIntakes * intakeNum;
    
                                return (
                                <div className="space-y-3">
                                  <div className="flex space-x-3">
                                    <div className="flex-1">
                                      <Label className="text-sm font-medium text-gray-700">Total Quantity</Label>
                                      <div className="w-full p-2 border rounded-md">
                                        {isNaN(totalQuantity) || !isFinite(totalQuantity) ? 0 : totalQuantity}
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <Label className="text-sm font-medium text-gray-700">Date Started</Label>
                                      <div className="border rounded-md">
                                          <Input
                                            type="date"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="e.g., 1, 2, 3"
                                            //onChange={(e) => setSelectedMedicine(e.target.value)}
                                          />
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <Label className="text-sm font-medium text-gray-700">Remarks</Label>
                                      <div>
                                        <Textarea
                                          className="w-full mt-1 p-2 border rounded-md text-sm"
                                          rows={5}
                                          placeholder="Add any remarks here..."
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                );
                              })()}
                              {/* Total Quantity Calculation */}
                            </div>
                          )}
    
                    </div>//end for card
                  )}
                  <Button
                    className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg shadow"
                  >
                  <Send className="w-4 h-4" />
                  Save Data
                </Button>
                  </div>
              </div>
