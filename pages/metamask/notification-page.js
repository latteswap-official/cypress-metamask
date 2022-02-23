const notificationPage = '.notification';
const confirmTokenButton = `${notificationPage} button[class="button btn--rounded btn-primary page-container__footer-button"]`;
const nextButton = `${notificationPage} button[class="button btn--rounded btn-primary"]`;
const permissionsPage = '.permissions-connect';
const connectButton = `${permissionsPage} .permission-approval-container__footers button:nth-child(2)`;

const confirmPageHeader = `${notificationPage} .confirm-page-container-header`;
const confirmPageContent = `${notificationPage} .page-container__footer`;
const confirmPageGasFeeSection = `${confirmPageContent} .confirm-page-container-content__gas-fee`;
const gasFeeLabel = `${confirmPageGasFeeSection} .currency-display-component__text`;
const gasFeeInput = `${confirmPageGasFeeSection} .advanced-gas-inputs__gas-edit-row:nth-child(1) .advanced-gas-inputs__gas-edit-row__input`;
const gasLimitInput = `${confirmPageGasFeeSection} .advanced-gas-inputs__gas-edit-row:nth-child(2) .advanced-gas-inputs__gas-edit-row__input`;
const totalLabel = `${confirmPageContent} div:nth-child(2) > .confirm-detail-row .currency-display-component__text`;
const rejectButton = `${confirmPageContent} [data-testid="page-container-footer-cancel"]`;
const confirmButton = `${confirmPageContent} [data-testid="page-container-footer-next"]`;
const confirmXpathButton = '//button[(.="Next")]'

module.exports.notificationPageElements = {
  notificationPage,
  nextButton,
};

module.exports.permissionsPageElements = {
  permissionsPage,
  connectButton,
};

module.exports.confirmPageElements = {
  confirmTokenButton,
  notificationPage,
  confirmPageHeader,
  confirmPageContent,
  confirmPageGasFeeSection,
  gasFeeLabel,
  gasFeeInput,
  gasLimitInput,
  totalLabel,
  rejectButton,
  confirmButton,
  confirmXpathButton
};