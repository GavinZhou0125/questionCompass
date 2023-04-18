import redisClient from "../cache";
import { addVisitLog } from "../service/visitLogService";

export async function addLog(event, req, res){
  const {auth:userId, questionId, tag} = event

  return await addVisitLog(userId, questionId, tag)
}
