# LSE320 — Wix Velo Integration Handoff

## Files
- \`site-code/backend/gameBackend.web.js\`: secure backend for loading chapter content, starting attempts, checking matching answers, storing answer rows, and updating member progress.
- \`site-code/pages/Practice-page-code.example.js\`: parent-page message bridge for the Wix HTML Component \`#html2\`.
- Existing CMS collections are reused; no new collections are created.

## CMS review gate
As of 13 November 2026, the six \`GameChapters\` records are \`draft\`. Normal Site Members can load only \`published\` chapters. Site admins can use the Admin-only preview method, which does not write learning records. Several review notes require instructor verification before publication, so this code does not publish drafts automatically.

## Install in Wix Editor
The current site is a Wix Editor site with Velo enabled. The available Wix connection in this session can read and manage CMS data, but cannot upload Velo source files into an Editor-built site's Code panel. To activate the integration, add the backend file to the site's Backend code and merge the page-code handler into the Practice page. The Wix HTML Component ID is \`html2\` according to the project handoff.

1. Add \`gameBackend.web.js\` under Backend.
2. Merge the handler from \`Practice-page-code.example.js\` into the Practice page's Page Code. Keep unrelated existing handlers.
3. Confirm the HTML Component ID is \`html2\` and its source points to the current ATELIER game deployment.
4. Preview as a Site Admin to inspect draft content. This preview mode does not write to CMS.
5. After the instructor reviews and publishes a chapter, test with a real Site Member account; that is when records are written to Wix CMS.

## Security and storage
- Member identity is read by \`currentMember.getMember()\` in the backend; the iframe cannot choose a memberId.
- The iframe does not receive \`MatchingPairs.itemId\` or \`Tasks.correctAnswer\`.
- The backend makes the correctness/reveal decision and records each response.
- \`GameAttempts\`: one row per matching round.
- \`AnswerRecords\`: each answer attempt.
- \`ChapterQuestionProgress\`: pair-level completion by member and chapter.
- \`MemberProgress\`: completed chapters and total play time.

## Current scope
The secure server-side validation path covers the Matching activity (the initial Mini Task vertical slice). Scenario and Keyboard Challenge still use client-side authored answer logic and should not be treated as authoritative or persisted until their validation methods are added.
