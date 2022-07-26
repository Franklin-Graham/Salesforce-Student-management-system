trigger NewStudents on Student__c (before insert) {
    //get all email in the list
    List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
  
  for (Student__c myContact : Trigger.new) {
    if (myContact.Email__c != null && myContact.Name != null) {
    
      // Step 1: Create a new Email
      Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    
      
      // Step 2: Set list of people who should get the email
      List<String> sendTo = new List<String>();
      sendTo.add(myContact.Email__c);
      mail.setToAddresses(sendTo);

 
      // Step 3. Set email contents - you can use variables!
      mail.setSubject('Hai ' + myContact.Name); //Subject of the mail and the body of the mail
      String body = 'Dear ' + myContact.Name + ', '; 
      body += 'Here is your Crendentials for Login to the Portal ';
      body += 'your Register Number ' + myContact.Reg_no__c + ' Your password is ' + mycontact.password__c;
      body += ' https://cqaffinaqtest--sms.sandbox.my.site.com/sms/';
      //body += ' '; */
      mail.setHtmlBody(body);
    
      // Step 4. Add your email to the master list
      mails.add(mail);
    }
  }
  // Step 5: Send all emails in the master list
  Messaging.sendEmail(mails);
}