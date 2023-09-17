import {Editor, Plugin} from 'obsidian';
import {adjustNumberedContent} from "./utils";

export default class PasteEnhancer extends Plugin {
	async onload() {
		console.log("started PasteEnhancer plugin")

		this.addCommand({
			id: 'paste-numbered-list',
			name: 'Paste Numbered List',
			callback: this.pasteAdjustedContent.bind(this),
		});
	}

	async onunload() {
	}

	async pasteAdjustedContent() {
		const editor : Editor | undefined = this.app.workspace.activeEditor?.editor;
		if (editor == undefined) {
			return
		}
		const doc : Editor = editor.getDoc();

		try {
			const clipboardContent : string = await navigator.clipboard.readText();
			console.log(`got from clipboard: \n ${clipboardContent}`)

			const adjustedContent : string = adjustNumberedContent(clipboardContent, editor);

			doc.replaceSelection(adjustedContent);
			console.log(`replaced with \n ${adjustedContent}`)
		} catch (error) {
			console.error('Error fetching content from the clipboard:', error);
		}
	}
}
