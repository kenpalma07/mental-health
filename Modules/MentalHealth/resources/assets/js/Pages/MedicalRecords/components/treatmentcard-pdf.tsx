import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import type {
    MasterPatient,
    MentalAssessmentForm, Pharma, TreatMedicationRecord
} from '@/types';
import logoDOH from "@assets/img/logos/Department_of_Health.png";
import logoBP from "@assets/img/logos/bp_logo.png";

const styles = StyleSheet.create({
    page: { padding: 24, fontSize: 10, backgroundColor: "#fff" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
    logo: { width: 60, height: 60 },
    titleBlock: { textAlign: "center", flex: 1 },
    title: { fontSize: 16, fontWeight: "bold", textTransform: "uppercase" },
    subtitle: { fontSize: 11, textTransform: "uppercase" },
    section: { marginBottom: 1 },
    label: { fontWeight: "bold", fontSize: 10 },
    value: { fontSize: 10, borderBottomWidth: 1, borderColor: "#000", paddingBottom: 2, marginBottom: 6 },
    grid: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 12 },
    gridItem: { width: "48%" },
    gridItemFull: { width: "100%" },
    table: { width: "100%", borderWidth: 1, borderColor: "#000" },
    tableRow: { flexDirection: "row" },
    tableHeader: { backgroundColor: "#000" },
    tableHeaderText: { color: "#fff", fontWeight: "bold", fontSize: 9 },
    tableCell: { borderWidth: 1, borderColor: "#000", padding: 2, flex: 1, textAlign: "center", fontSize: 9 },
    textarea: { borderWidth: 1, borderColor: "#000", padding: 2, minHeight: 24, fontSize: 10 },
});

interface TreatmentCardPDFProps {
    patient: MasterPatient;
    assessments: MentalAssessmentForm[];
    medicationRecords: Pharma[];
}

function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const religionMap: { [key: string]: string } = {
    Chri: 'Christian',
    Cat: 'Catholic',
    Prot: 'Protestant',
    Isla: 'Islam',
    Bud: 'Buddhism',
    Hind: 'Hinduism',
};

const civilStatusMap: { [key: string]: string } = {
    sin: 'Single',
    mar: 'Married',
    div: 'Divorced',
    sep: 'Separated',
    wid: 'Widow/Widower',
};

