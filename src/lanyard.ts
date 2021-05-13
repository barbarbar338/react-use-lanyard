import { API_URL, WEBSOCKET_URL } from "./constants";
import { LanyardData, LanyardOptions, LanyardResponse } from "./types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useLanyard = (options: LanyardOptions) => {
	if (options.socket) {
		const [status, setStatus] = useState<LanyardData>();
		const [websocket, setWebsocket] = useState<WebSocket>();
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const supportsWebSocket =
				"WebSocket" in window || "MozWebSocket" in window;
			if (options.socket && !supportsWebSocket)
				throw new Error(
					"Browser doesn't support WebSocket connections.",
				);

			const socket = new WebSocket(WEBSOCKET_URL);
			setWebsocket(socket);

			let key = "subscribe_to_id";
			if (typeof options.userId === "object") key = "subscribe_to_ids";

			let heartbeat: NodeJS.Timeout;

			socket.addEventListener("open", () => {
				socket.send(
					JSON.stringify({
						op: 2,
						d: {
							[key]: options.userId,
						},
					}),
				);

				heartbeat = setInterval(() => {
					socket.send(
						JSON.stringify({
							op: 3,
						}),
					);
				}, 30000);
			});

			socket.addEventListener("message", ({ data }) => {
				const { t, d } = JSON.parse(data) as {
					t: "INIT_STATE" | "PRESENCE_UPDATE";
					d: LanyardData;
				};

				if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
					setStatus(d || ({} as LanyardData));
					if (loading) setLoading(false);
				}
			});

			return () => {
				clearInterval(heartbeat);
				socket.close();
			};
		}, []);

		return { websocket, loading, status };
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
					const responseArray: LanyardResponse[] = [];

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
