trigger ApprovalTrigger on Student__c (after update) {
    
    List <Approval_request__c> arrc = new List <Approval_request__c>(); //empty array list

    for(Student__c st :trigger.new){

        if (st.From__c != null &&  st.To__c != null){

            Approval_request__c ar = new Approval_request__c();
            ar.Student__c = st.Id;
            ar.From__c = st.From__c;
            ar.To__c = st.To__c;
            ar.comment__c = st.comment__c;
            ar.Total__c = st.Total_Leave__c;
            arrc.add(ar);
            
        }
        insert arrc;
    }
    

}