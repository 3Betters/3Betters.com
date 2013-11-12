<?php //#########################################
// POSTS data to Google, because we can't with AJAX
//###############################################

//===============================================
// Build out the entries
//===============================================
$data =@ $_POST['data'];
switch($_POST['action']){
    case 'new-sheet':
        post(Message::sheet($data['title']));
    break;
}

//###############################################
// Builds the POST message
//###############################################
class Message{
    //===============================================
    // Create a new sheet
    //===============================================
    static function sheet($title){
        return '<?xml version="1.0" encoding="UTF-8"?>'.
            '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gs="http://schemas.google.com/spreadsheets/2006">'.
                '<title>'.$title.'</title>'.
                '<gs:rowCount>20</gs:rowCount>'.
                '<gs:colCount>10</gs:colCount>'.
            '</entry>';
    }
}

//###############################################
// POST content
// $message:    [STR] The message to send
//###############################################
function post($message){
    //===============================================
    // Setup the data
    //===============================================
    $opts = array(
        'http'  => array(
            'method'    => 'POST',
            'header'    => 'Content-Type: application/atom+xml',
            'content'   => $message
        )
    );

    //===============================================
    // Parse!
    //===============================================
    $context = stream_context_create($opts);
    $result = file_get_contents($_POST['url'], false, $context);
}