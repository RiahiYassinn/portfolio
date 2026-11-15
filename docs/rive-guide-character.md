# Rive guide character

The React integration is in `src/components/chat/GuideCharacter.tsx`. It keeps
the SVG character as a fallback and loads `public/testr.riv` by default. The
Rive file's state machine is named `State Machine 1`.

## Create the Rive file

The chat lifecycle controls use a View Model enum named `status` and a trigger
named `wave`:

| Property | Type    | Values / behavior                                                  |
| -------- | ------- | ------------------------------------------------------------------ |
| `status` | Enum    | `idle`, `thinking`, `speaking`                                     |
| `wave`   | Trigger | Plays a one-shot greeting wave, then returns to the current status |

Use `status` to drive the idle, thinking, and speaking animations. Use the
`wave` trigger for the arrival greeting. If the asset uses different input
names, update the constants in `GuideCharacter.tsx` to match. The active state
machine name can be set with `VITE_RIVE_GUIDE_STATE_MACHINE`.

Copy `.env.example` to `.env.local` and set:

```env
VITE_RIVE_GUIDE_SRC=/testr.riv
VITE_RIVE_GUIDE_STATE_MACHINE=State Machine 1
```

Restart the Vite dev server after changing the environment file. If the Rive
file is missing or fails to load, the existing SVG character is shown instead.
