<?php
/*
* Plugin Name: GF Timed Content
* Description: Bridge to custom JS for timed content and countdown/up timers.
* Version: 1.0
* Author: Zubin Mathai & Russell Brown
* Author URI: https://www.gangaji.org
*/

// register the script on plugin load
function gf_timed_content_enqueue() {
	// use file timestamp as version num so it reloads every time during development.
	$file = 'js/test.js';
	$fileurl = plugin_dir_url( __FILE__ ) . $file;
	$filepath = plugin_dir_path( __FILE__ ) . $file;
	wp_enqueue_script( 'gf_timed_content', $fileurl, array ('jquery'), filemtime($filepath));  
}
add_action( 'wp_enqueue_scripts', 'gf_timed_content_enqueue' );


// Shortcode handler to Init the js variables
//
// We make sure the function only loads the js on pages where the shortcode is present
// Usage (for now): [gf_timed_init target_date="2019-02-20 12:00:00"]
// 		where target_date will be used by the js for all timed content and countdown/ups
//
// This function calls the specified js function in place, and expects no output
//
function gf_timed_content_init( $attributes ) {

	// enqueue the js now since we know we need it
	wp_enqueue_script( 'gf_timed_content' );

	// the javascript function to call
	$js_function = "gf_timed_content_init";
	
	// the shortcode args
	$args = shortcode_atts( 
		  array(
				'target_date' => date('Y-m-d H:i:s'),
			), 
			$atts
	);
	
	// add some checking here
	
	// get ready to call the javascript init function.
	// since we might be passing more args later, lets json encode
	$js_args = array (
		'target_date' => $args['target_date']
	);
	$json_for_js = json_encode($js_args);
	
	// now call the js init function
	?>
		<script type="text/javascript">
			<?php echo "{$js_function}('$json_for_js');"?>
		</script>
	<?php
	
	// this shortcode does nothing but init the js, 
	// so it doesn't need to output anything
	return '';
}

// register our init shortcode
add_shortcode( 'gf_timed_init', 'gf_timed_content_init' );


// Shortcode handler to register a countdown timer
//
// This shortcode will be used tell the js where to put a countdown timer
// 	and must be used after the [gf_timed_init] shortcode.
//
// Usage: [gf_countdown div='div_id']
// where div is the ID of the div where we want one countdown timer inserted.
// We pass that div ID to a js function.
//
function gf_timed_content_countdown($attributes) {

	// javascript function to call
	$js_function = "gf_timed_content_countdown";
	
	// the shortcode args
	$args = shortcode_atts( 
		  array(
				'countdown_div' => 'gf_countdown_div',
			), 
			$atts
	);	

	// since we might be passing more args later, lets json encode
	$js_args = array (
		'countdown_div' => $args['countdown_div']
	);
	$json_for_js = json_encode($js_args);

	
	// now call the js function
	?>
		<script type="text/javascript">
			<?php echo "{$js_function}('$json_for_js');"?>
		</script>
	<?php
	
	// we just output an empty div with the passed-in id
	return "<div id='" . $args['countdown_div'] . "'></div>";
}
// register our countdown shortcode
add_shortcode( 'gf_countdown', 'gf_timed_content_countdown' );




