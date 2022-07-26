import { LightningElement, track, wire, api } from 'lwc';
import searchContactList from '@salesforce/apex/student.searchContactList';
import StudentsLogin from '@salesforce/apex/student.StudentsLogin'
//import fun from '@salesforce/apex/wireApex.fun'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import saveData from '@salesforce/apex/student.saveData'


import searchStudentById from '@salesforce/apex/student.searchStudentById'
export default class StudentLogin extends LightningElement {
        //Total Days date1 + date2
   

    

    statusOptions = [
       
        {
            value: 'in-progress',
            label: 'In Progress',
            description: 'Currently working on this item',
        },
        {
            value: 'finished',
            label: 'Finished',
            description: 'Done working on this item',
        },
    ];
    value;
    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        this.value = event.detail.value;
    }
    @track abc1 = ''
    @track abc2 = ''
    @track abc3 = ''

    @track searchKey = '';
    @track passKey = '';
    @track contacts;
    @track error;     
    @track errormsg; 
    @track dataall = false
    @track mymark = false
    @track regerror;
    myreg;
    myid;
  //  @api updateDatas = false;
     a = false
     b = true
     s = true

    searchContact(event){        
        this.searchKey = event.target.value;  
         
    }

    searchContact2(event){        
        this.passKey = event.target.value;     
        
    }
 
    @wire(searchContactList, {accountName:'$searchKey', pass:'$passKey'})
    wiredContacts({data, error}){
        if(data){
            this.contacts = data
            
        }
        else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }



    loginHandler(){
        if(this.searchKey != ''){
    
            StudentsLogin({accountName: this.searchKey})
            .then(result => {
                console.log("this is result  "+result);

             

                    for(var i=0; i<result.length; i++){
                        
                       
                        // console.log('demo' + result[i].Reg_no__c)
                        this.myreg = result[i].Reg_no__c
                        this.mypass = result[i].password__c
                        this.myid = result[i].Id
                        // console.log(JSON.stringify(result.Reg_no__c))
                        // console.log(typeof(JSON.stringify(result[i])))

                    }
                        // this.abc = JSON.stringify(result[i])
                        if(this.searchKey == this.myreg && this.passKey == this.mypass){


                    
                          console.log('welcome ' + this.myreg)
                            this.a = true
                            this.b = false
                            this.s = false}

                       
                        else{
                            this.regerror = 'Please verify your Username and Password'
                        }
                    
               
               
            })
        
           
    }
    else{
        this.errormsg = 'Enter valid Credentials'
    }
    }

    markHandler(){
        
            this.mymark=true
        
    
    }

    BackProfile(){
        this.mymark=false
        this.modaltask = false
    }


    BackButton(){
        history.go()
    }

    BackButtona(){
        history.back()
    }



    // @api studentDetail = {
        
    //     From__c: '',
    //     Name: '',
    // }

    @api leave = {
        From__c:'',
        To__c:''
    }



  
    // @api trc;
    // handleInputChangeleave(event){
    //     this.trc = event.target.value;
    // }

    // @api studentid;
    // @api errors;

  

    // @api studentida;
    // @api errors;

    // @track openmodel = false;
    // openmodal() {
    //     searchStudentById({
    //         searchParam: this.studentida
    //     })
    //     .then(result => {
    //          this.studentDetail = result[0];
    //          this.errros = undefined;
    //     })
    //     .catch(error => {
    //         this.errors = error;
    //         this.studentDetail = undefined;
    //     })
    //     this.openmodel = true
    // }
    // closeModal() {
    //     this.openmodel = false
    // }
    // saveMethod() {
    //     this.closeModal();
    //     saveData({
    //         student : this.studentDetail
            
    //     })
    //     .then(record => {
    //         const toast = new ShowToastEvent({
    //             'title' : 'Success!!',
    //             "message" : 'Updated the student info',
    //             "variant" : "success", 
                
    //         });
    //         this.dispatchEvent(toast);

    //         // this[NavigationMixin.Navigate]({
    //         //     type: 'standard__navItemPage',
    //         //     attributes: {
    //         //         apiName: 'WireParameter' 
    //         //     }
    //         // });
    //     })
    //     .catch(error => {
    //         const toast = new ShowToastEvent({
    //             'title' : 'Error!!',
    //             "message" : JSON.stringify(error),
    //             "variant" : "error", 
    //         });
    //         this.dispatchEvent(toast);
    //         console.log('navigation error');

    //         // this[NavigationMixin.Navigate]({
    //         //     type: 'standard__navItemPage',
    //         //     attributes: {
    //         //         apiName: 'Update_Or_delete' 
    //         //     }
    //         // });
    //     });
        
    // }

    // handleInputChange(event) {
    //     let apiName = event.target.name;
    //     let inputval = event.target.value;
    //     this.studentDetail[apiName] = inputval
    // }


    //task
    modaltask = false
    taskbtn(){
        this.modaltask = true;
    }
    closetask(){
        this.modaltask = false;
    }


    
    //leave

    @track modalleave = false;
    openLeave() {
        searchStudentById({
            searchParam: this.myid
            
        })
        .then(result => {
             this.leave = result[0];
             this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.leave = undefined;
        })
        this.modalleave = true
    }
    closeleave() {
        this.modalleave = false
    }
    
    saveMethodtask() {
        this.closeleave();
        
        saveData({
            student : this.leave
        })
        .then(record => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Leave Request has been send successfully',
                "variant" : "success", 
            });
            this.dispatchEvent(toast);

            // this[NavigationMixin.Navigate]({
            //     type: 'standard__navItemPage',
            //     attributes: {
            //         apiName: 'WireParameter' 
            //     }
            // });
        })
        .catch(error => {
            const toast = new ShowToastEvent({
                'title' : 'Pending!!',
                // "message" : JSON.stringify(error),
                "message" : 'Your previous Leave Request is on pending',
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
            console.log('navigation error');
        });
        
    }

    
    handleInputChangeleave(event) {
        let apiName = event.target.name;
        
        let inputval = event.target.value;
        this.leave[apiName] = inputval
        
    }
    handleInputChangeleave1(event){
        let apiName = event.target.name;
        console.log('apiname'+apiName)
        let inputval = event.target.value;
        console.log('inputval'+inputval)
        this.leave[apiName] = inputval
    }


    // dt;
    // dt2;
    // @api Diff;
    // handleInputChangeleave(event){
    //   this.dt = event.target.value
    // }
  
    // handleInputChangeleave1(event){
    //   this.dt2 = event.target.value
  
    // }
  
      
    // show(){
    //               var date1 = new Date(this.dt);
    //       var date2 = new Date(this.dt2);
          
    //       // To calculate the time difference of two dates
    //       var Difference_In_Time = date2.getTime() - date1.getTime();
          
    //       // To calculate the no. of days between two dates
    //       var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    //       this.Diff = Difference_In_Days
    //       console.log('this ' + this.Diff)
    //       console.log(Difference_In_Days)
    //   }
}
    



    
   
    
    
