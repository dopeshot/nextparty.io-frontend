import { Method } from 'axios';
import { HttpResponseInterceptor, RouteMatcher, StaticResponse } from 'cypress/types/net-stubbing';

export function interceptIndefinitely(method: Method, route: RouteMatcher, response?: StaticResponse | HttpResponseInterceptor): any {
    let sendResponse

    const trigger = new Promise((resolve) => {
        sendResponse = resolve
    })

    cy.intercept(method, route, (request) => {
        return trigger.then(() => {
            request.reply(response)
        })
    })

    return { sendResponse }
}