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

  $additional_fields = array(
    'student_dob' => 'Student DOB',
    'student_gender' => 'Student Gender',
    'apar_id' => 'APAR ID',
    'pen_id' => 'PEN ID',
    'alternate_phone' => 'Alternate Phone',
    'address' => 'Address',
    'previous_school' => 'Previous School',
    'last_class_studied' => 'Last Class Studied',
    'previous_board' => 'Previous Board',
    'additional_information' => 'Additional Information',
    'career_role' => 'Career Role',
    'career_specialization' => 'Career Specialization',
    'career_qualification' => 'Career Qualification',
    'career_experience' => 'Career Experience',
    'career_location' => 'Career Location',
    'career_portfolio' => 'Career Portfolio',
    'career_message' => 'Career Motivation'
  );

  foreach ($additional_fields as $field_key => $field_label) {
    if (isset($_POST[$field_key]) && trim($_POST[$field_key]) !== '') {
      $contact->add_message(trim($_POST[$field_key]), $field_label);
    }
  }

  $upload_labels = array(
    'student_photo' => 'Student Photo',
    'birth_certificate' => 'Birth Certificate',
    'transfer_certificate' => 'Transfer Certificate',
    'latest_report_card' => 'Latest Report Card',
    'address_proof' => 'Address Proof',
    'parent_id_proof' => 'Parent ID Proof',
    'career_resume' => 'Career Resume'
  );

  foreach ($upload_labels as $file_key => $file_label) {
    if (isset($_FILES[$file_key]) && isset($_FILES[$file_key]['error']) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {
      $uploaded_name = isset($_FILES[$file_key]['name']) ? trim($_FILES[$file_key]['name']) : '';
      if ($uploaded_name !== '') {
        $contact->add_message($uploaded_name, $file_label . ' (Uploaded File)');
      }
    }
  }

  echo $contact->send();
?>
