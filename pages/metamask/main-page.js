const networkSwitcher = {
  button: '.network-display',
  networkName: '.typography',
  dropdownMenuItem: '.dropdown-menu-item',
  networkNameXpath: '//span[(.="networkName")]',
  networkButton: number => `.dropdown-menu-item:nth-child(${3 + number})`,
};

const walletOverview = '.wallet-overview';
const popup = {
  container: '.popover-container',
  closeButton: '.popover-header__button',
};

const accountMenu = {
  button: '.account-menu__icon',
  settingsButton: '.account-menu__item--clickable:nth-child(11)',
  accountsSection: '.account-menu__accounts',
  firstAccount: '.account-menu__accounts:nth-child(1)',
  secondAccount: '.account-menu__accounts:nth-child(2)',
  accountsSelector: '.account-menu__name',
  importAccount: '.account-menu__item account-menu__item--clickable',
  importButton: '.new-account-create-form__button'
};

const settingsPage = {
  networksButton: '.settings-page button:nth-child(6)',
};

const networksPage = {
  addNetworkButton: '.networks-tab__body button',
  closeButton: '.settings-page__close-button',
};

const addNetworkPage = {
  networkNameInput: '#network-name',
  networkNameInputXpath: '//div[@class="form-field"and contains(.,"Network Name")]//input',
  rpcUrlInput: '#rpc-url',
  rpcUrlInputXpath: '//div[@class="form-field"and contains(.,"New RPC URL")]//input',
  chainIdInput: '#chainId',
  chainIdInputXpath: '//div[@class="form-field"and contains(.,"Chain ID")]//input',
  symbolInput: '#network-ticker',
  symbolInputXpath: '//div[@class="form-field"and contains(.,"Currency Symbol")]//input',
  blockExplorerInput: '#block-explorer-url',
  blockExplorerInputXpath: '//div[@class="form-field"and contains(.,"Block Explorer URL")]//input',
  saveButton: '.network-form__footer button:nth-child(2)',
  saveButtonXpath: '//button[contains(.,"Save")]'
};

const options = {
  button: '[data-testid=account-options-menu-button]',
  accountDetailsButton: '[data-testid="account-options-menu__account-details"]',
};

const accountModal = {
  walletAddressInput: '.qr-code__address',
  closeButton: '.account-modal__close',
};

module.exports.mainPageElements = {
  networkSwitcher,
  walletOverview,
  popup,
  accountMenu,
  settingsPage,
  networksPage,
  addNetworkPage,
  options,
  accountModal,
};
