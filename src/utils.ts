import {Editor, EditorPosition} from "obsidian";

const numberedIndexMatcher  = /^(\s*)(\d+)\./

export function adjustNumberedContent(content: string, editor: Editor): string {
	const doc: Editor = editor.getDoc();
	const cursorPosition: EditorPosition = doc.getCursor();
	const linesBeforeCursor: string[] = doc.getRange({line: 0, ch: 0}, cursorPosition).split('\n');
	const currentLine: string = linesBeforeCursor[linesBeforeCursor.length - 1];

	let lastNumber = null;
	let lastIndentation = '';
	let isPastingAfterNumber = false;

	const currentLineMatch: RegExpMatchArray | null = currentLine.match(numberedIndexMatcher);
	if (currentLineMatch) {
		lastIndentation = currentLineMatch[1];
		lastNumber = parseInt(currentLineMatch[2]);
		isPastingAfterNumber = true;
	} else {
		for (let i = linesBeforeCursor.length - 1; i >= 0; i--) {
			const match: RegExpMatchArray | null = linesBeforeCursor[i].match(numberedIndexMatcher);
			if (match) {
				lastIndentation = match[1];
				lastNumber = parseInt(match[2]);
				break;
			}
		}
	}

	if (lastNumber !== null) {
		const linesFromClipboard : string[] = content.split('\n');
		const adjustedLines = [];

		for (let i = 0; i < linesFromClipboard.length; i++) {
			const line = linesFromClipboard[i];
			const currentIndentationMatch = line.match(/^\s*/);
			const currentIndentation = currentIndentationMatch ? currentIndentationMatch[0] : '';

			if (currentIndentation === lastIndentation) {
				if (isPastingAfterNumber && i === 0) {
					adjustedLines.push(`${line.trim().replace(/^\d+\.\s*/, '')}`);
				} else {
					lastNumber++;
					adjustedLines.push(`${lastIndentation}${lastNumber}. ${line.trim().replace(/^\d+\.\s*/, '')}`);
				}
			} else {
				adjustedLines.push(line);
			}
		}

		content = adjustedLines.join('\n');
	}

	return content;
}
