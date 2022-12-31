let test_case = [
	`time="2022-12-31 08:17:36" machine_name=Eek_293_O event_name=Denied by User ODO Blist src_ip=12.12.23.12 src_port=32002 dst_ip=102.142.135.251 dst_port=1423 protocol=6 ingres_if=External input_interface=enn112"`,
	`a=1 b=2`,
];

let cur_idx = -1;

function section1_update(e) {
	output_textarea.value = "";
	let input_value = input_textarea.value;

	let splitList = input_value.split("=");
	let keyList = [];
	let valList = [];

	for (const [index, splited] of Object.entries(splitList)) {
		if (index == 0) {
			keyList.push(splited);
		} else if (index == splitList.length - 1) {
			valList.push(splited);
		} else {
			let spaceSplit = splited.split(" ");
			let preVal = "";
			for (const [idx, value] of Object.entries(spaceSplit)) {
				if (idx == spaceSplit.length - 1) {
					keyList.push(value);
				} else {
					preVal += value;
				}
			}
			valList.push(preVal);
		}
	}
	console.log(Object.entries(splitList));

	let dissectPattern = "";
	for (const [idx, key] of Object.entries(keyList)) {
		if (idx == keyList.length - 1) {
			dissectPattern += `${key}="%{${key}}"`;
		} else {
			dissectPattern += `${key}="%{${key}}"`;
		}
	}
	let resultString = `dissect {
        mapping => {
            "body" => '${dissectPattern}'
        }
    }`;

	output_textarea.value = resultString;
}

function macro_input(index) {
	cur_idx = parseInt(index);
	input_textarea.value = test_case[parseInt(index)];
	section1_update();
}

function select_changed(e) {
	macro_input(e.target.value);
}

function auto_input() {
	if (cur_idx + 1 >= test_case.length) {
		cur_idx = -1;
	}
	auto_input_select.value = cur_idx + 1;
	macro_input(cur_idx + 1);
}

for (let i = 0; i < test_case.length; i++) {
	let tempo = test_case[i].split(" ");
	let option_el = document.createElement("option");
	option_el.value = i;
	option_el.innerText = `${tempo[0]} ${tempo[1]} ${tempo[2]}`;
	auto_input_select.appendChild(option_el);
}
