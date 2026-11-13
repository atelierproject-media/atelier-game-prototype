/**
 * LSE320 / ATELIER — secure Velo backend for Matching, Scenario and Keyboard Mini Tasks.
 * Add this file to Wix Editor > Code > Backend as gameBackendNext.web.js.
 * All writes require an authenticated Site Member. Member IDs and answer keys are server-side.
 */
import wixData from 'wix-data';
import { currentMember } from 'wix-members-backend';
import { Permissions, webMethod } from 'wix-web-module';

const O = { suppressAuth: true, suppressHooks: true };
const MAX_TRIES = 3, MAX_ROWS = 1000;
const C = {
  chapters:'GameChapters', tasks:'Tasks', pairs:'MatchingPairs',
  attempts:'GameAttempts', answers:'AnswerRecords',
  chapterProgress:'ChapterQuestionProgress', memberProgress:'MemberProgress'
};
const SHORTCUTS = {
  copy:{task:'shortcut_copy_paste_cut', keys:['Control+C','Meta+C'], label:'Ctrl / Command + C'},
  paste:{task:'shortcut_copy_paste_cut', keys:['Control+V','Meta+V'], label:'Ctrl / Command + V'},
  cut:{task:'shortcut_copy_paste_cut', keys:['Control+X','Meta+X'], label:'Ctrl / Command + X'},
  undo:{task:'shortcut_undo_redo', keys:['Control+Z','Meta+Z'], label:'Ctrl / Command + Z'},
  panels:{task:'shortcut_panels', keys:['Tab'], label:'Tab'},
  selectall:{task:'shortcut_select_all', keys:['Control+A','Meta+A'], label:'Ctrl / Command + A'},
  selection:{task:'shortcut_tool_switch', keys:['V'], label:'V'},
  directselection:{task:'shortcut_tool_switch', keys:['A'], label:'A'},
  pen:{task:'shortcut_tool_switch', keys:['P'], label:'P'}
};
function fail(code){ throw new Error(code); }
function id(value,field){
  const s=typeof value==='string'?value.trim():'';
  if(!s||s.length>128||!/^[a-zA-Z0-9_-]+$/.test(s)) fail('INVALID_'+String(field).toUpperCase());
  return s;
}
function num(value,fallback=0,max=600000){
  const n=Number(value); return Number.isFinite(n)?Math.max(0,Math.min(Math.floor(n),max)):fallback;
}
function local(th,en){return {th:typeof th==='string'?th:'',en:typeof en==='string'?en:''};}
async function memberId(){
  try{const m=await currentMember.getMember({fieldsets:['FULL']});if(!m||!m._id)fail('MEMBER_LOGIN_REQUIRED');return m._id;}
  catch(e){if(String(e&&e.message||'').includes('MEMBER_LOGIN_REQUIRED'))throw e;fail('MEMBER_LOGIN_REQUIRED');}
}
async function first(q){const r=await q.limit(1).find(O);return r.items&&r.items[0]||null;}
async function all(q){const r=await q.limit(MAX_ROWS).find(O);return r.items||[];}
async function chapterRow(chapterId,drafts=false){
  let q=wixData.query(C.chapters).eq('chapterId',chapterId);
  if(!drafts)q=q.eq('status','published');
  const row=await first(q);if(!row)fail(drafts?'CHAPTER_NOT_FOUND':'CHAPTER_NOT_PUBLISHED');return row;
}
function gameItem(t){
  return {id:t.itemId,type:t.taskType||'tool_or_command',
    name:local(t.nameTh||t.taskName||t.title,t.nameEn||t.taskName||t.title),
    shortcut:t.shortcut||'',description:local(t.descriptionTh,t.descriptionEn),
    matchingPrompt:local(t.matchingPromptTh,t.matchingPromptEn),
    feedbackCorrect:t.feedbackCorrect||local('',''),
    feedbackIncorrect:t.feedbackIncorrect||local('',''),asset:t.asset||''};
}
async function bundle(chapterId,drafts=false){
  const ch=await chapterRow(chapterId,drafts);
  const [tasks,pairs]=await Promise.all([
    all(wixData.query(C.tasks).eq('chapterId',chapterId).eq('isActive',true).ascending('itemId')),
    all(wixData.query(C.pairs).eq('chapterId',chapterId).eq('isActive',true).ascending('order'))
  ]);
  const map=new Map(tasks.filter(t=>t.itemId).map(t=>[t.itemId,t]));
  const publicPairs=pairs.filter(p=>p.pairId&&map.has(p.itemId)).map(p=>{
    const t=map.get(p.itemId),view={id:p.pairId,matchingPrompt:local(t.matchingPromptTh,t.matchingPromptEn)};
    if(drafts)view.itemId=p.itemId; // Admin-only, no-record preview.
    return view;
  });
  if(!tasks.length||!publicPairs.length)fail('CHAPTER_HAS_NO_ACTIVE_MATCHING_CONTENT');
  return {id:ch.chapterId,order:ch.order||0,status:ch.status,contentVersion:ch.contentVersion||1,
    title:local(ch.titleTh,ch.titleEn),summary:local(ch.summaryTh,ch.summaryEn),
    learningObjectives:ch.learningObjectives||{th:[],en:[]},intro:ch.intro||local('',''),
    resultText:ch.resultText||local('',''),items:tasks.map(gameItem),
    matching:{mode:'one-to-one',maxAttemptsPerPair:MAX_TRIES,revealAfterMaxAttempts:true,
      feedbackTiming:'after-each-pair',interactionModes:['drag-and-drop','click-to-match'],pairs:publicPairs}};
}
async function pairsFor(chapterId){return all(wixData.query(C.pairs).eq('chapterId',chapterId).eq('isActive',true));}
async function updateMember(member,chapterId,extraMs=0){
  const cp=await first(wixData.query(C.chapterProgress).eq('memberId',member).eq('chapterId',chapterId));
  const current=await first(wixData.query(C.memberProgress).eq('memberId',member));
  const done=Array.isArray(current&&current.completedChapters)?current.completedChapters.slice():[];
  if(cp&&cp.status==='completed'&&!done.includes(chapterId))done.push(chapterId);
  const row={...(current||{}),memberId:member,completedChapters:done,completedChapterCount:done.length,
    totalPlayTimeMs:num(current&&current.totalPlayTimeMs,0,Number.MAX_SAFE_INTEGER)+num(extraMs,0,Number.MAX_SAFE_INTEGER),lastActive:new Date()};
  if(current&&current._id)return wixData.update(C.memberProgress,row,O);
  return wixData.insert(C.memberProgress,row,O);
}
async function refreshMatchingProgress(member,chapterId){
  const pairRows=await pairsFor(chapterId),valid=new Set(pairRows.map(p=>p.pairId));
  const answers=await all(wixData.query(C.answers).eq('memberId',member).eq('chapterId',chapterId));
  const completed=[...new Set(answers.filter(a=>valid.has(a.pairId)&&(a.isCorrect||a.isRevealed)).map(a=>a.pairId))];
  const total=pairRows.length,count=Math.min(completed.length,total);
  const status=total&&count>=total?'completed':count?'in_progress':'not_started';
  const old=await first(wixData.query(C.chapterProgress).eq('memberId',member).eq('chapterId',chapterId));
  const row={...(old||{}),memberId:member,chapterId,completedPairIds:completed,completedCount:count,totalQuestions:total,
    progressPercent:total?Math.round(count/total*100):0,status,lastUpdated:new Date()};
  if(old&&old._id)await wixData.update(C.chapterProgress,row,O);else await wixData.insert(C.chapterProgress,row,O);
  await updateMember(member,chapterId,0);
  return {chapterId,completedPairIds:completed,completedCount:count,totalQuestions:total,
    remaining:Math.max(0,total-count),progressPercent:total?Math.round(count/total*100):0,status};
}
async function ownedAttempt(member,attempt,chapter,mode){
  const row=await wixData.get(C.attempts,attempt,O);
  if(!row||row.memberId!==member)fail('ATTEMPT_NOT_FOUND');
  if(row.chapterId!==chapter||row.mode!==mode)fail('ATTEMPT_CONTEXT_MISMATCH');
  if(row.status!=='in_progress')fail('ATTEMPT_NOT_ACTIVE');
  await chapterRow(chapter,false);return row;
}
function safeItem(t){return {id:t.itemId,name:local(t.nameTh||t.taskName||t.title,t.nameEn||t.taskName||t.title),
  description:local(t.descriptionTh,t.descriptionEn),shortcut:t.shortcut||'',feedbackCorrect:t.feedbackCorrect||local('','')};}
