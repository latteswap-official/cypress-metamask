const puppeteer = require('./puppeteer');

const { pageElements } = require('../pages/metamask/page');
const {
  welcomePageElements,
  firstTimeFlowPageElements,
  metametricsPageElements,
  firstTimeFlowFormPageElements,
  endOfFlowPageElements,
} = require('../pages/metamask/first-time-flow-page');
const { mainPageElements } = require('../pages/metamask/main-page');
const { unlockPageElements } = require('../pages/metamask/unlock-page');
const {
  notificationPageElements,
  permissionsPageElements,
  confirmPageElements,
} = require('../pages/metamask/notification-page');
const { setNetwork, getNetwork } = require('./helpers');

let walletAddress;

module.exports = {
  walletAddress: () => {
    return walletAddress;
  },
  // workaround for metamask random blank page on first run
  async fixBlankPage() {
    await puppeteer.metamaskWindow().waitForTimeout(1000);
    for (let times = 0; times < 5; times++) {
      if (
        (await puppeteer.metamaskWindow().$(welcomePageElements.app)) === null
      ) {
        await puppeteer.metamaskWindow().reload();
        await puppeteer.metamaskWindow().waitForTimeout(2000);
      } else {
        break;
      }
    }
  },
  async changeAccount(number) {
    await puppeteer.waitAndClick(mainPageElements.accountMenu.button)
    await puppeteer.changeAccount(number)
  },

  async importMetaMaskWalletUsingPrivateKey(key) {
    await puppeteer.waitAndClick(mainPageElements.accountMenu.button);
    await puppeteer.waitAndClickByText('.account-menu__item__text', 'Import Account');
    await puppeteer.waitAndType('#private-key-box', key);
    await puppeteer.metamaskWindow().waitForTimeout(500);
    await puppeteer.waitAndClickByText(mainPageElements.accountMenu.importButton, 'Import');
    await puppeteer.metamaskWindow().waitForTimeout(2000);
    return true;
},

  async confirmWelcomePage() {
    await module.exports.fixBlankPage();
    await puppeteer.waitAndClick(welcomePageElements.confirmButton);
    return true;
  },

  async unlock(password) {
    await module.exports.fixBlankPage();
    await puppeteer.waitAndType(unlockPageElements.passwordInput, password);
    await puppeteer.waitAndClick(unlockPageElements.unlockButton);
    return true;
  },
  async importWallet(secretWords, password) {
    await puppeteer.waitAndClick(firstTimeFlowPageElements.importWalletButton);
    await puppeteer.waitAndClick(metametricsPageElements.optOutAnalyticsButton);
    await puppeteer.waitAndType(
      firstTimeFlowFormPageElements.secretWordsInput,
      secretWords,
    );
    await puppeteer.waitAndType(
      firstTimeFlowFormPageElements.passwordInput,
      password,
    );
    await puppeteer.waitAndType(
      firstTimeFlowFormPageElements.confirmPasswordInput,
      password,
    );
    await puppeteer.waitAndClick(firstTimeFlowFormPageElements.termsCheckbox);
    await puppeteer.waitAndClick(firstTimeFlowFormPageElements.importButton);

    await puppeteer.waitFor(pageElements.loadingSpinner);
    await puppeteer.waitAndClick(endOfFlowPageElements.allDoneButton);
    await puppeteer.waitFor(mainPageElements.walletOverview);

    // close popup if present
    if (
      (await puppeteer.metamaskWindow().$(mainPageElements.popup.container)) !==
      null
    ) {
      await puppeteer.waitAndClick(mainPageElements.popup.closeButton);
    }
    return true;
  },



  async changeNetwork(network) {
    setNetwork(network);
    console.log("Network is:",network);
    await puppeteer.waitAndClick(mainPageElements.networkSwitcher.button);
    if (network === 'main' || network === 'mainnet') {
      await puppeteer.waitAndClick(
        mainPageElements.networkSwitcher.networkButton(0),
      );
    } else if (network === 'ropsten') {
      await puppeteer.waitAndClick(
        mainPageElements.networkSwitcher.networkButton(1),
      );
    } else if (network === 'kovan') {
      await puppeteer.waitAndClick(
        mainPageElements.networkSwitcher.networkButton(2),
      );
    } else if (network === 'rinkeby') {
      await puppeteer.waitAndClick(
        mainPageElements.networkSwitcher.networkButton(3),
      );
    } else if (network === 'goerli') {
      await puppeteer.waitAndClick(
        mainPageElements.networkSwitcher.networkButton(4),
      );
    } else if (network === 'localhost') {
      await puppeteer.waitAndClick(
        mainPageElements.networkSwitcher.networkButton(5),
      );
    } else if (network === 'ftm') {
      const string = mainPageElements.networkSwitcher.networkNameXpath
      await puppeteer.waitXpathAndClick(
        string.replace(/networkName/g,process.env.FTM_NETWORK_NAME)
      );
    
    } else if (network === 'bsc') {
      const string = mainPageElements.networkSwitcher.networkNameXpath
      await puppeteer.waitXpathAndClick(
        string.replace(/networkName/g,process.env.NETWORK_NAME)
      );
     
    } else if (typeof network === 'object') {
      await puppeteer.waitAndClickByText(
        mainPageElements.networkSwitcher.dropdownMenuItem,
        network.networkName,
      );
    } else {
      await puppeteer.waitAndClickByText(
        mainPageElements.networkSwitcher.dropdownMenuItem,
        network,
      );
    }
    return true;
  },

async addFTMNetwork(network) {
  if (
    process.env.FTM_NETWORK_NAME &&
    process.env.FTM_RPC_URL &&
    process.env.FTM_CHAIN_ID
  ) {
    network = {
      networkName: process.env.FTM_NETWORK_NAME,
      rpcUrl: process.env.FTM_RPC_URL,
      chainId: process.env.FTM_CHAIN_ID,
      symbol: process.env.FTM_SYMBOL,
      blockExplorer: process.env.BLOCK_EXPLORER,
      isTestnet: process.env.IS_TESTNET,
    };
  }
  console.log("add FTM Network inprogress")
  await module.exports.inputNetworkInfo(network);
  return true;
},

  async addNetwork(network) {
    if (
      process.env.NETWORK_NAME &&
      process.env.RPC_URL &&
      process.env.CHAIN_ID
    ) {
      network = {
        networkName: process.env.NETWORK_NAME,
        rpcUrl: process.env.RPC_URL,
        chainId: process.env.CHAIN_ID,
        symbol: process.env.SYMBOL,
        blockExplorer: process.env.BLOCK_EXPLORER,
        isTestnet: process.env.IS_TESTNET,
      };
    }
    await module.exports.inputNetworkInfo(network);
    return true;
  },

  async inputNetworkInfo(network) {
    console.log("add FTM Network inprogress")
    await puppeteer.waitAndClick(mainPageElements.accountMenu.button);
    await puppeteer.waitAndClick(mainPageElements.accountMenu.settingsButton);
    await puppeteer.waitAndClick(mainPageElements.settingsPage.networksButton);
    await puppeteer.waitAndClick(
      mainPageElements.networksPage.addNetworkButton,
    );
    await puppeteer.waitXpathAndType(
      mainPageElements.addNetworkPage.networkNameInputXpath,
      network.networkName,
    );
    await puppeteer.waitXpathAndType(
      mainPageElements.addNetworkPage.rpcUrlInputXpath,
      network.rpcUrl,
    );
    await puppeteer.waitXpathAndType(
      mainPageElements.addNetworkPage.chainIdInputXpath,
      network.chainId,
    );
  
    if (network.symbol) {
      await puppeteer.waitXpathAndType(
        mainPageElements.addNetworkPage.symbolInputXpath,
        network.symbol,
      );
    }
  
    if (network.blockExplorer) {
      await puppeteer.waitXpathAndType(
        mainPageElements.addNetworkPage.blockExplorerInputXpath,
        network.blockExplorer,
      );
    }
    await puppeteer.waitXpathAndClick(mainPageElements.addNetworkPage.saveButtonXpath);
    await puppeteer.waitAndClick(mainPageElements.networksPage.closeButton);
    console.log("\nAfter click close button")
    await puppeteer.waitForText(
      mainPageElements.networkSwitcher.networkName,
      network.networkName,
    );
    console.log("\nAfter wait for text")
    return true;
  },

  async approveTokenFirstTime() {
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    console.log("\napproveToken 1");
    const notificationPage = await puppeteer.switchToMetamaskNotification();
    await puppeteer.waitAndClick(
      notificationPageElements.confirmTokenButton,
      notificationPage,
    );
    console.log("\napproveToken 2");
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    return true;
  },

  async acceptAccess() {
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    console.log("\nacceptAccess 1");
    const notificationPage = await puppeteer.switchToMetamaskNotification();
    await puppeteer.waitAndClick(
      notificationPageElements.nextButton,
      notificationPage,
    );
    console.log("\nacceptAccess 2");
    await puppeteer.waitAndClick(
      permissionsPageElements.connectButton,
      notificationPage,
    );
    console.log("\nacceptAccess 3");
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    return true;
  },
  async confirmTransaction() {
    // const isKovanTestnet = getNetwork().networkName === 'kovan';
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    const notificationPage = await puppeteer.switchToMetamaskNotification();
    // const currentGasFee = await puppeteer.waitAndGetValue(
    //   confirmPageElements.gasFeeInput,
    //   notificationPage,
    // );
    // const newGasFee = isKovanTestnet
    //   ? '1'
    //   : (Number(currentGasFee) + 10).toString();
    // await puppeteer.waitAndSetValue(
    //   newGasFee,
    //   confirmPageElements.gasFeeInput,
    //   notificationPage,
    // );
    // metamask reloads popup after changing a fee, you have to wait for this event otherwise transaction will fail
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    await puppeteer.waitAndClick(
      confirmPageElements.confirmButton,
      notificationPage,
    );
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    return true;
  },
  async rejectTransaction() {
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    const notificationPage = await puppeteer.switchToMetamaskNotification();
    await puppeteer.waitAndClick(
      confirmPageElements.rejectButton,
      notificationPage,
    );
    await puppeteer.metamaskWindow().waitForTimeout(3000);
    return true;
  },
  async getWalletAddress() {
    console.log("\ngetWalletAddress")
    await puppeteer.waitAndClick(mainPageElements.options.button);
    console.log("\nclick option.button")
    await puppeteer.waitAndClick(mainPageElements.options.accountDetailsButton);
    console.log("\nclick option.accountDetailsButton")
    walletAddress = await puppeteer.waitAndGetValue(
      mainPageElements.accountModal.walletAddressInput,
    );
    await puppeteer.waitAndClick(mainPageElements.accountModal.closeButton);
    return walletAddress;
  },
  async initialSetup({ secretWords, network, password }) {
    const isCustomNetwork =
      process.env.NETWORK_NAME && process.env.RPC_URL && process.env.CHAIN_ID;

    await puppeteer.init();
    await puppeteer.assignWindows();
    console.log("\nBefore:waitForTimeout\n");
    await puppeteer.metamaskWindow().waitForTimeout(1000);
    await puppeteer.metamaskWindow().bringToFront()
    if (
      (await puppeteer.metamaskWindow().$(unlockPageElements.unlockPage)) ===
      null
    ) {
      await module.exports.confirmWelcomePage();
      await module.exports.importWallet(secretWords, password);
      if (isCustomNetwork) {
        console.log("\naddNetwork new custom network");
        await module.exports.addNetwork(network);
        console.log("before add FTM Network")
        await module.exports.addFTMNetwork(network);
      } else {
        console.log("\nchangeNetwork");
        await module.exports.changeNetwork(network);
      }
      walletAddress = await module.exports.getWalletAddress();
      await puppeteer.switchToCypressWindow();
      console.log("\nadd network done and switchToCypressWindow");
      return true;
    } else {
      await module.exports.unlock(password);
      walletAddress = await module.exports.getWalletAddress();
      await puppeteer.switchToCypressWindow();
      console.log("\nunlock pwd and switchToCypressWindow");
      return true;
    }
  },
};