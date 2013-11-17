<?php //#########################################
// Different helpers for JQM listviews
//############################################### 
namespace Listview;

//===============================================
// Listview of all direct children within the selected $pageSlug
//===============================================
// $pageSlug:   (STR) The page slug, relative to /content
// $inset:      (BOL) [True] should it be inset?
// $themeHeader:(STR) ['a'] The theme letter for separators
// $themeBody:  (STR) ['b'] The theme letter for regular items
// 
function children($pageSlug, $inset = true, $themeHeader = 'a', $themeBody = 'c'){
    //- - - - - - - - - - - - - - - - - - - - - - - -
    // Get the directory
    //- - - - - - - - - - - - - - - - - - - - - - - -
    global $site;
    $page = $site->pages->find($pageSlug);
    $path = explode('/', $pageSlug);
    if(!$page) return;

    //- - - - - - - - - - - - - - - - - - - - - - - -
    // Get the icon for the header
    //- - - - - - - - - - - - - - - - - - - - - - - -
    $headerIcon = '';
    if($page->icon()) $headerIcon = '<i class="icon-' . $page->icon() . '"></i> &nbsp;';

    //===============================================
    // Add each child as a page
    //===============================================
    if($children = $page->children()):
        $children = $children->sortBy('order', 'asc');
        ?>
        <ul data-role="listview" data-inset="<?= $inset ?>">
            <li data-role="list-divider" data-theme="<?= $themeHeader ?>"><?= $headerIcon . ucwords(str_replace('-', ' ', $path[count($path)-1])) ?></li>
            <?php 
                foreach($children as $child):                 
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Links
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    if($child->link()){
                        $url = $child->link();
                        $noAjax = ' data-ajax="false" ';
                    } else {
                        $url = $child->url();
                        $noAjax = '';
                    }

                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    // Icons
                    //- - - - - - - - - - - - - - - - - - - - - - - -
                    $icon = '';
                    if($child->icon()) $icon = '<i class="icon-' . $child->icon() . '"></i> ';
            ?>
                <li data-theme="<?= $themeBody ?>"><a href="<?= $url ?>" <?= $noAjax ?>><?= $icon . $child->title() ?></a></li>
            <?php endforeach; ?>
        </ul>        
    <?php endif;
}