async function saveAnswer(member,attempt,chapter,pair,selected,correct,time,feedback){
  const old=await all(wixData.query(C.answers).eq('attemptId',attempt).eq('pairId',pair).ascending('attemptNum'));
  if(old.some(a=>a.isCorrect||a.isRevealed))fail('QUESTION_ALREADY_RESOLVED');
  const attemptNum=old.length+1;if(attemptNum>MAX_TRIES)fail('NO_ATTEMPTS_REMAINING');
  const revealed=!correct&&attemptNum>=MAX_TRIES;
  const inserted=await wixData.insert(C.answers,{attemptId:attempt,memberId:member,chapterId:chapter,pairId:pair,
    selectedItemId:selected,attemptNum,isCorrect:correct,isRevealed:revealed,timeSpentMs:num(time),timestamp:new Date()},O);
  const saved=await wixData.update(C.answers,{...inserted,answerId:inserted._id},O);
  let progress=null;
  if(correct||revealed){
    if(pair.indexOf('scenario_')===0||pair.indexOf('keyboard_')===0)await updateMember(member,chapter,0);
    else progress=await refreshMatchingProgress(member,chapter);
  }
  const safeFeedback=(correct||revealed)
    ? {correct:feedback&&feedback.correct||null,matchedItem:feedback&&feedback.matchedItem||null,
       expectedLabel:feedback&&feedback.expectedLabel||null}
    : {incorrect:feedback&&feedback.incorrect||null};
  return {answerId:saved._id,attemptNum,isCorrect:correct,isRevealed:revealed,
    attemptsLeft:correct||revealed?0:Math.max(0,MAX_TRIES-attemptNum),feedback:safeFeedback,progress};
}
function normalizeKeys(values){
  if(!Array.isArray(values)||values.length<1||values.length>4)fail('INVALID_KEY_COMBINATION');
  const allowed=new Set(['Control','Meta','Alt','Shift','Tab','A','C','P','V','X','Z']);
  const keys=values.map(v=>{let s=String(v||'').trim();if(s==='Ctrl')s='Control';if(s==='Command'||s==='⌘ Command')s='Meta';if(s.length===1)s=s.toUpperCase();return s;});
  if(keys.some(k=>!allowed.has(k)))fail('INVALID_KEY_COMBINATION');
  return [...new Set(keys)].sort().join('+');
}
function summarize(attempt,answers){
  const correct=answers.filter(a=>a.isCorrect).length,revealed=answers.filter(a=>a.isRevealed).length,total=answers.length;
  return {attemptId:attempt.attemptId||attempt._id,chapterId:attempt.chapterId,mode:attempt.mode,status:attempt.status,
    startTime:attempt.startTime||null,endTime:attempt.endTime||null,totalQuestions:attempt.totalQuestions||0,
    correctCount:correct,revealedCount:revealed,totalAttempts:total,incorrectAttempts:Math.max(0,total-correct),
    firstTimeCorrect:answers.filter(a=>a.isCorrect&&a.attemptNum===1).length,timeSpentMs:attempt.timeSpentMs||0,
    scorePercent:attempt.totalQuestions?Math.round(correct/attempt.totalQuestions*100):0};
}

