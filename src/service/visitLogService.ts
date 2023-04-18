import visitLog from "../model/visitLog";
import { getCurrentTimeString } from "../utils/dateHelper";

export async function addVisitLog(userId, questionId, questionPrefer){
  const log = await visitLog.create({
    question_id:questionId,
    user_id:userId,
    question_prefer:questionPrefer,
    visit_time:getCurrentTimeString()
  })

  return log
}
