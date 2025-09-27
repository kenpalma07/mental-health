import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type { MasterPatient, MentalAssessmentForm, Pharma } from '@/types';
import logoDOH from "@assets/img/logos/Department_of_Health.png";
import logoBP from "@assets/img/logos/bp_logo.png";

function renderDosage(record: Pharma) {
  const formatNumber = (value: string | undefined) => {
    if (!value || parseFloat(value) === 0) return '';
    const floatVal = parseFloat(value);
    return floatVal % 1 === 0 ? `${parseInt(floatVal.toString())}` : `${floatVal}`;
  };
  const intake = record.phar_intake ? `${formatNumber(record.phar_intake)} ${record.phar_intakeUnit ?? ''}`.trim() : '';
  const freq = record.phar_freq ? `${formatNumber(record.phar_freq)} ${record.phar_freqUnit ?? ''}`.trim() : '';
  const duration = record.phar_dur ? `${formatNumber(record.phar_dur)} ${record.phar_durUnit ?? ''}`.trim() : '';
  const quantity = record.phar_quantity && parseFloat(record.phar_quantity) !== 0
    ? `Qty: ${formatNumber(record.phar_quantity)}`
    : '';
  return [intake, freq, duration, quantity].filter(Boolean).join(', ');
}


const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  logo: { width: 60, height: 60 },
  titleBlock: { textAlign: "center", flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", textTransform: "uppercase" },
  subtitle: { fontSize: 11, textTransform: "uppercase" },
  section: { marginBottom: 8 },
  flexRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginBottom: 8 },
  card: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, padding: 12, backgroundColor: "#f3f4f6", flex: 1, minHeight: 120 },
  cardCenter: { alignItems: "center", justifyContent: "center" },
  cardTitle: { fontWeight: "bold", fontSize: 12, marginBottom: 4, color: "#333" },
  label: { fontWeight: "bold", fontSize: 10, color: "#333" },
  value: { fontSize: 10, borderBottomWidth: 1, borderColor: "#000", paddingBottom: 2, marginBottom: 6 },
  table: { width: "100%", borderWidth: 1, borderColor: "#000", borderRadius: 8, overflow: "hidden" },
  tableRow: { flexDirection: "row" },
  tableHeader: { backgroundColor: "#000" },
  tableHeaderText: { color: "#fff", fontWeight: "bold", fontSize: 9 },
  tableCell: { borderWidth: 1, borderColor: "#000", padding: 2, flex: 1, textAlign: "center", fontSize: 9 },
  medTitle: { textAlign: "center", fontWeight: "bold", fontSize: 13, color: "#333", marginBottom: 6 },
  signature: { borderTopWidth: 1, borderColor: "#ccc", marginTop: 8, paddingTop: 4, fontSize: 10, color: "#555" },
});

interface MedicationCardPDFProps {
  patient: MasterPatient;
  assessments: MentalAssessmentForm[];
  medicationRecords: Pharma[];
}

export const MedicationCardPDF: React.FC<MedicationCardPDFProps> = ({ patient, assessments, medicationRecords = [] }) => {
  const phar_doc = assessments[0]?.phar_doc || '';
  const fullName = [patient.pat_fname, patient.pat_mname, patient.pat_lname].filter(Boolean).join(' ');
  const fullAddress = [patient.patient_address, patient.bgycode, patient.citycode, patient.provcode].filter(Boolean).join(', ');

  return (
    <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={logoDOH} style={{ width: 50, height: 50 }} />
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Medication Card</Text>
            <Text style={styles.subtitle}>{patient.provider_name}</Text>
          </View>
          <Image src={logoBP} style={{ width: 60, height: 60 }} />
        </View>
              {/* Card Row - landscape, flex row, 3 columns, match form */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
                {/* Allergy Alert */}
                <View style={{ width: '32%', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 16, padding: 16, backgroundColor: '#f3f4f6', minHeight: 120 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8, color: '#374151' }}>Allergy Alert</Text>
                  <View style={{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, minHeight: 48, backgroundColor: '#fff', padding: 8 }}>
                    <Text style={{ color: '#888', fontSize: 10 }}></Text>
                  </View>
                </View>
                {/* Patient Info */}
                <View style={{ width: '32%', borderWidth: 1, borderColor: '#fff', borderRadius: 16, padding: 16, backgroundColor: '#f3f4f6', minHeight: 120 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8, color: '#374151' }}>Patient Info</Text>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#374151' }}>Name</Text>
                    <Text style={{ fontSize: 10, borderBottomWidth: 1, borderColor: '#000', paddingBottom: 2, marginBottom: 4 }}>{fullName}</Text>
                  </View>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#374151' }}>Address</Text>
                    <Text style={{ fontSize: 10, borderBottomWidth: 1, borderColor: '#000', paddingBottom: 2, marginBottom: 4 }}>{fullAddress}</Text>
                  </View>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#374151' }}>Phone</Text>
                    <Text style={{ fontSize: 10, borderBottomWidth: 1, borderColor: '#000', paddingBottom: 2, marginBottom: 4 }}>{patient.pat_mobile ?? ''}</Text>
                  </View>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#374151' }}>Birthdate</Text>
                    <Text style={{ fontSize: 10, borderBottomWidth: 1, borderColor: '#000', paddingBottom: 2, marginBottom: 4 }}>{patient.pat_birthDate ?? ''}</Text>
                  </View>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#374151' }}>Doctor</Text>
                    <Text style={{ fontSize: 10, borderBottomWidth: 1, borderColor: '#000', paddingBottom: 2, marginBottom: 4 }}>{phar_doc}</Text>
                  </View>
                </View>
                {/* Logos and Signature */}
                <View style={{ width: '32%', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 16, padding: 16, backgroundColor: '#f3f4f6', minHeight: 120, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
                    <Image src={logoDOH} style={{ width: 32, height: 32 }} />
                    <Image src={logoBP} style={{ width: 32, height: 32 }} />
                  </View>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#1f2937', marginBottom: 2 }}>MEDICATION CARD</Text>
                  <Text style={{ fontSize: 12, color: '#555', marginBottom: 8, textAlign: 'center' }}>{patient.provider_name}</Text>
                  <View style={{ borderTopWidth: 1, borderColor: '#d1d5db', marginTop: 8, paddingTop: 4, width: '100%' }}>
                    <Text style={{ fontSize: 10, color: '#555', textAlign: 'center' }}>{phar_doc}{"\n"}Authorized Signature</Text>
                  </View>
                </View>
              </View>
              {/* Medication Table - no card design */}
              <View style={{ marginTop: 16 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#1f2937', marginBottom: 8 }}>MEDICATION</Text>
                <View style={{ width: '100%' }}>
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Name of Drug</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Date</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Dose/Strength</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Given/Total Quantity</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText]}>Signature</Text>
                  </View>
                  {medicationRecords.length === 0 ? (
                    <View style={styles.tableRow}>
                      <Text style={{ ...styles.tableCell, flex: 5 }}>No medication records available.</Text>
                    </View>
                  ) : (
                    medicationRecords.map((med, index) => (
                      <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{med.phar_med}</Text>
                        <Text style={styles.tableCell}>{med.phar_date}</Text>
                        <Text style={styles.tableCell}>{renderDosage(med)}</Text>
                        <Text style={styles.tableCell}>{med.phar_quantity}</Text>
                        <Text style={styles.tableCell}>{phar_doc}</Text>
                      </View>
                    ))
                  )}
                </View>
              </View>
            </Page>
          </Document>
                );
        }
