var kari_katakana   = ['\u30ED', '\u30C4', '\u30EC', '\u30C1', '\u30CF', '\u30A4'];
var kari_romaji     = ["ro", "cu", "re", "chi", "ha", "i"];
var meri_katakana   = ['\u30ED\u30E1', '\u30C4\u30E1', '\u30A6'];
var meri_romaji     = ["ro meri", "cu meri", "u"];
var longNoteSymbol  = '|';
var breathEndSymbol = '\u2218';

function getRandomNote(notes)
{
	return notes[Math.floor(Math.random() * notes.length)];
}

function generateRandomSheet()
{
	// Settings
	let numberOfColumns        = document.getElementById("numberOfColumns").valueAsNumber;
	let numberOfBreaths        = document.getElementById("numberOfBreaths").valueAsNumber;
	let numberOfNotesPerBreath = document.getElementById("numberOfNotesPerBreath").valueAsNumber;
	let frequencyOfLongNotes   = document.getElementById('frequencyOfLongNotes').valueAsNumber;

	let notes = [];

	if (selectedLanguage == "hun")
		kari_romaji[3] = "csi";
	else
		kari_romaji[3] = "chi";

	if (selectedRiHa == "ri")
	{
		kari_katakana[4] = '\u30EA';
		kari_romaji[4] = "ri";
	}
	else
	{
		kari_katakana[4] = '\u30CF';
		kari_romaji[4] = "ha";
	}

	if (selectedDisplayMode == "katakana")
		notes = kari_katakana.concat(meri_katakana);
	else
		notes = kari_romaji.concat(meri_romaji);

	let includes = [
		document.getElementById("includeRo").checked,
		document.getElementById("includeCu").checked,
		document.getElementById("includeRe").checked,
		document.getElementById("includeChi").checked,
		document.getElementById("includeHa").checked,
		document.getElementById("includeI").checked,
		document.getElementById("includeRomeri").checked,
		document.getElementById("includeCumeri").checked,
		document.getElementById("includeU").checked
	];
	for (let i = includes.length - 1; i >= 0; --i)
		if (includes[i] == false)
			notes.splice(i,1);

	// Generating the notes
	let columns = [];
	let longestColumn = 0;
	for (let i = 0; i < numberOfColumns; i++)
	{
		let column = [];
		for (let j = 0; j < numberOfBreaths; j++)
		{
			for (let k = 0; k < numberOfNotesPerBreath; k++)
			{
				column.push(getRandomNote(notes));
				if (Math.random() < (frequencyOfLongNotes / 100.0))
					column.push(longNoteSymbol);
			}
			column.push(breathEndSymbol);
		}
		columns.push(column);
		if (column.length > columns[longestColumn].length)
			longestColumn = i;
	}

	// Creating the rows
	let rows = [];
	for (let i = 0; i < columns[longestColumn].length; i++)
		rows.push(document.createElement("tr"));

	// Creating the cells
	for (let i = 0; i < columns.length; i++)
	{
		// Cells with notes
		for (let j = 0; j < columns[i].length; j++)
		{
			let cell = document.createElement("td");
			cell.innerText = columns[i][j];
			if (cell.innerText == "\u30ED\u30E1")
				cell.className = "romeri";
			else if (cell.innerText == "\u30C4\u30E1")
				cell.className = "cumeri";
			rows[j].appendChild(cell);
		}
		// Empty cells for padding
		for (let j = columns[i].length; j < columns[longestColumn].length; j++)
		{
			let cell = document.createElement("td");
			rows[j].appendChild(cell);
		}
	}

	// Updating the table
	let sheet = document.getElementById("sheet-table");
	sheet.innerHTML = "";
	for (let i = 0; i < columns[longestColumn].length; i++)
		sheet.appendChild(rows[i]);
}
