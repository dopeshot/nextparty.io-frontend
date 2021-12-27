import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as example from './example'
import * as explore from './explore'
import * as game from './game'
import * as players from './players'
import * as profile from './profile'

export const config = namespaced({
    example,
    explore,
    players,
    game,
    profile
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()