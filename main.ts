import { Notice, Plugin } from 'obsidian';

export default class PasteEnhancer extends Plugin {
	async onload() {
		this.addRibbonIcon('dice', 'Roll dice', () => {
			new Notice(`${Math.floor(Math.random() * 100)}`);
		});
	}

	onunload() {}
}
