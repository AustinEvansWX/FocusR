import { storage, WebRequest, webRequest } from "webextension-polyfill";

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
      redirectUrl:
        "data:text/html;charset=utf-8;base64,PGh0bWw+DQo8aGVhZD4NCjxzdHlsZT4NCkBpbXBvcnQgdXJsKCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBvcHBpbnM6d2dodEA0MDA7NTAwOzYwMDs3MDA7ODAwJmRpc3BsYXk9c3dhcCIpOw0KDQpodG1sLA0KYm9keSB7DQogIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMDBkZWcsICMzYjQyNTIsICMyZjM0NDEpOw0KICBjb2xvcjogd2hpdGU7DQogIGZvbnQtd2VpZ2h0OiA2MDA7DQogIG1hcmdpbjogMDsNCiAgd2lkdGg6IDEwMCU7DQogIGhlaWdodDogMTAwJTsNCiAgcGFkZGluZzogMDsNCiAgZm9udC1mYW1pbHk6ICJQb3BwaW5zIiwgc2Fucy1zZXJpZjsNCn0NCg0KaDEgew0KcG9zaXRpb246IGFic29sdXRlOw0KdG9wOiA1MCU7DQpsZWZ0OiA1MCU7DQp0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTsNCn0NCjwvc3R5bGU+DQo8L2hlYWQ+DQo8Ym9keT4NCjxoMT5LZWVwIG9uIGNvZGluZyE8L2gxPg0KPC9ib2R5Pg0KPC9odG1sPg==",
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
