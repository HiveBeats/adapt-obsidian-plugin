import { App, normalizePath, TFile } from 'obsidian';
import { AdaptPluginSettings } from 'settings';
import { getDateString } from './common';

export class OpenFileToDateHandler {
    _app: App;
    _settings: AdaptPluginSettings

    constructor(app:App, settings:AdaptPluginSettings) {
        this._app = app
        this._settings = settings;
    }

    private getDailyFolder(): string|undefined {
        const folder = this._settings.dailyFolder;
        if (folder.length > 0) {
            return folder;
        }
        return undefined;
    }

    private getFilePath(date: Date): string {
        const dailyFolder = this.getDailyFolder();
        let path = "";
        // Only use daily folder if that setting exists
        if (dailyFolder != undefined) {
            path += `${dailyFolder}/`
        }
        // Get yyyy-mm-dd formatted date
        path += getDateString(date);
        path += ".md"

        return path;
    }
 
    async open(date: Date): Promise<TFile|undefined> {
        const path = this.getFilePath(date);
        const normalizedPath = normalizePath(path);

        // Check if the file already exists
        let file = this._app.vault.getAbstractFileByPath(normalizedPath);

        // If not found, create it
        if (!(file instanceof TFile)) {
            // second arg is file content
            file = await this._app.vault.create(normalizedPath, ""); 
        }

        if (file instanceof TFile) {
            return file;
        }

        return undefined;
    }
}