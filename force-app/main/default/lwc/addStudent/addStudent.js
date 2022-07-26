import { LightningElement , api, track} from 'lwc';
import saveData from '@salesforce/apex/student.saveData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import insertAccounts from '@salesforce/apex/student.insertAccounts';
import Student__c_OBJECT from '@salesforce/schema/Student__c';
import NAME_FIELD from '@salesforce/schema/Student__c.Name';
import Reg_no__c from '@salesforce/schema/Student__c.Reg_no__c';
import DOB__c from '@salesforce/schema/Student__c.DOB__c';
import Gender__c from '@salesforce/schema/Student__c.Gender__c';
import image__c from '@salesforce/schema/Student__c.image__c';
import Email__c from '@salesforce/schema/Student__c.Email__c'
import Father_Name__c from '@salesforce/schema/Student__c.Father_Name__c'

import password__c from '@salesforce/schema/Student__c.password__c'
import phone__c from '@salesforce/schema/Student__c.phone__c'
import Address__c from '@salesforce/schema/Student__c.Address__c'
import Course__c from '@salesforce/schema/Student__c.Course__c'
import Join_date__c from '@salesforce/schema/Student__c.Join_date__c'
import Sem__c from '@salesforce/schema/Student__c.Sem__c'
import Data_Structure__c from '@salesforce/schema/Student__c.Data_Structure__c'
import DBMS__c from '@salesforce/schema/Student__c.DBMS__c'
import Digital_Science__c from '@salesforce/schema/Student__c.Digital_Science__c'
import Status__c from '@salesforce/schema/Student__c.Status__c'


//mark
import upsertContact from '@salesforce/apex/student.upsertContact';

export default class AddStudent extends NavigationMixin(LightningElement) {
    @api studentDetails = {
        Name: '',
        Reg_no__c: '',
        DOB__c: '',
        Gender__c: '',
        Email__c: '',
        image__c: '',
        Father_Name__c:'',
        Sem__c:'',
        password__c: '',
        phone__c: '',
        Address__c: '',
        Course__c: '',
        Join_date__c:'',
        // Computer_Arc__c:'',
        // Data_Structure__c:'',
        // DBMS__c:'',
        // Digital_Science__c:'',
        // Internet_of_Things__c:'',
        // Status__c:'',
    }
    
    
    
    
        
    get options() {
        return [
            
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
        ];
    }
       
    get opta(){
        return [
            
            { label: 'Computer Science Engineering', value: 'Computer Science Engineering'},
            { label: 'Aeronautical Engineering', value: 'Aeronautical Engineering'},
            { label: 'Mechanical Engineering', value: 'Mechanical Engineering'},
            { label: 'Electrical and Electronics Engineering', value: 'Electrical and Electronics Engineering'},
            { label: 'Biotech Engineering.', value: 'Biotech Engineering.'},

        ];
    }
      

  

    accountObject = Student__c_OBJECT;
    myFields = [NAME_FIELD,
        Email__c,
        Reg_no__c,
        password__c,
        DOB__c,
        Gender__c,
        image__c,
        Father_Name__c,
        phone__c,
        Address__c,
        Course__c,
        Sem__c,
        Join_date__c,
        // Computer_Arc__c,
        // Data_Structure__c,
        // DBMS__c,
        // Digital_Science__c,
        // Internet_of_Things__c,
        // Status__c,
    ]
   


   handleSuccess(event) {
    const evt = new ShowToastEvent({
        title: 'Record created',
        message: 'New Student Record Created',
        variant: 'success',
    });
    this.dispatchEvent(evt);
}
// Email__c,image__c,Course__c,password__c,phone__c,Address__c

