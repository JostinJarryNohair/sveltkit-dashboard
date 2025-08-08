# SvelteKit Key Concepts Explained

## Why `$state`?

**Purpose**: Creates reactive variables that automatically update the UI when they change.

```javascript
let count = $state(0); // When count changes, UI updates automatically
```

**Use when**: You need a value that changes and should trigger UI updates (form inputs, toggles, counters, user data).

## Why `$derived`?

**Purpose**: Creates computed values that automatically recalculate when their dependencies change.

```javascript
let price = $state(100);
let tax = $derived(price * 0.2); // Recalculates when price changes
```

**Use when**: You need a value calculated from other reactive values (totals, filtered lists, formatted displays).

## Why `onMount`?

**Purpose**: Runs code after the component is rendered to the DOM (client-side only).

```javascript
onMount(() => {
	// Access browser APIs, localStorage, DOM elements
	const data = localStorage.getItem('user');
});
```

**Use when**: You need browser-only APIs, setting up timers, fetching initial data, or DOM manipulation.

## Why `stores` folder?

**Purpose**: Share reactive state between multiple components across your app.

```javascript
// stores/user.js
export const userStore = writable({ name: 'John' });
// Any component can import and use this shared state
```

**Use when**: Multiple components need the same data (user auth, shopping cart, app theme, global settings).

## Why `$effect`?

**Purpose**: Runs side effects when reactive values change (like React's useEffect).

```javascript
let count = $state(0);
$effect(() => {
	console.log('Count changed to:', count); // Runs whenever count changes
	document.title = `Count: ${count}`;
});
```

**Use when**: You need to sync with external systems, update DOM directly, or trigger actions on state changes.

## Why `$props`?

**Purpose**: Receives data passed from parent components (Svelte 5's new way).

```javascript
// Parent passes: <Child name="John" age={25} />
let { name, age } = $props(); // Child receives props
```

**Use when**: Components need to receive data from their parents (configuration, data, callbacks).

## Why `bind:`?

**Purpose**: Creates two-way data binding between form inputs and variables.

```javascript
let name = $state('');
<input bind:value={name} />; // Input and variable stay in sync
```

**Use when**: Working with forms, inputs, or any element where you need bidirectional data flow.

---

## Quick Reference Table

| Feature    | Purpose            | Example Use Case                    |
| ---------- | ------------------ | ----------------------------------- |
| `$state`   | Reactive variables | User input, toggles, counters       |
| `$derived` | Computed values    | Calculated totals, filtered lists   |
| `onMount`  | After render setup | API calls, timers, localStorage     |
| `stores`   | Shared state       | User auth, global settings          |
| `$effect`  | Side effects       | DOM updates, logging, external sync |
| `$props`   | Component inputs   | Passing data parent → child         |
| `bind:`    | Two-way binding    | Form inputs, checkboxes             |

## Mental Model

- **`$state`** = "This can change"
- **`$derived`** = "This depends on other things"
- **`onMount`** = "Do this when ready"
- **`stores`** = "Share this everywhere"
- **`$effect`** = "When X changes, do Y"
- **`$props`** = "Parent gave me this"
- **`bind:`** = "Keep these in sync"
