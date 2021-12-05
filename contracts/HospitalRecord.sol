pragma solidity ^0.5.0;
contract HospitalRecord{

    struct patient {
        string name;
        uint age;
        string password;
        address[] doctorAccessList;
        string[] patientRecordList;
    }
    struct doctor {
        string name;
        string password;
        address[] patientAccessList;
    }
    address[] public patientList;
    address[] public doctorList;

    mapping (address => patient) patientInfo;
    mapping (address => doctor) doctorInfo;
}