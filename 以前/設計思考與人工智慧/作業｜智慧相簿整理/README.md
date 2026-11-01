# Smart Album Cleaner

**A local photo-review app that scores facial expressions in your photos and moves the rejects to a recoverable trash.**

在本機執行的 AI 相簿整理工具：判斷照片中人臉表情好不好，把不好的移到可還原的垃圾桶。

> **Type** Course project (Design Thinking and AI, NCCU) · **Status** Completed (2026-05 → 2026-07) · **Role** Solo project · **Stack** FastAPI + Vue 3, PyTorch (MobileNetV3), MediaPipe

![Synthetic Smart Album review dashboard](docs/screenshots/dashboard.png)

This portfolio screenshot is generated entirely from synthetic fixtures and contains no real or private photos.

## Background

A course assignment: build an AI prototype through a design-thinking process. This one takes on album cleanup, flagging photos where the faces look bad, while leaving every final decision to the user.

## What it does

- **Scans a local folder or selected files** and shows progress while it works.
- **Finds faces** with MediaPipe and rates each one `Good` or `Bad` with a fine-tuned MobileNetV3 model.
- **Lets you review the results** and move photos to a trash list, restore them, or send them to the system trash.
- **Keeps photos on your computer**: the server only accepts local requests and only touches folders you authorized.

## Key decisions

| Decision | Why |
| --- | --- |
| Runs entirely on the user's computer | Personal photos should never leave the device. |
| Recoverable trash instead of deleting | The model is subjective and can be wrong, so every action must be undoable. |
| Model downloaded separately and checked by SHA-256 | Keeps the repository small and makes sure the download matches the published release file. |
| Loads the checkpoint with `weights_only=True` | Prevents a tampered model file from running code. |

## Results

- The tracked evaluation reports **75.1% accuracy on 193 labelled test examples** for the subjective binary `Good`/`Bad` task (`Bad` recall 82.8%; `Good` recall 67.0%). This result does not establish real-world, subgroup, or identity-recognition performance. Performance depends on hardware and image size; no reproducible runtime benchmark is tracked. See the [Model Card](docs/MODEL_CARD.md) for evidence, class-level results, and limitations.
- Originally developed in its own repository (2026-05 → 2026-07), with Python and browser tests.

## Run it locally

Requires Python 3.11+, Node.js 20.19+ or 22.12+, and Git. The full scanning UI currently works on macOS only.

```bash
git clone https://github.com/Hunter20041004/nccu-coursework.git
cd "nccu-coursework/以前/設計思考與人工智慧/作業｜智慧相簿整理"
./run.sh
```

`run.sh` needs the classifier file in `models/` first. Download-and-verify steps, Windows setup, development mode, model training and tests are in [`docs/SETUP.md`](docs/SETUP.md) (Chinese).

## Notes

App version `0.2.0` and classifier release `v1.0.0` are independent release identifiers: the app version describes this source tree, while the classifier tag identifies the separately downloaded checkpoint artifact.

## 中文摘要

設計思考與人工智慧課的作業：用設計思考流程做出一個 AI 原型。這個工具在本機用 MediaPipe 找出人臉，再用微調過的 MobileNetV3 判斷表情好壞，讓使用者檢視結果，把不要的移到可還原的垃圾桶；照片不會離開電腦。測試集 193 張的準確率為 75.1%。

## License

The [`LICENSE`](LICENSE) file is intentionally narrow: **MIT applies only to
project-owned source code** in this repository. The repository does not grant
blanket MIT rights over models, data, evaluation material, dependencies, or
user content.

- **Classifier checkpoint licence: unknown.** The tracked evidence verifies a
  release checksum, not redistribution or reuse rights for
  `mobilenet_face.pth`.
- **Dataset and evaluation artifact licences: unknown.** Their tracked
  provenance does not establish origin, consent, or reuse terms, so they must
  not be treated as MIT-licensed.
- **MediaPipe model and third-party dependencies retain their own licences**
  and terms; consult their upstream distributions before reuse.
- **User images are not covered by the project licence.** They remain local
  user content and are not included in this repository.
- [`docs/screenshots/dashboard.png`](docs/screenshots/dashboard.png) is a
  synthetic, project-generated UI capture containing no real or private
  photos.
