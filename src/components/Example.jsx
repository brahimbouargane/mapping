import React, { useState, useEffect } from "react";
import XLSX from "xlsx";

const dictionnaires = [
  { name: "patient" },
  { name: "encounter" },
  { name: "transfer" },
  { name: "diagnosis" },
  { name: "procedure" },
];

const patient = [
  "PatientNumber",
  "DateOfBirth",
  "Gender",
  "Extra:PatientDeceased",
  "Extra:DateofDeath",
  "Extra:PlaceOfBirth",
  "EthnicOrigin",
  "Extra:Nationality",
  "LastName",
  "FirstName",
  "Title",
  "TitleExtra:MothersLastName",
  "Extra:MothersFirstName",
  "Extra:FathersLastName",
  "Extra:FathersFirstName",
  "Extra:FamilyDoctor",
  "Extra:BloodRefusal",
  "Extra:OrganDonor",
  "Extra:PrefLanguage",
  "Extra:LastUpdateDateTime",
  "NationalIdentifier",
];

const encounter = [
  "PatientNumber",
  "Hospital",
  "StartDateTime",
  "EndDateTime",
  "EncounterNumber",
  "Age",
  "EncounterType",
  "EncounterCategory",
  "LengthOfStay",
  "AdmitWard",
  "DischargeWard",
  "ReferringConsultant",
  "Extra:ReferringConsultantName",
  "ReferringConsultantSpecialty",
  "AdmittingConsultant",
  "Extra:AdmittingConsultantName",
  "AdmittingConsultantSpecialty",
  "AttendingConsultant",
  "Extra:AttendingConsultantName",
  "AttendingConsultantSpecialty",
  "DischargeConsultant",
  "Extra:DischargeConsultantName",
  "DischargeConsultantSpecialty",
  "Extra:TransferToHospital",
  "Extra:CauseOfDeath",
  "Extra:TypeOfDeath",
  "Extra:DateofDeath",
  "Extra:Autopsy",
  "DRG1",
  "DRG1Version",
  "Extra:DRGGravity",
  "Extra:MDC",
  "Extra:LastUpdateDateTime",
  "DischargeDestination",
  "Address",
  "PostCode",
  "Extra:Municipality",
  "Suburb",
  "Extra:Region",
  "Extra:Country",
  "Extra:LivingArrangements",
  "MaritalStatus",
  "AdmissionCategory",
  "AdmissionSource",
  "AdmissionElection",
  "HealthFund",
  "FinancialClass",
  "Extra:TransferFromHospital",
  "EXTRA:ClinicName",
  "EXTRA:ClinicSpecialtyCode",
  "EXTRA:ClinicSpecialty",
  "EXTRA:ModeOfArrival",
  "EXTRA:PreTriageTime",
  "EXTRA:TriageStartTime",
  "EXTRA:TriageEndTime",
  "EXTRA:DiagnosisOnDischarge",
  "EXTRA:PhysicianSpecialityKey",
  "EXTRA:CancellationDate",
  "EXTRA:CancellationFlag",
  "Extra:VisitType",
  "Extra:Site",
  "Extra:DischargeStatus",
  "Extra:ComplaintDesc",
  "Extra:TriageCode",
  "Extra:TriageDesc",
];

const transfer = [
  "PatientNumber",
  "Extra:Hospital",
  "BedNumber",
  "EncounterNumber",
  "Ward",
  "StartDateTime",
  "Extra:RoomNumber",
  "Extra:WardType",
  "Leave",
  "Extra:LeaveType",
  "AttendingConsultant_Code",
  "Extra:AttendingConsultantName",
  "AttendingConsultant_SpecialtyCode",
  "Extra:LastUpdateDateTime",
  "Extra:Site",
];

const diagnosis = [
  "Extra:SourcePatientNumber",
  "Extra:Hospital",
  "EncounterNumber",
  "DiagnosisCode",
  "DiagnosisVersion",
  "Sequence",
  "Extra:DiagnosisType",
  "ConditionOnset",
  "Extra:SequenceService",
  "Extra:PrimaryTumour",
  "Extra:TumourCode",
  "Extra:Metastase",
  "Extra:Ganglion",
  "Extra:StageEvolution",
  "Extra:Morphology",
  "Extra:Screening",
  "Extra:DiagnosisDateTime",
  "Extra:CodeCharacteristic",
  "Extra:CodeCharacteristicDesc",
  "Extra:LocalDiagCode",
  "DiagnosisDescription",
  "Extra:LastUpdateDateTime",
];

const procedure = [
  "Last Name",
  "First Name",
  "Extra:SourcePatientNumber",
  "Extra:Hospital",
  "EncounterNumber",
  "ProcedureDateTime",
  "ProcedureCode",
  "ProcedureVersion",
  "Sequence",
  "Extra:InterventionType",
  "Consultant",
  "Extra:ConsultantName",
  "ConsultantSpecialty",
  "ProcedureTheatre",
  "Extra:LocalProcTheatre",
  "Extra:LocalProcTheatreDesc",
  "Extra:NbrProcedures",
  "Extra:LastUpdateDateTime",
];

