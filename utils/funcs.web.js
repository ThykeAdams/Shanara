import moment from "moment";
export async function getUploadData(context) {
  const { id } = context.params;
  const data = (await context.req.db.upload.getOne({ uid: id }))?._doc;
  if (!data) return null;
  if (data.file.expires < Date.now()) {
    data.file.url = await context.req.s3.presignedGetObject(context.req.config.s3.bucket, data.file.key);
    data.file.expires = Date.now() + 603800;
  }
  data.user.tokens = undefined;
  return JSON.parse(JSON.stringify(data));
}
export function TagEmbeds(str, user) {
  return str
    .replace(/{application.from}/g, "Chrome")
    .replace(/{user.name}/g, user?.username || "Cant Find User")
    .replace(/\{date\:(.*?)\}/g, (m, format) => {
      return moment(Date.now()).format(format);
    });
}
