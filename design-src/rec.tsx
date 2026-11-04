// Local recorder entry: virtual clock first, then the example, so every frame is stepped.
import { installVirtualClock } from '../kit/clock'
const fps = Number(new URLSearchParams(location.search).get('fps') || 30)
installVirtualClock({ fps })
const name = new URLSearchParams(location.search).get('ex')!
import('./preview').then(({ mount }) => mount(name, false)).then(() => { (window as any).__recReady = true })
