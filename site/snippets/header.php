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

    <!-- Dependencies -->
    <?= js('assets/js/lib/jquery.js') ?>
    <?= js('assets/js/lib/jquery.mobile.js') ?>
    <?= js('assets/js/lib/underscore.js') ?>
    <?= js('assets/js/lib/underscore.string.js') ?>
    <?= js('assets/js/lib/purl.js') ?>

    <!-- App -->
    <?= js('assets/js/helpers.js') ?>
    <?= js('assets/js/app.js') ?>
    <?= js('assets/js/app/authentication.js') ?>
    <?= js('assets/js/app/database.js') ?>
    <?= js('assets/js/app/page.js') ?>
    <!-- Modules -->
    <?= js('assets/js/modules/notice.js') ?>
    <?= js('assets/js/modules/timers.js') ?>

    <script type="text/javascript" src="https://apis.google.com/js/client.js?onload=gapiLoaded"></script>
</head>
<body class="debug <?= slugify($page->title()) ?>">
    <div id="page" data-role="page">
        <header data-role="header">
            <a href="/"><i class="icon-home"></i></a>
            <h1><?= $page->title() ?></h1>
        </header>