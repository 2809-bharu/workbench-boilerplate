/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
* Masks the first 5 digits of the mobile number with *
* @param {*} mobileNumber
* @returns {string} returns the mobile number with first 5 digits masked
*/
function maskMobileNumber(mobileNumber) {
  if (!mobileNumber) {
    return '';
  }
  const value = mobileNumber.toString();
  // Mask first 5 digits and keep the rest
  return ` ${'*'.repeat(5)}${value.substring(5)}`;
}

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName, days, submitFormArrayToString, maskMobileNumber,calcEmi,maskMobile,
};

function calcEmi(loan_amount, rate_of_interest, loan_tenure, taxes = 0) {
  const P = Number(loan_amount) || 0;
  const N = Number(loan_tenure) || 0;
  const roi = Number(rate_of_interest);           // annual % (e.g., 12)
  const t = Number(taxes) || 0;                   // fixed monthly add-on

  // Must have principal and tenure
  if (P <= 0 || N <= 0) return 0;

  // 👉 Only calculate after ROI is provided (>0). Until then, return 0.
  if (!(roi > 0)) return 0;

  const r = roi / 1200;                           // monthly rate (decimal)

  // Standard EMI formula
  const pow = Math.pow(1 + r, N);
  const emi = (P * r * pow) / (pow - 1);

  // Add fixed monthly taxes/add-ons
  return Math.round(emi);
}

function maskMobile(num) {
    if (!num) return "";
    const digits = num.replace(/\D/g, ""); // keep digits only
    if (digits.length <= 4) return digits;
    return digits.replace(/\d(?=\d{4})/g, "*");
}
