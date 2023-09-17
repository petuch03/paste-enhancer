import {Editor, Plugin} from 'obsidian';
import {adjustNumberedContent, convertObsidianToPlainMarkdown} from "./utils";

export default class CopyPasteEnhancer extends Plugin {
	async onload() {
		console.log("started CopyPasteEnhancer plugin")

		this.addCommand({
			id: 'paste-numbered-list',
			name: 'Paste Numbered List',
			callback: this.pasteAdjustedContent.bind(this),
		});

		this.addCommand({
			id: 'copy-plain-markdown',
			name: 'Copy Plain Markdown',
			callback: this.copyPlainMarkdown.bind(this),
		});
	}

	async onunload() {
	}

	async pasteAdjustedContent() {
		const editor: Editor | undefined = this.app.workspace.activeEditor?.editor;
		if (!editor) return;

		const doc: Editor = editor.getDoc();

		try {
			const clipboardContent: string = await navigator.clipboard.readText();
			console.log(`Got from clipboard: \n${clipboardContent}`)

			const adjustedContent: string = adjustNumberedContent(clipboardContent, editor);

			doc.replaceSelection(adjustedContent);
			console.log(`Replaced with \n${adjustedContent}`)
		} catch (error) {
			console.error('Error fetching content from the clipboard:', error);
		}
	}

	async copyPlainMarkdown() {
		const editor: Editor | undefined = this.app.workspace.activeEditor?.editor;
		if (!editor) return;

		const doc: Editor = editor.getDoc();
		const selectedContent: string = doc.getSelection();

		const plainMarkdown: string = convertObsidianToPlainMarkdown(selectedContent);

		try {
			await navigator.clipboard.writeText(plainMarkdown);
			console.log("Copied plain markdown to clipboard");
		} catch (error) {
			console.error("Error copying plain markdown to clipboard:", error);
		}
	}
}
