<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $from_name = isset($_POST['name']) && trim($_POST['name']) !== '' ? trim($_POST['name']) : 'Website Enquiry';
  $from_email = isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ? $_POST['email'] : 'quickenquiry@sanskarinnovativeschool.in';
  $subject = isset($_POST['subject']) && trim($_POST['subject']) !== '' ? trim($_POST['subject']) : 'Website Enquiry';

  $contact->to = $receiving_email_address;
  $contact->from_name = $from_name;
  $contact->from_email = $from_email;
  $contact->subject = $subject;

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message($from_name, 'Parent/Guardian Name');
  isset($_POST['child_name']) && $contact->add_message($_POST['child_name'], 'Child Name');
  isset($_POST['relation']) && $contact->add_message($_POST['relation'], 'Relation');
  isset($_POST['class_applying']) && $contact->add_message($_POST['class_applying'], 'Class Applying For');
  $contact->add_message(isset($_POST['email']) && trim($_POST['email']) !== '' ? $_POST['email'] : 'Not provided', 'Email');
  isset($_POST['phone']) && $contact->add_message($_POST['phone'], 'Phone');
  $contact->add_message(isset($_POST['message']) && trim($_POST['message']) !== '' ? $_POST['message'] : 'Not provided', 'Message', 10);

  echo $contact->send();
?>
