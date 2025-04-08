var kari_katakana   = ['\u30ED', '\u30C4', '\u30EC', '\u30C1', '\u30CF', '\u30A4'];
var kari_romaji     = ["ro", "cu", "re", "csi", "ha", "i"];
var longNoteSymbol  = '|';
var breathEndSymbol = '\u2218';

var useRiInsteadOfHa;
var katakanaNotation;
var numberOfColumns;
var numberOfBreaths;
var notesPerBreath;
var frequencyOfLongNotes;

function useRi() { kari_katakana[4] = '\u30EA'; kari_romaji[4] = "ri"; }
function useHa() { kari_katakana[4] = '\u30CF'; kari_romaji[4] = "ha"; }

function updateKatakanaNotation()       { katakanaNotation       = document.getElementById("katakanaNotation").checked;             }
function updateNumberOfColumns()        { numberOfColumns        = document.getElementById("numberOfColumns").valueAsNumber;        }
function updateNumberOfBreaths()        { numberOfBreaths        = document.getElementById("numberOfBreaths").valueAsNumber;        }
function updateNumberOfNotesPerBreath() { numberOfNotesPerBreath = document.getElementById("numberOfNotesPerBreath").valueAsNumber; }

function updateLongNoteFrequencyValueLabel()
{
	frequencyOfLongNotes = document.getElementById('frequencyOfLongNotes').valueAsNumber;
	document.getElementById('longNoteFrequencyValue').innerText = frequencyOfLongNotes + '%';
}

window.onload = () =>
{
	useRiInsteadOfHa = document.getElementById("useRi").checked;
	updateKatakanaNotation();
	updateNumberOfColumns();
	updateNumberOfBreaths();
	updateNumberOfNotesPerBreath();
	updateLongNoteFrequencyValueLabel();
}

function getRandomNote(notes)
{
	return notes[Math.floor(Math.random() * notes.length)];
}

function generateRandomSheet()
{
	// Settings
	let notes = [];

	if (katakanaNotation)
		notes = kari_katakana;
	else
		notes = kari_romaji;

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
