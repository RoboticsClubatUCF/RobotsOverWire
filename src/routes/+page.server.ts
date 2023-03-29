import type { Actions } from './$types';

const bots = [
	{
		id: '0',
		ip: 'http://192.168.137.209'
	},
	{
		id: '1',
		ip: 'http://192.168.137.231'
	}
];

export const actions: Actions = {
	publishCode: async ({ request }) => {
		const { code, botid } = Object.fromEntries(await request.formData()) as {
			code: string;
			botid: string;
		};
		try {
			if (code == '' || code == undefined || code == null) {
				throw new Error('code not defined!');
			}
			console.log(code, botid);
			const doPost = async (msg: string, botid: string) => {
				Number(botid)
					? await fetch(bots[1].ip, {
							method: 'POST',
							body: msg
					  })
					: await fetch(bots[0].ip, {
							method: 'POST',
							body: msg
					  });
			};
			doPost(code, botid);
		} catch (error) {}
	}
};

//192.168.137.100
