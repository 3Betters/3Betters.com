<!DOCTYPE html>
<html lang="en">
<head>
    <title><?= html($site->title()) ?> - <?= html($page->title()) ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    <meta name="description" content="<?= html($site->description()) ?>">
    <meta name="basepath-js" content="<?= url('assets/js/') ?>">
    <link rel="icon" type="image/x-icon" href="<?= url('assets/favicon.ico') ?>">

    <?= css('assets/styles/style.css') ?> 

    <!-- Core -->
    <?= js("assets/js/lib/jquery.js") ?>
    <?= js("assets/js/lib/jquerymobile.js") ?>
    <?= js("assets/js/lib/underscore.js") ?>     

    <!-- App -->
    <?= js("assets/js/helpers.js") ?>
    <?= js("assets/js/app/app.js") ?>
    <?= js("assets/js/app/auth.js") ?>

    <script type="text/javascript" src="<?= url('assets/js/lib/gapi-client.js') ?>?onload=handleClientLoad"></script>
</head>
<body class="<?= slugify($page->title()) ?>">
    <div id="page" data-role="page">
        <header data-role="header">
            <a href="/"><i class="icon-home"></i></a>
            <h1><?= $page->title() ?></h1>
        </header>