export const getChapterBundle=webMethod(Permissions.SiteMember,async p=>{await memberId();return bundle(id(p&&p.chapterId,'chapterId'),false);});
export const getChapterBundleForAdmin=webMethod(Permissions.Admin,async p=>bundle(id(p&&p.chapterId,'chapterId'),true));

async function makeScenarioBundle(chapterId,includeAnswer){
  await chapterRow(chapterId,!includeAnswer);
  const tasks=await all(wixData.query(C.tasks).eq('chapterId',chapterId).eq('isActive',true));
  const eligible=tasks.filter(t=>t.correctAnswer&&tasks.some(x=>x.itemId===t.correctAnswer));
  function shuffled(rows){
    const out=rows.slice();
    for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
    return out;
  }
  const questions=shuffled(eligible).slice(0,5).map(task=>{
    const correctId=task.correctAnswer;
    const distractors=shuffled(tasks.filter(t=>t.itemId!==correctId)).slice(0,3).map(t=>t.itemId);
    const options=shuffled([correctId,...distractors]);
    const rawTh=task.matchingPromptTh||task.descriptionTh||task.question||'';
    const rawEn=task.matchingPromptEn||task.descriptionEn||task.question||'';
    const question={
      scenarioId:task._id,
      prompt:{
        th:'สถานการณ์ในห้องออกแบบแฟชั่น: '+rawTh+' ควรเลือกเครื่องมือใด?',
        en:'Fashion studio situation: '+rawEn+' Which tool should you choose?'
      },
      visual:'default',
      options
    };
    if(includeAnswer)question.answerItemId=correctId;
    return question;
  });
  return {questions};
}
export const getScenarioBundle=webMethod(Permissions.SiteMember,async p=>{
  await memberId();
  return makeScenarioBundle(id(p&&p.chapterId,'chapterId'),false);
});
export const getScenarioBundleForAdmin=webMethod(Permissions.Admin,async p=>{
  return makeScenarioBundle(id(p&&p.chapterId,'chapterId'),true);
});


