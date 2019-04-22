function gf_timed_content_init (json_arg) {
	const args = JSON.parse(json_arg);
	// alert ('inside init with a target date: ' + args['target_date']);
}

function gf_timed_content_countdown(json_arg) {
	const args = JSON.parse(json_arg);
	const the_div = args['div_id']

	//Remove day of week and timezone
	const date = args.to_date.substr(4, 21)
	const dateObj = new Date(date)

	console.log(date)
	console.log(dateObj)
	console.log(the_div)

	debugger;

	setTimeout(function() {
		document.getElementById(the_div).innerHTML='imagine this is a countdown timer!';
	}, 3000)
}
