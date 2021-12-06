pragma solidity ^0.5.0;
contract HospitalRecord{
    uint public recordCount =0;
    struct patient {
        //uint id;
        string name;
        uint age;
        string password;
        address[] doctorAccessList;
        string[] patientRecordList;
    }
    struct doctor {
        //uint id;
        string name;
        string password;
        address[] patientAccessList;
    }
      struct Record {
        uint id; 
        string doctor_name;
        string patient_name;
        uint patient_age;
        string diagnostic;
        string medication;
        //uint256 register_date;
    }
    address[] public patientList;
    address[] public doctorList;

    mapping (address => patient) patientInfo;
    mapping (address => doctor) doctorInfo;
    mapping (uint => Record ) public records;

    event RecordCreated(
        uint id,
        string doctor_name,
        string patient_name,
        uint patient_age,
        string diagnostic,
        string medication
    );
    // function add_Patient(string memory _name, uint _age,string memory _password ) public {
    //     address addr =msg.sender;
    //     patientInfo[addr].name = _name;
    //     patientInfo[addr].age = _age;
    //     patientInfo[addr].password = _password;
    //     patientList.push(addr)-1;
    // }
    function createRecord(string memory _doctor_name,string memory _patient_name,uint _patient_age, string memory _diagnostic,string memory _medication) public {
        recordCount ++;
        records[recordCount] = Record(recordCount, _doctor_name,_patient_name,_patient_age,_diagnostic,_medication);
        emit RecordCreated(recordCount, _doctor_name, _patient_name, _patient_age, _diagnostic, _medication);
    }



}