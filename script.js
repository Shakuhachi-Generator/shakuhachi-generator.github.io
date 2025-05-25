function increaseValue(id)
{
	let element = document.getElementById(id);
	let value   = Number(element.value);
	let max     = Number(element.max)
	if (value < max)
	{
		element.value = value + 1;
	}
}

function decreaseValue(id)
{
	let element = document.getElementById(id);
	let value   = Number(element.value);
	let min     = Number(element.min)
	if (value > min)
	{
		element.value = value - 1;
	}
}

function clampValue(id)
{
	let element = document.getElementById(id);
	let value   = Number(element.value);
	let min     = Number(element.min)
	let max     = Number(element.max)
	if (value <= min)
	{
		element.value = min;
	}
	else if (value >= max)
	{
		element.value = max;
	}
}

function selectValue(id)
{
	document.getElementById(id).select();
}

function updateLongNoteFrequencyValueLabel()
{
	let frequencyOfLongNotes = document.getElementById('frequencyOfLongNotes').valueAsNumber;
	document.getElementById('longNoteFrequencyValue').innerText = frequencyOfLongNotes + '%';
}

var languageList = ["hun", "eng"]

function changeLanguage(language)
{
	for (let i = 0; i < languageList.length; i++)
	{
		elements = document.getElementsByClassName("lang_"+languageList[i]);
		if (language != languageList[i])
			for (let j = 0; j < elements.length; j++)
				elements[j].style.display = "none";
		else
			for (let j = 0; j < elements.length; j++)
				elements[j].style.display = "";
	}
}

window.onload = () =>
{
	changeLanguage("hun");
	updateLongNoteFrequencyValueLabel();
}
