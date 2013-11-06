<?php snippet('header') ?>
    <?php //#########################################
    // Handle Soft Redirection
    // :: We simply change the $page variable to the
    //      new one
    //############################################### 
    if($page->redirect()) $page = $site->pages->find($page->redirect());
    ?>
    <div class="ui-grid-a page">
        <aside class="ui-block-a main">
            <?= listview_pages($page->sidebar(), false, 'a') ?>            
        </aside>
        <article class="ui-block-b">
            <ul class="notices error" data-role="listview" data-inset="true" data-theme="a">
                <li data-role="list-divider" data-theme="b">Warnings</li>
            </ul>
            <ul class="notices success" data-role="listview" data-inset="true" data-theme="a">
                <li data-role="list-divider" data-theme="d">Notifications</li>
            </ul>
            <?= kirbytext($page->text()) ?>
        </article>
    </div>    

    <?php //#########################################
    // Store page metadata
    //############################################### ?>
    <div meta-requires-settings="<?= $page->requiressettings() ?>"></div>
    <div meta-requires-tool-br="<?= $page->requirestoolbr() ?>"></div>
    <div meta-pageshow="<?= $page->pageshow() ?>"></div>
<?php snippet('footer') ?>