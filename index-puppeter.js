import puppeteer from 'puppeteer';
import fs from "fs";

const browserConfig = {
    headless: true, 
    devtools: false, 
    args:
        [
            "--autoplay-policy=user-gesture-required",
            "--disable-background-networking",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-breakpad",
            "--disable-client-side-phishing-detection",
            "--disable-component-update",
            "--disable-default-apps",
            "--disable-dev-shm-usage",
            "--disable-domain-reliability",
            "--disable-extensions",
            "--disable-features=AudioServiceOutOfProcess",
            "--disable-hang-monitor",
            "--disable-ipc-flooding-protection",
            "--disable-notifications",
            "--disable-offer-store-unmasked-wallet-cards",
            "--disable-popup-blocking",
            "--disable-print-preview",
            "--disable-prompt-on-repost",
            "--disable-renderer-backgrounding",
            "--disable-setuid-sandbox",
            "--disable-speech-api",
            "--disable-sync",
            "--hide-scrollbars",
            "--ignore-gpu-blacklist",
            "--metrics-recording-only",
            "--mute-audio",
            "--no-default-browser-check",
            "--no-first-run",
            "--no-pings",
            "--no-sandbox",
            "--no-zygote",
            "--password-store=basic",
            "--use-gl=swiftshader",
            "--use-mock-keychain",
        ],
};

const convertpdf = async (origem, destino) => {
    console.log(`Convertendo arquivo :${origem}`);
    console.log(`Destino: ${destino}`);

    const browser = await puppeteer.launch({ 
        ...browserConfig, 
        executablePath: '/usr/bin/google-chrome', });

    const template = fs.readFileSync(origem, "utf8", (err, data) => { 
        if (err) { 
            console.error(err); 
            return; 
        } 
        return data; 
    });
    
    const page = await browser.newPage(); 
    await page.setContent(template, { waitUntil: "domcontentloaded" });
    const pdf = await page.pdf(); 

    fs.writeFile(destino, pdf, (err) => { 
        if (err) console.log(err); 
        else { 
            console.log("Arquivo salvo com sucesso"); 
        } 
    }); 
    await page.close(); 
    await browser.close();

}; 
convertpdf(process.argv[2], process.argv[3]);