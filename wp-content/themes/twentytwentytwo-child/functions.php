<?php
// [animation]
add_action('wp_enqueue_scripts', 'menu_scripts');
function menu_scripts()
{
	wp_enqueue_script('animation', get_bloginfo('stylesheet_directory') . '/three/dist/client/bundle.js', array('jquery'), '1.0.0', true);
	$parent_style = 'parent-style';
	wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
	wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array($parent_style), wp_get_theme()->get('Version'));
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

				 <video width='320' height='240' class='d-none overlay w-100 h-100' autoplay loop>
					<source src='wp-content/themes/twentytwentytwo-child/smoke.mp4' type='video/mp4'>
					<source src='movie.ogg' type='video/ogg'>
					Your browser does not support the video tag.
				</video> 
			</div>";
	echo $html;
}
add_shortcode('animation', 'animation_func');