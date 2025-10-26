function toggleKariNotes(event)
{
	document.getElementById("includeRo").checked = event.target.checked;
	document.getElementById("includeCu").checked = event.target.checked;
	document.getElementById("includeRe").checked = event.target.checked;
	document.getElementById("includeChi").checked = event.target.checked;
	document.getElementById("includeHa").checked = event.target.checked;
	document.getElementById("includeI").checked = event.target.checked;
}

function toggleMeriNotes(event)
{
	document.getElementById("includeRomeri").checked = event.target.checked;
	document.getElementById("includeCumeri").checked = event.target.checked;
	document.getElementById("includeU").checked = event.target.checked;
}

function checkKari()
{
	if (document.getElementById("includeKari").checked)
		document.getElementById("includeKari").checked = false;
	else
	{
		document.getElementById("includeKari").checked =
			document.getElementById("includeRo").checked &&
			document.getElementById("includeCu").checked &&
			document.getElementById("includeRe").checked &&
			document.getElementById("includeChi").checked &&
			document.getElementById("includeHa").checked &&
			document.getElementById("includeI").checked;
	}
}

function checkMeri()
{
	if (document.getElementById("includeMeri").checked)
		document.getElementById("includeMeri").checked = false;
	else
	{
		document.getElementById("includeMeri").checked =
			document.getElementById("includeRomeri").checked &&
			document.getElementById("includeCumeri").checked &&
			document.getElementById("includeU").checked;
	}
}

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
	let frequencyOfLongNotes = document.getElementById("frequencyOfLongNotes").valueAsNumber;
	document.getElementById("longNoteFrequencyValue").innerText = frequencyOfLongNotes + '%';
}

function toggleSettingsWindow()
{
	document.getElementById("settings").classList.toggle("hidden");
}

const languageList = ["hun", "eng"];
const DEFAULT_LANGUAGE = "hun";
var selectedLanguage = DEFAULT_LANGUAGE;

function changeLanguage(language)
{
	if ((language == selectedLanguage) || (languageList.findIndex(lang => lang == language) == -1))
		return;

	let styleSheet = document.styleSheets[0];
	let ruleIndex  = -1;

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".lang_"+selectedLanguage);
	styleSheet.cssRules[ruleIndex].style.display = "none";

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".lang_"+language);
	styleSheet.cssRules[ruleIndex].style.display = "";

	selectedLanguage = language;
}

const DEFAULT_DISPLAY_MODE = "katakana";
var selectedDisplayMode = DEFAULT_DISPLAY_MODE;

function changeNoteDisplay(displayMode)
{
	if ((displayMode == selectedDisplayMode) || ((displayMode != "katakana") && (displayMode != "romaji")))
		return;

	let styleSheet = document.styleSheets[0];
	let ruleIndex  = -1;

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".note_"+selectedDisplayMode);
	styleSheet.cssRules[ruleIndex].style.display = "none";

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".note_"+displayMode);
	styleSheet.cssRules[ruleIndex].style.display = "";

	selectedDisplayMode = displayMode;
}

const DEFAULT_RI_HA = "ha";
var selectedRiHa = DEFAULT_RI_HA;

function changeRiHa(riha)
{
	if ((riha == selectedRiHa) || ((riha != "ri") && (riha != "ha")))
		return;

	let styleSheet = document.styleSheets[0];
	let ruleIndex  = -1;

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".note_"+selectedRiHa);
	styleSheet.cssRules[ruleIndex].style.display = "none";

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".note_"+riha);
	styleSheet.cssRules[ruleIndex].style.display = "";

	selectedRiHa = riha;
}

window.onload = () =>
{
	let styleSheet = document.styleSheets[0];
	let ruleIndex  = -1;

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".lang_"+selectedLanguage);
	styleSheet.cssRules[ruleIndex].style.display = "";

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".note_"+selectedDisplayMode);
	styleSheet.cssRules[ruleIndex].style.display = "";

	ruleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText == ".note_"+selectedRiHa);
	styleSheet.cssRules[ruleIndex].style.display = "";

	updateLongNoteFrequencyValueLabel();
}
