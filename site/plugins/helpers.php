<?php //#########################################
// Helper Functions
//############################################### 

/**
 * Load an image, either relative to the folder directory or absolute url
 * @param  [STR] $uri   Location, relative to "/assets/image"
 * @param  [ARR/STR] $atts   Attributes or Alt tag ('if string')
 * @param  [OBJ] $page  If passed, will load relative to the current pages folder
 * @return [STR] The <img> tag
 */
function img($uri, $atts = '', $page = false){    
    //- - - - - - - - - - - - - - - - - - - - - - - -
    // Relative
    // :: If $local, then we'll try the $page folder
    // :: If not $page, then we'll try in the img folder
    //- - - - - - - - - - - - - - - - - - - - - - - -
    if(substr($uri, 0, 4) !== 'http'){
        if($page)
            $uri = $page->images()->find($uri)->url();
        else
            $uri = url('assets/img/') . $uri;
    }

    //- - - - - - - - - - - - - - - - - - - - - - - -
    // Build the attributes
    //- - - - - - - - - - - - - - - - - - - - - - - -
    if(is_array($atts)){
        if(!isset($atts['alt'])) $atts['alt'] = '';

        $str = '';
        foreach($atts as $key=>$att)
            $str .= $key . "='$att'";
        $atts = $str;
    } else {
        $atts = "alt='$atts'";
    }

    return "<img src='$uri' $atts>";
}


/**
 * Slugifies a string, lowercasing and replacing spaces with hyphens
 * :: Useful for turning strings into classnames
 * 
 * @param  [STR] $url string to slugify
 * @return [STR]      slugged string
 */
function slugify($url){
    $url = strtolower($url);
    $url = str_replace(' ', '-', $url);
    return $url;
}