function calculateAge(birthDate: string) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function renderDosage(record: TreatMedicationRecord) {
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

const TreatmentCardPDF: React.FC<TreatmentCardPDFProps> = ({ patient, assessments, medicationRecords = [] }) => {
    const age = calculateAge(patient.pat_birthDate);
    const icd_10_code = assessments[0]?.icd_10_code || '';
    const icd_10_descrip = assessments[0]?.icd_10_descrip || '';
    const diagnosis = assessments[0]?.diagnosis || '';

    const chunkedMedication: TreatMedicationRecord[][] = [];
    for (let i = 0; i < medicationRecords.length; i += 2) {
        chunkedMedication.push(medicationRecords.slice(i, i + 2));
    }
    while (chunkedMedication.length < 12) {
        chunkedMedication.push([]);
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image src={logoDOH} style={{ width: 70, height: 70 }} />
                    <View style={styles.titleBlock}>
                        <Text style={styles.title}>Municipal Health Office</Text>
                        <Text style={styles.subtitle}>{patient.provider_name}</Text>
                        <Text style={[styles.title, { fontSize: 13 }]}>Psychiatric Treatment Card</Text>
                    </View>
                    <Image src={logoBP} style={{ width: 80, height: 80 }} />
                </View>
                {/* Personal Info */}
                <View style={styles.section}>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}><Text style={styles.label}>Case #:</Text><Text style={styles.value}>{assessments[0]?.consultation_id || ''}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>PhilHealth #:</Text><Text style={styles.value}>{patient.pat_philhealth}</Text></View>
                        <View style={styles.gridItemFull}><Text style={styles.label}>Name:</Text><Text style={styles.value}>{`${patient.pat_fname} ${patient.pat_mname} ${patient.pat_lname}`}</Text></View>
                        <View style={styles.gridItemFull}><Text style={styles.label}>Address:</Text><Text style={styles.value}>{`${patient.patient_address}, ${patient.bgycode ?? ''}, ${patient.citycode ?? ''}, ${patient.provcode ?? ''}`}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{age.toString()}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Birthdate:</Text><Text style={styles.value}>{patient.pat_birthDate}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Birthplace:</Text><Text style={styles.value}>{patient.pat_birthplace ?? ''}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Religion:</Text><Text style={styles.value}>{religionMap[capitalizeFirstLetter(patient.religion_code ?? '')] ?? patient.religion_code ?? ''}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Sex:</Text><Text style={styles.value}>{patient.sex_code?.toUpperCase() === 'M' ? 'Male' : patient.sex_code?.toUpperCase() === 'F' ? 'Female' : ''}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Civil Status:</Text><Text style={styles.value}>{civilStatusMap[patient.civil_stat_code?.toLowerCase() ?? ''] ?? patient.civil_stat_code ?? ''}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Contact No.:</Text><Text style={styles.value}>{patient.pat_mobile ?? ''}</Text></View>
                    </View>
                </View>
                {/* Parent/Guardian */}
                <View style={styles.section}>
                    <Text style={styles.label}>Parent/Guardian</Text>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}><Text style={styles.label}>Father's Name:</Text><Text style={styles.value}>{`${patient.fat_fname ?? ''} ${patient.fat_mname ?? ''} ${patient.fat_lname ?? ''}`}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Mother's Name:</Text><Text style={styles.value}>{`${patient.mot_fname ?? ''} ${patient.mot_mname ?? ''} ${patient.mot_lname ?? ''}`}</Text></View>
                        <View style={styles.gridItem}><Text style={styles.label}>Contact No.:</Text><Text style={styles.value}></Text></View>
                    </View>
                </View>
                {/* Medication Table */}
                <View style={styles.section}>
                    <Text style={styles.label}>Medication Records</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Medication</Text>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Dosage / Intake / Duration / Frequency / Quantity</Text>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Date Release</Text>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Next Date Release</Text>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Medication</Text>
                            <Text style={[styles.tableCell, styles.tableHeaderText]}>Dosage / Intake / Duration / Frequency / Quantity</Text>
                        </View>
                        {chunkedMedication.map((pair, index) => {
                            // Only display row if at least one medication has data
                            const hasData = (pair[0] && (pair[0].phar_med || renderDosage(pair[0]) || pair[0].phar_date)) ||
                                            (pair[1] && (pair[1].phar_med || renderDosage(pair[1]) || pair[1].phar_date));
                            if (!hasData) return null;
                            return (
                                <View key={index} style={styles.tableRow}>
                                    {/* Medication 1 */}
                                    {pair[0] && pair[0].phar_med ? <Text style={styles.tableCell}>{pair[0].phar_med}</Text> : <Text style={styles.tableCell}></Text>}
                                    {pair[0] && renderDosage(pair[0]) ? <Text style={styles.tableCell}>{renderDosage(pair[0])}</Text> : <Text style={styles.tableCell}></Text>}
                                    {pair[0] && pair[0].phar_date ? <Text style={styles.tableCell}>{pair[0].phar_date}</Text> : <Text style={styles.tableCell}></Text>}
                                    {/* Medication 2 Next Date Release (always render cell) */}
                                    {pair[1] && pair[1].phar_date ? <Text style={styles.tableCell}>{pair[1].phar_date}</Text> : <Text style={styles.tableCell}></Text>}
                                    {pair[1] && pair[1].phar_med ? <Text style={styles.tableCell}>{pair[1].phar_med}</Text> : <Text style={styles.tableCell}></Text>}
                                    {pair[1] && renderDosage(pair[1]) ? <Text style={styles.tableCell}>{renderDosage(pair[1])}</Text> : <Text style={styles.tableCell}></Text>}
                                </View>
                            );
                        })}
                    </View>
                </View>
                {/* ICD and Diagnosis */}
                <View style={styles.section}>
                    <View style={styles.grid}>
                        <View style={styles.gridItem}><Text style={styles.label}>ICD-10 Code:</Text><Text style={styles.value}>{icd_10_code}</Text></View>
                        <View style={[styles.gridItem, { width: '52%' }]}><Text style={styles.label}>Diagnosis:</Text><Text style={styles.value}>{diagnosis}</Text></View>
                        <View style={styles.gridItemFull}><Text style={styles.label}>ICD-10 Description:</Text></View>
                    </View>
                    <View style={styles.textarea}><Text>{icd_10_descrip}</Text></View>
                </View>
            </Page>
        </Document>
    );
};

export default TreatmentCardPDF;