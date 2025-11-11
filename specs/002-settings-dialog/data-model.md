# Data Model: Settings Dialog Modal

## Entities

### SettingOption
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Stable identifier (kebab-case) for internal reference |
| label | string | yes | User-visible short name |
| description | string | no | Optional helper text (future enhancement) |
| enabled | boolean | yes | Current UI state (ephemeral) |

Constraints:
- `id` unique within dialog instance.
- `label` human-readable; no duplication across options.
- Initial `enabled` default: false for all (future phases may define persisted defaults).

### SettingsDialogState
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| open | boolean | yes | Dialog visibility |
| options | SettingOption[] | yes | Collection of toggle options |
| originFocus | HTMLElement | no | Element to restore focus to on close (captured when opened) |

Relationships:
- One `SettingsDialogState` contains multiple `SettingOption` entries.

## State Transitions

| State | Event | New State | Notes |
|-------|-------|-----------|-------|
| open=false | open() | open=true | Capture focus origin; populate option list |
| open=true | close() | open=false | Restore focus origin; clear ephemeral refs |
| enabled=false (option) | toggle() | enabled=true | Immediate visual update |
| enabled=true (option) | toggle() | enabled=false | Immediate visual update |

## Validation Rules
- Toggling does not trigger side effects; state confined to UI.
- Closing dialog resets no option states (they persist until page reload).

## Future Extension Notes
- Persistence layer could map `SettingOption.id` to stored preference.
- Additional metadata (e.g., `category`, `requiresRestart`) can be appended without breaking existing model.
