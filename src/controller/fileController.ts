import redisClient from "../cache";
import fileTable from "../model/fileTable";

export async function addFileApi(event, req, res) {
  const { filename,auth } = req.file;

  await fileTable.create({
    file_name: filename.slice(0, filename.lastIndexOf(".")),
    file_path: filename,
    create_by: Number.parseInt(auth)
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
