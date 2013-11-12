<?php //#########################################
// POSTS data to Google, because we can't with AJAX
//###############################################

//===============================================
// Build out the entries
//===============================================
$data =@ $_POST['data'];
switch($_POST['action']){
    //- - - - - - - - - - - - - - - - - - - - - - - -
    // New Workbook
    //- - - - - - - - - - - - - - - - - - - - - - - -
    case 'new-workbook':
        $entry = '<?xml version="1.0" encoding="UTF-8"?>'.
            '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gs="http://schemas.google.com/spreadsheets/2006">'.
                '<title>'.$data['title'].'</title>'.
                '<gs:rowCount>20</gs:rowCount>'.
                '<gs:colCount>10</gs:colCount>'.
            '</entry>';
    break;
}

//===============================================
// Setup the data
//===============================================
$opts = array(
    'http'  => array(
        'method'    => 'POST',
        'header'    => 'Content-Type: application/atom+xml',
        'content'   => $entry
    )
);

$context = stream_context_create($opts);
$result = file_get_contents($_POST['url'], false, $context);