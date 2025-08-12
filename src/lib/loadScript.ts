const defaultScriptUrl = "https://editor.unlayer.com/embed.js?2";

let loaded = false;
let loadingPromise: Promise<void> | null = null;

const isScriptInjected = (scriptUrl: string) => {
  return Array.from(document.querySelectorAll("script")).some((script) =>
    script.src.includes(scriptUrl)
  );
};

export function loadScript(
  scriptUrl: string = defaultScriptUrl
): Promise<void> {
  if (loaded) {
    return Promise.resolve();
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  if (isScriptInjected(scriptUrl)) {
    loaded = true;
    return Promise.resolve();
  }

  loadingPromise = new Promise<void>((resolve, reject) => {
    const embedScript = document.createElement("script");
    embedScript.src = scriptUrl;
    embedScript.onload = () => {
      loaded = true;
      resolve();
    };
    embedScript.onerror = () => {
      reject(new Error(`Failed to load script: ${scriptUrl}`));
    };
    document.head.appendChild(embedScript);
  });

  return loadingPromise;
}