export const startAttempt=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),chapter=id(p&&p.chapterId,'chapterId'),mode=p&&p.mode,source=await chapterRow(chapter,false);
  if(!['matching','scenario','keyboard'].includes(mode))fail('UNSUPPORTED_GAME_MODE');
  let total=0;
  if(mode==='matching'){
    const activePairs=await pairsFor(chapter);
    const progress=await first(wixData.query(C.chapterProgress).eq('memberId',m).eq('chapterId',chapter));
    const completed=new Set(Array.isArray(progress&&progress.completedPairIds)?progress.completedPairIds:[]);
    total=Math.min(5,activePairs.filter(row=>!completed.has(row.pairId)).length);
  }
  if(mode==='scenario'){
    const taskRows=await all(wixData.query(C.tasks).eq('chapterId',chapter).eq('isActive',true));
    total=Math.min(5,taskRows.filter(t=>t.correctAnswer&&taskRows.some(x=>x.itemId===t.correctAnswer)).length);
  }
  if(mode==='keyboard')total=Math.min(5,Object.keys(SHORTCUTS).length);
  if(!total)fail('CHAPTER_HAS_NO_ACTIVE_CONTENT');
  const created=await wixData.insert(C.attempts,{memberId:m,chapterId:chapter,contentVersion:source.contentVersion||1,
    mode,startTime:new Date(),status:'in_progress',totalQuestions:total,correctCount:0,totalAttempts:0,timeSpentMs:0},O);
  await wixData.update(C.attempts,{...created,attemptId:created._id},O);
  return {attemptId:created._id,chapterId:chapter,mode,totalQuestions:total,status:'in_progress'};
});

export const recordAnswer=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),attempt=id(p&&p.attemptId,'attemptId'),chapter=id(p&&p.chapterId,'chapterId');
  const pairId=id(p&&p.pairId,'pairId'),selected=id(p&&p.selectedItemId,'selectedItemId');
  await ownedAttempt(m,attempt,chapter,'matching');
  const pair=await first(wixData.query(C.pairs).eq('chapterId',chapter).eq('pairId',pairId).eq('isActive',true));
  if(!pair||!pair.itemId)fail('MATCHING_PAIR_NOT_FOUND');
  const completedProgress=await first(wixData.query(C.chapterProgress).eq('memberId',m).eq('chapterId',chapter));
  if(completedProgress&&Array.isArray(completedProgress.completedPairIds)&&completedProgress.completedPairIds.includes(pairId)){
    fail('PAIR_ALREADY_COMPLETED');
  }
  const [correctTask,selectedTask]=await Promise.all([
    first(wixData.query(C.tasks).eq('chapterId',chapter).eq('itemId',pair.itemId).eq('isActive',true)),
    first(wixData.query(C.tasks).eq('chapterId',chapter).eq('itemId',selected).eq('isActive',true))
  ]);
  if(!correctTask||!selectedTask)fail('MATCHING_TASK_NOT_FOUND');
  return saveAnswer(m,attempt,chapter,pairId,selected,selected===pair.itemId,p&&p.timeSpentMs,{
    correct:correctTask.feedbackCorrect||local('',''),incorrect:correctTask.feedbackIncorrect||local('',''),
    matchedItem:safeItem(correctTask)});
});

