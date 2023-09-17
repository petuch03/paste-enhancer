import {Editor} from "obsidian";
import * as CodeMirror from "codemirror";

export function adjustNumberedContent(content: string, editor: Editor): string {
	const doc : Editor = editor.getDoc();
	const cursorPosition : CodeMirror.Position = doc.getCursor();
	const linesBeforeCursor : string[] = doc.getRange({ line: 0, ch: 0 }, cursorPosition).split('\n');

	let lastNumber = null;
	let lastIndentation  = '';
	for (let i : number = linesBeforeCursor.length - 1; i >= 0; i--) {
		const match : RegExpMatchArray | null = linesBeforeCursor[i].match(/^(\s*)(\d+)\./);
		if (match) {
			lastIndentation = match[1];
			lastNumber = parseInt(match[2]);
			break;
		}
	}

	if (lastNumber !== null) {
		const linesFromClipboard : string[] = content.split('\n');
		const adjustedLines = [];

		for (const line of linesFromClipboard) {
			const matchResult = line.match(/^\s*/);
			const currentIndentation = matchResult ? matchResult[0] : '';

			if (currentIndentation === lastIndentation) {
				lastNumber++;
				adjustedLines.push(`${lastIndentation}${lastNumber}. ${line.trim().replace(/^\d+\.\s*/, '')}`);
			} else {
				adjustedLines.push(line);
			}
		}

		content = adjustedLines.join('\n');
	}

	return content;
}
