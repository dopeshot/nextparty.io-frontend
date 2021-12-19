import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as example from './example'
import * as explore from './explore'
import * as players from './players'
import * as app from './app'

export const config = namespaced({
    example,
    explore,
    players,
    app
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()