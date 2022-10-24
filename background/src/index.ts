import {
  runtime,
  storage,
  WebRequest,
  webRequest,
} from "webextension-polyfill";

let blocklist = [""];
let codeTime = 0;
let dailyGoal = 1;

Setup();

async function Setup() {
  await SyncStorage();
  storage.local.onChanged.addListener(SyncStorage);
  PollWakaTime();
}

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

function Block(): WebRequest.BlockingResponse | void {
  if (codeTime < dailyGoal)
    return {
      redirectUrl: runtime.getURL("block-page/dist/index.html"),
    };
}

async function SyncStorage() {
  blocklist = (await storage.local.get("blocklist"))["blocklist"] || blocklist;
  if (blocklist.length == 0) blocklist = [""];
  codeTime = (await storage.local.get("code-time"))["code-time"] || codeTime;
  dailyGoal =
    (await storage.local.get("daily-goal"))["daily-goal"] || dailyGoal;
  SetupBlocker();
}

async function PollWakaTime() {
  try {
    const data = await WakaTimeRequest("users/current/summaries?range=Today");
    codeTime = data.cummulative_total.seconds / 60;
    await storage.local.set({ "code-time": codeTime });
  } catch (e) {
    console.log("Waiting for API Key");
  }
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
