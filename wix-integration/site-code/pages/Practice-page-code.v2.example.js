/**
 * Wix Editor Page Code — Practice page.
 * Existing HTML Component ID: #html2. Merge with the page code; preserve other handlers.
 */
import {
  getChapterBundle,getChapterBundleForAdmin,startAttempt,recordAnswer,recordScenarioAnswer,
  recordKeyboardAnswer,getChapterProgress,completeAttempt,getMyProgress,getMyGameHistory
} from 'backend/gameBackendNext.web';

$w.onReady(()=>{
  const frame=$w('#html2');
  frame.onMessage(async(event)=>{
    const msg=event.data;
    if(!msg||msg.channel!=='ATELIER_WIX'||msg.kind!=='request')return;
    if(typeof msg.requestId!=='string'||msg.requestId.length>160)return;
    const p=msg.payload&&typeof msg.payload==='object'?msg.payload:{};
    try{
      let data;
      switch(msg.method){
        case 'getChapterBundle': data=await getChapterBundle({chapterId:p.chapterId}); break;
        case 'getChapterBundleForAdmin': data=await getChapterBundleForAdmin({chapterId:p.chapterId}); break;
        case 'startAttempt': data=await startAttempt({chapterId:p.chapterId,mode:p.mode}); break;
        case 'recordAnswer': data=await recordAnswer({attemptId:p.attemptId,chapterId:p.chapterId,pairId:p.pairId,selectedItemId:p.selectedItemId,timeSpentMs:p.timeSpentMs}); break;
        case 'recordScenarioAnswer': data=await recordScenarioAnswer({attemptId:p.attemptId,chapterId:p.chapterId,taskId:p.taskId,selectedItemId:p.selectedItemId,timeSpentMs:p.timeSpentMs}); break;
        case 'recordKeyboardAnswer': data=await recordKeyboardAnswer({attemptId:p.attemptId,chapterId:p.chapterId,taskKey:p.taskKey,keys:p.keys,timeSpentMs:p.timeSpentMs}); break;
        case 'getChapterProgress': data=await getChapterProgress({chapterId:p.chapterId}); break;
        case 'completeAttempt': data=await completeAttempt({attemptId:p.attemptId}); break;
        case 'getMyProgress': data=await getMyProgress(); break;
        case 'getMyGameHistory': data=await getMyGameHistory({limit:p.limit}); break;
        default: throw new Error('UNKNOWN_GAME_METHOD');
      }
      frame.postMessage({channel:'ATELIER_WIX',kind:'response',requestId:msg.requestId,ok:true,data});
    }catch(error){
      frame.postMessage({channel:'ATELIER_WIX',kind:'response',requestId:msg.requestId,ok:false,
        error:error&&error.message?error.message:'WIX_BACKEND_ERROR'});
    }
  });
});
