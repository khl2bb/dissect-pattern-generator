let test_case = [
	`time="2022-12-31 08:17:36" machine_name=Eek_293_O event_name=Denied by User ODO Blist src_ip=12.12.23.12 src_port=32002 dst_ip=102.142.135.251 dst_port=1423 protocol=6 ingres_if=External input_interface=enn112"`,
	`act=block block_ip=192.168.3.33 block_device=vdevice test block_type=Period Block block_result=success ticket_type=Playbook Block block_duration=1`,
	`a=1 b=2`,
];

let cur_idx = -1;

function section1_update() {
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

function section2_update() {
	output_textarea2.value = "";
	output_textarea2.innerHTML = ''
	let input_value2 = input_textarea2.value;
	let inputSplit = input_value2.split(" ");
	for (const [idx, val] of Object.entries(inputSplit)) {
		if (idx == inputSplit.length - 1) {
			let spanEl = document.createElement("span");
			spanEl.innerText = val;
			output_textarea2.appendChild(spanEl);
		} else {
			let spanEl = document.createElement("span");
			spanEl.innerText = val;
			output_textarea2.appendChild(spanEl);

			let spaceEl = document.createElement("span");
			spaceEl.style.backgroundColor = "red";
			spaceEl.style.paddingLeft = "5px";
			spaceEl.style.boxSizing = "border-box";
			spaceEl.style.border = "1px solid black";
			output_textarea2.appendChild(spaceEl);
		}
	}
}

function macro_input(index) {
	cur_idx = parseInt(index);
	input_textarea.value = test_case[parseInt(index)];
	input_textarea2.value = test_case[parseInt(index)];
	section1_update();
	section2_update();
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
	option_el.innerText = `${tempo[0]} ${tempo[1]}`;
	auto_input_select.appendChild(option_el);
}