const App = () => {
  const [selectedList, setSelectedList] = useState("");
  const [selectededData, setSelectededData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedArray, setSelectedArray] = useState("");
  const [fileData, setFileData] = useState(null);
  const [columnNames, setColumnNames] = useState([]);
  const [modifiedColumnNames, setModifiedColumnNames] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [fileName, setFileName] = useState("");

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setFileData(jsonData);
      setColumnNames(jsonData[0]);
      setModifiedColumnNames([]);
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle list selection
  const handleListSelection = (e) => {
    const selectedArrayName = e.target.value;
    // Reset SelectededData if no array is selected
    if (selectedArrayName === "None") {
      setSelectededData([]);
      setFilteredData([]);
    } else {
      let selectedArrayData;
      switch (selectedArrayName) {
        case "patient":
          selectedArrayData = patient;
          break;
        case "encounter":
          selectedArrayData = encounter;
          break;
        case "transfer":
          selectedArrayData = transfer;
          break;
        case "diagnosis":
          selectedArrayData = diagnosis;
          break;
        case "procedure":
          selectedArrayData = procedure;
          break;
        default:
          selectedArrayData = [];
          break;
      }

      setSelectededData(selectedArrayData);
    }
    setSelectedList(selectedArrayName);
  };
  useEffect(() => {
    if (selectededData.length > 0) {
      const filtered = columnNames.filter(
        (column) => !selectededData.includes(column)
      );
      setFilteredData(filtered);
    }
  }, [selectededData]);

  // Handle column name change
  const handleColumnNameChange = (index, value) => {
    const updatedColumnNames = [...modifiedColumnNames];
    updatedColumnNames[index] = value;
    setModifiedColumnNames(updatedColumnNames);
  };

  const resetState = () => {
    setFileData(null);
    setColumnNames([]);
    setModifiedColumnNames([]);
    setIsSaving(false);
    setColumnNames([]);
    setSelectededData([]);
    setFilteredData([]);
    setSelectedList([]);
  };
  const handleSaveChanges = () => {
    const updatedFileData = [...fileData];
    const modifiedColumnIndexes = {};

    modifiedColumnNames.forEach((name, index) => {
      if (name !== "") {
        modifiedColumnIndexes[index] = true;
        updatedFileData[0][index] = name;
      }
    });

    // Create an object to store the column changes
    const columnChanges = {};

    filteredData.forEach((name, index) => {
      columnChanges[name] = modifiedColumnNames[index] || ""; // Use empty string if no modification is made
    });

    // Console log the column changes object
    console.log("Column Changes:", columnChanges);

    // Create the data object to send to the backend
    const dataToSend = {
      columnChange: filteredData.reduce((result, name, index) => {
        result[name] = modifiedColumnNames[index];
        return result;
      }, {}),
      fileName: fileName, // Replace with the actual file name
      originalFile: fileData, // Replace with the actual original file data
    };

    console.log("Data to send to backend:", dataToSend);

    // Send the POST request to the backend
    fetch("/api/save", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log("Response from backend:", data);
        // ...
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        // ...
      });

    const fileInput = document.getElementById("fileInput");
    fileInput.value = null;
    setColumnNames([]);
    setModifiedColumnNames([]);
    setFileData([]);
    setIsSaving(false);
    resetState();
  };
  // Handle save changes
  // const handleSaveChanges = () => {
  //   const updatedFileData = [...fileData];
  //   const modifiedColumnIndexes = {};

  //   modifiedColumnNames.forEach((name, index) => {
  //     if (name !== "") {
  //       modifiedColumnIndexes[index] = true;
  //       updatedFileData[0][index] = name;
  //     }
  //   });

  //   columnNames.forEach((name, index) => {
  //     if (!modifiedColumnIndexes[index]) {
  //       updatedFileData[0][index] = name;
  //     }
  //   });
  //   // Create an object to store the column changes
  //   const columnChanges = {};

  //   filteredData.forEach((name, index) => {
  //     columnChanges[name] = modifiedColumnNames[index] || ""; // Use empty string if no modification is made
  //   });

  //   // Console log the column changes object
  //   console.log("Column Changes:", columnChanges);

  //   const workbook = XLSX.utils.book_new();
  //   const sheet = XLSX.utils.aoa_to_sheet(updatedFileData);
  //   XLSX.utils.book_append_sheet(workbook, sheet, "Modified Sheet");
  //   XLSX.writeFile(workbook, "modified_file.xlsx");
  //   const fileInput = document.getElementById("fileInput");
  //   fileInput.value = null;
  //   setColumnNames([]);
  //   setModifiedColumnNames([]);
  //   setFileData([]);
  //   setIsSaving(false);
  //   resetState();
  // };

  // Enable save button when there are modifications
  useEffect(() => {
    setIsSaving(modifiedColumnNames.length > 0);
  }, [modifiedColumnNames]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel File Uploader</h1>
      <div className="mb-4 flex justify-evenly items-center	">
        <label htmlFor="fileInput" className="mr-2">
          Select an Excel file:
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block text-sm px-4 py-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-emerald-500 dark:text-gray-400 focus:outline-none dark:bg-emerald-600 dark:border-gray-600 dark:placeholder-gray-200"
        />

        <p className="mb-2">Selected List: {selectedList}</p>
        <select
          value={selectedList}
          onChange={handleListSelection}
          className="bg-gray-50 border w-3/12	 border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-600 block  p-2.5 dark:bg-emerald-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-emerald-500"
        >
          <option value="">Select a List</option>
          <option value="patient">patient</option>
          <option value="encounter">encounter</option>
          <option value="transfer">transfer</option>
          <option value="diagnosis">diagnosis</option>
          <option value="procedure">procedure</option>
        </select>
      </div>
      {fileData && (
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300">Original Name</th>
                <th className="border-b-2 border-gray-300">Modified Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((name, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 py-2 text-center">
                    {name}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center">
                    <select
                      value={modifiedColumnNames[index] || ""}
                      onChange={(e) =>
                        handleColumnNameChange(index, e.target.value)
                      }
                      disabled={selectedList === ""}
                      className="bg-gray-50 border m-auto border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-600 block  p-2.5 dark:bg-emerald-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-emerald-500"
                    >
                      <option value="">Unchanged</option>
                      {selectededData.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSaveChanges}
            disabled={!isSaving}
            className="mt-4 bg-emerald-500 block ml-auto hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
