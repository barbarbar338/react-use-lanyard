import type { SWRResponse } from "swr";

export interface IDelete {
	key: string;
	userId: string;
	apiKey: string;
	apiUrl?: string;
}

export interface ISet extends IDelete {
	value: string;
}

export type LanyardSWRSingle = SWRResponse<LanyardResponse, Error>;
export type LanyardSWRMultiple = SWRResponse<LanyardResponse[], Error>;

export interface LanyardWebsocket {
	loading: boolean;
	status?: LanyardData;
	websocket?: WebSocket;
}

export type LanyardGeneric<T> = T extends { socket: true }
	? LanyardWebsocket
	: T extends { userId: string }
		? LanyardSWRSingle
		: T extends { userId: string[] }
			? LanyardSWRMultiple
			: never;

/**
 * Special thanks to @eggsy
 * https://github.com/eggsy/vue-lanyard/blob/main/%40types/lanyard.d.ts
 */

export interface LanyardOptions {
	userId: string | string[];
	socket?: boolean;
	apiUrl?: string;
}

export interface LanyardResponse {
	success: boolean;
	data: LanyardData;
	error?: LanyardError;
}

export interface LanyardError {
	message: string;
	code: string;
}

export type LanyardData = {
	discord_user: DiscordUser;
	discord_status: "online" | "idle" | "dnd" | "offline";
	kv: Kv;
	activities: Activity[];
	active_on_discord_web: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_embedded: boolean;
} & Spotify;

export interface Kv {
	[key: string]: string;
}

export type Spotify =
	| {
			listening_to_spotify: true;
			spotify: {
				track_id: string;
				timestamps: Timestamps;
				song: string;
				artist: string;
				album_art_url: string;
				album: string;
			};
	  }
	| {
			listening_to_spotify: false;
			spotify: null;
	  };

export interface Timestamps {
	start: number;
	end: number;
}

export interface Activity {
	type: number;
	state: string;
	name: string;
	id: string;
	flags?: number;
	emoji?: Emoji;
	created_at: number;
	application_id?: string;
	timestamps?: Timestamps;
	sync_id?: string;
	session_id?: string;
	party?: Party;
	details?: string;
	buttons?: string[];
	assets?: Assets;
}

export interface Party {
	id: string;
	size?: [number, number];
}

export interface Assets {
	small_text: string;
	small_image: string;
	large_text: string;
	large_image: string;
}

export interface Timestamps {
	start: number;
}

export interface Emoji {
	name: string;
	id?: string;
	animated?: boolean;
}

export interface DiscordUser {
	username: string;
	global_name: string | null;
	public_flags: number;
	id: string;
	discriminator: string;
	bot: boolean;
	avatar: string;
	avatar_decoration_data?: {
		sku_id: string;
		asset: string;
		expires_at: number;
	} | null;
	clan: null; // clan object deprecated
	primary_guild: {
		tag: string;
		identity_guild_id: string;
		badge: string;
		identity_enabled: boolean;
	} | null;
	collectibles: {
		nameplate: {
			label: string;
			sku_id: string;
			asset: string;
			expires_at: string | null;
			palette: string;
		};
	} | null;
}
