import { RootState, RootStateMap } from './index'
import { GlobalState } from "./global/types";

type B<T extends keyof RootState> = (state: RootStateMap) => RootState[T]
type C<T, P extends keyof T> = (state: RootStateMap) => T[P]

const selectors: {
  global: B<'global'>

  kvGlobal<P extends keyof GlobalState>(key: P): C<GlobalState, P>

} = {
  global: (state: RootStateMap) => state.get<'global'>('global'),

  kvGlobal: (key) => (state: RootStateMap) => state.get<'global'>('global')[key],
}

export default selectors
