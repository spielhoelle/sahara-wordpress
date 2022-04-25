<?php

//[animation]
function animation_func($atts)
{
	add_action('wp_enqueue_scripts', 'menu_scripts');
	function menu_scripts()
	{
		// wp_enqueue_script('TweenMax', get_bloginfo('stylesheet_directory') . '/js/TweenMax.min.js', array('jquery'), false);
		// wp_enqueue_script('inflate', get_bloginfo('stylesheet_directory') . '/js/inflate.min.js', array('jquery'), false);
		// wp_enqueue_script('three', get_bloginfo('stylesheet_directory') . '/js/three.min.js', array('jquery'), false);
		// wp_enqueue_script('OrbitControls', get_bloginfo('stylesheet_directory') . '/js/OrbitControls.js', array('jquery'), false);
		// wp_enqueue_script('GLTFLoader', get_bloginfo('stylesheet_directory') . '/js/GLTFLoader.js', array('jquery'), false);
		// wp_enqueue_script('FBXLoader', get_bloginfo('stylesheet_directory') . '/js/FBXLoader.js', array('jquery'), false);
		wp_enqueue_script('animation', get_bloginfo('stylesheet_directory') . '/three/dist/client/bundle.js', array('jquery'), '1.0.0');
		$parent_style = 'parent-style'; 
		wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
		wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array($parent_style), wp_get_theme()->get('Version'));
		// wp_enqueue_script(
		// 	'custom-script',
		// 	get_stylesheet_directory_uri() . '/js/custom_script.js',
		// 	array('jquery')
		// );
	}
	$html =	"<div id='animation'>
				<div class='animation-buttons'>
					<button class='btn btn-lg btn-secondary' id='camera-getposition-button'>Test</button>
					<button class='btn btn-lg btn-secondary' id='camera-reset-button'>Recenter camera</button>
				</div>
			</div>";
	echo $html;
}
add_shortcode('animation', 'animation_func');
