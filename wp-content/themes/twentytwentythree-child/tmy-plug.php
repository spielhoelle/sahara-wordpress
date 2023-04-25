<?php
# dynamic blocks
function create_block_tmy_block_init()
{
	$blocks = array(
		'sequence',
	);

	foreach ($blocks as $block) {
		register_block_type(plugin_dir_path(__FILE__) . '/blocks/' . $block . '/block.json');
	}
}
add_action('init', 'create_block_tmy_block_init');

function wpdocs_theme_name_scripts()
{
	wp_register_style('style-name', get_stylesheet_directory_uri() . '/style.css');
	wp_enqueue_style('style-name');
}
add_action('wp_enqueue_scripts', 'wpdocs_theme_name_scripts');

function myguten_enqueue()
{
	// Add styles also to gutenberg editor
	wp_register_style('style-name', get_stylesheet_directory_uri() . '/style.css');
	wp_enqueue_style('style-name');
}
add_action('enqueue_block_editor_assets', 'myguten_enqueue');
