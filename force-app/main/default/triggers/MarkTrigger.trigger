trigger MarkTrigger on Student__c (before insert, after update) {
    List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
  
    for (Student__c myContact : Trigger.new) {
      if (myContact.Data_Structure__c != null || myContact.DBMS__c != null || myContact.Digital_Science__c != null ||
      myContact.Internet_of_Things__c != null || myContact.Computer_Arc__c != null || myContact.Status__c != null ) {
      
        // Step 1: Create a new Email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
      
        
        // Step 2: Set list of people who should get the email
        List<String> sendTo = new List<String>();
        sendTo.add(myContact.Email__c);
        mail.setToAddresses(sendTo);
  
   
        // Step 3. Set email contents - you can use variables!
        mail.setSubject('Hai ' + myContact.Name); //Subject of the mail and the body of the mail
        String body = 'Dear ' + myContact.Name + ', '; 
        body += 'Here is your Result ';
        body += 'for Register Number ' + myContact.Reg_no__c + ', ';
        body += 'Semester: ' + myContact.Sem__c + ', ';
        body += ' [ ' + 'Data Structure: ' + myContact.Data_Structure__c + ', ';
        body += 'DBMS: ' + myContact.DBMS__c + ', ';
        body += 'Digital Science: ' + myContact.Digital_Science__c + ', ';
        body += 'Internet of Things: ' + myContact.Internet_of_Things__c + ', ';
        body += 'Computer Arc: ' + myContact.Computer_Arc__c + ' ] ';
        body += ' Result Status: (' + myContact.Status__c + ')';
       /* body += ' https://salesforceforfresher.wordpress.com/ '; */
        mail.setHtmlBody(body);
      
        // Step 4. Add your email to the master list
        mails.add(mail);
      }
    }
    // Step 5: Send all emails in the master list
    Messaging.sendEmail(mails);
}