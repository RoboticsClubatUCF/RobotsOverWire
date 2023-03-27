import type { Actions } from "./$types"

const bots = [
	{
		id: "0",
		ip: "http://192.168.137.230"
	},
	{
		id: "1",
		ip: "http://192.168.137.231"
	}
]


export const actions: Actions = {
	publishCode: async ({ request }) => {
		const {code , botid} = Object.fromEntries(
			await request.formData()
		) as {
			code: string;
			botid: string | undefined
		}
		try {
			if(code == "" || code == undefined || code == null){
				throw new Error("code not defined!")
			}
			console.log(code,botid)
			const doPost = async (msg: string) => {
				const res = await fetch('http://192.168.137.230', {
					method: 'POST',
					body: 'M10001T03000M05000T11001'
				});
			};
			// doPost('');
		} catch (error) {}
	}
};

//192.168.137.100
