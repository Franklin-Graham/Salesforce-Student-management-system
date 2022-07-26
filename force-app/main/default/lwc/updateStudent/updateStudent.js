import { LightningElement , api, track} from 'lwc';
import saveData from '@salesforce/apex/student.saveData'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import searchStudentById from '@salesforce/apex/student.searchStudentById'
export default class UpdateStudent extends NavigationMixin(LightningElement) {

    
    @api studentDetails = {
        Id: '',
        Email__c: '',
        id__c: '',
        image__c: '',
        phone__c: '',
        Name: '',
        Computer_Arc__c:'',
        Data_Structure__c:'',
        DBMS__c:'',
        Digital_Science__c:'',
        Internet_of_Things__c:'',
        Course__c:'',
        Status__c:'',
        Join_date__c:'',
        Gender__c:'',
        Father_Name__c:'',
        DOB__c:'',
        Address__c:'',
    }

    @api mark = {
        Name:'',
        Computer_Arc__c:'',
        Data_Structure__c:'',
        DBMS__c:'',
        Digital_Science__c:'',
        Internet_of_Things__c:'',
        Status__c:'',
    }

    @api task = {
        Task_Name__c:'',
        Task_Description__c:'',
        DeadLine__c:''
    }

    @api studentid;
    @api errors;

    //updmark = false
    
    
    // openmark(){
    //     this.updmark = true
    // }
    // closeModalc(){
    //     this.updmark = false
    // }

    
    // mymarksmodel =false
    // openmodalresult(){
    //     this.mymarksmodel = true
    // }
    // closeModalmark(){
    //     this.mymarksmodel = false
    // }


    @track openmodel = false;
    openmodal() {
        searchStudentById({
            searchParam: this.studentid
        })
        .then(result => {
             this.studentDetails = result[0];
             this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.studentDetails = undefined;
        })
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    }
    saveMethod() {
        this.closeModal();
        saveData({
            student : this.studentDetails
            
        })
        .then(record => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Updated the student info',
                "variant" : "success", 
                javascript:location.reload(true)
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
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
            console.log('navigation error');

            // this[NavigationMixin.Navigate]({
            //     type: 'standard__navItemPage',
            //     attributes: {
            //         apiName: 'Update_Or_delete' 
            //     }
            // });
        });
        
    }

    handleInputChange(event) {
        let apiName = event.target.name;
        let inputval = event.target.value;
        this.studentDetails[apiName] = inputval
    }


    //mark

    
    @track openmodala = false;
    openmark() {
        searchStudentById({
            searchParam: this.studentid
        })
        .then(result => {
             this.mark = result[0];
             this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.mark = undefined;
        })
        this.openmodala = true
    }
    closeModala() {
        this.openmodala = false
    }
    saveMethoda() {
        this.closeModala();
        saveData({
            student : this.mark
        })
        .then(record => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Updated the student info',
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
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
            console.log('navigation error');
        });
        
    }

    handleInputChangemark(event) {
        let apiName = event.target.name;
        let inputval = event.target.value;
        this.mark[apiName] = inputval
    }


    //task
    @track openmodaltask = false;
    opentask() {
        searchStudentById({
            searchParam: this.studentid
        })
        .then(result => {
             this.task = result[0];
             this.errros = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.task = undefined;
        })
        this.openmodaltask = true
    }
    closeModaltask() {
        this.openmodaltask = false
    }
    saveMethodtask() {
        this.closeModaltask();
        saveData({
            student : this.task
        })
        .then(record => {
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : 'Updated the student info',
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
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
            console.log('navigation error');
        });
        
    }

    handleInputChangetask(event) {
        let apiName = event.target.name;
        let inputval = event.target.value;
        this.task[apiName] = inputval
    }
   
}