    @track openmodel = false;
    @track Addmark = false;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    }
    openModals(){
        this.Addmark = true
    }
    closeModals(){
        this.Addmark = false
    }
    saveMethod() {
        this.closeModal();
        history.back()
        saveData({
            student : this.studentDetails
        })
        .then(record => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Added the student info',
                "variant" : "success", 
            });
            this.dispatchEvent(toast);

            // this[NavigationMixin.Navigate]({
            //     type: 'standard__navItemPage',
            //     attributes: {
            //         apiName:'WireParameter' 
            //     }
            // });
        })
        .catch(error => {
            const toast = new ShowToastEvent({
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
            
            // this[NavigationMixin.Navigate]({
            //     type: 'standard__navItemPage',
            //     attributes: {
            //         apiName: 'WireParameter' 
            //     }
            // });
        });
        
    }

    handleInputChange(event) {
        let apiName = event.target.name;
        let inputval = event.target.value;
        this.studentDetails[apiName] = inputval
    }



    //add students
       //@track accRecord = {Name : NAME_FIELD,Taskdetails: Task_details__c,Phone : Phone_FIELD,Website : Website_FIELD,key : Math.random().toString(36).substring(2, 15)};
       @track accRecord = {Name : NAME_FIELD, DOB__c: DOB__c,Reg_no__c:Reg_no__c,Gender__c:Gender__c,Data_Structure__c:Data_Structure__c, key : Math.random().toString(36).substring(2, 15)};
       @track accRecords = [];
       toggleSaveLabel = 'Save';
   
       connectedCallback(){
           console.log('  === connectedCallback === ');
           /*for(var i=0; i < 4 ; i++){
               this.accRecords.push({Name : NAME_FIELD,NumberOfEmployees : Employee_FIELD,Phone : Phone_FIELD,Website : Website_FIELD,key : Math.random().toString(36).substring(2, 15)});
           } */
           this.accountTempRecords();
       }
       
       accountTempRecords(){
           this.accRecords = [];
           for(var i=0; i < 1 ; i++){
               this.accRecords.push({Name : NAME_FIELD,  DOB__c: DOB__c,Reg_no__c:Reg_no__c,Gender__c:Gender__c,Data_Structure__c:Data_Structure__c, key : Math.random().toString(36).substring(2, 15)});
           }
       }
   
       addRow(){
           const len = this.accRecords.length;
           this.accRecords.push({Name : NAME_FIELD,  DOB__c: DOB__c,Reg_no__c:Reg_no__c,Gender__c:Gender__c,Data_Structure__c:Data_Structure__c, key : Math.random().toString(36).substring(2, 15)});
       }
   
       removeRow(event){
           const indexPos = event.currentTarget.name;
           let remList = [];
           remList = this.accRecords;
           remList.splice(indexPos,1);
           this.accRecords = remList;
       }
   
       handleNameChange(event){
           let foundelement = this.accRecords.find(ele => ele.key == event.target.dataset.id);
           foundelement.Name = event.target.value;
           this.accRecords = [...this.accRecords];
       
       }
   
      
   
       handleDateChange(event){
           let foundelement = this.accRecords.find(ele => ele.key == event.target.dataset.id);
           foundelement.Data_Structure__c = event.target.value;
           this.accRecords = [...this.accRecords];
           //console.log(' ==> ' +  JSON.stringify(this.accRecords));
       }

       handleRegChange(event){
        let foundelement = this.accRecords.find(ele => ele.key == event.target.dataset.id);
        foundelement.Reg_no__c = event.target.value;
        this.accRecords = [...this.accRecords];
        //console.log(' ==> ' +  JSON.stringify(this.accRecords));
    }


    handleGenderChange(event){
        let foundelement = this.accRecords.find(ele => ele.key == event.target.dataset.id);
        foundelement.Gender__c = event.target.value;
        this.accRecords = [...this.accRecords];
        //console.log(' ==> ' +  JSON.stringify(this.accRecords));
    }
   
       
   
       handleSave(){
           this.toggleSaveLabel = 'Saving...'
           let toSaveList = this.accRecords.slice(0);;
           toSaveList.forEach((element, index) => {
               console.log( index + ' ==> ' + JSON.stringify(element.Name));
               let eleType = typeof element.Name;
               console.log( 'typeof ==> ' + eleType);
               if(element.Name === '' || eleType=='object'){
                   toSaveList.splice(index);
               }
           });  
           console.log( ' Final Save ==> ' + JSON.stringify(toSaveList));
   
           insertAccounts({accList : toSaveList})
           .then(() => {
               this.toggleSaveLabel = 'Saved';
               console.log('Success Log');
               this.dispatchEvent(
                   new ShowToastEvent({
                       title : 'Success',
                       message : `Records saved succesfully!`,
                       variant : 'success',
                   }),
               )
               this.accountTempRecords();
               this.error = undefined;
           })
           .catch(error => {
               this.error = error;
               this.record = undefined;
               console.log("Error in Save call back:", this.error);
           })
           .finally(() => {
               setTimeout(() => {
                   this.toggleSaveLabel = 'Save';
               }, 3000);
           });
       }
    

       Addmark = false;

       MarkAdd(){
        this.Addmark = true;
       }


       //save mark
       @track contactRecord = {};

    handleFieldChange(e) {
        this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    }
    handleFieldChange(e) {
        this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    }
    handleFieldChange1(e) {
        this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    }
    // handleFieldChange2(e) {
    //     this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    // }
    // handleFieldChange3(e) {
    //     this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    // }
    // handleFieldChangef(e) {
    //     this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    // }
    // handleFieldChange4(e) {
    //     this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    // }
    // handleFieldChange5(e) {
    //     this.contactRecord[e.currentTarget.fieldName] = e.target.value;
    // }


    // handleFieldChange(event){
    //     firstName__c = event.target.value
    // }

      upsertCon() {
       
    {
        upsertContact({ con: { ...this.contactRecord, sobjectType: Student__c_OBJECT.objectApiName } })
            .then((contact) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Registered Successfully ',
                        variant: 'success'
                    })
                );
            })
            .catch((err) => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Error creating record',
                                    message: err.body.message,
                                    variant: 'error'
                                })
                            );
                        });
     }
   
}
}