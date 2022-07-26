import { LightningElement, track, wire,api } from 'lwc';
import staffLogin from '@salesforce/apex/student.staffLogin'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchStudent from '@salesforce/apex/student.searchStudent'
import allStudent from '@salesforce/apex/student.allStudent'
// import deleteStudent from '@salesforce/apex/student.deleteStudent'
import { NavigationMixin } from 'lightning/navigation';
export default class StaffsLogin extends NavigationMixin(LightningElement) {
    @track staffsearchKey = '';
    @track staffpassKey = '';
    @track contacts;
    @track error;     
    @track errormsg; 
    @track regerror;
    @track passerror;
    @track dataall = false
    @track message
    myreg;
    mypass;

    
    @api updateData = false;
    @api deleteData = false;
    @api openModal = false;

    //  @api ContactName;
     a = false
     b = true
     s = true

    searchContact(event){        
        this.staffsearchKey = event.target.value;  
         
    }

    searchContact2(event){        
        this.staffpassKey = event.target.value;     
        
    }
 
    @wire(staffLogin, {teacherName:'$staffsearchKey', teacherPass:'$staffpassKey'})
    wiredContacts({data, error}){
        if(data){
            this.contacts = data
        }
       
        
    }

    
   
    loginHandler(){

        if(this.staffsearchKey != ''){
        
        
            staffLogin({teacherName: this.staffsearchKey, teacherPass: this.staffpassKey})
            .then(result => {

                for(var i=0; i<result.length; i++){
                    this.myreg = result[i].Name
                    console.log('this is ' + result[i].Name)
                    this.mypass = result[i].Password__c
                }
                console.log(this.staffsearchKey, this.staffpassKey, this.myreg, this.mypass)
                if(this.staffsearchKey == this.myreg && this.staffpassKey == this.mypass){
                this.a = true
                this.b = false
                this.s = false
                }
                
                else{
                    this.passerror = 'Please verify your Username and Password'
                }
            })
        }

        else{
            this.errormsg = 'Enter Credentials'
        }
           
    }


    BackButton(){
        history.back()
    }





   //search 
   @track searchValue;
   handleChange(event) {
       const value = event.target.value;
       console.log('Search ' + value)
       const searchEvent = new CustomEvent(
           'search',
           {
               detail:value
           }
       );
       this.dispatchEvent(searchEvent);

   }

    @track studentRecords;
    @track errros;
    constructor() {
        super();
            allStudent()
            .then(result => {
                this.studentRecords = result;
                this.errros = undefined;
            })
            .catch(error => {
                this.errors = error;
                this.studentRecords = undefined;
            })
    }
    
    handleEvent(event){
        const eventVal = event.detail;
        searchStudent({
            searchParam : eventVal
        })
        .then(result => {
            this.studentRecords = result;
            this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.studentRecords = undefined;
        })
    }


 

}



   