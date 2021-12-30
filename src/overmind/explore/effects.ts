import { config } from "../../global.config"
import { request } from "../../services/axios"
import { Set, SetWithTasks } from "./state"

export const getSets = () => request.get<Set[]>('/set')

export const getSetById = (id: string) => request.get<SetWithTasks>(`/set/${id}`)

/* istanbul ignore next */
export const mock = {
	getSets: async (): Promise<Set[]> => {
		return new Promise((resolve) => setTimeout(() => resolve([
			{
				"_id": "618be342577d8c493e1012ed",
				"dareCount": 0,
				"truthCount": 0,
				"played": 0,
				"language": "de",
				"category": "classic",
				"createdBy": {
					"_id": "618bda75ab1028126ec0b779",
					"username": "Michael"
				},
				"name": "Klassisch"
			},
			{
				"_id": "618be342577d8c493e1012ee",
				"dareCount": 0,
				"played": 0,
				"category": "classic",
				"truthCount": 0,
				"language": "de",
				"createdBy": {
					"_id": "618bda75ab1028126ec0b779",
					"username": "Michael"
				},
				"name": "Versaut"
			},
			{
				"_id": "618be342577d8c493e1012ef",
				"dareCount": 0,
				"truthCount": 0,
				"category": "classic",
				"played": 0,
				"language": "de",
				"createdBy": {
					"_id": "618bda75ab1028126ec0b779",
					"username": "Michael"
				},
				"name": "HdM Stuttgart Edition"
			},
			{
				"_id": "618be342577d8c493e1012f0",
				"dareCount": 0,
				"truthCount": 0,
				"category": "classic",
				"played": 0,
				"language": "de",
				"createdBy": {
					"_id": "618bda75ab1028126ec0b779",
					"username": "Michael"
				},
				"name": "Sex"
			}
		]), config.fakeLoadingTime))
	},
	getSetById: async (id: string): Promise<SetWithTasks> => {
		let response: any = ''
		switch (id) {
			case '618be342577d8c493e1012ed':
				response = {
					"_id": "618be342577d8c493e1012ed",
					"dareCount": 0,
					"truthCount": 0,
					"language": "de",
					"createdBy": {
						"_id": "618bda75ab1028126ec0b779",
						"username": "Michael"
					},
					"name": "Klassisch",
					"tasks": [
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012f5",
							"type": "dare",
							"message": "Setz dich für 1 Runde auf den Schoß von @a"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012f6",
							"type": "dare",
							"message": "Erzähle einen lustigen Witz"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012f8",
							"type": "dare",
							"message": "Nimm @a Huckepack"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012f9",
							"type": "dare",
							"message": "Setze dich zwei Runden lang auf den Schoß von @a"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012fa",
							"type": "dare",
							"message": "Einmal aussetzen"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012fb",
							"type": "dare",
							"message": "Sprich für 2 Runden mit einem italienischen Akzent"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012fc",
							"type": "dare",
							"message": "Ahme deine Mutter nach"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012fe",
							"type": "dare",
							"message": "Mach ein lustiges Gesicht"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012ff",
							"type": "dare",
							"message": "Frisiere deine Haare mittig auf dem Kopf zu einer Palme"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101300",
							"type": "dare",
							"message": "Erfinde einen schnellen Tanz und bring ihn allen im Raum bei"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101301",
							"type": "dare",
							"message": "Nimm eine Handvoll Kekse in den Mund und versuche zu pfeifen"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101302",
							"type": "dare",
							"message": "Mache 10 Liegestütze oder 20 Sit-Ups"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012f7",
							"type": "dare",
							"message": "Tanz wie ein Roboter"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e1012fd",
							"type": "dare",
							"message": "Iss einen Löffel Mayo oder 2 Löffel Ketchup"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101306",
							"type": "dare",
							"message": "Imitiere 2 Runden lang einen britischen Akzent"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101307",
							"type": "dare",
							"message": "Trink ein Glas Wasser... wie eine Katze"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101308",
							"type": "dare",
							"message": "Mache 5 Purzelbäume"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101309",
							"type": "dare",
							"message": "Flüstere für 2 Runden"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101305",
							"type": "dare",
							"message": "Halte Händchen mit @a"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101304",
							"type": "dare",
							"message": "Kopiere für eine Runde alle Gesten von @a"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101303",
							"type": "dare",
							"message": "Trage roten Lippenstift auf und küsse @a"
						}
					]
				}
				break;
			case '618be342577d8c493e1012ee':
				response = {
					"_id": "618be342577d8c493e1012ee",
					"dareCount": 0,
					"truthCount": 0,
					"language": "de",
					"createdBy": {
						"_id": "618bda75ab1028126ec0b779",
						"username": "Michael"
					},
					"name": "Versaut",
					"tasks": [
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101334",
							"type": "dare",
							"message": "Iss ein Stück von etwas (z.B Schlagsahne) von @a's Pobacke"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101335",
							"type": "dare",
							"message": "Präsentiere, wie du eine einen Mann anmachen würdest"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e101336",
							"type": "dare",
							"message": "Präsentiere, wie du eine Frau anmachen würdest"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e101337",
							"type": "dare",
							"message": "Streichle @m seine Wange, dann seine Hand, dann seinen Nacken"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101338",
							"type": "dare",
							"message": "Mach bis zur nächsten Runde mit @m"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e101339",
							"type": "dare",
							"message": "Mach bis zur nächsten Runde mit @f"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e10133a",
							"type": "dare",
							"message": "Verpasse @f einen Knutschfleck"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e10133b",
							"type": "dare",
							"message": "Verpasse @m einen Knutschfleck"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e10133c",
							"type": "dare",
							"message": "Massiere die Brüste von @f mit Öl"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e10133d",
							"type": "dare",
							"message": "Massiere die Brust von @m mit Öl"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e10133e",
							"type": "dare",
							"message": "Mache @a einen Fake-Antrag"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e10133f",
							"type": "dare",
							"message": "Mach eine kurze Werbung für Kondome! Wenn du magst, kannst du es auch filmen"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101340",
							"type": "dare",
							"message": "Mach ein Selfie, wo du mit @m rummachst"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e101341",
							"type": "dare",
							"message": "Mach ein Selfie, wo du mit @f rummachst"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101342",
							"type": "dare",
							"message": "Erzähle von deinem Lieblings-Sexspielzeug"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101343",
							"type": "dare",
							"message": "Küsse den unteren Bauch von @a"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101344",
							"type": "dare",
							"message": "Tausche alle Klamotten (einschließlich Unterwäsche) mit @m"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e101345",
							"type": "dare",
							"message": "Tausche alle Klamotten (einschließlich Unterwäsche) mit @f"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101346",
							"type": "dare",
							"message": "Stöhne sinnlich und turne damit @a an"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e101348",
							"type": "dare",
							"message": "Ziehe @f bis zu seiner Unterwäsche aus"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101349",
							"type": "dare",
							"message": "Singe deinem Partner/Schwarm ein Ständchen"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101347",
							"type": "dare",
							"message": "Ziehe @m bis zu seiner Unterwäsche aus"
						}
					]
				}
				break;
			case '618be342577d8c493e1012ef':
				response = {
					"_id": "618be342577d8c493e1012ef",
					"dareCount": 0,
					"truthCount": 0,
					"language": "de",
					"createdBy": {
						"_id": "618bda75ab1028126ec0b779",
						"username": "Michael"
					},
					"name": "HdM Stuttgart Edition",
					"tasks": [
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101377",
							"type": "truth",
							"message": "Was ist das krasseste was du in der HdM gemacht hast? Erzähle."
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101378",
							"type": "dare",
							"message": "Gehe in die Lernwelt und fange an laut zu husten."
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101379",
							"type": "truth",
							"message": "Mit welchem Professor/Mitarbeiter würdest du eine Romanze anfangen?"
						},
						{
							"currentPlayerGender": "@cm",
							"_id": "618be342577d8c493e10137a",
							"type": "truth",
							"message": "Mit welcher Professorin/Mitarbeiterin würdest du eine Romanze anfangen?"
						}
					]
				}
				break;
			case '618be342577d8c493e1012f0':
				response = {
					"_id": "618be342577d8c493e1012f0",
					"dareCount": 0,
					"truthCount": 0,
					"language": "de",
					"createdBy": {
						"_id": "618bda75ab1028126ec0b779",
						"username": "Michael"
					},
					"name": "Sex",
					"tasks": [
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101383",
							"type": "truth",
							"message": "Wo würdest du gerne einmal Sex haben?"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101384",
							"type": "truth",
							"message": "Erzähle von deiner Beziehung/Liebe vor @a"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101385",
							"type": "truth",
							"message": "In wen warst du in deinem Leben verliebt?"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101386",
							"type": "dare",
							"message": "Lecke mit deiner Zunge über die Lippen von @a"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101388",
							"type": "dare",
							"message": "Schaue @a eine Minuten lang in die Augen"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e101389",
							"type": "dare",
							"message": "Gib @a eine romantische Rückenmassage"
						},
						{
							"currentPlayerGender": "@ca",
							"_id": "618be342577d8c493e10138a",
							"type": "truth",
							"message": "DAS IST DIE BESTE WAHRHEIT ODER PFLICHT APP DIE ICH JE GESEHEN HABE!!!!"
						},
						{
							"currentPlayerGender": "@cf",
							"_id": "618be342577d8c493e101387",
							"type": "dare",
							"message": "Verführe @m mit einem Blowjob"
						}
					]
				}
				break;
		}
		return new Promise((resolve) => {
			setTimeout(() => resolve(response), config.fakeLoadingTime)
		})

		// getSetById: async (id: string): Promise<SetWithTasks> => {
		//     const data = await fetch(`${config.baseApiUrl}/api/set/${id}`)
		//     return await data.json()
		// }
		// getSets: async (): Promise<Set[]> => {
		// 	return new Promise((resolve) => setTimeout(() => resolve([
		// 		{
		// 			"_id": "618be342577d8c493e1012ed",
		// 			"dareCount": 21,
		// 			"truthCount": 0,
		// 			"language": "de",
		// 			"createdBy": {
		// 				"_id": "618bda75ab1028126ec0b779",
		// 				"username": "Michael"
		// 			},
		// 			"name": "Klassisch"
		// 		},
		// 		{
		// 			"_id": "618be342577d8c493e1012ee",
		// 			"dareCount": 22,
		// 			"truthCount": 0,
		// 			"language": "de",
		// 			"createdBy": {
		// 				"_id": "618bda75ab1028126ec0b779",
		// 				"username": "Michael"
		// 			},
		// 			"name": "Versaut"
		// 		},
		// 		{
		// 			"_id": "618be342577d8c493e1012ef",
		// 			"dareCount": 1,
		// 			"truthCount": 3,
		// 			"language": "de",
		// 			"createdBy": {
		// 				"_id": "618bda75ab1028126ec0b779",
		// 				"username": "Michael"
		// 			},
		// 			"name": "HdM Stuttgart Edition"
		// 		},
		// 		{
		// 			"_id": "618be342577d8c493e1012f0",
		// 			"dareCount": 4,
		// 			"truthCount": 4,
		// 			"language": "de",
		// 			"createdBy": {
		// 				"_id": "618bda75ab1028126ec0b779",
		// 				"username": "Michael"
		// 			},
		// 			"name": "Sex"
		// 		},
		// 		{
		// 			"_id": "618be342577d8c493e1012en",
		// 			"dareCount": 1,
		// 			"truthCount": 3,
		// 			"language": "de",
		// 			"createdBy": {
		// 				"_id": "618bda75ab1028126ec0b779",
		// 				"username": "Michael"
		// 			},
		// 			"name": "Dev Testing"
		// 		}
		// 	]), config.fakeLoadingTime))
		// },
		// getSetById: async (id: string): Promise<SetWithTasks> => {
		// 	let response: any = ''
		// 	switch (id) {
		// 		case '618be342577d8c493e1012ed':
		// 			response = {
		// 				"_id": "618be342577d8c493e1012ed",
		// 				"dareCount": 21,
		// 				"truthCount": 0,
		// 				"language": "de",
		// 				"createdBy": {
		// 					"_id": "618bda75ab1028126ec0b779",
		// 					"username": "Michael"
		// 				},
		// 				"name": "Klassisch",
		// 				"tasks": [
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012f5",
		// 						"type": "dare",
		// 						"message": "Setz dich für 1 Runde auf den Schoß von @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012f6",
		// 						"type": "dare",
		// 						"message": "Erzähle einen lustigen Witz"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012f8",
		// 						"type": "dare",
		// 						"message": "Nimm @a Huckepack"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012f9",
		// 						"type": "dare",
		// 						"message": "Setze dich zwei Runden lang auf den Schoß von @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012fa",
		// 						"type": "dare",
		// 						"message": "Einmal aussetzen"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012fb",
		// 						"type": "dare",
		// 						"message": "Sprich für 2 Runden mit einem italienischen Akzent"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012fc",
		// 						"type": "dare",
		// 						"message": "Ahme deine Mutter nach"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012fe",
		// 						"type": "dare",
		// 						"message": "Mach ein lustiges Gesicht"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012ff",
		// 						"type": "dare",
		// 						"message": "Frisiere deine Haare mittig auf dem Kopf zu einer Palme"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101300",
		// 						"type": "dare",
		// 						"message": "Erfinde einen schnellen Tanz und bring ihn allen im Raum bei"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101301",
		// 						"type": "dare",
		// 						"message": "Nimm eine Handvoll Kekse in den Mund und versuche zu pfeifen"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101302",
		// 						"type": "dare",
		// 						"message": "Mache 10 Liegestütze oder 20 Sit-Ups"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012f7",
		// 						"type": "dare",
		// 						"message": "Tanz wie ein Roboter"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e1012fd",
		// 						"type": "dare",
		// 						"message": "Iss einen Löffel Mayo oder 2 Löffel Ketchup"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101306",
		// 						"type": "dare",
		// 						"message": "Imitiere 2 Runden lang einen britischen Akzent"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101307",
		// 						"type": "dare",
		// 						"message": "Trink ein Glas Wasser... wie eine Katze"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101308",
		// 						"type": "dare",
		// 						"message": "Mache 5 Purzelbäume"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101309",
		// 						"type": "dare",
		// 						"message": "Flüstere für 2 Runden"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101305",
		// 						"type": "dare",
		// 						"message": "Halte Händchen mit @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101304",
		// 						"type": "dare",
		// 						"message": "Kopiere für eine Runde alle Gesten von @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101303",
		// 						"type": "dare",
		// 						"message": "Trage roten Lippenstift auf und küsse @a"
		// 					}
		// 				]
		// 			}
		// 			break;
		// 		case '618be342577d8c493e1012ee':
		// 			response = {
		// 				"_id": "618be342577d8c493e1012ee",
		// 				"dareCount": 22,
		// 				"truthCount": 0,
		// 				"language": "de",
		// 				"createdBy": {
		// 					"_id": "618bda75ab1028126ec0b779",
		// 					"username": "Michael"
		// 				},
		// 				"name": "Versaut",
		// 				"tasks": [
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101334",
		// 						"type": "dare",
		// 						"message": "Iss ein Stück von etwas (z.B Schlagsahne) von @a's Pobacke"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101335",
		// 						"type": "dare",
		// 						"message": "Präsentiere, wie du eine einen Mann anmachen würdest"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e101336",
		// 						"type": "dare",
		// 						"message": "Präsentiere, wie du eine Frau anmachen würdest"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e101337",
		// 						"type": "dare",
		// 						"message": "Streichle @m seine Wange, dann seine Hand, dann seinen Nacken"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101338",
		// 						"type": "dare",
		// 						"message": "Mach bis zur nächsten Runde mit @m"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e101339",
		// 						"type": "dare",
		// 						"message": "Mach bis zur nächsten Runde mit @f"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e10133a",
		// 						"type": "dare",
		// 						"message": "Verpasse @f einen Knutschfleck"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e10133b",
		// 						"type": "dare",
		// 						"message": "Verpasse @m einen Knutschfleck"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e10133c",
		// 						"type": "dare",
		// 						"message": "Massiere die Brüste von @f mit Öl"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e10133d",
		// 						"type": "dare",
		// 						"message": "Massiere die Brust von @m mit Öl"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e10133e",
		// 						"type": "dare",
		// 						"message": "Mache @a einen Fake-Antrag"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e10133f",
		// 						"type": "dare",
		// 						"message": "Mach eine kurze Werbung für Kondome! Wenn du magst, kannst du es auch filmen"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101340",
		// 						"type": "dare",
		// 						"message": "Mach ein Selfie, wo du mit @m rummachst"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e101341",
		// 						"type": "dare",
		// 						"message": "Mach ein Selfie, wo du mit @f rummachst"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101342",
		// 						"type": "dare",
		// 						"message": "Erzähle von deinem Lieblings-Sexspielzeug"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101343",
		// 						"type": "dare",
		// 						"message": "Küsse den unteren Bauch von @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101344",
		// 						"type": "dare",
		// 						"message": "Tausche alle Klamotten (einschließlich Unterwäsche) mit @m"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e101345",
		// 						"type": "dare",
		// 						"message": "Tausche alle Klamotten (einschließlich Unterwäsche) mit @f"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101346",
		// 						"type": "dare",
		// 						"message": "Stöhne sinnlich und turne damit @a an"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e101348",
		// 						"type": "dare",
		// 						"message": "Ziehe @f bis auf ihre Unterwäsche aus"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101349",
		// 						"type": "dare",
		// 						"message": "Singe deinem Partner/Schwarm ein Ständchen"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101347",
		// 						"type": "dare",
		// 						"message": "Ziehe @m bis zu seiner Unterwäsche aus"
		// 					}
		// 				]
		// 			}
		// 			break;
		// 		case '618be342577d8c493e1012ef':
		// 			response = {
		// 				"_id": "618be342577d8c493e1012ef",
		// 				"dareCount": 3,
		// 				"truthCount": 1,
		// 				"language": "de",
		// 				"createdBy": {
		// 					"_id": "618bda75ab1028126ec0b779",
		// 					"username": "Michael"
		// 				},
		// 				"name": "HdM Stuttgart Edition",
		// 				"tasks": [
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101377",
		// 						"type": "truth",
		// 						"message": "Was ist das krasseste was du in der HdM gemacht hast? Erzähle."
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101378",
		// 						"type": "dare",
		// 						"message": "Gehe in die Lernwelt und fange an laut zu husten."
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101379",
		// 						"type": "truth",
		// 						"message": "Mit welchem Professor/Mitarbeiter würdest du eine Romanze anfangen?"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e10137a",
		// 						"type": "truth",
		// 						"message": "Mit welcher Professorin/Mitarbeiterin würdest du eine Romanze anfangen?"
		// 					}
		// 				]
		// 			}
		// 			break;
		// 		case '618be342577d8c493e1012f0':
		// 			response = {
		// 				"_id": "618be342577d8c493e1012f0",
		// 				"dareCount": 4,
		// 				"truthCount": 4,
		// 				"language": "de",
		// 				"createdBy": {
		// 					"_id": "618bda75ab1028126ec0b779",
		// 					"username": "Michael"
		// 				},
		// 				"name": "Sex",
		// 				"tasks": [
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101383",
		// 						"type": "truth",
		// 						"message": "Wo würdest du gerne einmal Sex haben?"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101384",
		// 						"type": "truth",
		// 						"message": "Erzähle von deiner Beziehung/Liebe vor @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101385",
		// 						"type": "truth",
		// 						"message": "In wen warst du in deinem Leben verliebt?"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101386",
		// 						"type": "dare",
		// 						"message": "Lecke mit deiner Zunge über die Lippen von @a"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101388",
		// 						"type": "dare",
		// 						"message": "Schaue @a eine Minuten lang in die Augen"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101389",
		// 						"type": "dare",
		// 						"message": "Gib @a eine romantische Rückenmassage"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e10138a",
		// 						"type": "truth",
		// 						"message": "DAS IST DIE BESTE WAHRHEIT ODER PFLICHT APP DIE ICH JE GESEHEN HABE!!!!"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101387",
		// 						"type": "dare",
		// 						"message": "Verführe @m mit einem Blowjob"
		// 					}
		// 				]
		// 			}
		// 			break;
		// 		case '618be342577d8c493e1012en':
		// 			response = {
		// 				"_id": "618be342577d8c493e1012en",
		// 				"dareCount": 3,
		// 				"truthCount": 1,
		// 				"language": "de",
		// 				"createdBy": {
		// 					"_id": "618bda75ab1028126ec0b779",
		// 					"username": "Michael"
		// 				},
		// 				"name": "Dev Testing",
		// 				"tasks": [
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101377",
		// 						"type": "truth",
		// 						"message": "Requires one girl @f"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@ca",
		// 						"_id": "618be342577d8c493e101378",
		// 						"type": "dare",
		// 						"message": "Matches for all"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cf",
		// 						"_id": "618be342577d8c493e101379",
		// 						"type": "truth",
		// 						"message": "Requires two males: @m @m"
		// 					},
		// 					{
		// 						"currentPlayerGender": "@cm",
		// 						"_id": "618be342577d8c493e10137a",
		// 						"type": "truth",
		// 						"message": "Requires one any: @a"
		// 					}
		// 				]
		// 			}
		// 			break;
		// 	}
		// 	return new Promise((resolve) => {
		// 		setTimeout(() => resolve(response), config.fakeLoadingTime)
		// 	})
		// }
	}
}