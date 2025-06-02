[![stars](https://img.shields.io/github/stars/barbarbar338/react-use-lanyard?color=yellow&logo=github&style=for-the-badge)](https://github.com/barbarbar338/react-use-lanyard)
[![license](https://img.shields.io/github/license/barbarbar338/react-use-lanyard?logo=github&style=for-the-badge)](https://github.com/barbarbar338/react-use-lanyard)
[![supportServer](https://img.shields.io/discord/711995199945179187?color=7289DA&label=Support&logo=discord&style=for-the-badge)](https://discord.gg/BjEJFwh)
[![forks](https://img.shields.io/github/forks/barbarbar338/react-use-lanyard?color=green&logo=github&style=for-the-badge)](https://github.com/barbarbar338/react-use-lanyard)
[![issues](https://img.shields.io/github/issues/barbarbar338/react-use-lanyard?color=red&logo=github&style=for-the-badge)](https://github.com/barbarbar338/react-use-lanyard)

<p align="center">
  <img src="https://raw.githubusercontent.com/barbarbar338/react-use-lanyard/main/assets/readme.png" alt="Logo" />
  <h3 align="center">React Use Lanyard</h3>

  <p align="center">
    Use Lanyard API easily in your React app!
    <br />
    <a href="https://discord.gg/BjEJFwh"><strong>Get support »</strong></a>
    <br />
    <br />
    <a href="https://github.com/barbarbar338/react-use-lanyard/issues">Report Bug</a>
    ·
    <a href="https://github.com/barbarbar338/react-use-lanyard/issues">Request Feature</a>
    ·
    <a href="https://github.com/Phineas/lanyard">What Is Lanyard</a>
  </p>
</p>

# 📦 Installation

- Using yarn: `yarn add react-use-lanyard`
- Using npm: `npm i react-use-lanyard`

# 🤓 Usage

Using without websocket:

```js
import { useLanyard } from "react-use-lanyard";

function App() {
	const lanyard = useLanyard({
		userId: "952574663916154960",
	});

	return (
		<pre>{!lanyard.isValidating && JSON.stringify(lanyard, null, 4)}</pre>
	);
}

export default App;
```

Using with websocket:

```js
import { useLanyard } from "react-use-lanyard";

function App() {
	const { loading, status /*, websocket */ } = useLanyard({
		userId: "952574663916154960",
		socket: true,
	});

	return <pre>{!loading && JSON.stringify(status, null, 4)}</pre>;
}

export default App;
```

# 🔐 KV Support

You can create/delete KV pairs using this package.

```js
import { set, del } from "react-use-lanyard";

// Set KV pair
await set({
	apiKey: "your_api_key", // get it using .apikey command on lanyard bot
	userId: "your_user_id",
	key: "test_key",
	value: "test value",
	// apiUrl: "lanyard.338.rocks", // if you are using self-hosted api, not required by default
});

// Delete KV pair
await del({
	apiKey: "your_api_key",
	userId: "your_user_id",
	key: "test_key",
	// apiUrl: "lanyard.338.rocks", // if you are using self-hosted api, not required by default
});
```

# 🤞 Using Self-Hosted API

You can use this package to connect to your own self-hosted Lanyard API. To do this, you need to pass the `apiUrl` option to the `useLanyard` hook. See [Lanyard self-hosting guide](https://github.com/Phineas/lanyard#self-host-with-docker) for more information.

Using without websocket:

```js
import { useLanyard } from "react-use-lanyard";

function App() {
	const lanyard = useLanyard({
		userId: "952574663916154960",
		apiUrl: "lanyard.338.rocks",
	});

	return (
		<pre>{!lanyard.isValidating && JSON.stringify(lanyard, null, 4)}</pre>
	);
}

export default App;
```

Using with websocket:

```js
import { useLanyard } from "react-use-lanyard";

function App() {
	const { loading, status /*, websocket */ } = useLanyard({
		userId: "952574663916154960",
		socket: true,
		apiUrl: "lanyard.338.rocks",
	});

	return <pre>{!loading && JSON.stringify(status, null, 4)}</pre>;
}

export default App;
```

# 📄 License

Copyright © 2021 [Barış DEMİRCİ](https://github.com/barbarbar338).

Distributed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) License. See `LICENSE` for more information.

# 🧦 Contributing

Feel free to use GitHub's features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-feature`)
3. Run prettier and eslint (`npm run format && npm run lint`)
4. Commit your Changes (`git commit -m 'my awesome feature my-feature'`)
5. Push to the Branch (`git push origin feature/my-feature`)
6. Open a Pull Request

# 🔥 Show your support

Give a ⭐️ if this project helped you!

# 📞 Contact

- Mail: hi@338.rocks
- Discord: https://discord.gg/BjEJFwh

# ✨ Special Thanks

- [Phineas](https://github.com/Phineas) - Creator of [Lanyard API](https://github.com/Phineas/lanyard)
- [Eggsy](https://github.com/eggsy) - Creator of [vue-lanyard](https://www.npmjs.com/package/@eggsydev/vue-lanyard)
