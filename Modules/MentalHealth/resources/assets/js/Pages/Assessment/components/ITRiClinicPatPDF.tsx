import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  Consultations,
  MasterPatient,
  MentalAssessmentForm,
  Pharma,
} from '@/types';

interface Props {
  patient: MasterPatient;
  consultation?: Consultations;
  pharmaMeds?: Pharma[];
  assessments?: MentalAssessmentForm[];
}

const styles = StyleSheet.create({
  page: { padding: 12, fontSize: 9 },
  headerRow: { flexDirection: 'row', borderWidth: 1, borderColor: '#000', padding: 4 },
  logoBox: { width: 50, height: 50, borderRightWidth: 1, borderColor: '#000' },
  headerText: { flex: 1, paddingLeft: 4, justifyContent: 'center' },
  headerRight: { width: 80, justifyContent: 'center' },
  headerSmall: { fontSize: 7 },
  headerBig: { fontSize: 12, fontWeight: 'bold' },
  title: { textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  sectionHeader: { backgroundColor: '#000', padding: 2, marginTop: 4 },
  sectionHeaderText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  row: { flexDirection: 'row' },
  labelCell: { borderWidth: 1, borderColor: '#000', padding: 2, flex: 1, fontSize: 9 },
  valueCell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  checkCell: { borderWidth: 1, borderColor: '#000', padding: 2, flex: 1, fontSize: 9 },
  tableHeaderRow: { flexDirection: 'row' },
  tableHeaderCell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: { flexDirection: 'row' },
  tableCell: { borderWidth: 1, borderColor: '#000', padding: 2, flex: 1, fontSize: 9 },
});

export default function ITRiClinicPatPDF({
  patient,
  consultation,
  pharmaMeds = [],
}: Props) {
  // helpers
  const renderCheckbox = (label: string, selectedList: string | undefined) => {
    const normalizedSelected =
      selectedList
        ?.split(',')
        .map((item) =>
          item.trim().toLowerCase().replace(/[\s-]/g, '')
        ) || [];
    const normalizedLabel = label.toLowerCase().replace(/[\s-]/g, '');

    const isVisited =
      normalizedLabel === 'visited' &&
      (normalizedSelected.includes('followupvisit') ||
        normalizedSelected.includes('newadmission') ||
        normalizedSelected.includes('newconsultation'));

    const isChecked =
      normalizedSelected.includes(normalizedLabel) || isVisited;

    // react-pdf can't render <input>, so return text with a box
    return (
      <Text style={styles.checkCell}>
        [{isChecked ? '✔' : ' '}] {label}
      </Text>
    );
  };

  const calculateAge = (birthDateString: string) => {
    if (!birthDateString) return '-';
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatNumber = (value?: string | number): string => {
    if (!value) return '';
    const num = parseFloat(value.toString());
    if (isNaN(num)) return value.toString();
    return num % 1 === 0
      ? parseInt(value.toString()).toString()
      : num.toString();
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.logoBox}>{/* <Image> here */}</View>
          <View style={styles.headerText}>
            <Text style={styles.headerSmall}>Republic of the Philippines</Text>
            <Text style={styles.headerBig}>Department of Health</Text>
            <Text style={styles.headerSmall}>Kagawaran ng Kalusugan</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerSmall}>Family Serial No:</Text>
            <Text style={styles.headerSmall}>Facility Code:</Text>
          </View>
        </View>
        <Text style={styles.title}>INDIVIDUAL TREATMENT RECORD</Text>

        {/* I. Patient Information */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>
            I. Patient Information (Impormasyon ng Pasyente)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelCell}>Last Name</Text>
          <Text style={styles.valueCell}>{patient?.pat_lname}</Text>
          <Text style={styles.labelCell}>First Name</Text>
          <Text style={styles.valueCell}>{patient?.pat_fname}</Text>
          <Text style={styles.labelCell}>Middle Name</Text>
          <Text style={styles.valueCell}>{patient?.pat_mname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelCell}>Birth Date</Text>
          <Text style={styles.valueCell}>{patient?.pat_bdate}</Text>
          <Text style={styles.labelCell}>Sex</Text>
          <Text style={styles.valueCell}>{patient?.pat_sex}</Text>
          <Text style={styles.labelCell}>Age</Text>
          <Text style={styles.valueCell}>
            {calculateAge(patient?.pat_bdate)}
          </Text>
        </View>

        {/* II. Mode of Transaction */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>
            II. Mode of Transaction (Uri ng Transaksyon)
          </Text>
        </View>
        <View style={styles.row}>
          {renderCheckbox('Walk-in', consultation?.consult_type_code)}
          {renderCheckbox('Referral', consultation?.consult_type_code)}
          {renderCheckbox('Other', consultation?.consult_type_code)}
        </View>

        {/* III. Diagnosis & Medicines */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>III. Diagnosis and Medicines</Text>
        </View>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderCell}>Diagnosis / ICD10</Text>
          <Text style={styles.tableHeaderCell}>Medicine</Text>
          <Text style={styles.tableHeaderCell}>Dosage</Text>
          <Text style={styles.tableHeaderCell}>Frequency</Text>
          <Text style={styles.tableHeaderCell}>Duration</Text>
          <Text style={styles.tableHeaderCell}>Qty</Text>
        </View>
        {pharmaMeds.map((m, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.tableCell}>{m.diagnosis}</Text>
            <Text style={styles.tableCell}>{m.medicine}</Text>
            <Text style={styles.tableCell}>{m.dosage}</Text>
            <Text style={styles.tableCell}>{m.frequency}</Text>
            <Text style={styles.tableCell}>{m.duration}</Text>
            <Text style={styles.tableCell}>{formatNumber(m.qty)}</Text>
          </View>
        ))}

        {/* IV. Lab / Vital Signs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>IV. Laboratory / Vital Signs</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelCell}>Blood Pressure</Text>
          <Text style={styles.valueCell}>{consultation?.blood_pressure}</Text>
          <Text style={styles.labelCell}>Pulse</Text>
          <Text style={styles.valueCell}>{consultation?.pulse}</Text>
          <Text style={styles.labelCell}>Temp</Text>
          <Text style={styles.valueCell}>{consultation?.temp}</Text>
        </View>
      </Page>
    </Document>
  );
}


