# Architecture


## Dating interactions

| Action     | User intent                | Visibility consequence       | Reversible? | Mutual effect? | UX semantics         |
|------------|----------------------------|-------------------------------|-------------|----------------|----------------------|
| 👍 Like     | Show interest              | Visible to both (on match)    | Yes         | Yes (match)     | Flirty / open        |
| ❌ Dislike  | Not interested *for now*   | Hidden from *liker only*      | Yes         | No              | “Pass” / Swipe left  |
| 🚫 Block    | Avoid / protect / reject   | Hidden from *both sides*      | Yes (admin override?) | Yes         | Hard boundary        |
