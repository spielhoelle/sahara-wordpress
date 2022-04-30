<?php

//[animation]
add_action('wp_enqueue_scripts', 'menu_scripts');
function menu_scripts()
{
	wp_enqueue_script('animation', get_bloginfo('stylesheet_directory') . '/three/dist/client/bundle.js', array('jquery'), '1.0.0', true);
	$parent_style = 'parent-style';
	wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array($parent_style), wp_get_theme()->get('Version'));
	// wp_enqueue_script('TweenMax', get_bloginfo('stylesheet_directory') . '/js/TweenMax.min.js', array('jquery'), false);
	// wp_enqueue_script('inflate', get_bloginfo('stylesheet_directory') . '/js/inflate.min.js', array('jquery'), false);
	// wp_enqueue_script('three', get_bloginfo('stylesheet_directory') . '/js/three.min.js', array('jquery'), false);
	// wp_enqueue_script('OrbitControls', get_bloginfo('stylesheet_directory') . '/js/OrbitControls.js', array('jquery'), false);
	// wp_enqueue_script('GLTFLoader', get_bloginfo('stylesheet_directory') . '/js/GLTFLoader.js', array('jquery'), false);
	// wp_enqueue_script('FBXLoader', get_bloginfo('stylesheet_directory') . '/js/FBXLoader.js', array('jquery'), false);
	// wp_enqueue_script(
	// 	'custom-script',
	// 	get_stylesheet_directory_uri() . '/js/custom_script.js',
	// 	array('jquery')
	// );
}
function animation_func($atts)
{
	$html =	"<div id='animation'>
				<div class='animation-buttons'>
					<button class='btn btn-lg btn-secondary' id='camera-getposition-button'>Get camera position</button>
					<button class='btn btn-lg btn-secondary' id='camera-reset-face-button'>Center camera on face</button>
					<button class='btn btn-lg btn-secondary' id='camera-reset-button'>Center camera on skeletton</button>
					<button class='btn btn-lg btn-secondary' id='hide_overlay'>Toggle overlay</button>
					<button class='btn btn-lg btn-secondary' id='template'>Get page template</button>
				</div>

				 <video width='320' height='240' class='d-none' autoplay loop>
					<source src='wp-content/themes/twentytwentytwo-child/smoke.mp4' type='video/mp4'>
					<source src='movie.ogg' type='video/ogg'>
					Your browser does not support the video tag.
				</video> 
			</div>";
	echo $html;
}
add_shortcode('animation', 'animation_func');

// echo "<script type=ext/javascript'>var ajaxurl='" . admin_url('admin-ajax.php') . "'; console.log(ajaxurl);</script>";
// add_action("wp_ajax_infiniteScroll", "infiniteScroll");
// add_action("wp_ajax_nopriv_infiniteScroll", "infiniteScroll");
// function infiniteScroll()
// {
// 	// This is what's returned to the client.
// 	echo "foo";
// 	die();
// }


function add_menu_item_slug_class($classes, $item, $args)
{

	$item_class = sanitize_title($item->title); // Convert title to a slug
	$classes[] = "menu-item-" . $item_class;

	return $classes;
}
add_filter('nav_menu_css_class', 'add_menu_item_slug_class', 1, 3);
