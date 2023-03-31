import redisClient from "../cache";
import fileTable from "../model/fileTable";

export async function addFileApi(event, req, res) {
  const { filename } = req.file;
  let createBy = "";
  await redisClient.getAsync(req.headers.authorization).then((data) => {
    if (data) {
      createBy = JSON.parse(data);
    } else {
      return;
    }
  });
  await fileTable.create({
    file_name: filename.slice(0, filename.lastIndexOf(".")),
    file_path: filename,
    create_by: Number.parseInt(createBy)
  })
  const file = await fileTable.findOne({
    where: {
      file_path: filename
    }
  })
  if (file){
    return file;
  }
}
