# 가이드 그림 원본 (Stageshow)

가이드 탭 '한눈에 보기'의 영상·이미지(`media/`) 원본이에요. [Stageshow](https://github.com/benjitaylor/skills/tree/main/stageshow)(MIT) 스킬의 kit으로 만들었어요.

- `moa-sms/`: 문자 붙여넣기 데모 영상
- `moa-prepay/`, `moa-files/`: 기능 카드 이미지
- `moa-look.css`: 모아장부 색·글꼴 (라이트·다크)

다시 만들기: Stageshow 폴더의 `examples/`에 위 폴더와 `moa-look.css`를, `playground/`에 `rec.html`, `rec.tsx`를 넣고 `npx vite playground --config playground/vite.config.ts --port 5174`를 켠 뒤 `node rec.mjs moa-sms 11 frames 30 [dark]`로 프레임을 찍어 ffmpeg로 묶어요.
