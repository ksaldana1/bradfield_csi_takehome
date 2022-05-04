import net from "net";
import { formatInTimeZone as _formatInTimeZone } from "date-fns-tz";

const createResponse = (rawHttpRequest: Buffer): string => {
  const timeZone = findTimeZone(rawHttpRequest.toString());
  const timeDisplay = formatInTimeZone(new Date(), timeZone, "hh:mm:ss");
  return `
  HTTP/1.1 200 OK
  Content-Length: ${timeDisplay.length}
  Content-Type: text/plain; charset=utf-8

  ${timeDisplay}
  `;
};

const listener: (socket: net.Socket) => void = (socket) => {
  socket.on("data", (req) => {
    const res = createResponse(req);
    socket.write(res);
    socket.end();
  });
};

const server = net.createServer(listener);

server.on("error", (err) => {
  console.log("err", err.message);
  throw err;
});

const PORT = 5555;

server.listen(PORT, () => {
  console.log(`server bound to port ${PORT}`);
});

const findTimeZone = (res: string): any => {
  const regex = /timezone=(.*)/;
  const match = res.match(regex);
  if (match?.length && match[1]) {
    return match[1]?.split(" ")[0];
  }
  return "UTC";
};

const formatInTimeZone = (
  ...params: Parameters<typeof _formatInTimeZone>
): string => {
  try {
    return _formatInTimeZone(...params);
  } catch {
    // default to utc if given bad timezone
    return _formatInTimeZone(params[0], "UTC", params[2]);
  }
};
