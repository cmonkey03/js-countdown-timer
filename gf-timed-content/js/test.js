function gf_timed_content_init (json_arg) {
	let args = JSON.parse(json_arg);
	// alert ('inside init with a target date: ' + args['target_date']);
}

function gf_timed_content_countdown(json_arg) {
	let args = JSON.parse(json_arg);
	console.log(args)
	let the_div = args['div_id']
	console.log(the_div)

	setTimeout(function() {
		document.getElementById(the_div).innerHTML='imagine this is a countdown timer!';
	}, 3000)
}
