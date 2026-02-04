import { AdaptNote } from "models/adaptNote";
import { requestUrl, RequestUrlParam } from "obsidian";
import { AdaptPluginSettings } from "settings";



interface AdaptNotesListResponse {
    items: AdaptNote[];
    total: number;
    page: number;
    limit: number;
}

export class GetNewAdaptNotesHandler {
    _settings: AdaptPluginSettings;

    constructor(settings:AdaptPluginSettings) {
        this._settings = settings;
    }

    async get(lastUpdated: Date): Promise<AdaptNote[]> {
        const apiKey = this._settings.adaptApiKey.startsWith("2k-") ? this._settings.adaptApiKey.slice(3) : this._settings.adaptApiKey;

        const limit = 10;
        let page = 1;
        let itemsReturned = 0;
        let items: AdaptNote[] = [];
        do {
            const query = new URLSearchParams();
            query.append("updatedAfter", lastUpdated.toISOString());
            query.append("isArchived", "false");
            query.append("isPinned", "false");
            query.append("page", page.toString());
            query.append("limit", limit.toString());

            const params: RequestUrlParam = {
                url: `${this._settings.adaptBaseUrl}/notes/sync?${query}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-api-key": apiKey
                },
            };

            const response = await requestUrl(params);

            if (response.status >= 200 && response.status < 300) {
                // Handle successful response
                const result = response.json as AdaptNotesListResponse;
                itemsReturned = result.items.length;
                if (result.items.length > 0) {
                    items = [...items,...result.items.map(x => {x.createdAt = new Date(x.createdAt); x.updatedAt = new Date(x.updatedAt); return x;})];
                }
                page = page + 1;
            }
            else {
                return Promise.reject(new Error(`Request failed: ${response.status} ${response.text}`))
            }
        }
        while (itemsReturned > 0);

        return items;
    }
}