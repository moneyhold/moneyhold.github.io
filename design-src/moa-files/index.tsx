import { Stage, Bar, Text, Icon } from '../../kit'
import '../moa-look.css'

const DARK = typeof location !== 'undefined' && new URLSearchParams(location.search).has('dark')
import './files.css'

// 모아장부 feature tile: card-company statement files gathered into the ledger.
// A still: a loose pile of three statement files, the top one read.
// Real strings: the file name, what was read, two of its lines, what was skipped.

export default function MoaFiles() {
  return (
    <Stage width={358} height={272} theme={DARK ? 'dark' : 'light'} className="moa moa-files">
      {() => (
        <>
          <div className="moa-wash" />
          <div className="mf-pile">
            <section className="mf-card mf-card--back" />
            <section className="mf-card mf-card--mid">
              <Bar w={118} h={9} r={4.5} tone={3} />
              <Bar w={150} h={7} r={3.5} tone={2} />
              <Bar w={124} h={7} r={3.5} tone={2} />
            </section>
            <section className="mf-card mf-card--top">
              <div className="mf-head">
                <span className="mf-icon"><Icon name="file" size={16} stroke={2} /></span>
                <div className="mf-who">
                  <Text className="mf-name">신한카드_이용내역.xlsx</Text>
                  <Text className="mf-sub">43건 읽음</Text>
                </div>
              </div>
              <div className="mf-items">
                <div className="mf-item"><Text>온미정 역삼역점</Text><Text>14,900</Text></div>
                <div className="mf-item"><Text>365역삼역약국</Text><Text>25,000</Text></div>
              </div>
              <div className="mf-foot"><Text>이미 적은 1건은 뺐어요</Text></div>
            </section>
          </div>
        </>
      )}
    </Stage>
  )
}
