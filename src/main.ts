import { Notice, Plugin, TFile } from 'obsidian';
import { DEFAULT_SETTINGS, AdaptPluginSettings, AdaptPluginSettingTab } from "./settings";
import { GetNewAdaptNotesHandler } from 'features/getNewAdaptNotes';
import { OpenFileToDateHandler } from 'features/openFileToDate';
import { AppendFileTextHandler } from 'features/appendFileText';

export default class AdaptPlugin extends Plugin {
	settings: AdaptPluginSettings;

	async onload() {
		await this.loadSettings();

		// Add ribbon icon for quick access  
		// eslint-disable-next-line obsidianmd/ui/sentence-case
		this.addRibbonIcon('feather', 'Sync ADAPT notes', (evt: MouseEvent) => {
			void this.handleImport();
		});

		this.addCommand({
			id: 'sync-adapt-notes',
			// eslint-disable-next-line obsidianmd/ui/sentence-case
			name: 'Import new ADAPT notes',
			callback: () => this.handleImport()
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdaptPluginSettingTab(this.app, this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<AdaptPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async moveCursor(date: Date) {
        this.settings.lastMaxUpdatedAt = date;
		await this.saveSettings()
	}

	async handleImport() {
		const apiHandler = new GetNewAdaptNotesHandler(this.settings);
		const fileToDateHandler = new OpenFileToDateHandler(this.app, this.settings);
		const appendTextHandler = new AppendFileTextHandler(this.app);
		try {
			const items = await apiHandler.get(new Date(this.settings.lastMaxUpdatedAt));
			if (items.length > 0) {
				const sortedItems = [...items].sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
				for(const item of sortedItems) {
					const itemDate = item.updatedAt;
					try{
						const file = await fileToDateHandler.open(itemDate);
						if (file instanceof TFile) {
							await appendTextHandler.appendText(file, item);
							await this.moveCursor(itemDate);
						}
					}
					catch (e) {
						console.error("Error writing ADAPT note to file: %s", e)
						// eslint-disable-next-line obsidianmd/ui/sentence-case
						new Notice("Error syncing with ADAPT");
					}
				}
			}
		} catch (error) {
			console.error("Error getting adapt notes: %s", error);
		}
	}
}