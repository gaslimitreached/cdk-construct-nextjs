import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/server-adapter.js
import fs2 from "node:fs";
import path2 from "node:path";

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/request.js
import http from "node:http";
var IncomingMessage = class extends http.IncomingMessage {
  constructor({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: true,
      readable: false,
      remoteAddress,
      address: () => ({ port: 443 }),
      end: Function.prototype,
      destroy: Function.prototype
    });
    if (typeof headers["content-length"] === "undefined") {
      headers["content-length"] = Buffer.byteLength(body).toString();
    }
    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers,
      body,
      url
    });
    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }
};

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/response.js
import http2 from "node:http";
var headerEnd = "\r\n\r\n";
var BODY = Symbol();
var HEADERS = Symbol();
function getString(data) {
  if (Buffer.isBuffer(data)) {
    return data.toString("utf8");
  } else if (typeof data === "string") {
    return data;
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}
function addData(stream, data) {
  if (Buffer.isBuffer(data) || typeof data === "string" || data instanceof Uint8Array) {
    stream[BODY].push(Buffer.from(data));
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}
var ServerResponse = class extends http2.ServerResponse {
  static from(res) {
    const response = new ServerResponse(res);
    response.statusCode = res.statusCode;
    response[HEADERS] = res.headers;
    response[BODY] = [Buffer.from(res.body)];
    response.end();
    return response;
  }
  static body(res) {
    return Buffer.concat(res[BODY]);
  }
  static headers(res) {
    const headers = typeof res.getHeaders === "function" ? res.getHeaders() : res._headers;
    return Object.assign(headers, res[HEADERS]);
  }
  get headers() {
    return this[HEADERS];
  }
  setHeader(key, value) {
    if (this._wroteHeader) {
      this[HEADERS][key] = value;
    } else {
      super.setHeader(key, value);
    }
  }
  writeHead(statusCode, reason, obj) {
    const headers = typeof reason === "string" ? obj : reason;
    for (const name in headers) {
      this.setHeader(name, headers[name]);
      if (!this._wroteHeader) {
        break;
      }
    }
    super.writeHead(statusCode, reason, obj);
  }
  constructor({ method }) {
    super({ method });
    this[BODY] = [];
    this[HEADERS] = {};
    this.useChunkedEncodingByDefault = false;
    this.chunkedEncoding = false;
    this._header = "";
    this.assignSocket({
      _writableState: {},
      writable: true,
      on: Function.prototype,
      removeListener: Function.prototype,
      destroy: Function.prototype,
      cork: Function.prototype,
      uncork: Function.prototype,
      write: (data, encoding, cb) => {
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (this._header === "" || this._wroteHeader) {
          addData(this, data);
        } else {
          const string = getString(data);
          const index = string.indexOf(headerEnd);
          if (index !== -1) {
            const remainder = string.slice(index + headerEnd.length);
            if (remainder) {
              addData(this, remainder);
            }
            this._wroteHeader = true;
          }
        }
        if (typeof cb === "function") {
          cb();
        }
      }
    });
    this.once("finish", () => {
      this.emit("close");
    });
  }
};

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/server-adapter.js
import NextServer from "next/dist/server/next-server.js";

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/util.js
import fs from "node:fs";
import path from "node:path";
function loadConfig(nextDir2) {
  const filePath = path.join(nextDir2, "required-server-files.json");
  const json = fs.readFileSync(filePath, "utf-8");
  const { config: config2 } = JSON.parse(json);
  return config2;
}

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "font/otf",
  "font/woff",
  "font/woff2",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType?.split(";")[0] ?? "";
  return commonBinaryMimeTypes.has(value);
}

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/logger.js
function debug(...args) {
  if (true) {
    console.log(...args);
  }
}

// ../../../../../.npm/_npx/a94ce00fc9d9ef90/node_modules/open-next/adapters/server-adapter.js
setNextjsServerWorkingDirectory();
var nextDir = path2.join(__dirname, ".next");
var config = loadConfig(nextDir);
var htmlPages = loadHtmlPages();
debug({ nextDir });
var requestHandler = new NextServer.default({
  hostname: "localhost",
  port: Number(process.env.PORT) || 3e3,
  conf: { ...config, compress: false },
  customServer: false,
  dev: false,
  dir: __dirname
}).getRequestHandler();
var eventParser = {
  apiv2: (event) => ({
    get method() {
      return event.requestContext.http.method;
    },
    get rawPath() {
      return event.rawPath;
    },
    get url() {
      const { rawPath, rawQueryString } = event;
      return rawQueryString.length > 0 ? `${rawPath}?${rawQueryString}` : rawPath;
    },
    get body() {
      const { body, isBase64Encoded } = event;
      if (Buffer.isBuffer(body)) {
        return body;
      } else if (typeof body === "string") {
        return Buffer.from(body, isBase64Encoded ? "base64" : "utf8");
      } else if (typeof body === "object") {
        return Buffer.from(JSON.stringify(body));
      }
      return Buffer.from("", "utf8");
    },
    get headers() {
      const { headers: rawHeaders, cookies } = event;
      const headers = {};
      if (Array.isArray(cookies)) {
        headers["cookie"] = cookies.join("; ");
      }
      for (const [key, value] of Object.entries(rawHeaders || {})) {
        headers[key.toLowerCase()] = value;
      }
      return headers;
    },
    get remoteAddress() {
      return event.requestContext.http.sourceIp;
    }
  }),
  cloudfront: (event) => ({
    get method() {
      return event.Records[0].cf.request.method;
    },
    get rawPath() {
      return event.Records[0].cf.request.uri;
    },
    get url() {
      const { uri, querystring } = event.Records[0].cf.request;
      return querystring.length > 0 ? `${uri}?${querystring}` : uri;
    },
    get body() {
      const { body } = event.Records[0].cf.request;
      if (!body) {
        return Buffer.from("", "utf8");
      }
      return body.encoding === "base64" ? Buffer.from(body.data, "base64") : Buffer.from(body.data, "utf8");
    },
    get headers() {
      const { headers: rawHeaders } = event.Records[0].cf.request;
      const headers = {};
      for (const [key, values] of Object.entries(rawHeaders)) {
        for (const { value } of values) {
          if (value) {
            headers[key] = value;
          }
        }
      }
      return headers;
    },
    get remoteAddress() {
      return event.Records[0].cf.request.clientIp;
    }
  })
};
async function handler(event) {
  debug("handler event", event);
  const isCloudFrontEvent = event.Records?.[0]?.cf;
  const parser = isCloudFrontEvent ? eventParser.cloudfront(event) : eventParser.apiv2(event);
  const reqProps = {
    method: parser.method,
    url: parser.url,
    headers: parser.headers,
    body: parser.body,
    remoteAddress: parser.remoteAddress
  };
  debug("IncomingMessage constructor props", reqProps);
  const req = new IncomingMessage(reqProps);
  const res = new ServerResponse({ method: reqProps.method });
  await processRequest(req, res);
  const statusCode = res.statusCode || 200;
  const headers = ServerResponse.headers(res);
  const isBase64Encoded = isBinaryContentType(Array.isArray(headers["content-type"]) ? headers["content-type"][0] : headers["content-type"]);
  const encoding = isBase64Encoded ? "base64" : "utf8";
  const body = ServerResponse.body(res).toString(encoding);
  debug("ServerResponse data", { statusCode, headers, isBase64Encoded, body });
  if (htmlPages.includes(parser.rawPath) && headers["cache-control"]) {
    headers["cache-control"] = "public, max-age=0, s-maxage=31536000, must-revalidate";
  }
  return isCloudFrontEvent ? statusCode === 404 ? formatCloudFrontFailoverResponse(event) : formatCloudFrontResponse({ statusCode, headers, isBase64Encoded, body }) : formatApiv2Response({ statusCode, headers, isBase64Encoded, body });
}
function setNextjsServerWorkingDirectory() {
  process.chdir(__dirname);
}
function loadHtmlPages() {
  const filePath = path2.join(nextDir, "server", "pages-manifest.json");
  const json = fs2.readFileSync(filePath, "utf-8");
  return Object.entries(JSON.parse(json)).filter(([_, value]) => value.endsWith(".html")).map(([key]) => key);
}
async function processRequest(req, res) {
  delete req.body;
  try {
    await requestHandler(req, res);
  } catch (e) {
    console.error("NextJS request failed.", e);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "Server failed to respond.",
      details: e
    }, null, 2));
  }
}
function formatApiv2Response({ statusCode, headers: rawHeaders, body, isBase64Encoded }) {
  const headers = {};
  Object.entries(rawHeaders).filter(([key]) => key.toLowerCase() !== "set-cookie").forEach(([key, value]) => {
    if (value === null) {
      headers[key] = "";
      return;
    }
    headers[key] = Array.isArray(value) ? value.join(", ") : value.toString();
  });
  const response = {
    statusCode,
    headers,
    cookies: rawHeaders["set-cookie"],
    body,
    isBase64Encoded
  };
  debug(response);
  return response;
}
function formatCloudFrontResponse({ statusCode, headers: rawHeaders, body, isBase64Encoded }) {
  const headers = {};
  Object.entries(rawHeaders).filter(([key]) => key.toLowerCase() !== "content-length").forEach(([key, value]) => {
    headers[key] = [
      ...headers[key] || [],
      ...Array.isArray(value) ? value.map((v) => ({ key, value: v })) : [{ key, value: value.toString() }]
    ];
  });
  const response = {
    status: statusCode.toString(),
    statusDescription: "OK",
    headers,
    bodyEncoding: isBase64Encoded ? "base64" : "text",
    body
  };
  debug(response);
  return response;
}
function formatCloudFrontFailoverResponse(event) {
  return event.Records[0].cf.request;
}
export {
  handler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLm5wbS9fbnB4L2E5NGNlMDBmYzlkOWVmOTAvbm9kZV9tb2R1bGVzL29wZW4tbmV4dC9hZGFwdGVycy9zZXJ2ZXItYWRhcHRlci5qcyIsICIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8ubnBtL19ucHgvYTk0Y2UwMGZjOWQ5ZWY5MC9ub2RlX21vZHVsZXMvb3Blbi1uZXh0L2FkYXB0ZXJzL3JlcXVlc3QuanMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLm5wbS9fbnB4L2E5NGNlMDBmYzlkOWVmOTAvbm9kZV9tb2R1bGVzL29wZW4tbmV4dC9hZGFwdGVycy9yZXNwb25zZS5qcyIsICIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8ubnBtL19ucHgvYTk0Y2UwMGZjOWQ5ZWY5MC9ub2RlX21vZHVsZXMvb3Blbi1uZXh0L2FkYXB0ZXJzL3V0aWwuanMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLm5wbS9fbnB4L2E5NGNlMDBmYzlkOWVmOTAvbm9kZV9tb2R1bGVzL29wZW4tbmV4dC9hZGFwdGVycy9iaW5hcnkuanMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLm5wbS9fbnB4L2E5NGNlMDBmYzlkOWVmOTAvbm9kZV9tb2R1bGVzL29wZW4tbmV4dC9hZGFwdGVycy9sb2dnZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgSW5jb21pbmdNZXNzYWdlIH0gZnJvbSBcIi4vcmVxdWVzdC5qc1wiO1xuaW1wb3J0IHsgU2VydmVyUmVzcG9uc2UgfSBmcm9tIFwiLi9yZXNwb25zZS5qc1wiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IE5leHRTZXJ2ZXIgZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbmV4dC1zZXJ2ZXIuanNcIjtcbmltcG9ydCB7IGxvYWRDb25maWcgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBpc0JpbmFyeUNvbnRlbnRUeXBlIH0gZnJvbSBcIi4vYmluYXJ5LmpzXCI7XG5pbXBvcnQgeyBkZWJ1ZyB9IGZyb20gXCIuL2xvZ2dlci5qc1wiO1xuc2V0TmV4dGpzU2VydmVyV29ya2luZ0RpcmVjdG9yeSgpO1xuY29uc3QgbmV4dERpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLm5leHRcIik7XG5jb25zdCBjb25maWcgPSBsb2FkQ29uZmlnKG5leHREaXIpO1xuY29uc3QgaHRtbFBhZ2VzID0gbG9hZEh0bWxQYWdlcygpO1xuZGVidWcoeyBuZXh0RGlyIH0pO1xuLy8gQ3JlYXRlIGEgTmV4dFNlcnZlclxuY29uc3QgcmVxdWVzdEhhbmRsZXIgPSBuZXcgTmV4dFNlcnZlci5kZWZhdWx0KHtcbiAgICBob3N0bmFtZTogXCJsb2NhbGhvc3RcIixcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVCkgfHwgMzAwMCxcbiAgICAvLyBOZXh0LmpzIGNvbXByZXNzaW9uIHNob3VsZCBiZSBkaXNhYmxlZCBiZWNhdXNlIG9mIGEgYnVnIGluIHRoZSBidW5kbGVkXG4gICAgLy8gYGNvbXByZXNzaW9uYCBwYWNrYWdlIFx1MjAxNCBodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsL25leHQuanMvaXNzdWVzLzExNjY5XG4gICAgY29uZjogeyAuLi5jb25maWcsIGNvbXByZXNzOiBmYWxzZSB9LFxuICAgIGN1c3RvbVNlcnZlcjogZmFsc2UsXG4gICAgZGV2OiBmYWxzZSxcbiAgICBkaXI6IF9fZGlybmFtZSxcbn0pLmdldFJlcXVlc3RIYW5kbGVyKCk7XG5jb25zdCBldmVudFBhcnNlciA9IHtcbiAgICBhcGl2MjogKGV2ZW50KSA9PiAoe1xuICAgICAgICBnZXQgbWV0aG9kKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnJlcXVlc3RDb250ZXh0Lmh0dHAubWV0aG9kO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcmF3UGF0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5yYXdQYXRoO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgdXJsKCkge1xuICAgICAgICAgICAgY29uc3QgeyByYXdQYXRoLCByYXdRdWVyeVN0cmluZyB9ID0gZXZlbnQ7XG4gICAgICAgICAgICByZXR1cm4gcmF3UXVlcnlTdHJpbmcubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgID8gYCR7cmF3UGF0aH0/JHtyYXdRdWVyeVN0cmluZ31gXG4gICAgICAgICAgICAgICAgOiByYXdQYXRoO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgYm9keSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgYm9keSwgaXNCYXNlNjRFbmNvZGVkIH0gPSBldmVudDtcbiAgICAgICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGJvZHksIGlzQmFzZTY0RW5jb2RlZCA/IFwiYmFzZTY0XCIgOiBcInV0ZjhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBCdWZmZXIuZnJvbShKU09OLnN0cmluZ2lmeShib2R5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oXCJcIiwgXCJ1dGY4XCIpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaGVhZGVycygpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaGVhZGVyczogcmF3SGVhZGVycywgY29va2llcyB9ID0gZXZlbnQ7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb29raWVzKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNbXCJjb29raWVcIl0gPSBjb29raWVzLmpvaW4oXCI7IFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHJhd0hlYWRlcnMgfHwge30pKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1trZXkudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcmVtb3RlQWRkcmVzcygpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5yZXF1ZXN0Q29udGV4dC5odHRwLnNvdXJjZUlwO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIGNsb3VkZnJvbnQ6IChldmVudCkgPT4gKHtcbiAgICAgICAgZ2V0IG1ldGhvZCgpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5SZWNvcmRzWzBdLmNmLnJlcXVlc3QubWV0aG9kO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcmF3UGF0aCgpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5SZWNvcmRzWzBdLmNmLnJlcXVlc3QudXJpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgdXJsKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1cmksIHF1ZXJ5c3RyaW5nIH0gPSBldmVudC5SZWNvcmRzWzBdLmNmLnJlcXVlc3Q7XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlzdHJpbmcubGVuZ3RoID4gMCA/IGAke3VyaX0/JHtxdWVyeXN0cmluZ31gIDogdXJpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgYm9keSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgYm9keSB9ID0gZXZlbnQuUmVjb3Jkc1swXS5jZi5yZXF1ZXN0O1xuICAgICAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKFwiXCIsIFwidXRmOFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBib2R5LmVuY29kaW5nID09PSBcImJhc2U2NFwiXG4gICAgICAgICAgICAgICAgPyBCdWZmZXIuZnJvbShib2R5LmRhdGEsIFwiYmFzZTY0XCIpXG4gICAgICAgICAgICAgICAgOiBCdWZmZXIuZnJvbShib2R5LmRhdGEsIFwidXRmOFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGhlYWRlcnMoKSB7XG4gICAgICAgICAgICBjb25zdCB7IGhlYWRlcnM6IHJhd0hlYWRlcnMgfSA9IGV2ZW50LlJlY29yZHNbMF0uY2YucmVxdWVzdDtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVzXSBvZiBPYmplY3QuZW50cmllcyhyYXdIZWFkZXJzKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyB2YWx1ZSB9IG9mIHZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCByZW1vdGVBZGRyZXNzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LlJlY29yZHNbMF0uY2YucmVxdWVzdC5jbGllbnRJcDtcbiAgICAgICAgfSxcbiAgICB9KSxcbn07XG4vLy8vLy8vLy8vLy8vXG4vLyBIYW5kbGVyIC8vXG4vLy8vLy8vLy8vLy8vXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgIGRlYnVnKFwiaGFuZGxlciBldmVudFwiLCBldmVudCk7XG4gICAgLy8gUGFyc2UgTGFtYmRhIGV2ZW50IGFuZCBjcmVhdGUgTmV4dC5qcyByZXF1ZXN0XG4gICAgY29uc3QgaXNDbG91ZEZyb250RXZlbnQgPSBldmVudC5SZWNvcmRzPy5bMF0/LmNmO1xuICAgIGNvbnN0IHBhcnNlciA9IGlzQ2xvdWRGcm9udEV2ZW50XG4gICAgICAgID8gZXZlbnRQYXJzZXIuY2xvdWRmcm9udChldmVudClcbiAgICAgICAgOiBldmVudFBhcnNlci5hcGl2MihldmVudCk7XG4gICAgY29uc3QgcmVxUHJvcHMgPSB7XG4gICAgICAgIG1ldGhvZDogcGFyc2VyLm1ldGhvZCxcbiAgICAgICAgdXJsOiBwYXJzZXIudXJsLFxuICAgICAgICBoZWFkZXJzOiBwYXJzZXIuaGVhZGVycyxcbiAgICAgICAgYm9keTogcGFyc2VyLmJvZHksXG4gICAgICAgIHJlbW90ZUFkZHJlc3M6IHBhcnNlci5yZW1vdGVBZGRyZXNzLFxuICAgIH07XG4gICAgZGVidWcoXCJJbmNvbWluZ01lc3NhZ2UgY29uc3RydWN0b3IgcHJvcHNcIiwgcmVxUHJvcHMpO1xuICAgIGNvbnN0IHJlcSA9IG5ldyBJbmNvbWluZ01lc3NhZ2UocmVxUHJvcHMpO1xuICAgIGNvbnN0IHJlcyA9IG5ldyBTZXJ2ZXJSZXNwb25zZSh7IG1ldGhvZDogcmVxUHJvcHMubWV0aG9kIH0pO1xuICAgIC8vIFByb2Nlc3MgTmV4dC5qcyByZXF1ZXN0XG4gICAgYXdhaXQgcHJvY2Vzc1JlcXVlc3QocmVxLCByZXMpO1xuICAgIC8vIEZvcm1hdCBOZXh0LmpzIHJlc3BvbnNlIHRvIExhbWJkYSByZXNwb25zZVxuICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMuc3RhdHVzQ29kZSB8fCAyMDA7XG4gICAgY29uc3QgaGVhZGVycyA9IFNlcnZlclJlc3BvbnNlLmhlYWRlcnMocmVzKTtcbiAgICBjb25zdCBpc0Jhc2U2NEVuY29kZWQgPSBpc0JpbmFyeUNvbnRlbnRUeXBlKEFycmF5LmlzQXJyYXkoaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSlcbiAgICAgICAgPyBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdWzBdXG4gICAgICAgIDogaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSk7XG4gICAgY29uc3QgZW5jb2RpbmcgPSBpc0Jhc2U2NEVuY29kZWQgPyBcImJhc2U2NFwiIDogXCJ1dGY4XCI7XG4gICAgY29uc3QgYm9keSA9IFNlcnZlclJlc3BvbnNlLmJvZHkocmVzKS50b1N0cmluZyhlbmNvZGluZyk7XG4gICAgZGVidWcoXCJTZXJ2ZXJSZXNwb25zZSBkYXRhXCIsIHsgc3RhdHVzQ29kZSwgaGVhZGVycywgaXNCYXNlNjRFbmNvZGVkLCBib2R5IH0pO1xuICAgIC8vIFdPUktBUk9VTkQ6IGBOZXh0U2VydmVyYCBkb2VzIG5vdCBzZXQgY2FjaGUgcmVzcG9uc2UgaGVhZGVycyBmb3IgSFRNTCBwYWdlcyBcdTIwMTQgaHR0cHM6Ly9naXRodWIuY29tL3NlcnZlcmxlc3Mtc3RhY2svb3Blbi1uZXh0I3dvcmthcm91bmQtbmV4dHNlcnZlci1kb2VzLW5vdC1zZXQtY2FjaGUtcmVzcG9uc2UtaGVhZGVycy1mb3ItaHRtbC1wYWdlc1xuICAgIGlmIChodG1sUGFnZXMuaW5jbHVkZXMocGFyc2VyLnJhd1BhdGgpICYmIGhlYWRlcnNbXCJjYWNoZS1jb250cm9sXCJdKSB7XG4gICAgICAgIGhlYWRlcnNbXCJjYWNoZS1jb250cm9sXCJdID1cbiAgICAgICAgICAgIFwicHVibGljLCBtYXgtYWdlPTAsIHMtbWF4YWdlPTMxNTM2MDAwLCBtdXN0LXJldmFsaWRhdGVcIjtcbiAgICB9XG4gICAgcmV0dXJuIGlzQ2xvdWRGcm9udEV2ZW50XG4gICAgICAgID8gLy8gV09SS0FST1VORDogcHVibGljLyBzdGF0aWMgZmlsZXMgc2VydmVkIGJ5IHRoZSBzZXJ2ZXIgZnVuY3Rpb24gKEFXUyBzcGVjaWZpYykgXHUyMDE0IGh0dHBzOi8vZ2l0aHViLmNvbS9zZXJ2ZXJsZXNzLXN0YWNrL29wZW4tbmV4dCN3b3JrYXJvdW5kLXB1YmxpYy1zdGF0aWMtZmlsZXMtc2VydmVkLWJ5LXRoZS1zZXJ2ZXItZnVuY3Rpb24tYXdzLXNwZWNpZmljXG4gICAgICAgICAgICBzdGF0dXNDb2RlID09PSA0MDRcbiAgICAgICAgICAgICAgICA/IGZvcm1hdENsb3VkRnJvbnRGYWlsb3ZlclJlc3BvbnNlKGV2ZW50KVxuICAgICAgICAgICAgICAgIDogZm9ybWF0Q2xvdWRGcm9udFJlc3BvbnNlKHsgc3RhdHVzQ29kZSwgaGVhZGVycywgaXNCYXNlNjRFbmNvZGVkLCBib2R5IH0pXG4gICAgICAgIDogZm9ybWF0QXBpdjJSZXNwb25zZSh7IHN0YXR1c0NvZGUsIGhlYWRlcnMsIGlzQmFzZTY0RW5jb2RlZCwgYm9keSB9KTtcbn1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEhlbHBlciBmdW5jdGlvbnMgLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIHNldE5leHRqc1NlcnZlcldvcmtpbmdEaXJlY3RvcnkoKSB7XG4gICAgLy8gV09SS0FST1VORDogU2V0IGBOZXh0U2VydmVyYCB3b3JraW5nIGRpcmVjdG9yeSAoQVdTIHNwZWNpZmljKSBcdTIwMTQgaHR0cHM6Ly9naXRodWIuY29tL3NlcnZlcmxlc3Mtc3RhY2svb3Blbi1uZXh0I3dvcmthcm91bmQtc2V0LW5leHRzZXJ2ZXItd29ya2luZy1kaXJlY3RvcnktYXdzLXNwZWNpZmljXG4gICAgcHJvY2Vzcy5jaGRpcihfX2Rpcm5hbWUpO1xufVxuZnVuY3Rpb24gbG9hZEh0bWxQYWdlcygpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihuZXh0RGlyLCBcInNlcnZlclwiLCBcInBhZ2VzLW1hbmlmZXN0Lmpzb25cIik7XG4gICAgY29uc3QganNvbiA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoSlNPTi5wYXJzZShqc29uKSlcbiAgICAgICAgLmZpbHRlcigoW18sIHZhbHVlXSkgPT4gdmFsdWUuZW5kc1dpdGgoXCIuaHRtbFwiKSlcbiAgICAgICAgLm1hcCgoW2tleV0pID0+IGtleSk7XG59XG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzUmVxdWVzdChyZXEsIHJlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAvLyBOZXh0LmpzIGRvZXNuJ3QgcGFyc2UgYm9keSBpZiB0aGUgcHJvcGVydHkgZXhpc3RzXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RvdWdtb3Njcm9wL3NlcnZlcmxlc3MtaHR0cC9pc3N1ZXMvMjI3XG4gICAgZGVsZXRlIHJlcS5ib2R5O1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHJlcXVlc3RIYW5kbGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5leHRKUyByZXF1ZXN0IGZhaWxlZC5cIiwgZSk7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VydmVyIGZhaWxlZCB0byByZXNwb25kLlwiLFxuICAgICAgICAgICAgZGV0YWlsczogZSxcbiAgICAgICAgfSwgbnVsbCwgMikpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZvcm1hdEFwaXYyUmVzcG9uc2UoeyBzdGF0dXNDb2RlLCBoZWFkZXJzOiByYXdIZWFkZXJzLCBib2R5LCBpc0Jhc2U2NEVuY29kZWQsIH0pIHtcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG4gICAgT2JqZWN0LmVudHJpZXMocmF3SGVhZGVycylcbiAgICAgICAgLmZpbHRlcigoW2tleV0pID0+IGtleS50b0xvd2VyQ2FzZSgpICE9PSBcInNldC1jb29raWVcIilcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGhlYWRlcnNba2V5XSA9IFwiXCI7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaGVhZGVyc1trZXldID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKFwiLCBcIikgOiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBzdGF0dXNDb2RlLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBjb29raWVzOiByYXdIZWFkZXJzW1wic2V0LWNvb2tpZVwiXSxcbiAgICAgICAgYm9keSxcbiAgICAgICAgaXNCYXNlNjRFbmNvZGVkLFxuICAgIH07XG4gICAgZGVidWcocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbn1cbmZ1bmN0aW9uIGZvcm1hdENsb3VkRnJvbnRSZXNwb25zZSh7IHN0YXR1c0NvZGUsIGhlYWRlcnM6IHJhd0hlYWRlcnMsIGJvZHksIGlzQmFzZTY0RW5jb2RlZCwgfSkge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcbiAgICBPYmplY3QuZW50cmllcyhyYXdIZWFkZXJzKVxuICAgICAgICAuZmlsdGVyKChba2V5XSkgPT4ga2V5LnRvTG93ZXJDYXNlKCkgIT09IFwiY29udGVudC1sZW5ndGhcIilcbiAgICAgICAgLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBoZWFkZXJzW2tleV0gPSBbXG4gICAgICAgICAgICAuLi4oaGVhZGVyc1trZXldIHx8IFtdKSxcbiAgICAgICAgICAgIC4uLihBcnJheS5pc0FycmF5KHZhbHVlKVxuICAgICAgICAgICAgICAgID8gdmFsdWUubWFwKCh2KSA9PiAoeyBrZXksIHZhbHVlOiB2IH0pKVxuICAgICAgICAgICAgICAgIDogW3sga2V5LCB2YWx1ZTogdmFsdWUudG9TdHJpbmcoKSB9XSksXG4gICAgICAgIF07XG4gICAgfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIHN0YXR1czogc3RhdHVzQ29kZS50b1N0cmluZygpLFxuICAgICAgICBzdGF0dXNEZXNjcmlwdGlvbjogXCJPS1wiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5RW5jb2Rpbmc6IGlzQmFzZTY0RW5jb2RlZCA/IFwiYmFzZTY0XCIgOiBcInRleHRcIixcbiAgICAgICAgYm9keSxcbiAgICB9O1xuICAgIGRlYnVnKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5mdW5jdGlvbiBmb3JtYXRDbG91ZEZyb250RmFpbG92ZXJSZXNwb25zZShldmVudCkge1xuICAgIHJldHVybiBldmVudC5SZWNvcmRzWzBdLmNmLnJlcXVlc3Q7XG59XG4iLCAiLy8gQHRzLW5vY2hlY2tcbmltcG9ydCBodHRwIGZyb20gXCJub2RlOmh0dHBcIjtcbmV4cG9ydCBjbGFzcyBJbmNvbWluZ01lc3NhZ2UgZXh0ZW5kcyBodHRwLkluY29taW5nTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IoeyBtZXRob2QsIHVybCwgaGVhZGVycywgYm9keSwgcmVtb3RlQWRkcmVzcywgfSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBlbmNyeXB0ZWQ6IHRydWUsXG4gICAgICAgICAgICByZWFkYWJsZTogZmFsc2UsXG4gICAgICAgICAgICByZW1vdGVBZGRyZXNzLFxuICAgICAgICAgICAgYWRkcmVzczogKCkgPT4gKHsgcG9ydDogNDQzIH0pLFxuICAgICAgICAgICAgZW5kOiBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICAgICBkZXN0cm95OiBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodHlwZW9mIGhlYWRlcnNbXCJjb250ZW50LWxlbmd0aFwiXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtbGVuZ3RoXCJdID0gQnVmZmVyLmJ5dGVMZW5ndGgoYm9keSkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgICAgICAgIGlwOiByZW1vdGVBZGRyZXNzLFxuICAgICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICBodHRwVmVyc2lvbjogXCIxLjFcIixcbiAgICAgICAgICAgIGh0dHBWZXJzaW9uTWFqb3I6IFwiMVwiLFxuICAgICAgICAgICAgaHR0cFZlcnNpb25NaW5vcjogXCIxXCIsXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3JlYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnB1c2goYm9keSk7XG4gICAgICAgICAgICB0aGlzLnB1c2gobnVsbCk7XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwgIi8vIEB0cy1ub2NoZWNrXG5pbXBvcnQgaHR0cCBmcm9tIFwibm9kZTpodHRwXCI7XG5jb25zdCBoZWFkZXJFbmQgPSBcIlxcclxcblxcclxcblwiO1xuY29uc3QgQk9EWSA9IFN5bWJvbCgpO1xuY29uc3QgSEVBREVSUyA9IFN5bWJvbCgpO1xuZnVuY3Rpb24gZ2V0U3RyaW5nKGRhdGEpIHtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKFwidXRmOFwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHJlc3BvbnNlLndyaXRlKCkgb2YgdW5leHBlY3RlZCB0eXBlOiAke3R5cGVvZiBkYXRhfWApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZERhdGEoc3RyZWFtLCBkYXRhKSB7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgICB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgICBkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICBzdHJlYW1bQk9EWV0ucHVzaChCdWZmZXIuZnJvbShkYXRhKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHJlc3BvbnNlLndyaXRlKCkgb2YgdW5leHBlY3RlZCB0eXBlOiAke3R5cGVvZiBkYXRhfWApO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJSZXNwb25zZSBleHRlbmRzIGh0dHAuU2VydmVyUmVzcG9uc2Uge1xuICAgIHN0YXRpYyBmcm9tKHJlcykge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBTZXJ2ZXJSZXNwb25zZShyZXMpO1xuICAgICAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzLnN0YXR1c0NvZGU7XG4gICAgICAgIHJlc3BvbnNlW0hFQURFUlNdID0gcmVzLmhlYWRlcnM7XG4gICAgICAgIHJlc3BvbnNlW0JPRFldID0gW0J1ZmZlci5mcm9tKHJlcy5ib2R5KV07XG4gICAgICAgIHJlc3BvbnNlLmVuZCgpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIHN0YXRpYyBib2R5KHJlcykge1xuICAgICAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChyZXNbQk9EWV0pO1xuICAgIH1cbiAgICBzdGF0aWMgaGVhZGVycyhyZXMpIHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IHR5cGVvZiByZXMuZ2V0SGVhZGVycyA9PT0gXCJmdW5jdGlvblwiID8gcmVzLmdldEhlYWRlcnMoKSA6IHJlcy5faGVhZGVycztcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oaGVhZGVycywgcmVzW0hFQURFUlNdKTtcbiAgICB9XG4gICAgZ2V0IGhlYWRlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW0hFQURFUlNdO1xuICAgIH1cbiAgICBzZXRIZWFkZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fd3JvdGVIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXNbSEVBREVSU11ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuc2V0SGVhZGVyKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdyaXRlSGVhZChzdGF0dXNDb2RlLCByZWFzb24sIG9iaikge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdHlwZW9mIHJlYXNvbiA9PT0gXCJzdHJpbmdcIiA/IG9iaiA6IHJlYXNvbjtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SGVhZGVyKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl93cm90ZUhlYWRlcikge1xuICAgICAgICAgICAgICAgIC8vIHdlIG9ubHkgbmVlZCB0byBpbml0aWF0ZSBzdXBlci5oZWFkZXJzIG9uY2VcbiAgICAgICAgICAgICAgICAvLyB3cml0ZUhlYWQgd2lsbCBhZGQgdGhlIG90aGVyIGhlYWRlcnMgaXRzZWxmXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIud3JpdGVIZWFkKHN0YXR1c0NvZGUsIHJlYXNvbiwgb2JqKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoeyBtZXRob2QgfSkge1xuICAgICAgICBzdXBlcih7IG1ldGhvZCB9KTtcbiAgICAgICAgdGhpc1tCT0RZXSA9IFtdO1xuICAgICAgICB0aGlzW0hFQURFUlNdID0ge307XG4gICAgICAgIHRoaXMudXNlQ2h1bmtlZEVuY29kaW5nQnlEZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2h1bmtlZEVuY29kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IFwiXCI7XG4gICAgICAgIHRoaXMuYXNzaWduU29ja2V0KHtcbiAgICAgICAgICAgIF93cml0YWJsZVN0YXRlOiB7fSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgb246IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyOiBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICAgICBkZXN0cm95OiBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICAgICBjb3JrOiBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICAgICB1bmNvcms6IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICAgICAgICAgIHdyaXRlOiAoZGF0YSwgZW5jb2RpbmcsIGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiID0gZW5jb2Rpbmc7XG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2hlYWRlciA9PT0gXCJcIiB8fCB0aGlzLl93cm90ZUhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICBhZGREYXRhKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gZ2V0U3RyaW5nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHN0cmluZy5pbmRleE9mKGhlYWRlckVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHN0cmluZy5zbGljZShpbmRleCArIGhlYWRlckVuZC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZERhdGEodGhpcywgcmVtYWluZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyb3RlSGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbmNlKFwiZmluaXNoXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNsb3NlXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbmZpZyhuZXh0RGlyKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4obmV4dERpciwgXCJyZXF1aXJlZC1zZXJ2ZXItZmlsZXMuanNvblwiKTtcbiAgICBjb25zdCBqc29uID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCBcInV0Zi04XCIpO1xuICAgIGNvbnN0IHsgY29uZmlnIH0gPSBKU09OLnBhcnNlKGpzb24pO1xuICAgIHJldHVybiBjb25maWc7XG59XG4iLCAiY29uc3QgY29tbW9uQmluYXJ5TWltZVR5cGVzID0gbmV3IFNldChbXG4gICAgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIixcbiAgICAvLyBEb2NzXG4gICAgXCJhcHBsaWNhdGlvbi9lcHViK3ppcFwiLFxuICAgIFwiYXBwbGljYXRpb24vbXN3b3JkXCIsXG4gICAgXCJhcHBsaWNhdGlvbi9wZGZcIixcbiAgICBcImFwcGxpY2F0aW9uL3J0ZlwiLFxuICAgIFwiYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9va1wiLFxuICAgIFwiYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsXCIsXG4gICAgXCJhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludFwiLFxuICAgIFwiYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvblwiLFxuICAgIFwiYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXRcIixcbiAgICBcImFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50XCIsXG4gICAgLy8gRm9udHNcbiAgICBcImZvbnQvb3RmXCIsXG4gICAgXCJmb250L3dvZmZcIixcbiAgICBcImZvbnQvd29mZjJcIixcbiAgICAvLyBJbWFnZXNcbiAgICBcImltYWdlL2JtcFwiLFxuICAgIFwiaW1hZ2UvZ2lmXCIsXG4gICAgXCJpbWFnZS9qcGVnXCIsXG4gICAgXCJpbWFnZS9wbmdcIixcbiAgICBcImltYWdlL3RpZmZcIixcbiAgICBcImltYWdlL3ZuZC5taWNyb3NvZnQuaWNvblwiLFxuICAgIFwiaW1hZ2Uvd2VicFwiLFxuICAgIC8vIEF1ZGlvXG4gICAgXCJhdWRpby8zZ3BwXCIsXG4gICAgXCJhdWRpby9hYWNcIixcbiAgICBcImF1ZGlvL2Jhc2ljXCIsXG4gICAgXCJhdWRpby9tcGVnXCIsXG4gICAgXCJhdWRpby9vZ2dcIixcbiAgICBcImF1ZGlvL3dhdmF1ZGlvL3dlYm1cIixcbiAgICBcImF1ZGlvL3gtYWlmZlwiLFxuICAgIFwiYXVkaW8veC1taWRpXCIsXG4gICAgXCJhdWRpby94LXdhdlwiLFxuICAgIC8vIFZpZGVvXG4gICAgXCJ2aWRlby8zZ3BwXCIsXG4gICAgXCJ2aWRlby9tcDJ0XCIsXG4gICAgXCJ2aWRlby9tcGVnXCIsXG4gICAgXCJ2aWRlby9vZ2dcIixcbiAgICBcInZpZGVvL3F1aWNrdGltZVwiLFxuICAgIFwidmlkZW8vd2VibVwiLFxuICAgIFwidmlkZW8veC1tc3ZpZGVvXCIsXG4gICAgLy8gQXJjaGl2ZXNcbiAgICBcImFwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZVwiLFxuICAgIFwiYXBwbGljYXRpb24vdm5kLmFwcGxlLmluc3RhbGxlcit4bWxcIixcbiAgICBcImFwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZFwiLFxuICAgIFwiYXBwbGljYXRpb24veC1hcHBsZS1kaXNraW1hZ2VcIixcbiAgICBcImFwcGxpY2F0aW9uL3gtYnppcFwiLFxuICAgIFwiYXBwbGljYXRpb24veC1iemlwMlwiLFxuICAgIFwiYXBwbGljYXRpb24veC1nemlwXCIsXG4gICAgXCJhcHBsaWNhdGlvbi94LWphdmEtYXJjaGl2ZVwiLFxuICAgIFwiYXBwbGljYXRpb24veC1yYXItY29tcHJlc3NlZFwiLFxuICAgIFwiYXBwbGljYXRpb24veC10YXJcIixcbiAgICBcImFwcGxpY2F0aW9uL3gtemlwXCIsXG4gICAgXCJhcHBsaWNhdGlvbi96aXBcIixcbl0pO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmluYXJ5Q29udGVudFR5cGUoY29udGVudFR5cGUpIHtcbiAgICBpZiAoIWNvbnRlbnRUeXBlKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgdmFsdWUgPSBjb250ZW50VHlwZT8uc3BsaXQoXCI7XCIpWzBdID8/IFwiXCI7XG4gICAgcmV0dXJuIGNvbW1vbkJpbmFyeU1pbWVUeXBlcy5oYXModmFsdWUpO1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBkZWJ1ZyguLi5hcmdzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk9QRU5fTkVYVF9ERUJVRykge1xuICAgICAgICBjb25zb2xlLmxvZyguLi5hcmdzKTtcbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7QUFBQSxPQUFPQSxTQUFRO0FBQ2Ys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
