var kari_katakana = ['\u30ED', '\u30C4', '\u30EC', '\u30C1', '\u30CF', '\u30A4'];
var kari_romaji   = ["ro", "cu", "re", "csi", "ha", "i"]

function getRandomNote(notes)
{
	return notes[Math.floor(Math.random() * notes.length)];
}

function generateRandomSheet()
{
	// Settings
	let notes = [];

	let useRiInsteadOfHa = false;
	if (useRiInsteadOfHa)
	{
		kari_katakana[4] = '\u30EA';
		kari_romaji[4]   = "ri";
	}

	let katakanaNotation = true;
	if (katakanaNotation)
		notes = kari_katakana;
	else
		notes = kari_romaji;

	let numberOfColumns = 7;
	let numberOfBreaths = 2;
	let notesPerBreath  = 4;

	// Generating the notes
	let columns = [];
	let longestColumn = 0;
	for (let i = 0; i < numberOfColumns; i++)
	{
		let column = [];
		for (let j = 0; j < numberOfBreaths; j++)
		{
			for (let k = 0; k < notesPerBreath; k++)
			{
				column.push(getRandomNote(notes));
				if (Math.floor(Math.random() * 2.0))
					column.push('|');
			}
			column.push('-');
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

window.onload = generateRandomSheet;