export const recordScenarioAnswer=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),attempt=id(p&&p.attemptId,'attemptId'),chapter=id(p&&p.chapterId,'chapterId');
  const scenarioId=id(p&&p.scenarioId,'scenarioId'),selected=id(p&&p.selectedItemId,'selectedItemId');
  await ownedAttempt(m,attempt,chapter,'scenario');
  const task=await wixData.get(C.tasks,scenarioId,O);
  const chosen=await first(wixData.query(C.tasks).eq('chapterId',chapter).eq('itemId',selected).eq('isActive',true));
  if(!task||task.chapterId!==chapter||!task.isActive||!chosen||!task.correctAnswer)fail('SCENARIO_TASK_NOT_FOUND');
  return saveAnswer(m,attempt,chapter,'scenario_'+scenarioId,selected,selected===task.correctAnswer,p&&p.timeSpentMs,{
    correct:task.feedbackCorrect||local('',''),incorrect:task.feedbackIncorrect||local('',''),matchedItem:safeItem(task)});
});

export const recordKeyboardAnswer=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),attempt=id(p&&p.attemptId,'attemptId'),chapter=id(p&&p.chapterId,'chapterId');
  const taskKey=id(p&&p.taskKey,'taskKey'),config=SHORTCUTS[taskKey];
  if(!config)fail('KEYBOARD_TASK_NOT_SUPPORTED');
  const pressed=normalizeKeys(p&&p.keys);
  await ownedAttempt(m,attempt,chapter,'keyboard');
  const task=await first(wixData.query(C.tasks).eq('chapterId',chapter).eq('itemId',config.task).eq('isActive',true));
  if(!task)fail('KEYBOARD_TASK_NOT_FOUND');
  const expected=config.keys.map(k=>k.split('+').sort().join('+'));
  return saveAnswer(m,attempt,chapter,'keyboard_'+taskKey,pressed,expected.includes(pressed),p&&p.timeSpentMs,{
    correct:task.feedbackCorrect||local('',''),incorrect:task.feedbackIncorrect||local('',''),
    expectedLabel:config.label});
});


export const checkKeyboardAnswerForAdmin=webMethod(Permissions.Admin,async p=>{
  const taskKey=id(p&&p.taskKey,'taskKey'),config=SHORTCUTS[taskKey];
  if(!config)fail('KEYBOARD_TASK_NOT_SUPPORTED');
  const pressed=normalizeKeys(p&&p.keys),expected=config.keys.map(k=>k.split('+').sort().join('+'));
  const isCorrect=expected.includes(pressed);
  return {isCorrect,expectedLabel:config.label};
});
export const getChapterProgress=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),chapter=id(p&&p.chapterId,'chapterId');
  const row=await first(wixData.query(C.chapterProgress).eq('memberId',m).eq('chapterId',chapter));
  if(!row){const total=(await pairsFor(chapter)).length;return {chapterId:chapter,completedPairIds:[],completedCount:0,totalQuestions:total,remaining:total,progressPercent:0,status:'not_started'};}
  return {chapterId:chapter,completedPairIds:Array.isArray(row.completedPairIds)?row.completedPairIds:[],
    completedCount:row.completedCount||0,totalQuestions:row.totalQuestions||0,
    remaining:Math.max(0,(row.totalQuestions||0)-(row.completedCount||0)),
    progressPercent:row.progressPercent||0,status:row.status||'not_started'};
});

