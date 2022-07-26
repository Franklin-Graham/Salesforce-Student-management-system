public with sharing class student {
    @AuraEnabled
    public static List<SObject> allStudent(){

        String Query = 'select image__c,Name,phone__c,Email__c,Reg_no__c,password__c,Father_Name__c,Gender__c,Course__c,Address__c,Computer_Arc__c, Data_Structure__c,Internet_of_Things__c,DBMS__c,Digital_Science__c,Status__c,Sem__c,Join_date__c,From__c,To__c,Task_Name__c,Task_Description__c,DeadLine__c From Student__c';
       
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static List<SObject> searchStudent(String searchParam){
        String likeParam= '%' + searchParam + '%';
        String Query='';
        if(searchParam != null){
            Query = 'select Name,image__c,phone__c,Email__c,Reg_no__c,password__c,Father_Name__c,Gender__c,Course__c,Address__c,Computer_Arc__c, Data_Structure__c,Internet_of_Things__c,DBMS__c,Digital_Science__c,Status__c,Sem__c,Join_date__c,From__c,To__c,Task_Name__c,Task_Description__c,DeadLine__c From Student__c Where Name Like : likeParam';
        }
        else{
            Query='select Name,image__c,phone__c,Email__c From Student__c';
        }
        List<SObject> SObjectList = Database.query(Query);
    	return SObjectList;
    }
    @AuraEnabled
    public static List<SObject> searchStudentById(String searchParam){
        return [Select Id,image__c,Name,DOB__c,phone__c,Email__c,Sem__c,Reg_no__c,password__c,Father_Name__c,Gender__c,Course__c,Address__c,
        Computer_Arc__c, Data_Structure__c,Internet_of_Things__c,DBMS__c,Digital_Science__c,Status__c,Join_date__c,From__c,To__c,Task_Name__c,
        Task_Description__c,DeadLine__c From Student__c Where Id =:searchParam];

    }
    @AuraEnabled
    public static void deleteStudent(String searchParam){
        List<Student__c> data =[ select Id,Name,image__c,phone__c,Email__c From Student__c Where Id=:searchParam];
        delete data;
    }
    @AuraEnabled
    public static void saveData(Student__c student){
        upsert student;
    }
    
 
   

    @AuraEnabled
    public static List<Student__c> StudentsLogin(String accountName){
        List<Student__c> stud = [SELECT Name, Reg_no__c,password__c FROM Student__c Where Reg_no__c=:accountName];
        return stud;
    }


    @AuraEnabled(cacheable = true)
     public static List<Staff__c> staffLogin(String teacherName, String teacherPass){
            if (String.isBlank(teacherName)) 
            {
                return new List<Staff__c>();
            }
           
          String key = '%' + teacherName + '%';   
          String p = '%' + teacherPass + '%';    
          List<Staff__c> lst = [SELECT Password__c, Name FROM Staff__c WHERE Name = : teacherName AND Password__c = : teacherPass];
          return lst;
     }


     @AuraEnabled(cacheable = true)
     public static List<Student__c> searchContactList(String accountName, String pass, String regs, String mypass){
            if (String.isBlank(accountName)) 
            {
                return new List<Student__c>();
            }
           
          String key = '%' + accountName + '%';   
          String p = '%' + pass + '%';    
          List<Student__c> lst = [SELECT Reg_no__c,password__c, Name, Email__c, Father_Name__c, DOB__c,
          image__c,phone__c,Gender__c,Course__c,Address__c,Sem__c,Computer_Arc__c,Data_Structure__c,DBMS__c,Digital_Science__c,Internet_of_Things__c,Status__c,Task_Name__c,Task_Description__c,DeadLine__c,From__c,To__c FROM Student__c WHERE Reg_no__c = : accountName and 
          password__c = : pass];
          return lst;
     }



     
        @AuraEnabled
        public static string insertAccounts(List<Student__c> accList){
            system.debug(' insertAccounts ==> ');
            system.debug(' accList ==> ' + accList);
            String response = '';
            try{
                for(Student__c acc : accList){
                   acc.Name = String.valueOf(acc.Name);
                }
                insert accList;
                response = 'SUCCESS';
            }
            catch(Exception ex){
                system.debug(' Ex ==> ' + ex.getMessage());
                response = ex.getMessage();
            }
            return response;
        
            }

            @AuraEnabled
            public static Student__c upsertContact(Student__c con) {
            System.debug('con => '+con);
            upsert con;
            return con;
            }
}

// public with sharing class student {
//     @AuraEnabled
//     public static List<SObject>allStudent(){
    
        
//         String Query = 'select image__c,Name,phone__c,Email__c,Reg_no__c,password__c,Father_Name__c,Gender__c,Course__c,Address__c,Computer_Arc__c, Data_Structure__c,Internet_of_Things__c,DBMS__c,Digital_Science__c,Status__c,Sem__c,Join_date__c,From__c,To__c,Task_Name__c,Task_Description__c,DeadLine__c From Student__c';
//         List<SObject> SObjectList = Database.query(Query);
//     	return SObjectList;
//     }
//     @AuraEnabled
//     public static List<SObject>searchStudent(String searchParam){
//         String likeParam= '%' + searchParam + '%';
//         String Query='';
//         if(searchParam != null){
//             Query = 'select Name From Student__c Where Name Like :likeParam';
//         }
//         else{
//             Query='select Name,phone__c,Email__c From Student__c';
//         }
//         List<SObject> SObjectList = Database.query(Query);
//     	return SObjectList;
//     }
//     @AuraEnabled
//     public static List<SObject> searchStudentById(String searchParam){
//         return [Select id From Student__c Where id =:searchParam];

//     }
//     @AuraEnabled
//     public static void deleteStudent(String searchParam){
//         List<Student__c> data =[ select Id,Name,image__c,phone__c,Email__c From Student__c Where Id=:searchParam];
//         delete data;
//     }
//     @AuraEnabled
//     public static void saveData(Student__c student){
//         upsert student;
//     }
//     // @AuraEnabled
//     // public static List<ContentDocumentLink> fetchFileId(String recordId){
//     //     return [SELECT ContentDocumentId, LinkedEntityId  FROM ContentDocumentLink where LinkedEntityId =: recordId];
//     // }
//     // select id from contentVersion where ContentDocumentId = '0691y0000009Sg8AAE'

//     // "/sfc/servlet.shepherd/version/download/{id}"

//     @AuraEnabled
//     public static List<Student__c> StudentsLogin(String accountName){
//         List<Student__c> stud = [SELECT Name, Reg_no__c,password__c FROM Student__c Where Reg_no__c=:accountName];
//         return stud;
//     }


//     @AuraEnabled(cacheable = true)
//      public static List<Staff__c> staffLogin(String teacherName, String teacherPass){
//             if (String.isBlank(teacherName)) 
//             {
//                 return new List<Staff__c>();
//             }
           
//           String key = '%' + teacherName + '%';   
//           String p = '%' + teacherPass + '%';    
//           List<Staff__c> lst = [SELECT Password__c, Name FROM Staff__c WHERE Name = : teacherName AND Password__c = : teacherPass];
//           return lst;
//      }


//      @AuraEnabled(cacheable = true)
//      public static List<Student__c> searchContactList(String accountName, String pass, String regs, String mypass){
//             if (String.isBlank(accountName)) 
//             {
//                 return new List<Student__c>();
//             }
           
//           String key = '%' + accountName + '%';   
//           String p = '%' + pass + '%';    
//           List<Student__c> lst = [SELECT Reg_no__c,password__c, Name, Email__c, Father_Name__c, DOB__c,
//           From__c, To__c FROM Student__c WHERE Reg_no__c = : accountName and 
//           password__c = : pass];
//           return lst;
//      }
// }