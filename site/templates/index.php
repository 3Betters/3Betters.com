<?php //#########################################
// Used for index/listing pages (ex, the home page)
//############################################### 
snippet('header') ?>
    <!-- Notices -->
	<div class="add-gutter">
		<ul class="notices error" data-role="listview" data-inset="true" data-theme="a">
		    <li data-role="list-divider" data-theme="b">Warnings</li>
		</ul>
		<ul class="notices success" data-role="listview" data-inset="true" data-theme="a">
		    <li data-role="list-divider" data-theme="d">Notifications</li>
		</ul>
	</div>

    <!-- Content -->
    <div class="ui-grid-a responsive">
        <!-- Left column -->
        <article class="ui-block-a">
            <div class="align-center">
                <h1><?= img('logo.png', '3Betters') ?></h1>
                <p>A rapid platform for the serious Poker player.</p>
            </div>
            <br>
            <p class="align-center">
                <a class="login" click="api.click.login" href="#" data-text-login="Login with Google" data-text-logout="Logout" data-role="button" data-theme="e">Checking Login...</a>
                <small>disable popups for this page if the login does not work</small>
            </p>
            <br>
            <p><?= listview_pages('overview') ?></p>
        </article>
 
        <!-- Right Column -->
        <aside class="ui-block-b">
            <p><?= listview_pages('tools') ?></p>
        </aside>
    </div>    
<?php snippet('footer') ?>