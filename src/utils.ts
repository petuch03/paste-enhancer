import {Editor, EditorPosition} from "obsidian";

const numberedIndexMatcher = /^(\s*)(\d+)\./;

export function adjustNumberedContent(content: string, editor: Editor): string {
	const doc: Editor = editor.getDoc();
	const cursorPosition: EditorPosition = doc.getCursor();
	const currentLine: string = doc.getLine(cursorPosition.line) || "";
	const previousLine: string = cursorPosition.line > 0 ? doc.getLine(cursorPosition.line - 1) : "";

	let lastNumber = null;
	let lastIndentation = '';
	let isPastingAfterNumber = false;

	const currentLineMatch: RegExpMatchArray | null = currentLine.match(numberedIndexMatcher);
	if (currentLineMatch) {
		lastIndentation = currentLineMatch[1];
		lastNumber = parseInt(currentLineMatch[2]);
		isPastingAfterNumber = true;
	} else {
		const previousLineMatch: RegExpMatchArray | null = previousLine.match(numberedIndexMatcher);
		if (previousLineMatch) {
			lastIndentation = previousLineMatch[1];
			lastNumber = parseInt(previousLineMatch[2]);
		}
	}

	if (lastNumber !== null) {
		const linesFromClipboard: string[] = content.split('\n');
		const adjustedLines = [];

		for (let i = 0; i < linesFromClipboard.length; i++) {
			const line = linesFromClipboard[i];

			if (isPastingAfterNumber && i === 0) {
				adjustedLines.push(`${line.trim().replace(/^\d+\.\s*/, '')}`);
			} else {
				lastNumber++;
				adjustedLines.push(`${lastIndentation}${lastNumber}. ${line.trim().replace(/^\d+\.\s*/, '')}`);
			}
		}

		content = adjustedLines.join('\n');
	}

	return content;
}

export function convertObsidianToPlainMarkdown(content: string): string {
	// Convert wikilinks [[link]] to [link](link)
	// List of obsidian specific markdown features: https://www.markdownguide.org/tools/obsidian/
	content = content.replace(/\[\[([^\]]+)\]\]/g, (_, link) => `[${link}](${link})`);

	return content;
}
