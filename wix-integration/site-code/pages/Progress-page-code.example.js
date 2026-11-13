/**
 * Optional standalone Progress page bridge.
 * Add an HTML Component with ID #htmlProgress to the Progress page and point it
 * to progress-dashboard.html. This code reads only the current member's records.
 */
import {getMyProgress,getMyGameHistory} from 'backend/gameBackendNext.web';
$w.onReady(()=>{
  const frame=$w('#htmlProgress');
  frame.onMessage(async(event)=>{
    const msg=event.data;
    if(!msg||msg.channel!=='ATELIER_PROGRESS'||msg.kind!=='request'||msg.method!=='loadProgress')return;
    try{
      const [progress,history]=await Promise.all([getMyProgress(),getMyGameHistory({limit:20})]);
      frame.postMessage({channel:'ATELIER_PROGRESS',kind:'response',requestId:msg.requestId,ok:true,data:{progress,history}});
    }catch(error){
      frame.postMessage({channel:'ATELIER_PROGRESS',kind:'response',requestId:msg.requestId,ok:false,
        error:error&&error.message?error.message:'PROGRESS_LOAD_FAILED'});
    }
  });
});
