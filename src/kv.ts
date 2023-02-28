import { API_URL } from "./constants";
import { IDelete, ISet } from "./types";

export const set = async ({ apiKey, key, userId, value, apiUrl }: ISet) =>
	fetch(`https://${apiUrl || API_URL}/v1/users/${userId}/kv/${key}`, {
		method: "PUT",
		headers: {
			Authorization: apiKey,
		},
		body: value,
	});

export const del = async ({ apiKey, key, userId, apiUrl }: IDelete) =>
	fetch(`https://${apiUrl || API_URL}/v1/users/${userId}/kv/${key}`, {
		method: "DELETE",
		headers: {
			Authorization: apiKey,
		},
	});
