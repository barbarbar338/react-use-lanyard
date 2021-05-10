import { API_URL, WEBSOCKET_URL } from "./constants";
import { LanyardOptions, LanyardResponse } from "./types";
import useSWR from "swr";

export const useLanyard = (options: LanyardOptions) => {
	const supportsWebSocket = "WebSocket" in window || "MozWebSocket" in window;
	if (options.socket && !supportsWebSocket)
		throw new Error("Browser doesn't support WebSocket connections.");

	if (options.socket) {
		const socket = new WebSocket(WEBSOCKET_URL);
		let key = "subscribe_to_id";
		if (typeof options.userId === "object") key = "subscribe_to_ids";

		socket.addEventListener("open", () => {
			socket.send(
				JSON.stringify({
					op: 2,
					d: {
						[key]: options.userId,
					},
				}),
			);

			setInterval(() => {
				socket.send(
					JSON.stringify({
						op: 3,
					}),
				);
			}, 30000);
		});

		return socket;
	} else {
		if (typeof options.userId === "string") {
			return useSWR<LanyardResponse>(
				`lanyard:${options.userId}`,
				async () => {
					const req = await fetch(
						`${API_URL}/users/${options.userId}`,
					);

					const body = (await req.json()) as LanyardResponse;
					if (body.error) throw new Error(body.error.message);

					return body;
				},
			);
		} else {
			return useSWR<LanyardResponse[]>(
				`lanyard:${options.userId.join(":")}`,
				async () => {
					const responseArray = [];

					for (const id of options.userId) {
						const req = await fetch(`${API_URL}/users/${id}`);

						const body = (await req.json()) as LanyardResponse;
						if (body.error) throw new Error(body.error.message);

						responseArray.push(body);
					}

					return responseArray;
				},
			);
		}
	}
};
