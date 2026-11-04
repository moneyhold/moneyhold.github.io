import { Stage, Phone, Bar, Row, Check, Badge, Segmented, Collapse, Popover, States, Icon, type Act } from '../../kit'
import '../moa-look.css'
import './sms.css'

const DARK = typeof location !== 'undefined' && new URLSearchParams(location.search).has('dark')

// 모아장부: a card SMS pasted into quick input becomes a recorded expense.
// One sheet, four beats: tap the field, Paste, the message is read into one
// row (merchant, card, category, amount), Save confirms on its own button.
// Plays once; the poster is the saved state with the read row on screen.
//
// Real strings: 거래 추가, the two segments, the message, 스타벅스, 신한카드,
// the date line, -5,600, the button's labels. Everything else is a bar.

type Btn = 'idle' | 'ready' | 'done'
type S = { focus: boolean; menu: boolean; text: boolean; row: boolean; btn: Btn }

const START: S = { focus: false, menu: false, text: false, row: false, btn: 'idle' }
const DONE: S = { focus: false, menu: false, text: true, row: true, btn: 'done' }

const SMS = ['[Web발신]', '신한카드(1234)승인 홍*동', '5,600원(일시불)11/04 12:34', '스타벅스 누적312,400원']

const script = async (a: Act<S>) => {
  await a.wait(900)
  a.mark('tap')
  await a.click({ at: 'field', x: 0.3, y: 0.35 })
  a.put({ focus: true })
  await a.wait(260)
  a.put({ menu: true })
  await a.wait(900)
  a.mark('paste')
  await a.click({ at: 'paste', x: 0.5, y: 0.5 })
  a.put({ menu: false })
  await a.wait(240)
  a.put({ text: true })
  await a.wait(560)
  a.mark('read')
  a.put({ row: true })
  await a.wait(260)
  a.put({ btn: 'ready' })
  await a.wait(1700)
  a.mark('save')
  await a.click({ at: 'save', x: 0.72, y: 0.55 })
  a.put({ btn: 'done', focus: false })
  await a.wait(2600)
}

export default function MoaSms() {
  return (
    <Stage<S>
      width={358}
      height={470}
      initial={START}
      poster={DONE}
      play="once"
      script={script}
      cursor={{ at: { x: 270, y: 110 }, style: 'touch', ripple: true }}
      theme={DARK ? 'dark' : 'light'}
      className="moa moa-sms"
    >
      {(s) => (
        <>
          <div className="moa-wash" />
          <Phone width={326} className="ms-phone" dark={DARK} wallpaper={DARK ? '#0e1014' : undefined}>
            {/* The calendar behind the sheet, dimmed: day numbers and amounts as bars */}
            <div className="ms-home">
              {Array.from({ length: 21 }, (_, i) => (
                <span key={i} className="ms-day">
                  <Bar w={i % 7 === 3 ? 18 : 12} h={10} r={5} tone={3} />
                  {[1, 2, 4, 9, 13].includes(i) && <Bar w={30} h={7} r={3} tone={2} />}
                </span>
              ))}
            </div>
            <div className="ms-scrim" />
            <div className="ms-sheet">
              <div className="ms-head">
                <span className="ms-title">거래 추가</span>
                <span className="ms-close"><Icon name="close" size={18} stroke={2} /></span>
              </div>
              <Segmented className="ms-seg" items={['빠른 입력·문자', '한 건씩']} value={0} />
              <div className="ms-field" data-target="field" data-cursor="ibeam" data-focus={s.focus || undefined}>
                <div className="ms-placeholder" data-hide={s.focus || s.text || undefined}>
                  <Bar w={118} h={10} r={5} tone={2} />
                  <Bar w={150} h={10} r={5} tone={2} />
                  <Bar w={96} h={10} r={5} tone={2} />
                </div>
                <div className="ms-sms" data-show={s.text || undefined}>
                  {SMS.map((l) => <div key={l}>{l}</div>)}
                </div>
                <span className="ms-caret" data-on={(s.focus && !s.text) || undefined} />
                <Popover show={s.menu} origin="bottom left" className="ms-menu">
                  <span className="ms-menu__item" data-target="paste">붙여넣기</span>
                </Popover>
              </div>
              <div className="ms-note">
                <Bar w={290} h={8} r={4} tone={2} />
                <Bar w={190} h={8} r={4} tone={2} />
              </div>
              <Collapse open={s.row} reveal="drop">
                <div className="ms-preview">
                  <Row
                    className="ms-row"
                    lead={<Check on size={22} className="ms-check" />}
                    title={<span className="ms-merchant">스타벅스<Badge className="ms-card">신한카드</Badge></span>}
                    subtitle={<span className="ms-sub">11.4 (수) 12:34 · 카페</span>}
                    meta={<span className="ms-amt">-5,600</span>}
                  />
                </div>
              </Collapse>
              <span className="ms-save" data-target="save" data-state={s.btn}>
                <States
                  value={s.btn}
                  states={{
                    idle: <>저장할 내역을 적어주세요</>,
                    ready: <>1건 저장</>,
                    done: (
                      <>
                        <Icon name="check" size={18} stroke={2.4} /> 저장했어요
                      </>
                    ),
                  }}
                />
              </span>
            </div>
          </Phone>
        </>
      )}
    </Stage>
  )
}
