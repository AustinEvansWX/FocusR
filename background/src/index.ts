import {
  Storage,
  storage,
  WebRequest,
  webRequest,
} from "webextension-polyfill";

let blocklist = [""];
let codetime = 0;
let threshold = 10000;

SetupBlocker();
// PollWakaTime();
storage.local.onChanged.addListener(StorageUpdated);

function SetupBlocker() {
  if (webRequest.onBeforeRequest.hasListener(Block))
    webRequest.onBeforeRequest.removeListener(Block);

  webRequest.onBeforeRequest.addListener(
    Block,
    {
      urls: blocklist,
      types: ["main_frame"],
    },
    ["blocking"]
  );
}

storage.local.set({ blocklist: ["https://www.youtube.com/*"] });

function Block(): WebRequest.BlockingResponse | void {
  if (codetime < threshold) return { redirectUrl: "https://google.com" };
}

function StorageUpdated(details: Storage.StorageAreaOnChangedChangesType) {
  const data = details as {
    blocklist?: {
      oldValue: string[];
      newValue: string[];
    };

    threshold?: {
      oldValue: number;
      newValue: number;
    };
  };

  blocklist = data.blocklist?.newValue || blocklist;
  threshold = data.threshold?.newValue || threshold;

  if (data.blocklist) SetupBlocker();
}

async function PollWakaTime() {
  const data = await WakaTimeRequest("users/current/summaries?range=Today");
  codetime = data.cummulative_total.seconds;
  setTimeout(() => PollWakaTime(), 60e3);
}

async function WakaTimeRequest(endpoint: string) {
  const apiKey = (await storage.local.get("wakatime-api-key"))[
    "wakatime-api-key"
  ];

  if (!apiKey) throw "No API Key Set";

  const url = "https://wakatime.com/api/v1/" + endpoint;
  const headers = {
    authorization: "Basic " + btoa(apiKey),
  };

  const res = await fetch(url, { headers });

  return await res.json();
}
