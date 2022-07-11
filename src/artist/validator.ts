export default function validateData(data: unknown, method: "POST" | "PUT" = "POST"): boolean {
  let result = false;
  switch (method) {
    case "POST": {
      result = typeof data === "object" 
        && Object.keys(data).includes("name") 
        && Object.keys(data).includes("grammy")
        && typeof data[Object.keys(data).find(el => el === "name")] === "string"
        && typeof data[Object.keys(data).find(el => el === "grammy")] === "boolean"
        ? true 
        : false;
    }; break;
    case "PUT": {
      result = typeof data === "object" 
        && (Object.keys(data).includes("name") || Object.keys(data).includes("grammy"))
        && (typeof data[Object.keys(data).find(el => el === "name")] === "string" || typeof data[Object.keys(data).find(el => el === "grammy")] === "boolean") 
        ? true 
        : false;
      }; break;
      default: break;
    }
  return result; 
};