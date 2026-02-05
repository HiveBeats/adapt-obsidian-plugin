import {App, PluginSettingTab, Setting} from "obsidian";
import AdaptPlugin from "./main";

export interface AdaptPluginSettings {
	adaptBaseUrl: string;
	adaptApiKey: string;
	dailyFolder: string;
	lastMaxUpdatedAt: Date;
}

export const DEFAULT_SETTINGS: AdaptPluginSettings = {
	adaptBaseUrl: 'https://api.adaptmind.io',
	adaptApiKey: '',
	dailyFolder: '',
	lastMaxUpdatedAt: new Date('1970-01-01T00:00:00.000Z')
}

export class AdaptPluginSettingTab extends PluginSettingTab {
	plugin: AdaptPlugin;

	constructor(app: App, plugin: AdaptPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Adapt API key")
			.setDesc('API key from your adaptmind.io account')
			.addText(text => text
				.setPlaceholder('API key')
				.setValue(this.plugin.settings.adaptApiKey)
				.onChange(async (value) => {
					this.plugin.settings.adaptApiKey = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Daily folder')
			.setDesc("Your daily notes folder (leave empty, if you don't use them)")
			.addText(text => text
				.setPlaceholder('Daily folder')
				.setValue(this.plugin.settings.dailyFolder)
				.onChange(async (value) => {
					this.plugin.settings.dailyFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}
