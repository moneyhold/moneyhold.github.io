import { Stage, Bar, Text, Check } from '../../kit'
import '../moa-look.css'

const DARK = typeof location !== 'undefined' && new URLSearchParams(location.search).has('dark')
import './prepay.css'

// 모아장부 feature tile: a card bill with prepaid items checked off.
// A still, pinned and bled off the bottom: the bill's total, one item prepaid
// in full (struck), one in part. Real strings: the bill line, the total, two
// merchants, their amounts, the two prepay labels.

export default function MoaPrepay() {
  return (
    <Stage width={358} height={278} theme={DARK ? 'dark' : 'light'} className="moa moa-prepay">
      {() => (
        <>
          <div className="moa-wash" />
          <section className="mp-card">
            <div className="mp-head">
              <Text className="mp-label">현대카드 · 11/12 결제 예정</Text>
              <Text className="mp-total">1,190원</Text>
            </div>
            <div className="mp-row" data-off>
              <Check on size={20} className="mp-check" />
              <div className="mp-main">
                <Text className="mp-name">와마트평내</Text>
                <Text className="mp-part">전액 선결제</Text>
              </div>
              <Text className="mp-amt">83,610</Text>
            </div>
            <div className="mp-row">
              <Check on size={20} className="mp-check" />
              <div className="mp-main">
                <Text className="mp-name">보틀벙커</Text>
                <Text className="mp-part">62,000원 선결제</Text>
              </div>
              <Text className="mp-amt">63,190</Text>
            </div>
            <div className="mp-row">
              <Check on={false} size={20} className="mp-check" />
              <div className="mp-main"><Bar w={96} h={9} r={4.5} tone={3} /></div>
              <Bar w={48} h={9} r={4.5} tone={3} />
            </div>
          </section>
        </>
      )}
    </Stage>
  )
}