export const completeAttempt=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),attemptId=id(p&&p.attemptId,'attemptId');
  const attempt=await wixData.get(C.attempts,attemptId,O);
  if(!attempt||attempt.memberId!==m)fail('ATTEMPT_NOT_FOUND');
  const answers=await all(wixData.query(C.answers).eq('attemptId',attemptId));
  if(attempt.status==='completed')return summarize(attempt,answers);
  if(attempt.status!=='in_progress')fail('ATTEMPT_NOT_ACTIVE');
  const correct=answers.filter(a=>a.isCorrect).length;
  const started=attempt.startTime instanceof Date?attempt.startTime.getTime():new Date(attempt.startTime).getTime();
  const duration=Number.isFinite(started)?Math.max(0,Date.now()-started):0;
  const updated=await wixData.update(C.attempts,{...attempt,endTime:new Date(),status:'completed',
    correctCount:correct,totalAttempts:answers.length,timeSpentMs:duration},O);
  await updateMember(m,attempt.chapterId,duration);
  return summarize(updated,answers);
});

export const getMyProgress=webMethod(Permissions.SiteMember,async()=>{
  const m=await memberId();
  const [member,chapters,pairs,answers,attempts,storedProgress]=await Promise.all([
    first(wixData.query(C.memberProgress).eq('memberId',m)),
    all(wixData.query(C.chapters).eq('status','published').ascending('order')),
    all(wixData.query(C.pairs).eq('isActive',true)),
    all(wixData.query(C.answers).eq('memberId',m)),
    all(wixData.query(C.attempts).eq('memberId',m).descending('startTime')),
    all(wixData.query(C.chapterProgress).eq('memberId',m))
  ]);
  const perChapter=chapters.map(ch=>{
    const ids=pairs.filter(p=>p.chapterId===ch.chapterId).map(p=>p.pairId);
    const saved=storedProgress.find(r=>r.chapterId===ch.chapterId);
    const completed=saved&&Array.isArray(saved.completedPairIds)?saved.completedPairIds.filter(x=>ids.includes(x)).length:0;
    const chapterAnswers=answers.filter(a=>a.chapterId===ch.chapterId);
    const scenario=new Set(chapterAnswers.filter(a=>a.pairId.indexOf('scenario_')===0&&(a.isCorrect||a.isRevealed)).map(a=>a.pairId)).size;
    const keyboard=new Set(chapterAnswers.filter(a=>a.pairId.indexOf('keyboard_')===0&&(a.isCorrect||a.isRevealed)).map(a=>a.pairId)).size;
    return {chapterId:ch.chapterId,order:ch.order||0,title:local(ch.titleTh,ch.titleEn),
      matchingCompleted:completed,matchingTotal:ids.length,
      progressPercent:ids.length?Math.round(completed/ids.length*100):0,
      remaining:Math.max(0,ids.length-completed),
      status:ids.length&&completed>=ids.length?'completed':completed?'in_progress':'not_started',
      scenarioQuestionsResolved:scenario,keyboardQuestionsResolved:keyboard,
      attemptCount:attempts.filter(a=>a.chapterId===ch.chapterId).length};
  });
  const correct=answers.filter(a=>a.isCorrect).length;
  return {completedChapters:Array.isArray(member&&member.completedChapters)?member.completedChapters:[],
    completedChapterCount:member&&member.completedChapterCount||0,totalPlayTimeMs:member&&member.totalPlayTimeMs||0,
    totalAttempts:attempts.length,totalAnswers:answers.length,correctAnswers:correct,
    accuracyPercent:answers.length?Math.round(correct/answers.length*100):0,chapters:perChapter};
});

export const getMyGameHistory=webMethod(Permissions.SiteMember,async p=>{
  const m=await memberId(),requested=Number(p&&p.limit),limit=Math.max(1,Math.min(Number.isFinite(requested)?Math.floor(requested):30,50));
  const page=await wixData.query(C.attempts).eq('memberId',m).descending('startTime').limit(limit).find(O);
  return Promise.all((page.items||[]).map(async a=>summarize(a,await all(wixData.query(C.answers).eq('attemptId',a._id)))));
});
