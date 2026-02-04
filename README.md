# ADAPT Notes Plugin for Obsidian

A plugin for Obsidian that syncs your ADAPT mind notes with your vault.

## Features

- Syncs new ADAPT notes from adaptmind.io to your Obsidian vault
- Automatically creates daily note files when needed
- Supports both daily note folders and direct note syncing
- Maintains synchronization state to prevent duplicate imports

## Installation

### From Obsidian Community Plugins

1. Open Obsidian
2. Go to **Settings → Community plugins**
3. Disable "Safe mode" 
4. Click "Browse" and search for "ADAPT Notes Plugin"
5. Click "Install" and then "Enable"

### Manual Installation

1. Download the latest release from GitHub
2. Extract the files to your Obsidian plugins folder:
   - Windows: `%APPDATA%\Obsidian\plugins\adapt-obsidian-plugin`
   - macOS: `~/Library/Application Support/Obsidian/plugins/adapt-obsidian-plugin`
   - Linux: `~/.config/Obsidian/plugins/adapt-obsidian-plugin`
3. Reload Obsidian and enable the plugin in Settings → Community plugins

## Setup

### Required Configuration

1. Open Obsidian Settings → Community plugins → ADAPT Notes Plugin
2. Configure the following settings:
   - **ADAPT API Key**: Your API key from adaptmind.io (required)
   - **Daily Folder**: Path to your daily notes folder (optional, leave blank if not using daily notes)

### Getting Your ADAPT API Key

1. Log in to your adaptmind.io account
2. Navigate to your account settings
3. Find the API keys section
4. Generate a new API key or use an existing one
5. Paste the key into the plugin settings

## Usage

### Syncing Notes

Once configured, you can sync your ADAPT notes using either:

1. **Command Palette**:
   - Press `Ctrl/Cmd + Shift + P` to open the command palette
   - Search for "Import new ADAPT notes"
   - Execute the command

2. **Ribbon Icon**:
   - Look for the ADAPT icon in the left sidebar ribbon
   - Click the icon to sync your notes

The plugin will automatically track the last synced date.
Subsequent syncs will only fetch new notes since the last sync

### Note Organization

The plugin organizes your ADAPT notes in the following way:

- **Daily Notes**: If you have a daily notes folder configured, notes will be organized by date (e.g., `2023-10-15.md`)
- **Regular Notes**: If no daily folder is configured, notes will be saved directly to the vault root

Each note will be appended to the corresponding daily note file with the note content prepended by a timestamp and title.

## How It Works

1. The plugin fetches new notes from adaptmind.io since your last sync
2. For each note, it:
   - Opens or creates a daily note file for that date
   - Appends the note content to the file
   - Updates the last sync timestamp to prevent duplicates

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify your API key is correct
   - Check that your API key hasn't expired
   - Ensure your adaptmind.io account has proper permissions

2. **Notes Not Syncing**
   - Confirm the daily folder path is correct (if using daily notes)
   - Check that your Obsidian vault has write permissions
   - Review the console (`ctrl-shift-i/cmd-option-id`) for error messages

3. **Duplicate Notes**
   - The plugin tracks the last sync time to prevent duplicates
   - If duplicates appear, try manually clearing the sync history

## Contributing

This plugin is open-source and welcomes contributions:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your changes

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository or contact the plugin author.

## Changelog

### v1.0.3
- Improved error handling for network requests
- Better handling of note timestamps

### v1.0.2
- Fixed daily notes folder path resolution
- Added better logging for debugging

### v1.0.1
- Initial release with core syncing functionality

## Author

Created by e1lama ([https://e1lama.ru](https://e1lama.ru))

## Credits

This plugin was built using the Obsidian plugin development template and follows Obsidian's development guidelines.
