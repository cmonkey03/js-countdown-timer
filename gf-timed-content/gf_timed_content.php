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


/**
 * This shortcode will be used tell the js where to put a countdown timer
 * We process the args and then pass them as a json string to js function.
 *
 * Usage: [gf_countdown div_id='div_id' to_date='2019-02-22 16:00:00']
 * @param string div_id: is the ID of the div where we want a countdown timer inserted.
 * @param string to_date: is a mysql formatted date-time string, 
 *		or '+X' to set the date-time to X seconds from now
 *
 */         
function gf_timed_content_countdown($atts) {

	// javascript function to call
	$js_function = "gf_timed_content_countdown";
	
	// the shortcode args
	$args = shortcode_atts( 
		  array(
				'div_id' => 'gf_countdown_div',
				'to_date' => '2030-01-01 12:00:00'		
			), 
			$atts
	);	

	// convert the datestring into a timestamp
	$to_date = gf_timed_content_js_timestring($args['to_date']);

	// since we might be passing more args later, let's json encode
	$js_args = array (
		'div_id' => $args['div_id'],
		'to_date' => $to_date,
	);
	$json_for_js = json_encode($js_args);

	
	// now call the js function
	?>
		<script type="text/javascript">
			<?php echo "{$js_function}('$json_for_js');"?>
		</script>
	<?php
	
	// we just output an empty div with the passed-in id
	return "<div id='" . $args['div_id'] . "'></div>";
}
// register our countdown shortcode
add_shortcode( 'gf_countdown', 'gf_timed_content_countdown' );


/**
 * Converts a timestring or a time delta to a UTC timestamp
 *
 * @param string $date_string: a mysql formatted datetime
 *							or use +X for a time delta of X seconds from now()
 * @param string $time_delta: optional number of seconds to add to $date_string
 *
 * @return number: unix timestamp
 *
 */   
function gf_timed_content_js_timestring($date_string,$time_delta=0) {

	$start_time = time();	// always in UTC
	
	if ($date_string) {

		// get the WordPress timezone and set as php timezone
		$local_tz = get_option('timezone_string');
		date_default_timezone_set($local_tz);
		
		$first_char=substr($date_string, 0, 1);
		if ($first_char === '+' || $first_char === '-') {
			// caller wants a time diff from now
			$start_time += intval($date_string);
		} else {
		
			// otherwise they're passing in an actual date-time
			// so, format from the date string
	  		try {
				$start_time = new DateTime($date_string);	// from local to UTC
				$start_time = $start_time->format('U');		// get timestamp from date
			} catch (Exception $e) {
				error_log("error: " . $e->getMessage());
			}
					
		}
	
		// check if they want an additional delta added
		if (!empty($time_delta)) $start_time += (int) $time_delta;
		
	}
	
	return $start_time;
}




