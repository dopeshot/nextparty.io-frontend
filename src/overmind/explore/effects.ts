import { config } from "../../global.config"
import { Set, SetWithTasks } from "./state"

export const api = {
    getSets: async (): Promise<Set[]> => {
        return new Promise((resolve) => setTimeout(() => resolve([{
            _id: "id",
            daresCount: 12,
            truthCount: 18,
            createdBy: {
                _id: "id",
                username: "Michael"
            },
            language: "de",
            name: "Love Set"
        }, {
            _id: "id",
            daresCount: 6,
            truthCount: 53,
            createdBy: {
                _id: "id",
                username: "Joy"
            },
            language: "de",
            name: "Lustiger Abend"
        }]), config.fakeLoadingTime))
    },
    
    getSetById: async (id: string): Promise<SetWithTasks> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                _id: id,
                daresCount: 12,
                truthCount: 18,
                createdBy: {
                    _id: "id",
                    username: "Michael"
                },
                language: "de",
                name: "Love Set",
                tasks: [{
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "truth",
                    message: "Wo würdest du gerne einmal Sex haben?"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "truth",
                    message: "Erzähle von deiner Beziehung/Liebe vor @a"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "truth",
                    message: "In wen warst du in deinem Leben verliebt?"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Lecke mit deiner Zunge über die Lippen von @a"
                }, {
                    currentPlayerGender: "@cw",
                    _id: "1",
                    type: "dare",
                    message: "Verführe @m mit einem Blowjob"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Schaue @a eine Minuten lang in die Augen"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Gib @a eine romantische Rückenmassage"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Küsse @a auf den Mund"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Küsse @a eine Minute lang intensiv mit der Zunge"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Verpasse @a einen Knutschfleck"
                }, {
                    currentPlayerGender: "@cw",
                    _id: "1",
                    type: "dare",
                    message: "Mach ein Selfie, wo du mit @m rummachst"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Tausche alle Klamotten (einschließlich Unterwäsche) mit @a"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Stöhne sinnlich und turne damit @a an"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Ziehe @m bis zu seiner Unterwäsche aus"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Ziehe @w bis zu ihrer Unterwäsche aus"
                }, {
                    currentPlayerGender: "@ca",
                    _id: "1",
                    type: "dare",
                    message: "Iss ein Stück von etwas (z.B Schlagsahne) von der Pobacke eines Freiwilligen"
                }]
            }), config.fakeLoadingTime)
        })

    }
}