import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	publishCode: async ({ request }) => {
		const { code, bot_id } = Object.fromEntries(await request.json()) as {
			code: JSON;
			bot_id: number;
		};
		try {
		} catch (error) {}
	}
};
