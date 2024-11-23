export default function extractPublicIdFromUrl(url:string) {
  const regex = /\/v\d+\/(.+?)\./;  // Matches the public_id (before the file extension)
  const match = url.match(regex);
  return match ? match[1] : null;
}